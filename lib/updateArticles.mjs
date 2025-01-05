import { prisma } from '@/lib/prismaClient'
import Parser from 'rss-parser'


const parser = new Parser()

const updateArticles = async () => {
    console.info("Updating articles")
    try {
        const feeds = await prisma.feed.findMany()

        const articles = await Promise.all(
            feeds.map(async (feed) => {
                console.log("parsing Feed", feed)
                const {articles: parsedArticles} = await parseFeed(feed.url)
                const foundArticlePromises = parsedArticles.map(async (article) => {
                    const foundRecord = await prisma.article.findUnique({
                        where: {
                            gid: article.gid,
                            feedId: feed.id
                        }
                    })
                    return {article, foundRecord}
                    
                })
                const foundArticles = await Promise.all(foundArticlePromises)
                const newArticles = foundArticles.filter(({foundRecord}) => !foundRecord)
                console.log("newArticles", newArticles)
                return newArticles.map(({article}) => {return {...article, feedId: feed.id}})
            })
        )
    
        const flattenedArticles = articles.flat().sort((a, b) => 
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        )

        // console.log(flattenedArticles)
    
        const createdArticles = await prisma.article.createMany({
            data: flattenedArticles,
            skipDuplicates: true
        })

        // console.log(createdArticles)
    
        return {result: true, message: 'Articles updated'}
    } catch (error) {
        console.error(error)
        return {result: false, message: 'Failed to update articles'}
    }
}

const parseFeed = async (url) => {
    const parsedFeed = await parser.parseURL(url)
    // console.log(Object.keys(parsedFeed))
    const articles = parsedFeed.items.map((item) => ({
        gid: item.guid || item.link,
        title: item.title,
        content: item.content,
        author: item.creator,
        description: item.contentSnippet,
        pubDate: new Date(item.pubDate).toISOString(),
        link: item.link,
    }))

    return {title: parsedFeed.title, articles}
}


const loadNewFeedArticles = async (url) => {
    console.info(`Loading new articles from ${url}`)

    try {
        const {articles, title} = await parseFeed(url)
    
        const sortedArticles = articles.sort((a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        )
    
        const feed = await prisma.feed.create({
            data: {
                url,
                title,
                articles: {
                    createMany: {
                        data: sortedArticles
                    }
                }
            }
        })
    
        return { status: true, feed}
    } catch (error) {
        console.error(error)
        return {result: false, feed: null}
    }
}

export { updateArticles, loadNewFeedArticles }
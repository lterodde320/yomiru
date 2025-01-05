import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { UserSession, authOptions } from '@/lib/authOptions'


const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)

  const userSession = session as UserSession

  if (!userSession || !userSession.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: userSession.user.id },
      select: {
        feed: {
          select: {
            id: true,
            url: true,
            title: true,
            articles: {
              select: {
                id: true,
                gid: true,
                title: true,
                link: true,
                content: true,
                description: true,
                pubDate: true
              }
            }
          }
        }
      }
    })

    const articles = subscriptions.map(subscription => 
      subscription.feed.articles.map(article => {return {
        ...article,
        feedName: subscription.feed.title,
        feedId: subscription.feed.id
      }})
    )

    const flattenedArticles = articles.flat().sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )

    return NextResponse.json(flattenedArticles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


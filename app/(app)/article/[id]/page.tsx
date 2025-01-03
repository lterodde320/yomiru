import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import sanitizeHtml from 'sanitize-html';
import { ExternalLink, Link } from 'lucide-react';
import ExternalLinkButton from "@/components/article/ExternalLinkButton";

const prisma = new PrismaClient()

const ArticlePage = async ({
    params,
  }: {
    params: Promise<{ id: string }>
  }) => {

    const { id } = await params

    const sanitizeOptions = {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'img', 'p' ],
        allowedAttributes: {
          'a': [ 'href' ],
          'img': [ 'src' ]
        }
      }

    const article = await prisma.article.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            content: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            link: true
        }
    })

    if(!article) {
        redirect('/404')
    }

    return (
        <div className="flex justify-center py-8">
            <div className="container p-2 max-w-screen-lg">
                <div className="flex flex-row w-full justify-between mb-2">
                    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">{article.title}</h1>
                    <ExternalLinkButton url={article.link}/>
                </div>
                {
                    article.content && (
                        <div dangerouslySetInnerHTML={{__html: sanitizeHtml(article.content, sanitizeOptions)}}></div>
                    )
                }
                
            </div>
        </div>
    );
};

export default ArticlePage;
'use client'

import { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from './ui/spinner'



interface Article {
  id: string
  title: string
  description: string
  pubDate: string
  link: string
  feedName: string
}

export default function ArticleList() {
  const { toast } = useToast()
  const router = useRouter()
 
  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async (): Promise<Article[]> => {
    try {
      const res = await fetch('/api/articles')
      if (res.ok) {
        const data = await res.json()
        console.log("articleData", data)
        return data
      } else {
        throw new Error('Failed to fetch articles')
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to fetch articles. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const {data: articles, isLoading, isError} = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if(isLoading) {
    return (
    <span className="flex flex-row w-full justify-center"><Spinner size="small"/><p className="ml-2 font-bold">Loading...</p></span>)
  }

  if(isError) {
    return <p>Failed to fetch articles. Please try again.</p>
  }

  if(!articles) {
    return <p>No articles found. Try adding some RSS feeds</p>
  }

  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles found. Try adding some RSS feeds.</p>
      ) : (
        <ul className='space-y-3'>
          {articles.map(article => (
            <Card className='cursor-pointer' key={article.id} onClick={() => router.push(`/article/${article.id}`, {})}>
              <CardHeader>
                <CardTitle className="text-xl font-bold line-clamp-1">
                    {article.title}
                </CardTitle>
                <CardDescription className="mb-2 line-clamp-3">{article.feedName} - {new Date(article.pubDate).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{article.description}</p>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  )
}


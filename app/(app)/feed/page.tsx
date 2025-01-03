"use client"

import ArticleList from '@/components/ArticleList'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/lib/query';


export default function Feed() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8 max-w-screen-lg">
        <h1 className="text-4xl font-bold mb-6">Your Feed</h1>
        <ArticleList />
      </div>
    </QueryClientProvider>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Spinner } from './ui/spinner'

interface Feed {
  id: string
  url: string
  title: string
}

interface Subscription {
  id: string
  feed: Feed
}

export default function FeedList() {
  // const [subscriptions, setSubscriptions] = useState<Subscription[]>([])s
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const fetchSubscriptions = async () : Promise<Subscription[]> =>{
    try {
      const res = await fetch('/api/feeds')
      console.log("res", res)
        const data = await res.json()
        console.log("hehe", data)
        return data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch feeds. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const {data: subscriptions, isLoading, isError} = useQuery<Subscription[]>({
    queryKey: ['subscriptions'],
    queryFn: fetchSubscriptions,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const deleteFeed = async (id: string) => {
    try {
      const res = await fetch(`/api/feeds/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        const newSubscriptions = await res.json()
        console.log(newSubscriptions)
        queryClient.invalidateQueries({queryKey: ['subscriptions']})
        toast({
          title: "Success",
          description: "Feed deleted successfully",
        })
      } else {
        throw new Error('Failed to delete feed')
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to delete feed. Please try again.",
        variant: "destructive",
      })
    }
  }

  if(isLoading) return(
    <span className='flex flex-row w-full justify-center content-center mt-10'>
      <Spinner size="small" className='mr-2'/><p className="font-bold">Loading...</p>
    </span>
  )

  if(isError || !subscriptions) return(
    <span>Error</span>
  )

  if(subscriptions.length === 0) return(
    <span className='w-full flex justify-center mt-10'><p>No feeds added yet.</p></span>
  )


  return (
    <ul>
      {subscriptions.map((subscription) => (
        <li key={subscription.feed.id} className="flex justify-between items-center mb-2">
          <span>{subscription.feed.title}</span>
          <Button variant="destructive" onClick={() => deleteFeed(subscription.id)}>Delete</Button>
        </li>
      ))}
    </ul>
  )
}


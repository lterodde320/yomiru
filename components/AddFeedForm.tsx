'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useQueryClient } from '@tanstack/react-query'

export default function AddFeedForm() {
  const [url, setUrl] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/feeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      if (res.ok) {
        queryClient.invalidateQueries({queryKey: ['subscriptions']})
        setUrl('')
        toast({
          title: "Success",
          description: "Feed added successfully",
        })
      } else {
        throw new Error('Failed to add feed')
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to add feed. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <Input
          type="url"
          placeholder="Enter RSS feed URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mr-2"
          required
        />
        <Button type="submit">Add Feed</Button>
      </div>
    </form>
  )
}


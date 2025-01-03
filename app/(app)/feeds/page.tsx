"use client"
import AddFeedForm from '@/components/AddFeedForm'
import FeedList from '@/components/FeedList'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/lib/query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

export default function Feeds() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8 max-w-screen-lg">
        <div className="w-full flex justify-between">
          <h2 className="text-4xl font-bold mb-4">Your Feeds</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button><Plus/></Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Feed</DialogTitle>
              </DialogHeader>
              <AddFeedForm />
            </DialogContent>
          </Dialog>
          
        </div>
        <FeedList />
      </div>
    </QueryClientProvider>
  )
}


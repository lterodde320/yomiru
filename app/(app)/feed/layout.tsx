"use client"
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/lib/query';
import Header from '@/components/navigation/Header';
import * as Tabs from "@radix-ui/react-tabs"
import { useParams,useRouter } from 'next/navigation'

const feedTypes = ['latest', 'hottest']

export default function Feed({children}: {children: React.ReactNode}) {

    return (
        <QueryClientProvider client={queryClient}>
            <FeedTabBar />
            <div className="container mx-auto px-4 py-4 max-w-screen-lg">
                {children}
            </div>
        </QueryClientProvider>
    )
}

const FeedTabBar = () => {
  
  const { type } = useParams()
  const router = useRouter()

  function handleValueChange (value: string) {
    router.push(`/feed/${value}`)
  }

  if(type === undefined || !feedTypes.includes(type.toString())) {
    router.push('/feed/latest')
    return null
  }

  return (
    <Header className='justify-center'>
      <Tabs.Root 
        value={type.toString()}
        onValueChange={handleValueChange}
        defaultValue="latest" 
        orientation="horizontal" 
        className='h-full'
      >
        <Tabs.List aria-label="tabs example" className='h-full space-x-2'>
          <FeedTabBarButton value="latest">Latest</FeedTabBarButton>
          <FeedTabBarButton value="hottest">Hottest</FeedTabBarButton>
        </Tabs.List>
      </Tabs.Root>
    </Header>
  )
}

const FeedTabBarButton = ({children, value} : {children: React.ReactNode, value: string}) => {
  return (
    <Tabs.Trigger value={value} className='group h-full data-[state=active]:bg-gray-100'>
      <div className="h-full flex items-center group-data-[state=active]:border-b-4 px-2">
        {children}
      </div>
    </Tabs.Trigger>
  )
}
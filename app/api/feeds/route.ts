import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prismaClient'
import { loadNewFeedArticles } from '@/lib/updateArticles.mjs'
import { UserSession, authOptions } from '@/lib/authOptions'


export async function GET() {
  const session = await getServerSession(authOptions)

  const userSession = session as UserSession

  if (!userSession || !userSession.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const feeds = await prisma.subscription.findMany({
      where: { userId: userSession.user.id },
      select: {
        id: true,
        feed: {
          select: {
            id: true,
            url: true,
            title: true,
          }
        }
      }
    })
    return NextResponse.json(feeds)
  } catch (error) {
    console.error('Error fetching feed subscriptions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  const userSession = session as UserSession

  if (!userSession || !userSession.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { url } = await req.json()

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const existingFeed = await prisma.feed.findFirst({
      where: {
        url,
      }
    })

    let feed = null

    if(existingFeed) {
      feed = existingFeed
    } else {  
      const createdFeed = await loadNewFeedArticles(url)
      // console.log(createdFeed)
      if(!createdFeed.status) {
        throw new Error('Failed to create feed')
      }
      
      feed = createdFeed.feed
    }

    await prisma.subscription.create({
      data: {
        userId: userSession.user.id,
        feedId: feed.id
      }
    })
    
    return NextResponse.json({  },{ status: 201 })
  } catch (error) {
    console.error('Error creating feed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


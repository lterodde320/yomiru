import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { authOptions, UserSession } from '../../auth/[...nextauth]/route'


const prisma = new PrismaClient()

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  const userSession = session as UserSession

  if (!userSession || !userSession.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params

  if(!id) {
    return NextResponse.json({ error: 'Feed ID is required' }, { status: 400 })
  }

  try {
    const subscriptions = await prisma.subscription.delete({
      where: {
        id: id,
      },
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
    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error deleting feed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


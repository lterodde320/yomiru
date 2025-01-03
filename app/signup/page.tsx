'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        await signIn('credentials', { email, password, redirect: false })
        router.push('/feeds')
      } else {
        throw new Error('Failed to sign up')
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to sign up. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
          required
        />
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </div>
  )
}


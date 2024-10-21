import {
  ClerkProvider,
  SignInButton,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Toaster } from "@/components/ui/toaster"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          
        <div className="flex md:flex md:flex-grow flex-row m-3 justify-end space-x-1">

          <SignedOut>
          <Button variant="outline"><Link href={"/sign-in"}> Sign in</Link></Button>
          <Button ><Link href={"/sign-up"}> Sign up</Link></Button>

                   
                    </SignedOut>
          <SignedIn>
          <Button variant={'outline'}><Link href={"/budget"}> Budget</Link></Button>
          <Button variant={'outline'}><Link href={"/expense"}> Expense</Link></Button>
            <Button variant={'outline'}><Link href={"/income"}> Income</Link></Button>
            <Button variant={"secondary"}><Link href={"/dashboard"}> Dashboard</Link></Button>
            
            <UserButton />
          </SignedIn>
          </div>
          {children}

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
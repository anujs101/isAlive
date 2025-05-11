"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-emerald-500">
            <div className="absolute inset-1 rounded-full bg-black" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500" />
          </div>
          <span className="text-xl font-bold">isAlive</span>
        </Link>

        {/* <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link href="#features" className="text-sm text-gray-300 transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-gray-300 transition-colors hover:text-white">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm text-gray-300 transition-colors hover:text-white">
            Pricing
          </Link>
          <Link href="#docs" className="text-sm text-gray-300 transition-colors hover:text-white">
            Docs
          </Link>
        </nav> */}

        <div className="hidden md:flex md:items-center md:space-x-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-900">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-6 md:hidden">
          <nav className="flex flex-col space-y-4 pt-4">
            <Link
              href="#features"
              className="rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-900 hover:text-white"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-900 hover:text-white"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-900 hover:text-white"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="#docs"
              className="rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-900 hover:text-white"
              onClick={toggleMenu}
            >
              Docs
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full border-gray-800 text-gray-300 hover:bg-gray-900">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          Event Community
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/events">
            <Button variant="ghost">Events</Button>
          </Link>
          <Link href="/community">
            <Button variant="ghost">Community</Button>
          </Link>
          <Link href="/chat">
            <Button variant="ghost">Chat</Button>
          </Link>
          {user ? (
            <>
              <span>{user.email}</span>
              {isAdmin && (
                <>
                  <Link href="/events/create">
                    <Button variant="outline">Create Event</Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                </>
              )}
              <Button onClick={signOut}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

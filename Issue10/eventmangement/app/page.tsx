import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to Event Community</h1>
      <p className="text-xl mb-8">
        Schedule events, register, post reviews, and engage with the community
      </p>
      <div className="flex space-x-4">
        <Link href="/events">
          <Button size="lg">Browse Events</Button>
        </Link>
        <Link href="/community">
          <Button size="lg" variant="outline">
            Join Community
          </Button>
        </Link>
      </div>
    </div>
  );
}

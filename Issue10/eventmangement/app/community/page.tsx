import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface CommunityPostProps {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
}

const CommunityPost: React.FC<CommunityPostProps> = ({
  id,
  title,
  content,
  user_id,
  created_at,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{content}</p>
      <p className="text-sm text-gray-500 mt-2">
        Posted by: {user_id} on {new Date(created_at).toLocaleString()}
      </p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Link href={`/community/${id}`}>
        <Button variant="secondary" size="sm">
          View Discussion
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

export default async function CommunityPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: posts } = await supabase
    .from("community_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Community Discussions</h1>
        <Link href="/community/create">
          <Button>Create Post</Button>
        </Link>
      </div>
      <div className="mb-6">
        <Input placeholder="Search discussions..." />
      </div>
      <div className="space-y-4">
        {posts?.map((post) => (
          <CommunityPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

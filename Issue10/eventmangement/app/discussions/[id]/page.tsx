"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

export default function DiscussionPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const supabase = createClientComponentClient();
  const { user } = useAuth();

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const fetchPostAndComments = async () => {
    setIsLoading(true);
    setError(null);

    // Fetch post
    const { data: postData, error: postError } = await supabase
      .from("community_posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (postError) {
      console.error("Error fetching post:", postError);
      setError(postError.message);
      setIsLoading(false);
      return;
    }

    if (!postData) {
      setError("Post not found");
      setIsLoading(false);
      return;
    }

    setPost(postData);

    // Fetch comments
    const { data: commentsData, error: commentsError } = await supabase
      .from("post_comments")
      .select("*")
      .eq("post_id", params.id)
      .order("created_at", { ascending: true });

    if (commentsError) {
      console.error("Error fetching comments:", commentsError);
      setError(commentsError.message);
    } else {
      setComments(commentsData);
    }

    setIsLoading(false);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase.from("post_comments").insert({
      content: newComment,
      post_id: params.id,
      user_id: user.id,
    });

    if (error) {
      console.error("Error submitting comment:", error);
    } else {
      setNewComment("");
      fetchPostAndComments();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Posted on {new Date(post.created_at).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
      {comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardContent>
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Commented on {new Date(comment.created_at).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}

      {user && (
        <form onSubmit={handleSubmitComment} className="mt-8">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="mb-2"
          />
          <Button type="submit">Submit Comment</Button>
        </form>
      )}
    </div>
  );
}

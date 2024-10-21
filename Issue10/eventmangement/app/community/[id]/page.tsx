"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
}

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export default function DiscussionPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const supabase = createClientComponentClient();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPostAndComments() {
      const { data: postData, error: postError } = await supabase
        .from("community_posts")
        .select("*")
        .eq("id", params.id)
        .single();

      if (postError) {
        console.error("Error fetching post:", postError);
      } else {
        setPost(postData);
      }

      const { data: commentsData, error: commentsError } = await supabase
        .from("post_comments")
        .select("*")
        .eq("post_id", params.id)
        .order("created_at", { ascending: true });

      if (commentsError) {
        console.error("Error fetching comments:", commentsError);
      } else {
        setComments(commentsData);
      }

      setIsLoading(false);
    }

    fetchPostAndComments();
  }, [params.id, supabase]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const { data, error } = await supabase.from("post_comments").insert([
      {
        post_id: params.id,
        content: newComment,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("Error creating comment:", error);
    } else {
      setNewComment("");
      // Refresh comments
      const { data: commentsData, error: commentsError } = await supabase
        .from("post_comments")
        .select("*")
        .eq("post_id", params.id)
        .order("created_at", { ascending: true });

      if (commentsError) {
        console.error("Error fetching comments:", commentsError);
      } else {
        setComments(commentsData);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const { error } = await supabase
      .from("post_comments")
      .delete()
      .eq("id", commentId)
      .eq("user_id", user.id); // Ensure the user can only delete their own comments

    if (error) {
      console.error("Error deleting comment:", error);
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Posted by: {post.user_id} on{" "}
            {new Date(post.created_at).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="py-4">
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted by: {comment.user_id} on{" "}
                {new Date(comment.created_at).toLocaleString()}
              </p>
              {user &&
                (user.id === comment.user_id || user.id === post?.user_id) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete Comment
                  </Button>
                )}
            </CardContent>
          </Card>
        ))}
      </div>

      {user ? (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <Button type="submit">Post Comment</Button>
        </form>
      ) : (
        <p>Please log in to comment.</p>
      )}
    </div>
  );
}

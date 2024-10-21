"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  is_private: boolean;
  created_by: string;
}

interface Review {
  id: string;
  user_id: string;
  event_id: string;
  content: string;
  rating: number;
  created_at: string;
  votes: number;
}

interface ReviewVote {
  id: string;
  review_id: string;
  user_id: string;
  vote: number;
}

// Add a new interface for EventRegistration
interface EventRegistration {
  id: string;
  user_id: string;
  event_id: string;
  user_name: string; // This will store the user's name
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(targetDate: Date) {
    const difference = +targetDate - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }

  if (!timeLeft) {
    return <div>Event has started!</div>;
  }

  return (
    <div className="text-2xl font-bold">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
}

function ReviewForm({
  eventId,
  onReviewSubmitted,
}: {
  eventId: string;
  onReviewSubmitted: () => void;
}) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const supabase = createClientComponentClient();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from("reviews").insert({
      event_id: eventId,
      user_id: user.id,
      content,
      rating,
    });

    if (error) {
      console.error("Error submitting review:", error);
    } else {
      setContent("");
      setRating(0);
      onReviewSubmitted();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your review here..."
        className="mb-2"
      />
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  );
}

function ReviewList({
  reviews,
  onVote,
  userVotes,
}: {
  reviews: Review[];
  onVote: (reviewId: string, voteType: "upvote" | "downvote") => void;
  userVotes: Record<string, number>;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="border-b py-2">
          <p>{review.content}</p>
          <div className="flex items-center mt-1">
            <div className="flex items-center mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={userVotes[review.id] === 1 ? "default" : "outline"}
                onClick={() => onVote(review.id, "upvote")}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span>{review.votes}</span>
              <Button
                size="sm"
                variant={userVotes[review.id] === -1 ? "default" : "outline"}
                onClick={() => onVote(review.id, "downvote")}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventDetailPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [canReview, setCanReview] = useState(false);
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { user } = useAuth();
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);

  useEffect(() => {
    async function fetchEventAndReviews() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
        setIsLoading(false);
        return;
      }

      setEvent(data);

      if (user) {
        const { data: registrationData, error: registrationError } =
          await supabase
            .from("event_registrations")
            .select("*, user_profiles(name)")
            .eq("event_id", params.id);

        if (registrationError) {
          console.error("Error checking registrations:", registrationError);
        } else {
          setRegistrations(
            registrationData.map((reg: any) => ({
              ...reg,
              user_name: reg.user_profiles.name,
            }))
          );
          setIsRegistered(
            !!registrationData.find((reg) => reg.user_id === user.id)
          );
        }
      }

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select(
          `
          *,
          votes:review_votes(vote)
        `
        )
        .eq("event_id", params.id)
        .order("created_at", { ascending: false });

      if (reviewsError) {
        console.error("Error fetching reviews:", reviewsError);
      } else {
        // Calculate the total votes for each review
        const reviewsWithVotes = reviewsData.map((review) => ({
          ...review,
          votes: review.votes.reduce((acc, vote) => acc + vote.vote, 0),
        }));
        setReviews(reviewsWithVotes);
      }

      // Check if user can review
      if (user && data && isRegistered) {
        const eventDate = new Date(data.date);
        const now = new Date();
        setCanReview(now > eventDate);
      } else {
        setCanReview(false);
      }

      // Fetch user votes if user is logged in
      if (user) {
        const { data: votesData, error: votesError } = await supabase
          .from("review_votes")
          .select("review_id, vote")
          .eq("user_id", user.id);

        if (votesError) {
          console.error("Error fetching user votes:", votesError);
        } else {
          const votesMap = votesData.reduce((acc, vote) => {
            acc[vote.review_id] = vote.vote;
            return acc;
          }, {} as Record<string, number>);
          setUserVotes(votesMap);
        }
      }

      setIsLoading(false);
    }

    fetchEventAndReviews();
  }, [params.id, supabase, user]);

  const handleRegister = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("event_registrations").insert({
      event_id: event?.id,
      user_id: user.id,
    });

    if (error) {
      console.error("Error registering for event:", error);
    } else {
      setIsRegistered(true);
    }
  };

  const handleReviewSubmitted = async () => {
    // Refetch reviews after a new review is submitted
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        *,
        votes:review_votes(vote)
      `
      )
      .eq("event_id", params.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching updated reviews:", error);
    } else {
      const reviewsWithVotes = data.map((review) => ({
        ...review,
        votes: review.votes.reduce((acc, vote) => acc + vote.vote, 0),
      }));
      setReviews(reviewsWithVotes);
    }
  };

  const handleVote = async (
    reviewId: string,
    voteType: "upvote" | "downvote"
  ) => {
    if (!user) return;

    const voteValue = voteType === "upvote" ? 1 : -1;
    const currentVote = userVotes[reviewId];

    let action: "insert" | "update" | "delete" = "insert";
    if (currentVote === voteValue) {
      action = "delete";
    } else if (currentVote !== undefined) {
      action = "update";
    }

    let query;
    switch (action) {
      case "insert":
        query = supabase.from("review_votes").insert({
          review_id: reviewId,
          user_id: user.id,
          vote: voteValue,
        });
        break;
      case "update":
        query = supabase
          .from("review_votes")
          .update({ vote: voteValue })
          .eq("review_id", reviewId)
          .eq("user_id", user.id);
        break;
      case "delete":
        query = supabase
          .from("review_votes")
          .delete()
          .eq("review_id", reviewId)
          .eq("user_id", user.id);
        break;
    }

    const { error } = await query;

    if (error) {
      console.error(`Error ${action}ing vote:`, error);
    } else {
      // Update local state
      if (action === "delete") {
        const newUserVotes = { ...userVotes };
        delete newUserVotes[reviewId];
        setUserVotes(newUserVotes);
      } else {
        setUserVotes({ ...userVotes, [reviewId]: voteValue });
      }

      // Update the review's vote count
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                votes:
                  review.votes +
                  (action === "delete"
                    ? -currentVote
                    : voteValue - (currentVote || 0)),
              }
            : review
        )
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedEvent(event);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEvent(null);
  };

  const handleSaveEdit = async () => {
    if (!editedEvent) return;

    const { error } = await supabase
      .from("events")
      .update({
        title: editedEvent.title,
        description: editedEvent.description,
        date: editedEvent.date,
        location: editedEvent.location,
        capacity: editedEvent.capacity,
        is_private: editedEvent.is_private,
      })
      .eq("id", event?.id);

    if (error) {
      console.error("Error updating event:", error);
    } else {
      setEvent(editedEvent);
      setIsEditing(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          {isEditing ? (
            <Input
              value={editedEvent?.title}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent!, title: e.target.value })
              }
              className="text-3xl font-bold"
            />
          ) : (
            <CardTitle className="text-3xl">{event.title}</CardTitle>
          )}
          {event.is_private && !isEditing && (
            <p className="text-sm text-gray-500">This is a private event</p>
          )}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <Textarea
                value={editedEvent?.description}
                onChange={(e) =>
                  setEditedEvent({
                    ...editedEvent!,
                    description: e.target.value,
                  })
                }
                className="mb-4"
              />
              <Input
                type="datetime-local"
                value={editedEvent?.date}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent!, date: e.target.value })
                }
                className="mb-4"
              />
              <Input
                value={editedEvent?.location}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent!, location: e.target.value })
                }
                className="mb-4"
              />
              <Input
                type="number"
                value={editedEvent?.capacity}
                onChange={(e) =>
                  setEditedEvent({
                    ...editedEvent!,
                    capacity: parseInt(e.target.value),
                  })
                }
                className="mb-4"
              />
              <Select
                value={editedEvent?.is_private ? "private" : "public"}
                onValueChange={(value) =>
                  setEditedEvent({
                    ...editedEvent!,
                    is_private: value === "private",
                  })
                }
              >
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end space-x-2">
                <Button onClick={handleCancelEdit} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4">{event.description}</p>
              <p className="mb-4">
                Date: {new Date(event.date).toLocaleString()}
              </p>
              <p className="mb-4">Location: {event.location}</p>
              <p className="mb-4">Capacity: {event.capacity}</p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  Time until event starts:
                </h3>
                <CountdownTimer targetDate={new Date(event.date)} />
              </div>
              {user && user.id === event.created_by && (
                <Button onClick={handleEdit} className="mb-4">
                  Edit Event
                </Button>
              )}
              {user && !isRegistered && (
                <Button onClick={handleRegister}>Register for Event</Button>
              )}
              {isRegistered && (
                <p className="text-green-600 font-semibold">
                  You are registered for this event
                </p>
              )}
              {!user && (
                <p>
                  Please{" "}
                  <Button onClick={() => router.push("/login")}>log in</Button>{" "}
                  to register for this event
                </p>
              )}
              {user && isRegistered && canReview && (
                <ReviewForm
                  eventId={event.id}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              )}
              {user && isRegistered && !canReview && (
                <p className="text-yellow-600 font-semibold mt-4">
                  You can submit a review after the event has ended.
                </p>
              )}
              <ReviewList
                reviews={reviews}
                onVote={handleVote}
                userVotes={userVotes}
              />
              {/* Add this section to display registrations */}
              {user && user.id === event.created_by && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Registrations</h3>
                  <ul>
                    {registrations.map((reg) => (
                      <li key={reg.id}>{reg.user_name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

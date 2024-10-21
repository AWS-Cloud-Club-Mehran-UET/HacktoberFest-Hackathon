import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CommunityPostProps {
  title: string;
  content: string;
  votes: number;
}

const CommunityPost: React.FC<CommunityPostProps> = ({
  title,
  content,
  votes,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{content}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Upvote
        </Button>
        <span>{votes}</span>
        <Button variant="outline" size="sm">
          Downvote
        </Button>
      </div>
      <Button variant="secondary" size="sm">
        Comment
      </Button>
    </CardFooter>
  </Card>
);

export default function CommunityPage() {
  const posts: CommunityPostProps[] = [
    {
      title: "Event Feedback: Tech Conference 2024",
      content: "What did everyone think of the keynote?",
      votes: 15,
    },
    {
      title: "Suggestion: More networking events",
      content: "I'd love to see more casual networking opportunities.",
      votes: 8,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Community Discussions</h1>
      <div className="mb-6">
        <Input placeholder="Search discussions..." />
      </div>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <CommunityPost key={index} {...post} />
        ))}
      </div>
    </div>
  );
}

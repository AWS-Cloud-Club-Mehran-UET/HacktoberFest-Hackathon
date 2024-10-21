"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Registration {
  id: string;
  user_id: string;
  registered_at: string;
}

export default function EventRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchRegistrations() {
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("event_id", params.id);

      if (error) {
        console.error("Error fetching registrations:", error);
      } else {
        setRegistrations(data || []);
      }
      setIsLoading(false);
    }

    fetchRegistrations();
  }, [params.id, supabase, user, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Event Registrations</h1>
      <div className="space-y-4">
        {registrations.map((registration) => (
          <Card key={registration.id}>
            <CardHeader>
              <CardTitle>User ID: {registration.user_id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Registered at:{" "}
                {new Date(registration.registered_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

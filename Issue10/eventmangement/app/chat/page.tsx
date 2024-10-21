"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Circle } from "lucide-react";

// Add this helper function at the top of the file, outside of the component
function getUsername(email: string): string {
  return email.split("@")[0];
}

interface User {
  id: string;
  email: string;
  is_online: boolean;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

export default function ChatPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const supabase = createClientComponentClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsers();
    const channel = supabase
      .channel("online-users")
      .on("presence", { event: "sync" }, () => {
        const onlineUsers = channel.presenceState();
        updateOnlineStatus(onlineUsers);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ user_id: user?.id });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (selectedUser && user) {
      fetchMessages();
      const unsubscribe = subscribeToMessages();
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [selectedUser, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchUsers = async () => {
    if (!user) return; // Ensure the current user is logged in

    try {
      const { data, error } = await supabase
        .from("user_profiles") // Changed from 'profiles' to 'user_profiles'
        .select("id, email")
        .neq("id", user.id); // Exclude the current user

      if (error) {
        throw error;
      }

      setUsers(
        data.map((profile) => ({
          id: profile.id,
          email: profile.email,
          is_online: false, // We'll update this with real-time presence later
        }))
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateOnlineStatus = (onlineUsers: Record<string, any>) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => ({
        ...u,
        is_online: Object.keys(onlineUsers).includes(u.id),
      }))
    );
  };

  const fetchMessages = async () => {
    if (!user || !selectedUser) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .or(`sender_id.eq.${selectedUser.id},receiver_id.eq.${selectedUser.id}`)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data);
    }
  };

  const subscribeToMessages = () => {
    if (!user || !selectedUser) return;

    const channel = supabase
      .channel("new-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `or(sender_id.eq.${user.id},receiver_id.eq.${user.id},sender_id.eq.${selectedUser.id},receiver_id.eq.${selectedUser.id})`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          if (
            (newMessage.sender_id === user.id &&
              newMessage.receiver_id === selectedUser.id) ||
            (newMessage.sender_id === selectedUser.id &&
              newMessage.receiver_id === user.id)
          ) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!user || !selectedUser || !newMessage.trim()) return;

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          receiver_id: selectedUser.id,
          content: newMessage.trim(),
        })
        .select();

      if (error) {
        console.error("Error sending message:", error);
      } else {
        setNewMessage("");
        setMessages((prevMessages) => [...prevMessages, data[0] as Message]);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Unexpected error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b">Contacts</h2>
        <div className="space-y-2 p-4">
          {users.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition ${
                selectedUser?.id === u.id ? "bg-blue-100" : ""
              }`}
            >
              <div className="relative">
                <Circle className="h-10 w-10 text-gray-300" />
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                    u.is_online ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
              </div>
              <div>
                <p className="font-medium">{getUsername(u.email)}</p>
                <p className="text-sm text-gray-500">
                  {u.is_online ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center space-x-3">
              <Circle className="h-10 w-10 text-gray-300" />
              <div>
                <h2 className="font-semibold">
                  {getUsername(selectedUser.email)}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedUser.is_online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_id === user?.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                      message.sender_id === user?.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex space-x-2"
              >
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-xl text-gray-500">
              Select a user to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { PostData } from "@/lib/types";
import Post from "@/modules/posts/Post";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const ForYouFeed = () => {
  const { data: posts, status } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const res = await fetch("/api/posts/for-you");

      if (!res.ok) {
        throw Error(`Request failed with status code ${res.status}`);
      }

      return res.json();
    },
  });

  if (status === "pending") {
    return <Loader2 className="text-primary mx-auto size-6 animate-spin" />;
  }

  if (status === "error") {
    return (
      <p className="text-destructive text-center">
        An error occured while loading posts
      </p>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default ForYouFeed;

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PostsLoadingSkeleton = () => {
  return (
    <div className="space-y-5">
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
    </div>
  );
};

export default PostsLoadingSkeleton;

const PostLoadingSkeleton = () => {
  return (
    <div className="bg-card w-full animate-pulse space-y-3 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
      <Skeleton className="h-16 rounded" />
    </div>
  );
};

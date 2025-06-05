"use client";

import UserAvatar from "@/components/UserAvatar";
import { PostData } from "@/lib/types";
import { formateRelativeDate } from "@/lib/utils";
import { useSession } from "@/providers/SessionProvider";
import Link from "next/link";
import PostMoreButton from "./PostMoreButton";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  const { user } = useSession();

  return (
    <div className="group/post bg-card space-y-3 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div>
            <Link
              href={`/users/${post.user.username}`}
              className="block font-medium hover:underline"
            >
              {post.user.displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="text-muted-foreground block text-sm hover:underline"
            >
              {formateRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <div className="break-words whitespace-pre-line">{post.content}</div>
    </div>
  );
};

export default Post;

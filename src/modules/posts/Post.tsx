import UserAvatar from "@/components/UserAvatar";
import { PostData } from "@/lib/types";
import { formateRelativeDate } from "@/lib/utils";
import Link from "next/link";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  return (
    <article className="bg-card space-y-3 rounded-2xl p-5 shadow-sm">
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

      <div className="break-words whitespace-pre-line">{post.content}</div>
    </article>
  );
};

export default Post;

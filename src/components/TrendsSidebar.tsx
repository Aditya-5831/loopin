import { validateRequest } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import db from "@/lib/prisma";
import { usersDataSelect } from "@/lib/types";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";
import { formateNumber } from "@/lib/utils";

const TrendsSidebar = () => {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense
        fallback={
          <Loader className="mx-auto mt-5 size-5 animate-spin text-gray-500" />
        }
      >
        <FollowSuggestions />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

export default TrendsSidebar;

export const FollowSuggestions = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const followSuggestions = await db.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: usersDataSelect,
    take: 5,
  });

  return (
    <div className="bg-card space-y-5 rounded-2xl p-5 shadow-sm">
      <div className="text-lg font-bold">Suggestions</div>
      {followSuggestions.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <Link
            href={`/user/${user.username}`}
            className="flex items-center gap-3"
          >
            <UserAvatar avatarUrl={user.avatarUrl} />
            <div className="flex flex-col">
              <span className="line-clamp-1 font-semibold break-all hover:underline">
                {user.displayName}
              </span>
              <span className="text-muted-foreground line-clamp-1 text-sm break-all">
                @{user.username}
              </span>
            </div>
          </Link>
          <Button>Follow</Button>
        </div>
      ))}
    </div>
  );
};

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await db.$queryRaw<{ hashtag: string; count: bigint }[]>`
        SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
        FROM posts 
        GROUP BY hashtag
        ORDER BY count DESC, hashtag ASC
        LIMIT 5
      `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

const TrendingTopics = async () => {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="bg-card scroll-py-5 rounded-2xl p-5 shadow-sm">
      <div className="text-lg font-bold">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <span
              className="line-clamp-1 font-semibold break-all hover:underline"
              title={hashtag}
            >
              {hashtag}
            </span>
            <span className="text-muted-foreground text-sm">
              {formateNumber(count)} {count === 1 ? "post" : "posts"}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

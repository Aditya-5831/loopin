import db from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";
import PostEditor from "@/modules/posts/editor/PostEditor";
import Post from "@/modules/posts/Post";

const Home = async () => {
  const posts = await db.post.findMany({
    include: PostDataInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { postService } from "@/services/api";
import PostList from "@/components/PostList";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAllPosts().then(data => setPosts(data.posts || []));
  }, []);

  return <PostList posts={posts} />;
}

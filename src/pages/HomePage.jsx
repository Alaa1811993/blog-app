
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import axios from "axios";

const HomePage = () => {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/posts");
      setPosts(res.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Failed to delete post");
      console.error(error);
    }
  };

  const handleLike = async (id, currentLikes = 0) => {
    try {
      const res = await axios.patch(`http://localhost:8000/posts/${id}`, {
        likes: currentLikes + 1,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, likes: res.data.likes } : post
        )
      );
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Posts</h1>

        {user && (
          <button
            onClick={() => navigate("/post")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Post
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) =>
            post ? (
              <PostCard
                key={post.id}
                post={post}
                isOwner={user && post.userId === user.id}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;


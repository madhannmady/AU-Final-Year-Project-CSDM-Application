import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

function CommunityForum() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentUsername, setCommentUsername] = useState("");
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      const fetchedPosts = Array.isArray(data) ? data : data.posts;
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(), // Optional unless backend requires it
      username: username || "Anonymous",
      title: title || "Untitled",
      content,
      category: category || "General",
      comments: [],
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to post");

      alert(result.message || "Posted successfully!");
      setTitle("");
      setContent("");
      setUsername("");
      setCategory("");
      fetchPosts();
    } catch (err) {
      console.error("Post error:", err.message);
      alert("Error: " + err.message);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!commentUsername || !commentContent) {
      alert("Username and comment are required");
      return;
    }

    const payload = {
      username: commentUsername,
      comment: commentContent,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to comment");

      alert(result.message || "Comment added!");
      setShowCommentPopup(false);
      setCommentUsername("");
      setCommentContent("");
      fetchPosts();
    } catch (err) {
      console.error("Comment error:", err.message);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
        🌱 Community Forum
      </h1>

      {/* Post a New Message */}
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Post a Message
        </h2>
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          ></textarea>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Select Category</option>
            <option value="Relief">Relief</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
            <option value="General">General</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Post
          </button>
        </form>
      </div>

      {/* Display Posts */}
      <div className="max-w-3xl mx-auto space-y-6">
        {posts.map((post) => {
          const postId = post._id || post.id;

          return (
            <div
              key={postId}
              className="bg-gray-800 p-5 rounded-xl border-l-4 border-green-500"
            >
              <div className="mb-2 text-sm text-gray-400">
                Posted by{" "}
                <span className="text-green-400">{post.username}</span> on{" "}
                {new Date(
                  post.createdAt?.$date || post.createdAt
                ).toLocaleString()}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {post.title}
              </h3>
              <p className="text-gray-300 mb-2">{post.content}</p>
              <div className="text-sm text-green-300 mb-3">
                Category: {post.category}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-gray-300 mb-3">
                <span className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-1" />{" "}
                  {post.comments?.length || 0}
                </span>
              </div>

              {/* Comment Button */}
              <button
                onClick={() => {
                  setSelectedPostId(postId);
                  setShowCommentPopup(true);
                }}
                className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded"
              >
                Comment
              </button>

              {/* Comment List */}
              {post.comments?.length > 0 && (
                <div className="mt-4 border-t border-gray-700 pt-2 space-y-2">
                  {post.comments.map((c, i) => (
                    <div key={i} className="text-sm text-gray-300">
                      <strong className="text-green-400">
                        {c.username || "Anonymous"}
                      </strong>
                      : {c.comment}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Comment Popup */}
      {showCommentPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add a Comment
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit(selectedPostId);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={commentUsername}
                onChange={(e) => setCommentUsername(e.target.value)}
                placeholder="Your Username"
                className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400"
                required
              />
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Your Comment"
                className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 h-24"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCommentPopup(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityForum;

   import { Link } from "react-router-dom";

export default function PostCard({ post, isOwner, onDelete, onLike }) {
  if (!post) return null;

  const {
    id,
    image = "",
    title = "No title",
    description = "No description",
    author = "Anynmous",
    likes = 0,
  } = post;

  return (
    <div className="border p-4 rounded shadow bg-white">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover mb-2"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
          No Image
        </div>
      )}

      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">by {author}</span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onLike(id, likes)}
            className="text-blue-500 hover:underline"
          >
            ❤️ {likes}
          </button>

          {isOwner && (
            <>
              <Link
                to={`/post/${id}`}
                className="text-yellow-500 hover:underline"
              >
                ✏️
              </Link>
              <button
                onClick={() => onDelete(id)}
                className="text-red-500 hover:underline"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}




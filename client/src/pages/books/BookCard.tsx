import { useState } from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  name: string;
  publisher: string;
  publisherId: string;
  created_at: string;
  authorName: string;
  authorId: string;
  onUpdate?: (id: string, newName: string) => void;
}

const BookCard = ({ onUpdate, ...book }: BookCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(book.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(book.id, editedName);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(book.name);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col bg-zinc-800 p-6 h-[280px] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:bg-zinc-700 hover:shadow-xl max-w-[350px] w-full">
      {isEditing ? (
        <div className="mb-4">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full bg-zinc-700 text-purple-300 p-2 rounded"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-2 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white px-2 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-purple-300">
            📗 {book.name}
          </h2>
          <button
            onClick={handleEdit}
            className="text-zinc-400 hover:text-purple-300"
          >
            ✏️
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Link
          to={`/user/${book.authorId}`}
          className="text-sm text-zinc-300 hover:bg-zinc-600 p-2 rounded transition-colors duration-200"
        >
          <span className="font-semibold text-purple-400">Author:</span>{" "}
          {book.authorName}
        </Link>
        <Link
          to={`/publishers/${book.publisherId}`}
          className="text-sm text-zinc-300 hover:bg-zinc-600 p-2 rounded transition-colors duration-200"
        >
          <span className="font-semibold text-purple-400">Publisher:</span>{" "}
          {book.publisher}
        </Link>
      </div>
      {!isEditing && (
        <Link
          to={`/books/${book.id}`}
          className="mt-auto text-purple-400 hover:underline"
        >
          View Details
        </Link>
      )}
    </div>
  );
};

export default BookCard;

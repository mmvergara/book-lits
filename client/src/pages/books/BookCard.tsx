import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  name: string;
  publisher: string;
  publisherId: string;
  created_at: string;
  authorName: string;
  authorId: string;
}
const BookCard = (book: BookCardProps) => {
  return (
    <Link
      to={`/books/${book.id}`}
      key={book.id}
      className="flex flex-col bg-zinc-800 p-6 h-[280px] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:bg-zinc-700 hover:shadow-xl hover:scale-105 max-w-[350px] w-full"
    >
      <h2 className="text-2xl font-semibold text-purple-300 mb-4">
        📗 {book.name}
      </h2>
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
    </Link>
  );
};

export default BookCard;

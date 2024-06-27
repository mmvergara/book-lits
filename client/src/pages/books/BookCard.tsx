import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  name: string;
  publisher: string;
  created_at: string;
  authorName: string;
}
const BookCard = (book: BookCardProps) => {
  return (
    <Link
      to={`/books/${book.id}`}
      key={book.id}
      className="flex flex-col gap-2 bg-zinc-700 p-4 rounded-md max-w-[350px] w-full hover:bg-zinc-600"
    >
      <h2 className="text-xl">📗{book.name}</h2>
      <Link
        to={`/books/${book.id}`}
        className="text-xs z-10 hover:bg-zinc-500 p-1 px-2 rounded-sm"
      >
        <span className="font-semibold">Author:</span> {book.authorName}
      </Link>
      <Link
        to={`/publishers/${book.publisher}`}
        className="text-xs z-10 hover:bg-zinc-500 p-1 px-2 rounded-sm"
      >
        <span className="font-semibold">Publisher:</span> {book.publisher}
      </Link>
    </Link>
  );
};

export default BookCard;

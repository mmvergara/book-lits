import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  name: string;
  publisher: string;
  created_at: string;
  authorName: string;
}
const BookCard = ({
  id,
  name,
  publisher,
  created_at,
  authorName,
}: BookCardProps) => {
  return (
    <article className="card">
      <h2>{name}</h2>
      <span>{new Date(created_at).toLocaleString()}</span>
      <p>{publisher}</p>
      <p>{authorName}</p>

      <Link className="btn" to={`/books/${id}`}>
        View Details
      </Link>
    </article>
  );
};

export default BookCard;

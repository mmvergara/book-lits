import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import BookCard from "../BookCard";

const GET_BOOK = gql`
  query GetBook($bookid: ID!) {
    book(id: $bookid) {
      id
      name
      author {
        name
      }
      publisher {
        name
      }
    }
  }
`;

const BookPage = () => {
  const params = useParams();
  const { bookid } = params;

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookid },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="flex items-center justify-center">
      <BookCard
        id={data.book.id}
        name={data.book.name}
        authorName={data.book.author.name}
        publisher={data.book.publisher.name}
        created_at={data.book.created_at}
      />
    </section>
  );
};

export default BookPage;

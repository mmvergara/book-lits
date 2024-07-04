import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import BookCard from "../BookCard";
import { gql } from "../../../__generated__";
import { GetBookQuery } from "../../../__generated__/graphql";
import { useEffect, useState } from "react";

const GET_BOOK = gql(`
  query GetBook($bookid: UUID!) {
    book(id: $bookid) {
      id
      name
      createdAt
      author {
        id
        name
      }
      publisher {
        id
        name
      }
    }
  }
`);

const BookPage = () => {
  const params = useParams();
  const { bookid } = params;
  const [book, setBook] = useState<GetBookQuery["book"]>(undefined);

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookid },
  });

  useEffect(() => {
    setBook(data?.book);
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="flex items-center justify-center">
      {book && <BookCard book={book} />}
    </section>
  );
};

export default BookPage;

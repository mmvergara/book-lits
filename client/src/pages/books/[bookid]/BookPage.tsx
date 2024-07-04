import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
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
      {book && (
        <div className="max-w-2xl mx-auto p-6 bg-zinc-800 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-200 text-center">
            {book.name}
          </h1>
          <p className="text-sm text-gray-400 mb-2">ID: {book.id}</p>
          <p className="text-sm text-gray-400 mb-4">
            Created At: {new Date(book.createdAt).toLocaleString()}
          </p>

          <Link to={`/user/${book.author.id}`}>
            <div className="hover:bg-zinc-600 mb-4 p-2 rounded-md">
              <h2 className="text-xl font-semibold text-gray-200">Author</h2>
              <p className="text-gray-400">Name: {book.author.name}</p>
              <p className="text-sm text-gray-400 mb-4">ID: {book.author.id}</p>
            </div>
          </Link>

          <Link to={`/publishers/${book.publisher.id}`}>
            <div className="hover:bg-zinc-600 mb-4 p-2 rounded-md">
              <h2 className="text-xl font-semibold text-gray-200">Publisher</h2>
              <p className="text-gray-400">Name: {book.publisher.name}</p>
              <p className="text-sm text-gray-400 ">ID: {book.publisher.id}</p>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
};

export default BookPage;

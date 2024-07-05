import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Throbber from "../../../components/Throbber";
import { gql } from "../../../__generated__";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { limitWord } from "../../../utils/limitWord";

const GET_PUBLISHER = gql(`
  query GetPublisher($publisherid: UUID!) {
    publisher(id: $publisherid) {
      id
      name
      createdAt
      books {
        id
        name
        author {
          name
        }
      }
    }
  }
`);

const PublisherPage = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_PUBLISHER, {
    variables: { publisherid: params.publisherid },
  });
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  if (loading) {
    return <Throbber />;
  }

  if (!data?.publisher) {
    return <></>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-zinc-900 rounded-lg shadow-lg text-gray-100">
      <header className="mb-8 border-b border-zinc-700 pb-4">
        <h1 className="text-4xl font-bold text-purple-400">
          {data.publisher.name}
        </h1>
        <p className="text-xl text-gray-400 mt-2">
          Publishing since:{" "}
          {new Date(data.publisher.createdAt).toLocaleDateString()}
        </p>
      </header>

      <h2 className="text-3xl font-semibold mb-6 text-gray-200">Our Books</h2>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.publisher.books.map((book: any) => (
          <Link
            to={`/books/${book.id}`}
            key={book.id}
            className="flex flex-col bg-zinc-800 p-6 rounded-md shadow-md transition-all duration-300 hover:bg-zinc-700 hover:shadow-xl hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📘</span>
              <h3 className="text-xl font-semibold text-purple-300">
                {limitWord(book.name, 10)}
              </h3>
            </div>
            <p className="text-gray-400">by: {book.author.name}</p>
          </Link>
        ))}
      </section>

      {data.publisher.books.length === 0 && (
        <p className="text-gray-500 text-center italic">
          No books available at the moment.
        </p>
      )}
    </div>
  );
};

export default PublisherPage;

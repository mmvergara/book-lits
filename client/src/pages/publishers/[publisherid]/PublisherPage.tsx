import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const GET_PUBLISHER = gql`
  query GetPublisher($publisherid: ID!) {
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
`;

const PublisherPage = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_PUBLISHER, {
    variables: { publisherid: params.publisherid },
  });
  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-zinc-9800 rounded-lg shadow-lg text-gray-100">
        <div className="loading-container flex justify-center items-center h-full">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-purple-400"
            role="status"
          >
            <span className="sr-only">Loading Publisher Details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-zinc-9800 rounded-lg shadow-lg text-gray-100">
        <div className="error-container flex items-center justify-center h-full bg-zinc-700 bg-opacity-10 rounded-lg">
          <div className="flex items-center mr-4">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v-3m0 16V5m0 8v8"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-100">{error.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-8 max-w-4xl mx-auto bg-zinc-9800 rounded-lg shadow-lg text-gray-100">
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
                {book.name}
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

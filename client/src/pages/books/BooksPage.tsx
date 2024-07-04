import { useQuery } from "@apollo/client";
import CreateBook from "./CreateBook";
import BookCard from "./BookCard";
import { gql } from "../../__generated__";

const GET_BOOKS = gql(`
  query GetBooks {
    books {
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
const BooksPage = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  return (
    <main className="flex justify-center items-center flex-col">
      <h1 className="text-3xl text-white mb-4">Books Page</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64 w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 rounded-md shadow-md max-w-[350px] w-full mx-auto mt-4">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-red-300 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold">Error:</span>
          </div>
          <p className="mt-2">{error.message}</p>
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center p-8 items-center mt-4">
          <CreateBook />
          {data?.books.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      )}
    </main>
  );
};

export default BooksPage;

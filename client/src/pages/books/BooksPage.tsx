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
      {loading && (
        <div className="flex justify-center items-center h-64 w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
      {!loading && data && (
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

import { gql, useQuery } from "@apollo/client";
import CreateBook from "./CreateBook";
import BookCard from "./BookCard";

type GetBooksQuery = {
  books: {
    id: string;
    name: string;
    author: {
      id: string;
      name: string;
    };
    publisher: {
      id: string;
      name: string;
    };
  }[];
};

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
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
`;
const BooksPage = () => {
  const { loading, error, data } = useQuery<GetBooksQuery>(GET_BOOKS);

  return (
    <main className="flex justify-center items-center flex-col">
      <h1 className="text-3xl text-white mb-4">Books Page</h1>
      <CreateBook />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <>Error : {error.message}</>
      ) : (
        <div className="flex flex-col gap-4 w-full items-center mt-4">
          {data?.books.map((book: any) => (
            <BookCard
              key={book.id}
              id={book.id}
              name={book.name}
              authorName={book.author.name}
              publisher={book.publisher.name}
              created_at={book.created_at}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default BooksPage;

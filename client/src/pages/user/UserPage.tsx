import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Throbber from "../../components/Throbber";
import { gql } from "../../__generated__";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { limitWord } from "../../utils/limitWord";

const GET_USER = gql(`
  query GetUser($userid: UUID!) {
    user(id: $userid) {
      id
      name
      publishers {
        id
        name
      }
      books {
        id
        name
      }
    }
  }
`);

const UserPage = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userid: params.userid },
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  if (loading) {
    return <Throbber />;
  }

  if (!data?.user) {
    return <></>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-zinc-900 rounded-lg shadow-lg text-gray-100">
      <header className="mb-8 border-b border-zinc-700 pb-4">
        <h1 className="text-4xl font-bold text-purple-400">{data.user.name}</h1>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-200">
          Owned Publishers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.user.publishers.map((publisher) => (
            <Link
              to={`/publishers/${publisher.id}`}
              key={publisher.id}
              className="flex items-center bg-zinc-800 p-6 rounded-md shadow-md transition-all duration-300 hover:bg-zinc-700 hover:shadow-xl hover:scale-105"
            >
              <span className="text-3xl mr-3">🏢</span>
              <h3 className="text-xl font-semibold text-purple-300">
                {limitWord(publisher.name, 10)}
              </h3>
            </Link>
          ))}
        </div>
        {data.user.publishers.length === 0 && (
          <p className="text-gray-500 text-center italic">
            No publishers associated with this user.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-gray-200">Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.user.books.map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className="flex items-center bg-zinc-800 p-6 rounded-md shadow-md transition-all duration-300 hover:bg-zinc-700 hover:shadow-xl hover:scale-105"
            >
              <span className="text-3xl mr-3">📘</span>
              <h3 className="text-xl font-semibold text-purple-300">
                {limitWord(book.name, 10)}
              </h3>
            </Link>
          ))}
        </div>
        {data.user.books.length === 0 && (
          <p className="text-gray-500 text-center italic">
            No books associated with this user.
          </p>
        )}
      </section>
    </div>
  );
};

export default UserPage;

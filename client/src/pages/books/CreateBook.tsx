import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useUser } from "../../context/AuthContext";

const CREATE_BOOK = gql`
  mutation CreateBook($name: String!, $authorId: ID!, $publisherId: ID!) {
    createBook(
      data: { name: $name, authorId: $authorId, publisherId: $publisherId }
    ) {
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

const PUBLISHERS = gql`
  query GetListOfPublishers {
    publishers {
      id
      name
      owner {
        id
        name
      }
    }
  }
`;

const CreateBook = () => {
  const { user } = useUser();
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [bookName, setBookName] = useState("");
  const { loading, error, data } = useQuery(PUBLISHERS);
  const [createBook] = useMutation(CREATE_BOOK);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log({
        variables: {
          name: bookName,
          publisherId: selectedPublisher,
          authorId: user?.userid,
        },
      });
      await createBook({
        variables: {
          name: bookName,
          publisherId: selectedPublisher,
          authorId: user?.userid,
        },
      });
      console.log("Book created!");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <>Error : {error.message}</>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-zinc-800 p-6 rounded-lg shadow-md max-w-[350px] w-full"
    >
      <input
        type="text"
        className="bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />
      <select
        className="bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        value={selectedPublisher}
        onChange={(e) => setSelectedPublisher(e.target.value)}
      >
        <option value="" disabled>
          Select a publisher
        </option>
        {data.publishers.map((publisher: any) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-purple-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300"
      >
        Create Book
      </button>
    </form>
  );
};

export default CreateBook;

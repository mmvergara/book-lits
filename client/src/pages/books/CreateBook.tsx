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
  query GetPublishers {
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
      className="flex flex-col gap-2 bg-zinc-700 p-4 rounded-sm max-w-[350px] w-full"
    >
      <input
        type="text"
        className="input"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedPublisher}
        onChange={(e) => setSelectedPublisher(e.target.value)}
      >
        {data.publishers.map((publisher: any) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        ))}{" "}
        {data.publishers.map((publisher: any) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn">
        Create Book
      </button>
    </form>
  );
};

export default CreateBook;

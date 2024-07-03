import { useState } from "react";
import { useUser } from "../../context/AuthContext";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__";

const CREATE_PUBLISHER = gql(`
  mutation CreatePublisher($data: CreatePublisherInput!) {
    createPublisher(data: $data) {
      id
      name
    }
  }
`);
const CreatePublisher = () => {
  const { user } = useUser();
  const [publisher, setPublisher] = useState("");
  const [createPublisher, { loading, data }] = useMutation(CREATE_PUBLISHER);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!publisher) return console.error("Publisher name is required");
    if (!user?.userid) return console.error("User ID is required");
    try {
      await createPublisher({
        variables: {
          data: {
            name: publisher,
            ownerId: user?.userid,
          },
        },
      });
      setPublisher("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-zinc-800 p-6 rounded-lg shadow-md transition-all duration-300  hover:shadow-xl max-w-[350px] w-full mb-4"
    >
      <input
        type="text"
        className="w-full bg-zinc-700 text-purple-300 p-2 rounded"
        placeholder="New publisher name"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      />

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded mt-2 transition-colors duration-200 hover:bg-purple-500"
      >
        {loading ? "Loading..." : "Create Publisher"}
      </button>
      <p className="text-zinc-300 mt-2">
        {data && <>Publisher created: {data.createPublisher.name}</>}
      </p>
    </form>
  );
};

export default CreatePublisher;

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
      className="flex flex-col gap-2 card bg-zinc-700 p-4"
    >
      <input
        type="text"
        className="input"
        placeholder="new publisher name"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      />

      <button type="submit" className="btn">
        {loading ? "Loading..." : "Create Publisher"}
      </button>
      <p>{data && String(data)}</p>
    </form>
  );
};

export default CreatePublisher;

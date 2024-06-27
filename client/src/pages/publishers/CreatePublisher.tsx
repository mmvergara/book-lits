import { useState } from "react";
import { useUser } from "../../context/AuthContext";
import { gql, useMutation } from "@apollo/client";

const CREATE_PUBLISHER = gql`
  mutation Mutation($name: String!, $ownerId: ID!) {
    createPublisher(name: $name, owner_id: $ownerId) {
      id
      name
    }
  }
`;
const CreatePublisher = () => {
  const { user } = useUser();
  const [publisher, setPublisher] = useState("");
  const [createPublisher, { loading, data, error }] =
    useMutation(CREATE_PUBLISHER);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createPublisher({
        variables: {
          name: publisher,
          ownerId: user?.userid,
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

import { gql, useQuery } from "@apollo/client";
import CreatePublisher from "./CreatePublisher";
import { Link } from "react-router-dom";

const query = gql`
  query GetPublisher {
    publishers {
      id
      name
      createdAt
    }
  }
`;

const PublishersPage = () => {
  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <main className="flex justify-center items-center flex-col">
      <h1>Publishers Page</h1>
      <CreatePublisher />
      {data?.publishers.map((publisher: any) => (
        <Link
          to={`/publishers/${publisher.id}`}
          key={publisher.id}
          className="bg-zinc-700 p-4 rounded-md max-w-[350px] w-full hover:bg-zinc-600"
        >
          <h2 className="text-xl">📗{publisher.name}</h2>
          <p className="text-xs z-10  p-1 px-2 rounded-sm">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(publisher.createdAt).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </main>
  );
};

export default PublishersPage;

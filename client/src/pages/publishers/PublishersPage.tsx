import { useQuery } from "@apollo/client";
import CreatePublisher from "./CreatePublisher";
import { Link } from "react-router-dom";
import { gql } from "../../__generated__";
import Throbber from "../../components/Throbber";
import { useEffect } from "react";
import { toast } from "react-toastify";

const query = gql(`
  query GetPublishers {
    publishers {
      id
      name
      createdAt
    }
  }
`);

const PublishersPage = () => {
  const { loading, error, data } = useQuery(query);
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);
  if (loading) return <Throbber />;
  if (!data?.publishers) return <></>;
  return (
    <main className="flex justify-center items-center flex-col">
      <h1 className="text-3xl mb-2">Publishers Page</h1>
      <CreatePublisher />
      <section className="flex flex-wrap justify-center items-center gap-4 w-full">
        {data.publishers.map((publisher: any) => (
          <Link
            to={`/publishers/${publisher.id}`}
            key={publisher.id}
            className="flex flex-col bg-zinc-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:bg-zinc-700 hover:shadow-xl max-w-[350px] w-full"
          >
            <h2 className="text-xl font-semibold text-purple-300">
              📗 {publisher.name}
            </h2>
            <p className="text-sm text-zinc-300 mt-2">
              <span className="font-semibold text-purple-400">Created At:</span>{" "}
              {new Date(publisher.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default PublishersPage;

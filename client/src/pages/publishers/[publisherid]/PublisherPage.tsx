import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import BookCard from "../../books/BookCard";

const GET_PUBLISHER = gql`
  query GetPublisher($publisherid: ID!) {
    publisher(id: $publisherid) {
      id
      name
      createdAt
      books {
        id
        name
        author {
          name
        }
      }
    }
  }
`;

const PublisherPage = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_PUBLISHER, {
    variables: { publisherid: params.publisherid },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <article className="p-10 bg-zinc-600">
      <h1>{data.publisher.name}</h1>
      <p>
        Publishing since:{" "}
        {new Date(data.publisher.createdAt).toLocaleDateString()}
      </p>
      <h2 className="mt-4 text-3xl">Books</h2>
      {data.publisher.books.map((book: any) => (
        <BookCard
          key={book.id}
          id={book.id}
          name={book.name}
          authorName={book.author.name}
          publisher={data.publisher.name}
          created_at={data.publisher.createdAt}
        />
      ))}
    </article>
  );
};

export default PublisherPage;

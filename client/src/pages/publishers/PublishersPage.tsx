import { Link } from "react-router-dom";
import CreatePublisher from "./CreatePublisher";

const PublishersPage = () => {
  return (
    <main className="flex justify-center items-center flex-col">
      <Link className="btn mb-2" to="/books">
        Books
      </Link>
      <h1>Publishers Page</h1>
      <CreatePublisher />
    </main>
  );
};

export default PublishersPage;

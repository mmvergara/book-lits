import { Link } from "react-router-dom";

const BooksPage = () => {
  return (
    <main className="flex justify-center items-center flex-col">
      <Link className="btn mb-2" to="/publishers">
        Publishers
      </Link>
      <h1>Books Page</h1>
    </main>
  );
};

export default BooksPage;

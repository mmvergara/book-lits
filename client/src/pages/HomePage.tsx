import { Link } from "react-router-dom";
import { useUser } from "../context/AuthContext";

const HomePage = () => {
  const { user, signOut } = useUser();
  return (
    <main className="flex justify-center items-center h-[80vh]">
      <section className="flex items-center justify-center flex-col gap-2 bg-zinc-800 max-w-[700px] w-full p-10">
        <h1 className="header-text text-3xl">Book Lits 📚</h1>
        <p>Good Day! {user?.username || "None"}</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link className="btn" to={`/user${user?.userid}`}>
            View Profile
          </Link>
          <Link className="btn" to="/books">
            View Books
          </Link>
          <Link className="btn" to="/publishers">
            View Publishers
          </Link>
        </div>
        {user ? (
          <button
            className="btn"
            onClick={() => {
              if (signOut) signOut();
            }}
          >
            Sign Out
          </button>
        ) : (
          <Link className="btn" to="/auth/sign-in">
            Sign In
          </Link>
        )}
      </section>
    </main>
  );
};

export default HomePage;

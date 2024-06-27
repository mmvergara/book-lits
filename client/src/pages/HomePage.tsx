import { Link } from "react-router-dom";
import { useUser } from "../context/AuthContext";

const HomePage = () => {
  const { user, signOut } = useUser();
  return (
    <main className="flex justify-center items-center h-[80vh]">
      <section className="flex items-center justify-center flex-col gap-2 bg-zinc-800 max-w-[400px] w-full p-10">
        <h1 className="header-text text-3xl">Booklits</h1>
        <p>Current User : {user?.username || "None"}</p>
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
        <Link className="btn" to="/protected">
          Protected Page 🛡️
        </Link>
      </section>
    </main>
  );
};

export default HomePage;

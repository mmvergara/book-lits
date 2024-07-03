import { Link } from "react-router-dom";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Book Lits 📚
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/publishers">Publishers</Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </>
  );
};

export default Navbar;

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";

const SignInPage = () => {
  // ==============================
  // If user is already logged in, redirect to home
  // This logic is being repeated in SignIn and SignUp..
  const navigate = useNavigate();
  const { user, signIn } = useUser();
  if (user) return <Navigate to="/" />;
  // maybe we can create a wrapper component for these pages
  // just like the ./router/AuthProtectedRoute.tsx? up to you.
  // ==============================
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (signIn) {
        await signIn(formValues.username, formValues.password);
        navigate("/books");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex justify-center items-center flex-col h-[80vh]">
      <Link className="btn mb-2" to="/">
        ◄ Home
      </Link>
      <form
        className="card flex items-center justify-center flex-col gap-2 bg-black p-12"
        onSubmit={handleSubmit}
      >
        <h1 className="header-text">Sign In</h1>
        <input
          name="username"
          onChange={handleInputChange}
          placeholder="username"
          className="input"
        />
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
          className="input"
        />
        <button type="submit" className="btn">
          Login
        </button>
        <Link className="btn" to="/auth/sign-up">
          Don't have an account? Sign Up
        </Link>
      </form>
    </main>
  );
};

export default SignInPage;

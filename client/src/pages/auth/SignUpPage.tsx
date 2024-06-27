import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";

const SignUpPage = () => {
  const navigate = useNavigate();
  // ==============================
  // If user is already logged in, redirect to home
  // // This logic is being repeated in SignIn and SignUp..
  const { user, signUp } = useUser();
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
      if (signUp) {
        await signUp(formValues.username, formValues.password);
        navigate("/auth/sign-in");
      }
    } catch (e) {
      console.error(e);
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
        <h1 className="header-text">Sign Up</h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#777",
          }}
        >
          Demo app, please don't use your real username or password
        </p>
        <input
          name="username"
          onChange={handleInputChange}
          type="username"
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
        <button className="btn" type="submit">
          Create Account
        </button>
        <Link className="btn" to="/auth/sign-in">
          Already have an account? Sign In
        </Link>
      </form>
    </main>
  );
};

export default SignUpPage;

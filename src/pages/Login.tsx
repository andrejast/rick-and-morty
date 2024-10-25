import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { RickMorty } from "../components/rick-and-morty/RickMorty";
import { useAuth } from "../context/AuthContext";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/characters");
    } catch (err) {
      const errorMessage =
        (err as FirebaseError).code === "auth/wrong-password"
          ? "Incorrect password."
          : (err as FirebaseError).code === "auth/user-not-found"
          ? "User not found."
          : "Failed to log in. Please check your credentials.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center gap-8 min-h-svh">
      <div className="flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-96">
          <h2 className="mt-6 text-center text-5xl text-secondary ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-600 text-sm mb-4">{error}</div>
              )}

              <label className="input input-bordered  flex items-center gap-2 focus-within:border-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-secondary"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  autoFocus
                />
              </label>

              <label className="input input-bordered  flex items-center gap-2 focus-within:border-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-secondary"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="*****"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                />
              </label>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 text-base-100 rounded-md shadow-sm text-sm font-medium btn bg-primary transition-all  hover:border-2 hover:border-secondary hover:bg-transparent hover:text-secondary border-secondary border-2"
                >
                  Log in
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link to="/signup" className="text-secondary">
                Don't have an account? Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <RickMorty />
    </div>
  );
}

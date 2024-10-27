import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { RickMorty } from "../components/rick-and-morty/RickMorty";
import { Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
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
        (err as FirebaseError).code === "auth/email-already-in-use"
          ? "Email already in use."
          : "Failed to sign up. Please check your information.";
      setError(errorMessage);
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative flex justify-center items-center gap-8 min-h-svh transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <Link to="/" className="block lg:!hidden">
            <Home size={30} />
          </Link>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-96">
          <h1 className="relative mt-6 text-center text-5xl text-secondary pb-16">
            <span className="absolute inset-0 blur-sm text-shadow text-[#00b0c8] -z-10">
              Create your account
            </span>
            <span className="text-5xl text-secondary absolute top-0 left-0">
              Create your account
            </span>
          </h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 sm:rounded-lg sm:px-10">
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
                  placeholder="******"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                />
              </label>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 rounded-md  text-sm font-medium btn bg-primary/70 transition-all  hover:border-2 hover:border-primary hover:bg-transparent hover:text-secondary border-secondary border-2 glowing-border text-white"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-secondary line-hover transition-all"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" className="hidden lg:!block">
        <RickMorty />
      </Link>
    </div>
  );
}

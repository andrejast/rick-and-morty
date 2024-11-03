import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Search, LogOut, Users } from "lucide-react";
import _ from "lodash";

interface HeaderProps {
  search?: string;
  setSearch?: (value: string) => void;
  className?: string;
}

export const Header = ({ search, setSearch, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(search || "");

  // Memoized debounced function
  const debouncedSetSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        if (setSearch) {
          setSearch(value);
        }
      }, 400),
    [setSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update the input value immediately
    debouncedSetSearch(newValue); // Use the debounced search value
  };

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-[#1a1a1a] bg-opacity-90 text-white p-4 flex justify-between items-center transition-all duration-200 z-50 px-6 ${
        isScrolled ? "backdrop-blur shadow-lg" : ""
      } ${className}`}
    >
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/images/rm.png"
          alt="Rick & Morty Logo"
          className="w-60 h-auto"
        />
      </Link>
      {(inputValue || inputValue === "") && (
        <div className="relative flex-grow max-w-md mx-4">
          <input
            type="text"
            value={inputValue} // Bind the input to the immediate state
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full p-2 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            autoFocus
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      )}
      <nav className="flex items-center gap-4">
        <Link
          to="/characters"
          className="flex items-center gap-1 text-gray-400 hover:text-secondary transition-colors"
        >
          <Users size={18} className="" />
          <span className="hidden sm:!inline ">Characters</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-gray-400 hover:text-secondary focus:outline-none transition-colors"
        >
          <LogOut size={18} className="" />
          <span className="hidden sm:!inline ">Logout</span>
        </button>
      </nav>
    </header>
  );
};

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  search?: string;
  setSearch?: (value: string) => void; // Ispravljeno
}

const Header = ({ search = "", setSearch }: HeaderProps) => { // Default vrednost za search
  const [isBlurred, setIsBlurred] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearch) {
      setSearch(e.target.value); // Proverava se da li setSearch postoji
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsBlurred(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-[#1a1a1a] text-white p-4 flex justify-between items-center transition-all duration-300 z-50 ${isBlurred ? "backdrop-blur-md" : ""}`}
    >
      <a href="/" className="flex items-center">
        <h1 className="text-2xl font-bold text-green-400">Rick & Morty</h1>
      </a>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search characters..."
        className="p-2 border border-gray-300 rounded mb-4"
        autoFocus
      />
      <nav className="flex gap-4">
        <a href="/characters" className="hover:text-green-300">
          Characters
        </a>
        <button
          onClick={handleLogout}
          className="hover:text-green-300 focus:outline-none"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;

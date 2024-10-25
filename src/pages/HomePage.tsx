import { Link } from "react-router-dom";

export default function HomePage() {
    return (
      <div className="relative w-screen h-screen">
        {/* Background image */}
        <img src="images/home.jpg" alt="" className="h-screen w-screen object-cover" />
        
        {/* Centered button */}
        <Link to='/characters' className="absolute top-[60%] left-1/3  btn btn-primary glowing-border rounded-md text-xl px-10 text-primary-content">
          Enter TV
        </Link>
      </div>
    );
  }
  
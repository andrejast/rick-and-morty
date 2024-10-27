import { Link } from "react-router-dom";
import Pulse from "../components/Pulse";
import { useEffect, useState } from "react";
import { LucideTvMinimalPlay } from "lucide-react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div
        className={`relative w-screen h-screen overflow-hidden transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="images/home.jpg"
          alt=""
          className="h-screen w-screen object-cover hidden xl:!block"
        />
        <img
          src="images/places.jpg"
          alt=""
          className="h-screen w-screen object-fill xl:!hidden !block"
        />

        <Pulse
          className="absolute top-1/2 xl:top-[68%] left-[31%] "
          pulseDuration={2}
        >
          <Link
            to="/characters"
            className="  btn btn-primary glowing-border rounded-md text-3xl font-thin px-10 text-white scale-125 hover:text-primary-content transition-all"
          >
            <h1 className="flex items-center gap-2">
              <span>Enter</span>
              <span>
                <LucideTvMinimalPlay className="mt-1.5" />
              </span>
            </h1>
          </Link>
        </Pulse>
      </div>
    </>
  );
}

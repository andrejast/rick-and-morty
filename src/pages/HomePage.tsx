import { Link } from "react-router-dom";
import Pulse from "../components/Pulse";
import { useEffect, useState } from "react";
// import Pulse from "../components/Pulse";

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
    <div className={`relative w-screen h-screen overflow-hidden transition-opacity duration-700 ${
      isVisible
        ? "opacity-100"
        : "opacity-0"
    }`}>
      {/* Background image */}
      {/* <Pulse> */}

      <img
        src="images/home.jpg"
        alt=""
        className="h-screen w-screen object-cover"
      />
      {/* </Pulse> */}

      {/* Centered button */}
      <Pulse className="absolute top-[65%] left-1/3" pulseDuration={2}>
        <Link
          to="/characters"
          className="  btn btn-primary glowing-border rounded-md text-xl px-10 text-primary-content scale-125 hover:text-white transition-all"
        >
          Enter TV
        </Link>
      </Pulse>
    </div>
    
    </>
    //     <div className="relative w-screen h-screen overflow-hidden bg-[#1a1a1a]">
    //       {/* Background image */}
    //       <Link to='/characters'>
    
    //       <Pulse>
    //         <img
    //           src="images/rm_c.png"
    //           alt=""
    //           className="h-screen w-auto mx-auto scale-125"
    //         />
    //       </Pulse>
    //       </Link>
    
    //       {/* Centered button */}
    //       {/* <Link
    //         to="/characters"
    //         className="absolute top-10 left-10  btn btn-primary glowing-border rounded-md text-xl px-10 text-primary-content"
    //       >
    //         Enter TV
    //       </Link> */}
    //     </div>
  );
}

//   import { Link } from "react-router-dom";
// import Pulse from "../components/Pulse";

// export default function HomePage() {
  //   return (
    //   );
    // }

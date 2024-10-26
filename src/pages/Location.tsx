import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLocation } from "../hooks/useLocation";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { Loader } from "../components/Loader";

const Location = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useLocation(id);

  useEffect(() => {
    if (isError) {
      toast("Error fetching characters");
    }
  }, [isError]);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-svh bg-[#000000]">
        <Header className="!bg-[#000000]" />
        <p className="text-error">Error fetching characters</p>
        <ToastContainer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-svh bg-[#000000]">
        <Header className="!bg-[#000000]" />
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Type: {data.type}</p>
      <p>Dimension: {data.dimension}</p>

      <h3>Residents</h3>
      <ul>
        {data.residents.map((residentUrl: string) => {
          const residentId = residentUrl.split("/").pop();
          return (
            <li key={residentId}>
              <Link to={`/characters/${residentId}`}>
                Character {residentId}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Location;

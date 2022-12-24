import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Attribution from "../Components/Dashboard/Attribution";
import { FaHandPointRight, FaHome } from "react-icons/fa";
import { useAppSelector } from "../App/hooks";

function Homepage() {
  const currentUser = useAppSelector((state) => state.authentication.user);
  console.log(currentUser);
  const navigate = useNavigate();
  return (
    <div className="homepage h-full flex flex-col items-center justify-center">
      <section className="text flex flex-col gap-5 items-center justify-between mb-12">
        <h2 className="text-7xl font-bold text-stone-200">Dooit</h2>
        <p className="text-lg font-semibold text-stone-400">
          Track your work - Stay organized
        </p>
      </section>
      <div className="btn-cont w-full mx-auto my-0 flex flex-col gap-2 items-center justify-center">
        {currentUser === null ? (
          <>
            <button className="big-button" onClick={() => navigate("/signin")}>
              Get Started
              <FaHandPointRight size={"1.3rem"} />
            </button>
          </>
        ) : (
          <button className="big-button" onClick={() => navigate("/dashboard")}>
            Go to dashboard
            <FaHome size={"1.3rem"} />
          </button>
        )}
      </div>
      <Attribution />
    </div>
  );
}

export default Homepage;

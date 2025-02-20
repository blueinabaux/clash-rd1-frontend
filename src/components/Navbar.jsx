// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "pixel-retroui";

const Navbar = () => {
  const navigate = useNavigate();

  const toPage = (url) => {
    navigate(url);
  };
  return (
    <nav className="navbar fixed top-0 h-[100px] w-full bg--600 flex justify-between items-center px-[2vw] text-[#FFF546]  ">
      <Link
        to="/"
        className="nav-logo  text-[30px] px-[0vw] font-bold"
      >
        CLASH
      </Link>
      <div className="nav-links h-full w-[32%] bg--600 flex justify-evenly items-center text-[20px] ">
        <Link to="/leaderboard" className="nav-link">
          LEADERBOARD
        </Link>
        <Link to="/about" className="nav-link">
          ABOUT
        </Link>
        <Button
          bg="#DE5027"
          textColor="#FFF546"
          borderColor="#310202"
          shadowColor="#310202"
         onClick={() => toPage("/login") }

        className="h-[30px] text-[16px] px-[18px] py-[12px] flex justify-center items-center"
        >
          LOGIN
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

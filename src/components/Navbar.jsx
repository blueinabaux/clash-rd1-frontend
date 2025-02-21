// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "pixel-retroui";
import { notAuthUser } from "../redux/slices/authSlice";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuth);


  const logout = async () => {
    const token = Cookies.get("token"); // Retrieve token from cookies

    try {
      const res = await axios.get(
        // `${import.meta.env.VITE_BASE_URL}/auth/logout`,
        "https://clashroundonebackend.api.credenz.co.in/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
          withCredentials: true,
        }
      );

      alert(res.data.message);

      dispatch(notAuthUser());
      navigate("/");

      // toast.success("Logout successful!", { position: "top-right", autoClose: 2000 });
    } catch (error) {
      // console.log("ERROR");
      // toast.error("Logout failed! Try again.", { position: "top-right", autoClose: 3000 });
    }
  };

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
      <div className="nav-links h-full w-[50vw] bg--600 flex justify-evenly items-center text-[20px] ">
      {isAuthenticated ? (
            <>
              <Link to="/instructions">Instructions</Link>
              <Link to="/questions">Questions</Link>
              <Link to="/leaderboard">Leaderboard</Link>
              <Button
                bg="#c94a26"
                textColor="black"
                borderColor="#4A1237"
                shadow="#4A1237"
                className="px-[20px] py-[2px] text-[16px] font-bold "
                onClick={logout}
              >
                <h1 className="text-[#e1d600]">LOGOUT</h1>
              </Button>
            </>
          ) : null}
      </div>
    </nav>
  );
};

export default Navbar;

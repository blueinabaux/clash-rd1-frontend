// import { authUser, notAuthUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import { Card } from "pixel-retroui";
import { Button } from "pixel-retroui";
import ClashPixelBG from "../assets/ClashPixelBG.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { authUser, notAuthUser } from "../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // For Fullscreen
  const [errorMessage, setErrorMessage] = useState("");
  const [exitAttempts, setExitAttempts] = useState(0);

  axios.defaults.withCredentials=true;
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setLogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {

    e.preventDefault();
    const {email,password}=logData;
    // console.log(logData);

  const loadingToast = toast.loading("Logging in...");
    try {
      const res = await axios.post(
        // "https://clashroundonebackend.api.credenz.co.in/login",
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          email: logData.email,
          password:logData.password
        },
       {
          // credentials: 'include',
          withCredentials:true
        } 
      );


      if (res.status === 404) {
        throw new Error("User not found");
      } else if (res.status === 400) {
        throw new Error("Invalid credentials");
      }
  
      // Update the loading toast to success
      toast.update(loadingToast, {
        render: "Login Successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    //   console.log("login Success!!!",res.data);
      dispatch(authUser());
      // goFullScreen();
      navigate("/instructions");
    } catch (err) {
      setErrorMessage("Invalid Username or Password");
      console.error("Invalid Username or Password");
      
    toast.update(loadingToast, {
        render: "Invalid username or password!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      dispatch(notAuthUser());

    }
  };
  const showToastMessage = () => {
    toast.warning("Invalid password!", {
    position: "top-center",
    });

    
  };


  const goFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  // Detect Fullscreen Exit
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setExitAttempts((prev) => prev + 1);
      toast.warning("Please stay in fullscreen mode!");

      if (exitAttempts + 1 >= 3) {
        toast.error("Too many exit attempts! Logging out...");
        dispatch(notAuthUser());
        navigate("/");
      } else {
        goFullScreen(); // Re-enter fullscreen mode
      }
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [exitAttempts]);

  
  return (
    <>
    <div
      className="home-container h-screen w-screen bg-contain bg-center flex flex-col
      items-center justify-center  
      font-['Pixelify_Sans',serif] font-bold"
      style={{ backgroundImage: `url(${ClashPixelBG})` }}
    >
      <Card
        bg="#FF7B00"
        className="flex justify-center items-center max-lg:w-[380px] w-[450px] h-[510px]  p-10 rounded-lg text-center 
            "
        style={{ backgroundColor: "rgba(255, 123, 0, 0.5)" }}
      >
        <div className="login text-center">
          <svg
            viewBox="0 0 200 50"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <text
              x="50%"
              y="90%"
              dominantBaseline="baseline"
              textAnchor="middle"
              fill="#FFF546"
              stroke="#4A1237"
              strokeWidth="5"
              paintOrder="stroke fill"
              className="font-bold lg:text-[3vw] max-lg:text-[5vh] 
    drop-shadow-[0px_0px_0px_#101e34] font-['Pixelify_Sans',serif] 
    "
            >
              LOGIN
            </text>
          </svg>

          <br />
          <form
            onSubmit={handleLogin}
            className="flex flex-col bg--600 items-center pt-8 font-['Pixelify_Sans',serif] font-bold  "
            
          >
            <div className="form-inputs mb-[30px] bg--600 h-[30vh] flex flex-col justify-center items-center ">
              <div className="form-group mb-2 text-left bg--500">
                <label htmlFor="email" className="block mb-1">
                  <svg
                    viewBox="0 40 500 100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full "
                  >
                    <text
                      x="22%"
                      y="90%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fill="#FFF546"
                      stroke="#101e34"
                      strokeWidth="6"
                      paintOrder="stroke fill"
                      className="font-bold lg:text-[3vw] max-lg:text-[4vh] drop-shadow-[3px_3px_0px_#101e34] "
                      
                    >
                      USERNAME
                    </text>
                  </svg>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-[300px] p-3 rounded-[10px] mb-2 text-black bg-transparent border-2 border-black -mt-4 "
                  onChange={addData}
                  value={logData.email}
                />
              </div>
              <div className="form-group mb-2 text-left bg--500">
                <label htmlFor="password" className="block mb-1">
                  <svg
                    viewBox="0 0 500 100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <text
                      x="22%"
                      y="75%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fill="#FFF546"
                      stroke="#101e34"
                      strokeWidth="6"
                      paintOrder="stroke fill"
                      className="font-bold lg:text-[3vw] max-lg:text-[4vh] drop-shadow-[3px_3px_0px_#101e34]"
                    >
                      PASSWORD
                    </text>
                  </svg>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-[300px] p-3 rounded-[10px] mb-5 text-black bg-transparent border-2 border-black "
                  onChange={addData}
                  value={logData.password}
                />
              </div>
            </div>
             {/* <Link to="/instructions"> */}
            <Button onClick={handleLogin} bg="#DE5027" className="w-45 h-10 hover:bg-[#b84716]">
              <svg
                viewBox="0 0 289 50"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className=" font-bold text-[4vh]  fill-[#F6B639] 
                    stroke-[#310202] stroke-[6] [paint-order:stroke_fill] 
                    drop-shadow-[3px_2px_0px_#310202] font-['Pixelify_Sans',serif]"
                >
                  LOGIN
                </text>
              </svg>
            </Button>
            </form>
          </div>
          </Card>
        </div>
        
        <ToastContainer  />
        </>
  )
    
  
   
   
  
};
export default Login;

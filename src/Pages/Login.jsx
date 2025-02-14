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
import { useState } from "react";
import { authUser, notAuthUser } from "../redux/slices/authSlice";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  axios.defaults.withCredentials=true;
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [logData, setLogData] = useState({
    username: "",
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
    const {username,password}=logData;
    console.log(logData);
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email: logData.username,
          password:logData.password
        })
      ;

      console.log(res);

      if(res.status===404){
        throw 404 
      }
      else if(res.status===400){
        throw 400
      }
      toast.success("Login Successful!", { position: "top-center" });
      console.log("login Success!!!",res.data);
      dispatch(authUser());
      navigate("/instructions");
    } catch (err) {
      setErrorMessage("Invalid Username or Password");
      console.error("Invalid Username or Password");
      showToastMessage();
      dispatch(notAuthUser());
    }
  };
  const showToastMessage = () => {
    toast.warning("Invalid password!", {
    position: "top-center",
    });
  };

  
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
                <label for="username" className="block mb-1">
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
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="w-[300px] p-3 rounded-[10px] mb-2 text-black bg-transparent border-2 border-black -mt-4 "
                  onChange={addData}
                  value={logData.username}
                />
              </div>
              <div className="form-group mb-2 text-left bg--500">
                <label for="password" className="block mb-1">
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

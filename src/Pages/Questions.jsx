import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "pixel-retroui";
import Cookies from 'js-cookie';

export default function Questions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [fullscreenExits, setFullscreenExits] = useState(0);
  const navigate = useNavigate();

  const [optionsArray, setOptionsArray] = useState([]);

  


  // Fetch question data when component mounts
  useEffect(() => {
    console.log("option",selectedOption)
  },[selectedOption])

  useEffect(() => {
   const fetchQues = async () => {
    const token = Cookies.get('token'); // Retrieve the token from cookies

    await axios
      .post("http://localhost:5002/start", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        
        withCredentials:true
      })
      .then((response) => {
        console.log("checking options",response);
        setQuestionData(response.data.question);
        setLoading(false);
        setTimeLeft(response.data.timeleft);

        if (response.data.optionsObject) {
          const options = Object.entries(response.data.optionsObject).map(
            ([key, value]) => ({
              id: parseInt(key), // Convert key to number
              name: value,
            })
          );
          setOptionsArray(options);
        }
        // Set the initial time from the fetched data
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
        setLoading(false);
      });
   }

   fetchQues();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/result");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Detect fullscreen exit and count exits
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenExits((prevExits) => {
          const newExits = prevExits + 1;
          console.log("Fullscreen exits count:", newExits);

          if (newExits >= 3) {
            alert(
              "You have exited fullscreen too many times. Redirecting to results."
            );
            navigate("/result");
          } else {
            alert(`Warning: Fullscreen mode exited! (${newExits}/3)`);
          }

          return newExits;
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [navigate]);

  // Convert timeLeft to minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Function to send selected option
  const handleOptionSelect = (option) => {
    // setSelectedOption(option);
    console.log("OPTIONS: ", option)
    setSelectedOption(option);
    console.log("Select",selectedOption)

    // axios
    //   .post("https://api.example.com/submit", { answer: option }) // Replace with actual API URL
    //   .then((response) => {
    //     console.log("Response:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting answer:", error);
    //   });
  };



  // const optionMap = { a: 0, b: 1, c: 2, d: 3 };

  const handleSubmit = async () => {
    if (selectedOption === null) {
      console.log("No option selected!");
      return;
    }
    
    const token = Cookies.get("token"); // Retrieve token from cookies
  
    await axios
      .post(
        "http://localhost:5002/next",
        { answer: selectedOption },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          // },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  };
  
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="questions-container bg-gradient-to-b from-[#F08E25] to-[#881200] h-[100vh] w-full flex justify-center items-center ">
      <div className="question-left h-[76%] w-[60%] flex flex-col justify-start items-center bg--600 gap-[20px] ">
        <Card
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadowColor="#c381b5"
          className="px-4 text-center h-auto text-[20px] "
        >
      <h1>TIME: {questionData ? formatTime(timeleft) : "Loading..."}</h1>
      </Card>

        <Card
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadowColor="#c381b5"
          className="p-4 min-h-[300px] w-[90%] text-start "
        >
          <h1 className="text-[20px]">
          {questionData ? `Q: ${questionData}` : "Loading question..."}
          </h1>
        </Card>

        <div className="options-container w-[90%] h-auto flex flex-wrap justify-between items-center gap-[20px] bg--600 ">
          {optionsArray.map((items) => {
            
            return (
              <Button
                key={items.id}
                bg="#fefcd0"
                textColor="black"
                borderColor="black"
                shadow="#c381b5"
                className=" min-h-[40px] px-[20px] flex justify-start items-center gap-[20px]"
                onClick={() => handleOptionSelect(items.id)}
              >
                {items.id}.
                <h1 className="option-content text-[20px]">
                  {items.name}
                </h1>
              </Button>
            );
          })} 
        </div>
      </div>

      <div className="question-right h-full w-[40%] flex flex-col justify-center items-center bg--600 gap-[20px] ">
        <Card
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadowColor="#c381b5"
          className="px-4 py-[10px] h-auto w-[60%] flex justify-between items-center mt-[80px] "
        >
          <h1 className="text-[24px]">SCORE</h1>
          <h1 className="text-[24px]">{questionData ? questionData.Marks : "Loading..."}</h1>

        </Card>

        {/* <Card className="options-container w-[60%] min-h-auto flex flex-col justify-start items-center gap-[20px] bg-red-600 py-[20px] ">
          <h1 className="text-[32px] text-yellow-200">LIFELINES</h1>
          {Object.keys(questionData.optionsObject).map((key) => {
          const option = questionData.optionsObject[key];
          return (
            <Button
              key={key}
              bg={selectedOption === option ? "#FFEA00" : "#fefcd0"} // Highlight selected option
              textColor="black"
              borderColor="black"
              shadow="#c381b5"
              className="h-auto px-[10px] w-[90%] flex justify-start items-center gap-[20px]"
              onClick={() => setSelectedOption(option)} // Set selected option
            >
              {key}.
              <h1 className="option-content text-[20px]">{option}</h1>
            </Button>
          );
        })}
      </Card> */}


        <Button onClick={handleSubmit}
          bg="#FFEA00"
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
          className=" h-[40px] px-[20px] flex justify-start items-center gap-[20px]"
        >
          <h1 className="option-content text-[20px]">NEXT</h1>
        </Button>
      </div>
    </div>
  );
}


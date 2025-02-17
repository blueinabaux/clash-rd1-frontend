import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Questions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [fullscreenExits, setFullscreenExits] = useState(0);
  const navigate = useNavigate();

  // Fetch question data when component mounts
  useEffect(() => {
    axios
      .get("https://api.example.com/question") // Replace with actual API URL
      .then((response) => {
        setQuestionData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
        setLoading(false);
      });
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Stop the timer before navigating
          navigate("/result");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Detect fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenExits((prevExits) => {
          const newExits = prevExits + 1;
          console.log("Fullscreen exits:", newExits); // Now used in console
          
          if (newExits >= 3) {
            alert("You have exited fullscreen too many times. Redirecting to results.");
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
    setSelectedOption(option);

    axios
      .post("https://api.example.com/submit", { answer: option }) // Replace with actual API URL
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F08E25] to-[#881200] p-4 font-mono flex flex-col items-center">
      {/* Content Wrapper */}
      <div className="flex flex-wrap sm:flex-nowrap gap-8 w-full max-w-5xl">
        {/* Main Content Area */}
        <div className="flex-1 bg-[#EC841C] rounded-lg border-4 border-[#4A1237] h-[300px] sm:h-[400px] shadow-[3px_3px_0px_0px_#1E3445] flex flex-col items-center justify-center text-white text-xl p-4">
          {loading ? "Loading..." : questionData?.question || "No question available"}
          <div className="mt-4 text-2xl font-bold text-[#FFF546]">Time Left: {formatTime(timeLeft)}</div>
          <div className="mt-2 text-lg text-white">Fullscreen Exits: {fullscreenExits}</div> {/* ✅ Used in UI */}
        </div>

        {/* Side Panel */}
        <div className="w-full sm:w-96 bg-[#FFAC57] rounded-lg border-4 border-[#4A1237] h-[200px] sm:h-[400px] shadow-[3px_3px_0px_0px_#1E3445]"></div>
      </div>

      {/* Options Grid */}
      <div className="flex justify-start w-full ml-72">      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-full max-w-md sm:max-w-xl">
          {["A", "B", "C", "D"].map((option) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`bg-[#FF7B00] rounded-lg border-4 border-[#4A1237] p-6 shadow-[3px_3px_0px_0px_#1E3445] hover:opacity-100 transition-opacity ${
                selectedOption === option ? "opacity-100" : "opacity-80"
              }`}
            >
              <span
                className="text-[#FFF546] text-2xl sm:text-3xl font-bold"
                style={{ textShadow: "2px 2px #4A1237" }}
              >
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Next Button */}
      <div className="flex justify-end w-full max-w-3xl mt-6">
        <button
          className="bg-[#FF7B00] text-[#FFF546] px-6 sm:px-8 py-3 rounded-lg border-4 border-[#4A1237] hover:opacity-90 transition-opacity shadow-[3px_3px_0px_0px_#1E3445]"
          style={{ textShadow: "2px 2px #4A1237" }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

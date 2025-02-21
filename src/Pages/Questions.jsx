import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "pixel-retroui";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import { FontAwesomeIcon } from "@fontawesome/re/act-fontawesome";
import { faCircleInfo, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';


const Timer = ({questionData,timeLeft}) => {
  const [timeL, setTimeL] = useState(timeLeft)
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
     
      setTimeL((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/leaderboard");
          return 0;
        }
     else{return prevTime - 1;}
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  return <>
   <Card
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadowColor="#c381b5"
          className="px-4 text-center h-auto text-[20px] "
        >
          <h1>TIME: {questionData ? formatTime(timeL) : "Loading..."}</h1>
        </Card>
  </>
}


export default function Questions() {
  const [selectedOption, setSelectedOption] = useState(-1);
  const [questionData, setQuestionData] = useState(null);
  const [flag, setFlag] = useState(false)
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [fullscreenExits, setFullscreenExits] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const [fifty, setFifty] = useState([]);

  const [optionsArray, setOptionsArray] = useState([]);
  const [marks, setMarks] = useState(0);

  const[lifeLines, setLifeLines] = useState(
    {
      lifeline1:null,
      lifeline2:null,
      lifeline3:null,
    }
  )
  const isDisabledArray = useMemo(() => {
    // console.log("Fifty",fifty)
    // console.log("dgjgjgh", optionsArray.map((items) => {
    //   return fifty.length > 0 && !fifty.includes(items.id);
    // }));
    return optionsArray.map((items) => {
      return fifty.length > 0 && !fifty.includes(items.id);
    });
    
  },[fifty])

  useEffect(() => {
    const fetchQues = async () => {
      const token = Cookies.get("token"); // Retrieve the token from cookies
      // console.log("COOOKIEEE: ", token);


      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/start`, {

          withCredentials: true,
        })
        .then((response) => {
          // console.log("checking options", response.data);
          setQuestionData(response.data.question);
          setLoading(false);
          setFifty([])
          setSelectedOption(()=>{
           
            return null})
          setFlag(false)
          setTimeLeft(response.data.timeleft);
          setMarks(response.data.Marks);
          setLifeLines({
            lifeline1: response.data.lifelinestatus[0],
            lifeline2: response.data.lifelinestatus[1],
            lifeline3: response.data.lifelinestatus[2],
          })

          // console.log('ld',response.data.lifelinestatus[0],response.data.lifelinestatus[1],response.data.lifelinestatus[2])


          // console.log("OPTIONSSSSS: ",response.data.optionsObject )

          if (response.data.optionsObject) {
            const options = Object.entries(response.data.optionsObject).map(
              ([key, value]) => ({
                id: parseInt(key), // Convert key to number
                name: value,
              })
            );
            setOptionsArray(options);
          }

          if (response.status == 202) {
            alert(response.data.message);
            return;
          }
          // Set the initial time from the fetched data
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
          setLoading(false);
        });
    };

    fetchQues();
  }, []);
  // console.log("QUES: ", questionData);
  // console.log("OPTIONS: ", optionsArray);


  // Function to send selected option
  const handleOptionSelect = (option) => {
    // setSelectedOption(option);
    // console.log(option)
    setSelectedOption((prev) => (prev !== option ? option : prev));
    setIsDisabled(prev=>false);
   setFlag(true)
  };

 
  

  
  const lifelines = [
    {
      id: "1",
      title: "Double Dip",
      description: "Skip the current question without losing points.",
      type: "lifeline1",
      status: lifeLines.lifeline1,
    },
    {
      id: "2",
      title: "50-50",
      description: "Get two attempts at the answer.",
      type: "lifeline2",
      status: lifeLines.lifeline2,
    },
    {
      id: "3",
      title: "Gamble",
      description: "Pause the timer for an additional 2 minutes.",
      type: "lifeline3",
      status: lifeLines.lifeline3,
    },
  ];



  const handleLifelineUse = async (lifelineType) => {

    try{

    
    const token = Cookies.get("jwt");

    if (lifelineType == "lifeline1") {
      const res1 = await axios.post(
        `https://clashroundonebackend.api.credenz.co.in/${lifelineType}`,
        {

          withCredentials: true,
        }
      );
      // alert("Your have 2 chances to answer the question");
      toast.info("Double Dip Activated: You have two chances!", { position: "top-right" });

      // setQuestionData(res1.data.question);


      // const newTimeLeft = Math.floor(res1.data.timeLeft / 1000); // Convert milliseconds to seconds
      // setTimeLeft(newTimeLeft);
      // setStreak(res1.data.streak);

      // setLifeLines((prev) => ({
      //   ...prev,
      //   lifeline1: res1.data.doubleStatus,
      //   lifeline2: res1.data.freezeStatus,
      //   lifeline3: res1.data.skipStatus,
      // }));

    }

    if (lifelineType == "lifeline2") {
      const res2 = await axios.post(
        `https://clashroundonebackend.api.credenz.co.in/${lifelineType}`,
        {

          withCredentials: true,
        }
      );

      setFifty(res2.data.options);
      // alert("2 OPTIONS HAVE BEEN DISABLED");
      toast.warn("50-50 Activated: Two wrong options removed!", { position: "top-right" });


      // setQuestion({
      //   question_id: res2.data.nextQuestion.question_id,
      //   is_junior: res2.data.nextQuestion.is_junior,
      //   question_text: res2.data.nextQuestion.question_text,
      // });
      // const newTimeLeft = Math.floor(res2.data.timeLeft / 1000); // Convert milliseconds to seconds
      // setTimeLeft(newTimeLeft);
      // setStreak(res2.data.streak);

      // setLifeLines({
      //   doubleStatus: res2.data.doubleStatus,
      //   freezeStatus: res2.data.freezeStatus,
      //   skipStatus: res2.data.skipStatus,
      // });
      // setScore(res2.data.marks);
    }

    if (lifelineType == "lifeline3") {
      
      
          const res3 = await axios.post(
            `https://clashroundonebackend.api.credenz.co.in/${lifelineType}`,
            {
              withCredentials: true,
            }
          );
          // console.log("LIFE LINE 3: ", res3.data);
          toast.success("Gamble Activated!", { position: "top-right" });

          // alert("Gamble Activated");
          // setQuestion({
          //   question_id: res3.data.question.question_id,
          //   is_junior: res3.data.question.is_junior,
          //   question_text: res3.data.question.question_text,
          // });
          // const newTimeLeft = Math.floor(res3.data.timeLeft / 1000); // Convert milliseconds to seconds
          // setTimeLeft(newTimeLeft);
          // setStreak(res3.data.streak);

          // alert(res3.data.message);
          // setLifeLines({
          //   doubleStatus: res3.data.doubleStatus,
          //   freezeStatus: res3.data.freezeStatus,
          //   skipStatus: res3.data.skipStatus,
          // });
          // setScore(res3.data.marks);

        }
      }
      catch(err){
        toast.error("Failed to activate lifeline. Try again.", { position: "top-right" })
      }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLifeline, setSelectedLifeline] = useState(null);

  const handleSubmit = async () => {
    if (selectedOption === null) {
      alert("No option selected!");

      return;
    }

    const token = Cookies.get("token"); // Retrieve token from cookies

    await axios
      .post(
        "https://clashroundonebackend.api.credenz.co.in/next",
        { answer: selectedOption },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          // },
          withCredentials: true,
        }
      )
      .then((response) => {
        if(response.data !== undefined){
          // console.log('response is',response)

        // console.log("CURRENT QUESTION: ---> ", response.data.question);
        
        if(response.data.message === "First guess was wrong. You have one more chance!"){
          return ;
        }
        setQuestionData(response.data.question);

        setLoading(false);
        setTimeLeft(response.data.timeleft);
        setFifty([]);
        setMarks(response.data.Marks);
        // console.log('lifelines',response.data.lifeline)
        setLifeLines({
          lifeline1: response.data.lifeline[0],
          lifeline2: response.data.lifeline[1],
          lifeline3: response.data.lifeline[2],
        })
        // console.log("OPTIONSSSSS: ",response.data.optionsObject )
        // console.log("--------------> ", response.data.optionsObject);
        
        
        if (response.data.optionsObject) {
          const options = Object.entries(response.data.optionsObject).map(
            ([key, value]) => ({
              id: parseInt(key), // Convert key to number
              name: value,
            })
          );
          // console.log("ye options ka hai next me: ", options);
          setOptionsArray(options);
        }


        // console.log('ld',response.data.lifelinestatus[0],response.data.lifelinestatus[1],response.data.lifelinestatus[2])
        handleOptionSelect(null)
        setSelectedOption(null)

        // setOptionsArray(null);
        


        // console.log(type(response.status))
        if (response.status == 202) {
          alert("QUestions Over");
          navigate('/leaderboard');
        }
        }
        else{
          alert("You have completed the test")
          navigate('/leaderboard')
        }
      })
      .catch((error) => {
        // console.error("Error submitting answer:", error);
        alert("Error submitting answer. Try again.");
      });
      handleOptionSelect(null);
      // console.log(fifty)
      // console.log("Selected", selectedOption)
    };
    // console.log("OPTIONS ---------------- : ", optionsArray );


  if (loading) return <div>Loading...</div>;

  return (
    <div className="questions-container bg-gradient-to-b from-[#F08E25] to-[#881200] h-[100vh] w-full flex justify-center items-center ">
        <ToastContainer/>
      <div className="question-left h-[76%] w-[60%] flex flex-col justify-start items-center bg--600 gap-[20px] ">
       
<Timer questionData={questionData} timeLeft ={timeLeft} />
<Card
  bg="#fefcd0"
  textColor="black"
  borderColor="black"
  shadowColor="#c381b5"
  className="p-2 min-h-[300px] w-[90%] text-start overflow-hidden"
>
  <div
    style={{
      overflowY: "auto", // Enables vertical scrolling
      padding: "8px",
      border: "1px solid #000", // Optional border for visibility
      backgroundColor: "#1e1e1e",
      borderRadius: "8px",
    }}
    className="w-full h-[300px]"
  >
    <h1
      style={{
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        color: "#fff",
        fontSize: "20px",
        fontFamily: "monospace",
      }}
    >
      {questionData ? questionData : "Loading question..."}
    </h1>
  </div>
</Card>


        <div className="options-container w-[90%] h-auto flex flex-wrap justify-between items-center gap-[20px] bg--600 ">
        {optionsArray && optionsArray.map((items, index) => (
      // return (
        <Button
          key={items.id*Math.random()}
          bg={isDisabledArray[index] ? "#454545" : selectedOption === items.id ? "#FFEA00" : "#fefcd0"}
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
          className="min-h-[40px] px-[20px] flex justify-start items-center gap-[20px]"
          onClick={() => handleOptionSelect(items.id)}
          disabled={isDisabledArray[index]}
        >
          {items.id}.
          <h1 className="option-content text-[20px]">{items.name}</h1>
        </Button>
      // );
    ))}
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
          <h1 className="text-[24px]">{marks}</h1>
        </Card>
        <div className=" lg:mt-0 bg--500 ">
          <div>
            <Card
              bg="#DE5027"
              textColor="#310202"
              borderColor="#310202"
              shadowColor="#310202"
              className="score w-full lg:w-[24vw] lg:h-[42vh] sm:h-[30vh] flex-col justify-center items-center shadow-black font-custom"
            >
              <svg
                viewBox="0 0 500 100"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="#FFF546"
                  stroke="#4a1237"
                  strokeWidth="10"
                  paintOrder="stroke fill"
                  className="custom-shadow3 font-normal lg:text-[3vw] max-lg:text-[2vh]"
                >
                  LIFELINES
                </text>
              </svg>

              <div className="flex flex-col items-center gap-2 w-full">
                {lifelines.map((lifeline) => (

                  <Card
                    key={lifeline.id}
                    bg="#FFA500"
                    textColor="#e2b3cc"
                    borderColor="#451c44"
                    shadowColor="black"
                    className="w-[90%] h-[40px] flex items-center px-2 shadow-[#c381b5]"
                  >
                    <svg
                      viewBox="0 0 500 100"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-auto"
                    >
                      <text
                        x="1%"
                        y="50%"
                        dominantBaseline="middle"
                        fill="#FFF546"
                        stroke="#4a1237"
                        strokeWidth="10"
                        paintOrder="stroke fill"
                        className="custom-shadow3 font-normal lg:text-[3vw] max-lg:text-[2vh]"
                      >
                        {lifeline.title}
                      </text>
                    </svg>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedLifeline(lifeline);
                          setIsOpen(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          className="text-[#4a0f35] text-[24px]"
                        />
                      </button>
                      <button
                        onClick={() =>
                          handleLifelineUse(
                            lifeline.type,
                          )
                        }
                        disabled={lifeline.status === false}
                        className={`text-[#4a0f35] text-lg ${
                          lifeline.status == false
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <FontAwesomeIcon
                          className="text-[#4a0f35] text-[24px]"
                          icon={faCirclePlay} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {isOpen && selectedLifeline && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
                onClick={() => setIsOpen(false)}
                style={{ zIndex: 100 }}
              >
                <div
                  className="p-6 rounded-lg text-center w-[300px] h-[300px] bg-[#1b1230] shadow-[0_0_8px_#e2b3cc] relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{
                      color: "#e2b3cc",
                      fontSize: "35px",
                      marginTop: "50px",
                    }}
                  >
                    {selectedLifeline.title}
                  </h2>
                  <br />
                  <p
                    className="mb-4"
                    style={{ color: "#e2b3cc", fontSize: "15px" }}
                  >
                    {/* {selectedLifeline.description} */}
                  </p>
                  <button
                    className="absolute text-white text-lg"
                    style={{
                      fontFamily: "MyCustomFont",
                      right: "10px",
                      top: "10px",
                      color: "#e2b3cc",
                    }}
                    // onClick={() => setIsOpen(false)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <Lifelines /> */}
        </div>

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

        <Button
          onClick={handleSubmit}
          bg={flag ? `#FFEA00`: "#4b4a3e"}
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
          disabled = {!flag}
          className=" h-[40px] px-[20px] flex justify-start items-center gap-[20px]"
        >
          <h1 className="option-content text-[20px]">NEXT</h1>
        </Button>
      </div>
    </div>
  );
}

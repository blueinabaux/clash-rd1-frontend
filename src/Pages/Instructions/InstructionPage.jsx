import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button, Card } from "pixel-retroui";
import "./InstructionStyles.css";

const InstructionPage = () => {
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  // const onProceedClick = () => {

    const [instructions, setInstructions] = useState([
      {
        id: 1,
        title: "Participants are allowed only one login session. Multiple logins are not permitted.",
      },
      {
        id: 1,
        title: "Participants are allowed only one login session. Multiple logins are not permitted.",
      },
      {
        id: 1,
        title: "Participants are allowed only one login session. Multiple logins are not permitted.",
      },
    ]);
  return (
    <div className="instr-container">
      <h2 className="main-title">{showNext ? "LIFELINES" : "INSTRUCTIONS" }</h2>

      {/* Card Container */}
      <div className="card-container">
        {!showNext ? (
          <>
            {/* First Three Cards */}
            <Card
              bg="#c94a26"
              textColor="#ff79c6"
              borderColor="#e1d600"
              shadowColor="#e1d600"
            >
              {/* <img src="src/assets/shield.png" alt="shield" className="card-icon" /> */}
              <h3 className="card-title">#1</h3>
              <p className="card-content">
              Participants are allowed to take a 30-minute test within the designated time window, with the contest running from 8:00 PM to 11:00 PM.
              </p>
            </Card>

            <Card
              bg="#c94a26"
              textColor="#ff79c6"
              borderColor="#e1d600"
              shadowColor="#e1d600"
            >
              {/* <img src="src/assets/electronic.png" alt="electronic" className="card-icon" /> */}
              <h3 className="card-title">#2</h3>
              <p className="card-content">
              The marking scheme awards +4 points for each correct submission and -1 points for each incorrect submission. Participants are allowed up to 2 attempts to answer a question.
              </p>
            </Card>

            <Card
              bg="#c94a26"
              textColor="#ff79c6"
              borderColor="#e1d600"
              shadowColor="#e1d600"
            >
              {/* <img src="src/assets/notepad.png" alt="notepad" className="card-icon" /> */}
              <h3 className="card-title">#3</h3>
              <p className="card-content">
              Participants are permitted to use each lifeline only once during the test.
              </p>
            </Card>
          </>
        ) : (
          <>
            {/* Next Three Cards */}
            <Card
              bg="#c94a26"
              textColor="#ff79c6"
              borderColor="#e1d600"
              shadowColor="#e1d600"
            >
              {/* <img
                src="src/assets/shield.png"
                alt="time"
                className="card-icon"
              /> */}
              <h3 className="card-title">DOUBLE DIP</h3>
              <p className="card-content">
              Enables the participant to make a second attempt if their initial response is incorrect, providing a crucial opportunity to reassess and select a different answer.
              </p>
            </Card>

            <Card
              bg="#c94a26"
              textColor="#ff79c6"
              borderColor="#e1d600"
              shadowColor="#e1d600"
            >
              {/* <img
                src="src/assets/electronic.png"
                alt="rules"
                className="card-icon"
              /> */}
              <h3 className="card-title">50-50</h3>
              <p className="card-content">
              Eliminates two incorrect options from the set of possible answers, increasing the probability of selecting the correct response and aiding in decision-making.
              </p>
            </Card>

            <Card
              bg="#c94a26"
              textColor="#ff79c6"
              borderColor="#e1d600"
              shadowColor="#e1d600"
            >
              {/* <img
                src="src/assets/notepad.png"
                alt="warning"
                className="card-icon"
              /> */}
              <h3 className="card-title">GAMBLE</h3>
              <p className="card-content">
              A high-risk, high-reward lifeline awarding +8 points for a correct answer and -4 for a wrong one.
              </p>
            </Card>
          </>
        )}
      </div>

      {/* Button Container */}
      <div className="button-container">
        {/* <Button
          bg="#1a1b41"
          textColor="rgba(238, 140, 174, 1)"
          borderColor="rgba(238, 140, 174, 1)"
          className="next-buttons"
          onClick={() => setShowNext(!showNext)}
        >
          {showNext ? "BACK" : "NEXT"}
        </Button> */}

        {showNext ? (
          <div className="button-containers">
            <Button
            bg="#c94a26"
            textColor="#e1d600"
            borderColor="#e1d600"
            className="next-buttons"
            onClick={() => setShowNext(!showNext)}
          >
            BACK
          </Button>
            <Button
              bg="#c94a26"
              textColor="#e1d600"
              borderColor="#e1d600"
              className="next-buttons"
              onClick={() => navigate("/questions")} // Navigate to NewPage
            >
              Proceed
            </Button>
          </div>
        ) : (
          <Button
            bg="#c94a26"
            textColor="#e1d600"
            borderColor="#e1d600"
            className="next-buttons"
            onClick={() => setShowNext(!showNext)}
          >
            NEXT
          </Button>
        )}
      </div>
    </div>
  );
};

export default InstructionPage;

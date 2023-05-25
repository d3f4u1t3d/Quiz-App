import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(60);
  const [testToggle, setTestToggle] = useState(false); //False
  const [startState, setStartState] = useState(true); //True
  const [indexNumber, setIndexNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [disabled, setdisabled] = useState(false);
  const [showResult, setShowResult] = useState(false); //False

  const [questionsData, setQuestionsData] = useState([
    {
      question: "What is the scientific name of a butterfly?",
      options: ["Apis", "Coleoptera", "Formicidae", "Rhopalocera"],
      correctOption: "Rhopalocera",
    },
    {
      question: "How hot is the surface of the sun?",
      options: ["1,233 K", "5,778 K", "12,130 K", "101,300 K"],
      correctOption: "5,778 K",
    },
    {
      question: "Who are the actors in The Internship?",
      options: [
        "Ben Stiller, Jonah Hill",
        "Courteney Cox, Matt LeBlanc",
        "Kaley Cuoco, Jim Parsons",
        "Vince Vaughn, Owen Wilson",
      ],
      correctOption: "Vince Vaughn, Owen Wilson",
    },
    {
      question: "What is the capital of Spain?",
      options: ["Berlin", "Buenos Aires", "Madrid", "San Juan"],
      correctOption: "Madrid",
    },
    {
      question:
        "What are the school colors of the University of Texas at Austin?",
      options: [
        "Black, Red",
        "Blue, Orange",
        "White, Burnt Orange",
        "White, Old gold, Gold",
      ],
      correctOption: "White, Burnt Orange",
    },
    {
      question: "What is 70 degrees Fahrenheit in Celsius?",
      options: ["18.8889", "20", "21.1111", "158"],
      correctOption: "21.1111",
    },
    {
      question: "When was Mahatma Gandhi born?",
      options: [
        "October 2, 1869",
        "December 15, 1872",
        "July 18, 1918",
        "January 15, 1929",
      ],
      correctOption: "October 2, 1869",
    },
    {
      question: "How far is the moon from Earth?",
      options: [
        "7,918 miles (12,742 km)",
        "86,881 miles (139,822 km)",
        "238,400 miles (384,400 km)",
        "35,980,000 miles (57,910,000 km)",
      ],
      correctOption: "238,400 miles (384,400 km)",
    },
    {
      question: "What is 65 times 52?",
      options: ["117", "3120", "3380", "3520"],
      correctOption: "3380",
    },
    {
      question: "How tall is Mount Everest?",
      options: [
        "6,683 ft (2,037 m)",
        "7,918 ft (2,413 m)",
        "19,341 ft (5,895 m)",
        "29,029 ft (8,847 m)",
      ],
      correctOption: "19,341 ft (5,895 m)",
    },
  ]);

  let timer: NodeJS.Timer;

  useEffect(() => {
    if (testToggle) {
      timer = setInterval((): void => {
        setSeconds(seconds - 1);
      }, 1000);
      if (seconds <= 0) {
        clearInterval(timer);
        setStartState(false);
        setTestToggle(false);
        setShowResult(true);
      }
    }
    return () => clearInterval(timer);
  });

  let checkAnswer = (current: string, correct: string) => {
    console.log(current);
    console.log(correct);
    if (current === correct) {
      setScore(score + 1);
      console.log(score);
    }
    setdisabled(true);
  };

  const onNextClicked = (indexNumber: number) => {
    if (indexNumber < questionsData.length) {
      setIndexNumber(indexNumber + 1);
      setdisabled(false);
    }
    if (indexNumber + 1 === questionsData.length) {
      setIndexNumber(0);
      setStartState(false);
      setTestToggle(false);
      setShowResult(true);
    }
  };

  return (
    <div className="bg-teal-300 h-screen items-center justify-center flex  ">
      <div
        className={`flex flex-col ${
          startState === true || showResult === true ? "justify-evenly" : ""
        } items-center content-center bg-white w-11/12 h-2/5 p-4 rounded-lg lg:h-2/5 lg:w-3/5 md:h-2/5 md:w-3/5 sm:h-2/5 sm:w-3/5`}
      >
        {startState === true && testToggle === false && showResult === false ? (
          <>
            <div className="mt-2 font-extrabold text-2xl  md:mt-3 sm:mt-2 lg:mt-3">
              Quiz Test
            </div>
            <div className="text-center mx-2">
              A simple quiz which contains some general questions about nature ,
              movies and many more.
            </div>
            <button
              className="mb-2 sm:mb-2 md:mb-2 lg:md-3 bg-teal-300 rounded p-2"
              onClick={() => {
                setStartState(false);
                setTestToggle(true);
                setShowResult(false);
                setSeconds(60);
              }}
            >
              Start Quiz
            </button>
          </>
        ) : startState === false &&
          testToggle === true &&
          showResult === false ? (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-teal-300 h-2.5 rounded-full"
                style={{ width: `${(indexNumber + 1) * 10}%` }}
              ></div>
            </div>
            <div className="flex h-full w-full flex-col">
              <div className="flex justify-between">
                <div className="">
                  Q.No {indexNumber + 1}/{questionsData.length}
                </div>
                <div className="">Time Remaining : {seconds}s</div>
              </div>
              <div className="flex flex-col h-full mt-3 justify-center">
                <div className="">{questionsData[indexNumber].question}</div>
                <div className="flex flex-col justify-center">
                  {questionsData[indexNumber].options.map((e, i) => (
                    <button
                      disabled={disabled}
                      key={i}
                      onClick={() => {
                        checkAnswer(
                          e,
                          questionsData[indexNumber].correctOption
                        );
                        onNextClicked(indexNumber);
                      }}
                      className="w-full border-2 rounded border-teal-200 my-1 h-auto"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : startState === false &&
          testToggle === false &&
          showResult === true ? (
          <>
            <div className="text-2xl">Thanks For Taking the Quiz</div>
            <div className="">Time Taken : {60 - seconds}</div>
            <div className="">Correct Answers: {score}/10</div>
            <button
              className="mb-2 sm:mb-2 md:mb-2 lg:md-3 bg-teal-300 rounded p-2"
              onClick={() => {
                setStartState(true);
                setTestToggle(false);
                setShowResult(false);
                setScore(0);
                setSeconds(60);
              }}
            >
              Go To Start
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;

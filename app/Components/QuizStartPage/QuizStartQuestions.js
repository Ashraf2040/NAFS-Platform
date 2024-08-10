'use client';

import React, { useEffect, useState } from 'react';
import useGlobalContextProvider from '@/app/ContextApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import convertFromFaToText from '@/app/convertFromFaToText';
import { useSession } from 'next-auth/react';
import Certificate from '../Certificate';
import { setUserScore } from '@/app/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { revalidatePath } from 'next/cache';

function QuizStartQuestions({ onUpdateTime }) {
  const [score, setScore] = useState(0);
  const [images,setImages]=useState([]);
  const dispatch=useDispatch();
  const {data:session} = useSession();
  const code = session?.user?.code;
  const currentUser =useSelector((state)=>state.user)
//  console.log("object code",code) 
//  console.log("object score",score) 
  async function updateUserInformation() {
    if (!session || !score) {
      return; // Handle missing session or score
    }
  
     // Extract user ID from session
      
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          score, // Update data object
        }),
      });
  
      const data = await res.json();
      // console.log(data.message); // Log response message
     revalidatePath("/")
      // Handle successful or failed update based on response
    } catch (error) {
      console.error(error);
    }
  }

  
  
  
  // const time = 30;
  const { quizToStartObject, allQuizzes, setAllQuizzes, userObject } =
    useGlobalContextProvider();
    // console.log(userObject)
  const { selectQuizToStart } = quizToStartObject;
  const { quizQuestions } = selectQuizToStart;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
  const [isQuizEnded, setIsQuizEnded] = useState(false);

  // const { user, setUser } = userObject;

  // const [timer, setTimer] = useState(time);
  // let interval;
  
// console.log(selectQuizToStart)
  // function startTimer() {
  //   clearInterval(interval);
  //   setTimer(time);

  //   interval = setInterval(() => {
  //     setTimer((currentTime) => {
  //       onUpdateTime(currentTime);
  //       if (currentTime === 0) {
  //         clearInterval(interval);
  //         return 0;
  //       }
  //       return currentTime - 1;
  //     });
  //   }, 1000);
  // }
  // useEffect(() => {
  //   if (isQuizEnded) {
  //     // dispatch(setUserScore(1)); // Increment score by 1 point
  //     updateUserInformation(); // Update score in database
  //   }
  // }, [isQuizEnded])
  async function saveDataIntoDB() {
    try {
      const id = selectQuizToStart._id;
      // Get the _id of the quiz
      const res = await fetch(
        `http://localhost:3000/api/quizzes?id=${id}`, // Include the id as a query parameter
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            updateQuizQuestions: allQuizzes[indexOfQuizSelected].quizQuestions,
          }),
        },
      );
      // console.log(allQuizzes[indexOfQuizSelected].quizQuestions);
      if (!res.ok) {
        toast.error('Something went wrong while saving...');
        return;
      }else{
        revalidatePath("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(indexOfQuizSelected);

  // useEffect(() => {
    
  //   startTimer();
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentQuestionIndex, indexOfQuizSelected,allQuizzes]);

  // useEffect(() => {
  //   if ( !isQuizEnded) {
  //     // Updating the allQuizzes
  //     const currentQuizzes = [...allQuizzes];
  //     currentQuizzes[indexOfQuizSelected].quizQuestions[
  //       currentQuestionIndex
  //     ].statistics.totalAttempts += 1;
  //     currentQuizzes[indexOfQuizSelected].quizQuestions[
  //       currentQuestionIndex
  //     ].statistics.incorrectAttempts += 1;

  //     setAllQuizzes(currentQuizzes);
  //     // --------------------
  //     if (currentQuestionIndex !== quizQuestions.length - 1) {
  //       setTimeout(() => {
  //         setCurrentQuestionIndex((current) => {
  //           return current + 1;
  //         });
  //       }, 1000);
  //     } else {
  //       setIsQuizEnded(true);
        
  //       clearInterval(interval);
  //     }
  //   }
  // }, [allQuizzes,indexOfQuizSelected,currentQuestionIndex,isQuizEnded]);

  // With the useEffect every time the component is loaded up
  //we need to get the index of the quiz we selected inside
  // the allquizzes array to update it when we choose tne answer
  //
  useEffect(() => {
    const quizIndexFound = allQuizzes.findIndex(
      (quiz) => quiz._id === selectQuizToStart._id,
    );
    setIndexOfQuizSelected(quizIndexFound);
  }, [allQuizzes, selectQuizToStart._id]);

  useEffect(() => {
    if (isQuizEnded) {
      // renitialize all answers to -1
      quizQuestions.forEach((quizQuestion) => {
        quizQuestion.answeredResult = -1;
      });
      saveDataIntoDB();
      // dispatch(setUserScore(50));
      updateUserInformation();
    }
  }, [isQuizEnded,]);

  function selectChoiceFunction(choiceIndexClicked) {
    // update the selectedChoice variable state
    setSelectedChoice(choiceIndexClicked);
    //---------------------------------------

    //We update the answerResult proprety in the allQuizzes array
    const currentAllQuizzes = [...allQuizzes];

    currentAllQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].answeredResult = choiceIndexClicked;

    setAllQuizzes(currentAllQuizzes);
    //------------------------------------
  }
  console.log(score)
  function moveToTheNextQuestion() {
    // Check if the we did select the an answer by using the answerResult proprety if
    //it's still equal to -1
    if (
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult === -1
    ) {
      toast.error('please select an answer');
      return;
    }

    // Update the statistics of the question
    // ======================================
    // update the total Attemptes:
    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.totalAttempts += 1;

    // if the answer is incorrect
    if (
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult !==
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .correctAnswer
    ) {
      // update the incorrect attemptes
      allQuizzes[indexOfQuizSelected].quizQuestions[
        currentQuestionIndex
      ].statistics.incorrectAttempts += 1;
      toast.error('Incorrect Answer!');

      // if the answer is incorrect, go to the next question only
      // if we are not at the last question
      if (currentQuestionIndex != quizQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((current) => current + 1);
          // initialize the choice after going to the next question
          setSelectedChoice(null);
        }, 1200);
      } else {
        // if we select the wrong choice and we are at the end of the question
        // end the quiz
        // setTimer(0);
        // clearInterval(interval);
        setIsQuizEnded(true);
      }

      return;
    }

    // update the correct attemptes
    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.correctAttempts += 1;
    // Increment the score by 1
    setScore((prevState) => prevState + 10);
  // dispatch(setUserScore(1));
    toast.success('Awesome!');
    // addExperience();

    // This will stop the timer and end the quiz when currentQuestionIndex is the last
    // and only if we select the correct otherwise the timer is still running

    
    if (
      currentQuestionIndex === quizQuestions.length - 1 &&
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult ===
        allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
          .correctAnswer
    ) {
      // setTimer(0);
      // clearInterval(interval);
      setIsQuizEnded(true);
     dispatch(setUserScore(Number(score) +10 ));
      updateUserInformation();
      
      return;
    }
if(isQuizEnded){
  dispatch( setUserScore(score) );
}
 console.log(score)
    // increment the currentQuestionIndex by 1 to go to the next question
    setTimeout(() => {
      setCurrentQuestionIndex((current) => current + 1);
      // initialize the choice after going to the next question
      setSelectedChoice(null);
    }, 2000);
  }

  // async function addExperience() {
  //   const userCopy = user;
  //   console.log(userCopy);
  //   userCopy.experience += 1;

  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/api/user?id=${userCopy._id}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           'Content-type': 'application/json',
  //         },
  //         body: JSON.stringify({ updateUser: userCopy }),
  //       },
  //     );

  //     if (!response.ok) {
  //       toast.error('Something went wrong...');
  //       throw new Error('fetching failed...');
  //     }

  //     setUser(userCopy);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }



// Usage
useEffect(() => {
  const getQuizAssets=async()=>{
    try{
      const res = await fetch(`https://nafs-platform.vercel.app/api/quizzes?id=${selectQuizToStart._id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await res.json();
      // console.log(data.quizzes);

      const currentQuiz =data.quizzes.filter((quiz)=>quiz._id===selectQuizToStart._id)
     
      

      // console.log(currentQuiz)

      const currentQuestionAssets=currentQuiz[0].quizAssets
// console.log(currentQuestionAssets)
setImages(currentQuestionAssets)

      // setQuizQuestions(data[0].quizQuestions);
    }catch(error){
      console.log(error);
    }
  }
  getQuizAssets()
}, []);

// console.log(images)

const img=images[currentQuestionIndex]?.imgeSrc
// console.log(img)
  return (
    <div className="relative poppins rounded-sm m-9 w-9/12  ">
      <Toaster
        toastOptions={{
          // Define default options
          className: '',
          duration: 1500,
          style: {
            padding: '12px',
          },
        }}
      />
      {/* The Question Part */}
      <div className="flex   items-center gap-2">
        <div className="bg-theme flex  justify-center items-center rounded-md w-11 h-11 text-white p-3">
          {currentQuestionIndex + 1}
        </div>
<div className=' w-full  grid grid-cols-3 items-center gap-4 '>
<p className={`${img ? 'col-span-2' : 'col-span-3'}`}>{quizQuestions[currentQuestionIndex].mainQuestion}</p>
{img&&
 <Image src={img} alt="image" width={300} height={300} className='col-span-1 rounded-md' />
}
 
  
 
  </div>
        
      </div>
      {/* The Answers Part */}
      <div className="mt-7 flex flex-col gap-2">
        {quizQuestions[currentQuestionIndex].choices.map(
          (choice, indexChoice) => (
            <div
              key={indexChoice}
              onClick={() => {
                selectChoiceFunction(indexChoice);
              }}
              className={`p-3 ml-11 w-10/12 border border-theme rounded-md
               hover:bg-theme hover:text-white transition-all select-none ${
                 selectedChoice === indexChoice
                   ? 'bg-theme text-white'
                   : 'bg-white'
               }`}
            >
              {choice}
            </div>
          ),
        )}
      </div>
      {/* Submit Button */}
      <div className="flex justify-end mt-7  ">
        <button
          onClick={() => {
            moveToTheNextQuestion();
          }}
          disabled={isQuizEnded ? true : false}
          className={`p-2 px-5 text-[15px] text-white rounded-md bg-theme mr-[70px] ${
            isQuizEnded ? 'opacity-60' : 'opacity-100'
          }`}
        >
          Submit
        </button>
      </div>
      {isQuizEnded && (
        <ScoreComponent
          quizStartParentProps={{
            setIsQuizEnded,
            setIndexOfQuizSelected,
            setCurrentQuestionIndex,
            setSelectedChoice,
            score,
            setScore,
          }}
        />
      )}


    </div>
  );
}

export default QuizStartQuestions;

function ScoreComponent({ quizStartParentProps }) {
  const { quizToStartObject, allQuizzes } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const [isPreview, setIsPreview] = useState(false);
  const numberOfQuestions = selectQuizToStart.quizQuestions.length;
  const {data:session} = useSession();
  const router = useRouter();
  //
  // console.log(session?.user?.code)
  const {
    setIsQuizEnded,
    setIndexOfQuizSelected,
    setCurrentQuestionIndex,
    setSelectedChoice,
    setScore,
    score,
  } = quizStartParentProps;
  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  function emojiIconScore() {
    const emojiFaces = [
      'confused-emoji.png',
      'happy-emoji.png',
      'very-happy-emoji.png',
    ];
    const result = (score / selectQuizToStart.quizQuestions.length) * 10;
console.log("your result is ",result);

    if (result < 25) {
      return emojiFaces[0];
    }

    if (result == 50) {
      return emojiFaces[1];
    }

    return emojiFaces[2];
  }

  
  console.log(score)

  function tryAgainFunction() {
    setIsQuizEnded(false);
    const newQuizIndex = allQuizzes.findIndex(
      (quiz) => quiz._id === selectQuizToStart._id,
    );
    // 
    
    setIndexOfQuizSelected(newQuizIndex);
    setCurrentQuestionIndex(0);
    setSelectedChoice(null);
    setScore(0);
    
  }
  
  return (
    <div className=" flex items-center justify-center rounded-md top-[-100px] border border-gray-200 absolute w-full h-[450px] bg-white">
      {/* Score */}
      <div className=" flex gap-4 items-center justify-center flex-col">
        <Image src={`/${emojiIconScore()}`} alt="" width={100} height={100} />
        <div className="flex gap-1 flex-col">
          <span className="font-bold text-2xl">Your Score</span>
          <div className="text-[22px] text-center">
            {score }/{numberOfQuestions *10}
          </div>
        </div>
        <button
          onClick={() => tryAgainFunction()}
          className="p-2 bg-theme rounded-md text-white px-6"
        >
          Try Again
        </button>
        {/* statistics */}
        <div className="  w-full flex gap-2 flex-col mt-3">
          <div className="flex gap-1 items-center justify-center">
            <Image src="/correct-answer.png" alt="" width={20} height={20} />
            <span className="text-[14px]">Correct Answers: {score}</span>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <Image src="/incorrect-answer.png" alt="" width={20} height={20} />
            <span className="text-[14px]">
              Incorrect Answers:
              {selectQuizToStart.quizQuestions.length - score}
            </span>
          </div>
        </div>
        {/* <span>Or</span> */}
     <div className='flex justify-center items-center gap-20 '>
      
         <span
          onClick={() => {
            router.push('/');
          }}
          className="text-theme select-none cursor-pointer text-lg bg-themeYellow font-semibold px-4 py-2 rounded-lg  "
        >
          Select Another Quiz
        </span>
        {isPreview ? (
        <Certificate userName={session?.user?.name} quizTitle={selectQuizToStart.title} score={score}  />
      ) : (
        <button onClick={handlePreview}
        className='text-lg bg-themeYellow font-semibold px-4 py-2 rounded-lg text-theme'
        >Preview Certificate</button>
      )}</div>
      </div>
    </div>
  );
}



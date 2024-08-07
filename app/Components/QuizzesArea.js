'use client';
import React, { useEffect, useState } from 'react';
import QuizCard from './QuizCard';
import PlaceHolder from './PlaceHolder';
import useGlobalContextProvider from '../ContextApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DropDown from './DropDown';
import { useSession } from 'next-auth/react';
import { connectToDB } from '@/libs/mongoDB';
import Link from 'next/link';

function QuizzesArea({ props }) {
  const { allQuizzes, userObject, isLoadingObject } =
    useGlobalContextProvider();
  const router = useRouter();
  const { user, setUser } = userObject;
  const [students, setStudents] = useState([])
  const [statShow, setStatShow] = useState(false)
  const { isLoading } = isLoadingObject;
  // console.log(isLoading);
  const {data:session}=useSession()

  useEffect(() => {
    const getStudentData = async () => {
      await fetch('/api/user/getUsers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          
        //  console.log(data)
          setStudents(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
 
              getStudentData();
  }, [setStudents]);
      

  return (
    <div className="poppins mx-12 mt-10 h-full">
      <div>
        {isLoading ? (
          <div></div>
        ) : user.isLogged ? (
          <>
            {allQuizzes.length === 0 ? (
              <PlaceHolder />
            ) : (
              <div>
                <DropDown />
                <h2 className="text-xl font-bold text-theme px-4 rounded-md py-2 max-w-fit">My Quizzes</h2>
                <div className="mt-6 flex gap-2 flex-wrap">
                  <div className="flex gap-2 flex-wrap">
                    {allQuizzes.map((singleQuiz, quizIndex) => (
                      <div key={quizIndex}>
                        <QuizCard singleQuiz={singleQuiz} />
                      </div>
                    ))}
                    {session && session.user.role === 'AD' &&
                    <div
                    onClick={() => router.push('/quiz-build')}
                    className=" cursor-pointer justify-center items-center rounded-[10px]
                   w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
                  >
                    <Image
                      src={'/add-quiz.png'}
                      width={160}
                      height={160}
                      alt=""
                    />
                    <span className="select-none opacity-40">
                      Add a new Quiz
                    </span>
                  </div>}
                  </div>
                  
                  
                </div>
                <button className="text-xl font-bold text-theme px-4 rounded-md mt-8 py-2 max-w-fit" onClick={() => setStatShow(!statShow)}>Statistics</button>

             { statShow &&
               <div className="statistcs w-full mt-4 bg-theme h-full rounded-[4px]">
<table className='w-full px-4 flex flex-col  '>
  <th className='text-center border-b-4 border-b-themeYellow'>
    <tr className='text-white grid grid-cols-9  py-1 '>
    <td className=' mx-auto'>St.Code</td>
    <td className='col-span-2   w-full text-center'>Name</td>
    <td className=' mx-auto'>No Of Trials</td>
    <td className='text-center mx-auto'>Previous Score</td>
    <td className='text-center mx-auto'>Current Score</td>
    <td className='text-center mx-auto'>Progress</td>
    <td className='text-center mx-auto'>Total Points</td>
    <td className='text-center mx-auto'>Report</td>
    
    </tr>
    
  </th>

 
    {students.map((student, index) => (
      <tr key={index} className='bg-white w-full grid grid-cols-9 py-1 border-b-2   font-normal mb-2'>
        <td className=' text-center text-themeYellow'>{student.code}</td>
        <td className='col-span-2 text-center text-theme font-semibold  w-full '>{student.fullName}</td>
        <td className=' text-center'>{student.trials.length-1}</td>
        <td className=' text-center'>{student.trials[student.trials.length-2]}</td>
        <td className=' text-center'>{student.trials[student.trials.length-1]}</td>
        <td className={` text-center ${student.trials[student.trials.length-1]>=student.trials[student.trials.length-2] ?"text-themeGreen" : "text-red-600"}`}>
{student.trials[student.trials.length-1]>=student.trials[student.trials.length-2] ?"Passed" : "Failed"}
        </td>
        <td className=' text-center'>{student.score}</td>
        <td className=' text-center underline text-themeYellow '><Link href={`/report/${student.code}`}>Report</Link></td>
      </tr>
    ))}
   
  
</table>
                </div>}
              </div>
            )}
          </>
        ) : (
          <div className="  h-96 flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-5xl text-themeYellow">
            <span className="text-theme">NAFS</span>  Training Pltform 
            </h2>
            <span className="text-xl font-semibold ">
              Unlock Your Potential with Personalized Quizzes
            </span>
            <button
              onClick={() => {
                setUser((prevUser) => ({ ...prevUser, isLogged: true }));
              }}
              className="p-4 bg-theme text-white rounded-md"
            >
              Get Started Now!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizzesArea;

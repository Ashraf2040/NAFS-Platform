import Quiz from "@/app/models/QuizSchema";
import { connectToDB } from "@/libs/mongoDB";
import { NextResponse } from "next/server";


export async function POST(request) {
  await connectToDB();
  const { quizTitle, icon, quizQuestions,id} = await request.json();
  console.log("your data is ",quizQuestions,quizTitle,icon)
  const newQuiz = await Quiz.create({ quizTitle, icon, quizQuestions,_id:id });

  try {
    return NextResponse.json({
      id: newQuiz._id,
      message: "The quiz has been created successfully.",
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
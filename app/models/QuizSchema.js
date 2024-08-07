

import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  id: { type: String, required: true },
  mainQuestion: { type: String, required: true },
  choices: { type: [String], required: true },
  
  correctAnswer: { type: Number, required: true },
  answeredResult: { type: Number, default: -1 },
  statistics: {
    totalAttempts: { type: Number, default: 0 },
    correctAttempts: { type: Number, default: 0 },
    incorrectAttempts: { type: Number, default: 0 },
  },
  
});

const quizSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  icon: { type: String, required: true }, // Assuming you store the icon as a string
  quizTitle: { type: String, required: true },
  quizQuestions: { type: [questionSchema], required: true },
  quizAssets: { type: Array, default: [] },
 
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;

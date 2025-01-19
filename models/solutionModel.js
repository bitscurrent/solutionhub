
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  solution: { type: String, required: true },
});

const solutionSchema = new mongoose.Schema({
  chapter: { type: Number, required: true },
  questions: [questionSchema],
});

const Solution = mongoose.model('Solution', solutionSchema);

export default Solution;

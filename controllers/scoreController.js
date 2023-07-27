const Score = require("../models/Score");
const Study = require("../models/Study");
const asyncHandler = require("express-async-handler");
const ObjectID = require("mongodb").ObjectId;

const getScoreByid = asyncHandler(async (req, res) => {
  const id = req.header("id");
  const score = await Score.findById(id).lean();

  // If no moduls
  if (!score?.length) {
    return res.status(400).json({ message: "No moduls found" });
  }

  res.json(score);
});

const getScoreByStudy = asyncHandler(async (req, res) => {
  const studyid = req.header("studyid");
  const score = await Score.findOne({ studyid: studyid }).lean();

  // If no moduls
  if (!score?.length) {
    return res.status(400).json({ message: "No moduls found" });
  }

  res.json(score);
});

const createScore = asyncHandler(async (req, res) => {
  const { studyid } = req.body;

  // Confirm data
  if (!studyid) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  // Check for duplicate username
  const duplicate = await Score.findOne({ studyid: studyid }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate score" });
  }

  // Create and store new study
  const skor = await Score.create({ studyid: studyid });

  if (skor) {
    //created
    res.status(201).json({ message: `New score created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

const addScoreQuiz = asyncHandler(async (req, res) => {
  const { studyid, quizid, scorequiz } = req.body;

  // Confirm data
  if (!studyid || !scorequiz) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  const quizscore = await Score.findOneAndUpdate(
    { studyid: new ObjectID(studyid) },
    {
      $push: {
        scorequiz: {
          quizid: new ObjectID(quizid),
          quizscore: scorequiz,
        },
      },
    }
  );
  const sqore = await Score.findOne({ studyid: studyid }).exec();
  sqore.totalscore = sqore.totalscore + scorequiz;
  const successsqore = await sqore.save();
  if (!quizscore) {
    return res.status(400).json({ message: "Study not found" });
  }

  res.json({ message: `Score updated` });
});

const getTotalScoreStudent = asyncHandler(async (req, res) => {
  const studentid = req.header("studentid");
  const item = await Study.find({ studentid: studentid })
    .populate("scoreid")
    .exec()
    .then(docs => { let total= docs.map(doc => doc.totalscore)
    } );

//   const score = await Study.aggregate([
//     { $match: { studentid: studentid } },
//     { $group: { _id: null, amount: { $sum: "$totalscore" } } },
//   ]);

  // if (!score?.length) {
  //     return res.status(400).json({ message: 'No moduls found' })
  // }

  res.json(item);
});

module.exports = {
  getScoreByid,
  getScoreByStudy,
  getTotalScoreStudent,
  createScore,
  addScoreQuiz,
};

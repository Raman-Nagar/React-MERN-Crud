let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let studentSchema = require("../models/Student");

// CREATE Student
router.post("/create-student", async (req, res, next) => {
  try {
    const newStudent = new studentSchema(req.body);
    const data = await newStudent.save();

    res.json(data);
  } catch (error) {
    return next(error);
  }
});

// READ Students
router.get("/", async (req, res, next) => {
  try {
    const data = await studentSchema.find();

    res.json(data);
  } catch (error) {
    return next(error);
  }
});

// UPDATE student
router
  .route("/update-student/:id")
  // Get Single Student
  .get(async (req, res, next) => {
    try {
      const data = await studentSchema.findById(req.params.id);

      res.json(data);
    } catch (error) {
      return next(error);
    }
  })

  // Update Student Data
  .put(async (req, res, next) => {
    try {
      const data = await studentSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.json(data);
    } catch (error) {
      return next(error);
    }
  });

// Delete Student
router.delete("/delete-student/:id", async (req, res, next) => {
  try {
    const data = await studentSchema.findByIdAndRemove(req.params.id);
    res.status(200).json({
      msg: data,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

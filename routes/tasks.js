const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateStatus,
} = require("../controllers/taskController");

const router = express.Router();

// All task routes require authentication
router.use(auth);

router.post(
  "/",
  [body("title").trim().notEmpty().withMessage("Title is required")],
  createTask
);

router.get("/", getTasks);

router.get("/:id", getTask);

router.put(
  "/:id",
  [body("title").trim().notEmpty().withMessage("Title is required")],
  updateTask
);

router.delete("/:id", deleteTask);

router.patch(
  "/:id/status",
  [
    body("status")
      .isIn(["pending", "completed"])
      .withMessage("Status must be pending or completed"),
  ],
  updateStatus
);

module.exports = router;

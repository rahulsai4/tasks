const {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");

const express = require("express");
const router = express.Router();
const taskOwnerMW = require("../middleware/task-owner");

router.route("/").get(getAllTasks).post(createTask);
router
    .route("/:id")
    .get(taskOwnerMW, getTask)
    .patch(taskOwnerMW, updateTask)
    .delete(taskOwnerMW, deleteTask);

module.exports = router;

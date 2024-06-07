const express = require('express');
const validate = require('../../middlewares/validate');
const { taskValidation } = require('../../validations');
const { taskController } = require('../../controllers');

// const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		validate(taskValidation.getTasks),
		taskController.getTasks
	)
	.post(
		validate(taskValidation.createTask),
		taskController.createTask
	).put(
		validate(taskValidation.updateTask),
		taskController.updateTask
	).delete(
		validate(taskValidation.deleteTask),
		taskController.deleteTask
	);

module.exports = router;

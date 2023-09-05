//This file contains all of the routes for the records collection
//This is better practice than placing them all in the server.js file
const express = require("express");
const router = express.Router();
//here we import the controller
const {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordsController");

//setup the routes to use the controller
//this can be done in one step if two methods have the same route but different HTTP verbs
//Get request to API/Records will go to getRecords, Post request to API/Records will go to createRecord
router.route("/").get(getRecords).post(createRecord);
//get by id
router.get("/:id", getRecordById);
//update by id
router.put("/:id", updateRecord);
//delete by id
router.delete("/:id", deleteRecord);

module.exports = router;

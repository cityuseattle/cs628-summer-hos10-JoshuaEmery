const asyncHandler = require("express-async-handler");
//it is good practice to create a controller with CRUD functionality
//this methods will be called by the router
//import the model
const Record = require("../models/recordModel");
//this Model contains all of the built in Mongo methods for
//crud operations

//get all records
//GET API/RECORDS
const getRecords = asyncHandler(async (req, res) => {
  //get all records using mongoose
  const records = await Record.find();
  res.status(200).json(records);
});

//get record by id
//GET API/RECORDS/:id
const getRecordById = asyncHandler(async (req, res) => {
  //get one record by id. First check to see ID has a value
  //check to make sure an id was passed
  if (!req.params.id) {
    //bad request
    res.status(400);
    throw new Error("id is requred");
  }
  const record = await Record.findById(req.params.id);
  if (!record) {
    //no record was found
    res.status(404);
    throw new Error("no such record");
  }
  res.status(200).json(record);
});

//create record
//POST API/RECORDS
const createRecord = asyncHandler(async (req, res) => {
  //checl for the following properties: name, position, level
  if (!req.body.name || !req.body.position || !req.body.level) {
    res.status(400);
    throw new Error("name, position, and level are required");
  }
  const record = await Record.create({
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  });
  return res.status(201).json(record);
});

//update record
//PUT API/RECORDS/:id
const updateRecord = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("id is required");
  }
  if (!req.body.name || !req.body.position || !req.body.level) {
    res.status(400);
    throw new Error("name, position, and level are required");
  }
  //find and update can be done in one step
  const record = await Record.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
    { new: true }
  );
  res.status(200).json(record);
});

//delete record
//DELETE API/RECORDS/:id
const deleteRecord = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("id is required");
  }
  //find by and delete can be completed in one step
  const deleteRecord = await Record.findByIdAndDelete(req.params.id);
  res.status(200).json(deleteRecord);
});

module.exports = {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
};

const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: FETCH ALL NOTES  - POST "/notes/auth/fetchAllNotes" (login required)
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
    console.log(notes);
  } catch (error) {
    res.status(500).send("Internal server occured..");
  }
});

//ROUTE 2: ADDNOTES - GET "/notes/auth/addNote" (login required)
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be of atleast 5 words").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors , return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal server occur");
    }
  }
);

//ROUTE 3: UPDATE AN EXISTING NOTE - GET "api/notes/updateNote/:id" (login required)
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    

    //create newNote object
    let newNote = {};

    if (title) {
      newNote.title = title;
    }

    if (description) {
      newNote.description = description;
    }

    if (tag) {
      newNote.tag = tag;
    }

    console.log(newNote);

    //pehle hume id chaiye hogi jis note ko hum access krna chahte hai
    let note = await Note.findById(req.params.id);
    console.log(note);
    if(!note){
        return res.status(404).send("Not found..");
    }

    //Now hum check karenge ki jo note ki id hai and jo user n id di hai vo same hai ki nhi
    //means jo user logged in hai uski id and jo note vo access krra hai uski id same hai ki nhi mtlb user apne note ko he update kr skta hai
    if(note.user.toString()!==req.user.id){
        return res.status.send(404).send("Not Allowed..");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
  } catch (error) {
    console.log(error);
    //res.status(500).send("Internal error occured..")
  }
});


//ROUTE 4: DELETE AN EXISTING NOTE - DELETE "api/notes/deleteNote/" (login required)
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      
      //pehle hume id chaiye hogi jis note ko hum access krna chahte hai
      let note = await Note.findById(req.params.id);
      console.log(note);
      if(!note){
          return res.status(404).send("Not found..");
      }
  
      //Now hum check karenge ki jo note.user ki id hai and jo user n id di hai vo same hai ki nhi
      //means jo user logged in hai uski id and jo note vo access krra hai uski id same hai ki nhi mtlb user apne note ko he update kr skta hai
      if(note.user.toString()!==req.user.id){
          return res.status.send(404).send("Not Allowed..");
      }
      note=await Note.findByIdAndDelete(req.params.id);
      res.json({"Success ":"Note has been deleted...",note:note});
    } catch (error) {
    
      res.status(500).send("Internal error occured..")
    }
  });




module.exports = router;

import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  let host = "http://localhost:5000"
  //USING CONTEXT API
  let initialNotes = []
  //Using useState hook to set value of notes and updating it with setNotes function
  const [notes, setNotes] = useState(initialNotes);


  //FETCHING ALL NOTES
  const fetchAllNotes = async () => {

    //Fetching all notes from  backend
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         // Jo user login in karega uska authToken localstorage m save ho jayega whi s hum authToken lere hai 
         //Authtoken hum isliye generate krre hai bcoz hum chahte hai jo user logged in hai vo apne he notes dekh paye,edit kr paye delete kr paye
        'auth-token': localStorage.getItem("token")
      },


    });
   
    const json=await response.json();
    //console.log(json)
    setNotes(json);
  }




  //ADDING A NOTE
  const addNote = async (title, description, tag) => {

    //Adding in backend
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token")
      },

      body: JSON.stringify({ title: title, description: description, tag: tag })

    });

    const note = await response.json();
    console.log(note);
    console.log("Adding a new note");

    //On adding notes we are concatinating older notes to note to be added
    setNotes(notes.concat(note));
  }



  //DELETE A NOTE
  //TODO API CALL
  const deleteNote = async(id) => {
    //logic to edit on backed
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token")
      },
    });

    const json = await response.json();
    //console.log(json);

    //Logic to delete from UI Screen
    console.log("Note to be delete with id :" + id)
    const newNotes = notes.filter((item) => {
      if (item._id != id) {
        return true;
      }
    })

    setNotes(newNotes);
  }



  //EDIT A NOTE
  const editNote = async (id, title, description, tag) => {

    //logic to edit on backed
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token")
      },

      body: JSON.stringify({ title: title, description: description, tag: tag })

    });

    const json = response.json();

    //logic to edit on client side

    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      //console.log(id);
      let element = newNotes[i];
      if (element._id == id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
         break;
      }
     
    }
   
    setNotes(newNotes);
  }



  return (
    <>
      {/* //Kisi bhi component m initialNotes ki value ko access kr skte hai by wrapping it into <NoteState></NoteState>
    //variable k sath hum kisi function ko bhi access kr skte hai 
    //We will be using setNotes function to set value of notes 
    //we will be using notes nd setNotes function in Notes component*/}
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,fetchAllNotes}}>
        {props.children}
      </NoteContext.Provider>

    </>

  )
}

export default NoteState;




















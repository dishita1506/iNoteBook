import React, { useContext } from "react";
import noteContext from "../context/NoteContext"

const NoteItem = (props) => {
    //using useContext hook
    const context=useContext(noteContext);

    //using delete function passed from NoteState component
   const {deleteNote}=context;

    const { note ,updateNote} = props;
    return (
        <div className="col-md-3">


            <div className="card my-3" >

                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>

                    {/* Jab hum delete pr click krre h to deleteNote function chlra hai and uss note ki id hum pass krre hai as an argument */}

                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Note Deleted successfully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    

                </div>
            </div>
        </div>
    )
}

export default NoteItem;
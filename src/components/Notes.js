import React, { useContext, useEffect ,useRef,useState} from "react";
import noteContext from "../context/NoteContext"
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {

    let navigate=useNavigate();
    // We will be using notes and fetchAllNotes here 
    const context = useContext(noteContext);
    const { notes, fetchAllNotes ,editNote} = context;
    useEffect(() => {
      
        //Jo user logged in hai matlb uska authtoken localstorage m store hai 
        //agr localStorage m authtoken hai to uss user ko user notes dikha do
        if(localStorage.getItem("token")){
        fetchAllNotes();
        }
        else{
        //Warna usko login page pr redirect krrdo
        navigate("/login")
        }
    }, [])

    //UPDATE NOTE
    const updateNote = (currNote) => {
     ref.current.click();
     setNote({id:currNote._id,etitle:currNote.title,edescription:currNote.description,etag:currNote.tag});
  
    }
    
    //Using useRef hook which is used to give refrence to any variablle or function
    const ref=useRef(null);
    const refClose=useRef(null);
    
     
    //Initially setNote ki help s title,desc,tag empty hai
    const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" }); 

    //add Note button k click pr addNote function jo NoteState s arra hai vo run hoga and note add ho jayega
    const handleClick = (e) => {
        e.preventDefault();
        console.log("Note is updating",note);
        //modal close hone s pehle hume value ko update bhi krna hai
        editNote(note.id,note.etitle,note.edescription,note.etag);
       //update btn k click hone pr modal close ho jayegi
        refClose.current.click();
        props.showAlert("Note Updated successfully","success");
      
    };
    
    //Jaise he input dabbe ki value change hogi setNote function s hum poorane sare note and ye new note ko concatinate kr denge
    const onChange = (e) => {
        // ...note is spread operator ---> note m poorani value +new value
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote  showAlert={props.showAlert}/>
            <button style={{'display':'none'}} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Launch demo modal
          </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange}  value={note.etitle}  />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                    </div>
                    
                    
                </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<3}  type="button"  className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* DIV THAT WILL CONTAIN YOUR NOTES */}
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-3 my-2">
                  
                  {/* Agar koi notes nhi honge to No notes to display message aayega.. */}
                  {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem note={note} key={note._id} updateNote={updateNote}  showAlert={props.showAlert}/>;
                })}
            </div>
        </>
    )
}

export default Notes
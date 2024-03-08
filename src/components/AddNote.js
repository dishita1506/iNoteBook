import React, { useContext, useState } from 'react'
import noteContext from "../context/NoteContext"
export default function AddNote(props) {

    // using useContext hook
    const context = useContext(noteContext);

    //addNote is a function passed from NoteState component
    const { addNote } = context;
    
    //Initially setNote ki help s title,desc,tag empty hai
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
     
    //add Note button k click pr addNote function jo NoteState s arra hai vo run hoga and note add ho jayega
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);

        //ek baar note add hone k baad input dabbe empty ho jane chaiye
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added successfully","success");
      
    };
    
    //Jaise he input dabbe ki value change hogi setNote function s hum poorane sare note and ye new note ko concatinate kr denge
    const onChange = (e) => {
        // ...note is spread operator ---> note m poorani value +new value
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            {/* DIV THAT WILL CONTAIN FORM TO SUBMIT YOUR NOTES */}
            <div className="container my-3">
                <h2 className="mb-3">Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}  />
                    </div>
                    
                    <button  disabled={note.title.length<5 || note.description.length<5 || note.tag.length<3}   type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

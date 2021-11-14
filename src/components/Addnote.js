import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import { useState } from 'react';
const Addnote = () => {
    const context =useContext(noteContext);
    const{addNote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"});
    
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }

    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
             <h1>Add a Note</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                     
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className ="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add This Note</button>
            </form>
        </div>
    )
}

export default Addnote

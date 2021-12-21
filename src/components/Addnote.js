import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import { useState } from 'react';
const Addnote = (props) => {
    const context =useContext(noteContext);
    const{addNote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"});
    
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:"default"});
        props.showAlert("Added Successfully","success");
    }

    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
             <h1 className='my-2'>Add a Note</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={3}
                        
                    />
                     
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}  value={note.description} minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}   value={note.tag} minLength={3}/>
                </div>
                <button disabled={note.title.length<3 || note.description.length<3 ||  note.tag.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>Add This Note</button>
            </form>
        </div>
    )
}

export default Addnote

import React, { useContext, useEffect, useRef } from 'react'
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote'
import { useState } from 'react';
import { useNavigate } from 'react-router';
export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    let history=useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log();
        getNotes();}
        else{
            history("/login")
        }
        // eslint-disable-next-line 
    })
    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (note) => {
        ref.current.click();
        setnote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
        
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        // e.preventDefault();
        props.showAlert("Note edited","success");

    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Addnote showAlert={props.showAlert}></Addnote>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange}
                                        minLength={3}
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}
                                        minLength={5}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}
                                        minLength={3}
                                    />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary" disabled={note.etitle.length < 3 || note.edescription.length < 3 || note.etag.length < 3}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && "no notes to display"}</div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert}note={note}></Noteitem>
                })}
            </div>
        </>
    )
}


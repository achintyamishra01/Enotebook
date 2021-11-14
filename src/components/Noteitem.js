import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3">
            <div className="card my-3" >

                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-pencil-alt mx-2" ></i>
                    <i className="far fa-trash-alt mx-2" onClick={() => {
                        deleteNote(note._id)
                    }} ></i>

                </div>
            </div>
        </div>
    )
}

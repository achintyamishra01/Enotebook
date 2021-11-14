import React,{useContext} from 'react'
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext'
export default function Notes() {
    const  context = useContext(noteContext);
    const {notes,addNote,editNote,deleteNote}=context;
    return (
        <div className=" row my-3">
            <h1>Your Notes</h1>
             {notes.map((note)=>{
                            return <Noteitem note={note}></Noteitem>
                        })}
        </div>
    )
}

 
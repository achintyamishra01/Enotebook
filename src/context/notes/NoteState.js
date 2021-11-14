
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
//use of context api


// const s1={
//     "name"    :"Achintya",
//     "class"  :"12"
// }
// const [state,setState]=useState(s1);

// use of state mixed with context api

// const update=()=>{
//     setTimeout(() => {
//         setState({
//     "name":"msh",
//     "class":"11"

//         })
//     }, 1000);
// }

const notesInitial=[
    {
      "_id": "618fbb7f3fde4ea0918cd4e5",
      "user": "617e255e8bd1e16683ed446a",
      "title": "hello baby pranav    ",
      "description": "how r u doing  beta",
      "tag": "personal testing",
      "date": "2021-11-13T13:19:59.892Z",
      "__v": 0
    },
    {
      "_id": "618fbb7f3fde4ea0918cd425",
      "user": "617e255e8bd1e16683ed446a",
      "title": "hello baby ansh  ",
      "description": "how r u doing  beta",
      "tag": "personal testing",
      "date": "2021-11-13T13:19:59.892Z",
      "__v": 0
    },
    {
      "_id": "618fbb7f3fde4ea0918c34e5",
      "user": "617e255e8bd1e16683ed446a",
      "title": "hello baby pranav    ",
      "description": "how r u doing  beta",
      "tag": "personal testing",
      "date": "2021-11-13T13:19:59.892Z",
      "__v": 0
    },
    {
      "_id": "618fbb7f3fde4ea0918c24e5",
      "user": "617e255e8bd1e16683ed446a",
      "title": "hello baby pranav    ",
      "description": "how r u doing  beta",
      "tag": "personal testing",
      "date": "2021-11-13T13:19:59.892Z",
      "__v": 0
    },
    {
      "_id": "618fbb7f3fde4ea0918c124e5",
      "user": "617e255e8bd1e16683ed446a",
      "title": "hello baby pranav    ",
      "description": "how r u doing  beta",
      "tag": "personal testing",
      "date": "2021-11-13T13:19:59.892Z",
      "__v": 0
    },
    {
      "_id": "618fbb7f3fde4ea0918cdre5",
      "user": "617e255e8bd1e16683ed446a",
      "title": "hello baby pranav    ",
      "description": "how r u doing  beta",
      "tag": "personal testing",
      "date": "2021-11-13T13:19:59.892Z",
      "__v": 0
    },
    {
      "_id": "618fbb7f3fde4ea0918cdfde5",
      "user": "617e255e8bd1e16683ed446a",
      "title": "hello baby pranav    ",
      "description": "how r u doing  beta",
      "tag": "personal testing",
      "date": "2021-11-13T13:19:59.892Z",
      "__v": 0
    },
    {
      "_id": "618fbb7f3fde4ea0918cd485",
      "user": "617e255e8bd1e16683ed446a",
      "title": "hello baby pranav    ",
      "description": "how r u doing  beta",
      "tag": "personal testing",
      "date": "2021-11-13T13:19:59.892Z",
      "__v": 0
    },
    
  ]
  const [notes, setNotes] = useState(notesInitial);
  
  //add a note
    const addNote=(title,description,tag)=>{
      let note=null;
      setNotes(notes.push(note));
    }


    //delete a note
const deleteNote=(title,description,tag)=>{
      let note=null;
      setNotes(notes.pop(note));
    }
//edit a note

    const editNote=(title,description,tag)=>{
      let note=null;
      setNotes(notes.push(note))
    }
return (

    <NoteContext.Provider value={{notes,addNote,editNote,deleteNote}}>
        {props.children}
    </NoteContext.Provider>
)

}

export default NoteState;
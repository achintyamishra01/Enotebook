
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
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
  const localhost = "http://localhost:4000"
  const notesInitial = [
    // {
    //   "_id": "618fbb7f3fde4ea0918cd4e5",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": "hello baby pranav    ",
    //   "description": "how r u doing  beta",
    //   "tag": "personal testing",
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "618fbb7f3fde4ea0918cd425",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": "hello baby ansh  ",
    //   "description": "how r u doing  beta",
    //   "tag": "personal testing",
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "618fbb7f3fde4ea0918c34e5",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": "hello baby pranav    ",
    //   "description": "how r u doing  beta",
    //   "tag": "personal testing",
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "618fbb7f3fde4ea0918c24e5",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": "hello baby pranav    ",
    //   "description": "how r u doing  beta",
    //   "tag": "personal testing",
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "618fbb7f3fde4ea0918c124e5",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": "hello baby pranav    ",
    //   "description": "how r u doing  beta",
    //   "tag": "personal testing",
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "618fbb7f3fde4ea0918cdre5",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": "hello baby pranav    ",
    //   "description": "how r u doing  beta",
    //   "tag": "personal testing",
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "618fbb7f3fde4ea0918cdfde5",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": "hello baby pranav    ",
    //   "description": "how r u doing  beta",
    //   "tag": "personal testing",
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "618fbb7f3fde4ea0918cd485",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": "hello baby pranav    ",
    //   "description": "how r u doing  beta",
    //   "tag": "personal testing",
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // },

  ]
  const [notes, setNotes] = useState(notesInitial);
  //get all notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${localhost}/api/notes/fetchallnotes`, {
      method: 'GET',


      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },


    });
    const json = await response.json();
    setNotes(json);
  }






  //add a note

  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${localhost}/api/notes/addnotes`, {
      method: 'POST',


      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

      body: JSON.stringify({ title: title, description: description, tag: tag })
    });
    const json = await response.json();
    console.log("added")
    // let note = {
    //   "_id": "618fbb7f3fde4ea0918cd485",
    //   "user": "617e255e8bd1e16683ed446a",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2021-11-13T13:19:59.892Z",
    //   "__v": 0
    // };
    setNotes(notes.concat(json));
  }


  //delete a note



  const deleteNote = async (id) => {
    //api call

    const response = await fetch(`${localhost}/api/notes/deletenote/${id}`, {
      method: 'DELETE',


      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },


    });
    const json = response.json();
    console.log(json);
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call


    const response = await fetch(`${localhost}/api/notes/updatenote/${id}`, {
      method: 'PUT',


      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);


    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }



  return (

    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;
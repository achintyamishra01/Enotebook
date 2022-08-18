const express=require("express");
const router=express.Router();
const fetchUser=require("../middleware/fetchUser")
const Notes=require("../models/Notes")
const{body,validationResult}=require("express-validator")


//Route 1 Get all the notes when user is logged in
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
  try {
    const notes =  await Notes.find({user:req.user.id})
    res.json(notes)
  } catch (error) {
    res.status(500).send("internal server error")
    
  }
 
})




//Route 2 adding notes
router.post('/addnotes',fetchUser, 

async (req, res) => {try {const {title,description,tag}=req.body;
  //code for error handling
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}
const note =new Notes({
title,description,tag,user:req.user.id
})


const saveNote=await note.save();
res.json(saveNote )
    
  } catch (error) {
    console.log(error)
    res.status(500).send("server error")
  }

  })

//Route 3: updating an existing note
router.put("/updatenote/:id",fetchUser,async(req,res)=>{
  const {title,description,tag}=req.body;
  //create a newNote object
  const newNote={};
  if(title){newNote.title=title};
  if(description){newNote.description=description};
  if(tag){newNote.tag=tag};



//finding the note that is to bne updated
//checking whether same user is changing its notes so that other user can"t update someone"s else notes
let note=await Notes.findById(req.params.id);
if(!note){
 return  res.status(400).send("not found");
}
if(note.user.toString()!==req.user.id){
  return res.status(401).send("not allowed");

}
note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json(note);
}) 


//route 4 deleting a note
router.delete("/deletenote/:id",fetchUser,async(req,res)=>{

  let note=await Notes.findById(req.params.id);
if(!note){
 return  res.status(400).send("not found");
}
if(note.user.toString()!==req.user.id){
  return res.status(401).send("not allowed");

}
note =await Notes.findByIdAndDelete(req.params.id)
res.json({"Success": "note has been deleted"});

})










  module.exports=router;
const note = require("../Models/note");
const noteModel = require("../Models/note");



const createNotes = async(req,res)=>{
    const {title , description} = req.body;

    const newNote = new noteModel({
        title : title,
        description : description,
        userId : req.userId
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error while saving note"});
    }

}

const updateNotes = async(req,res)=>{
        const id = req.params.id;
        const {title , description} = req.body;
        const newNote ={
            title:title,
            description:description,
            userId:req.userId
        }

        try {
            await noteModel.findByIdAndUpdate(id,newNote,{new : true})
            res.status(200).json(newNote);
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"error while updating note"});    
        }
}
const deleteNotes = async(req,res)=>{
        const id = req.params.id;
        try {
            const note = await noteModel.findByIdAndDelete(id);
            res.status(200).json(note);
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"error while deleting note"});    
        }
}
const getNotes = async(req,res)=>{
        try {
            const notes = await noteModel.find({userId : req.userId});
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({message:"error while getting notes"});
        }
}



module.exports = {
    createNotes,updateNotes,deleteNotes,getNotes
}
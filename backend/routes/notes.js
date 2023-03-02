const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTES 1 :Get All the Notes using : Get "/api/notes/fetchallnotes".  login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Sever Error");
   }
})


// ROUTES 2 :Add a new Notes using : POST "/api/notes/addnote".  login required
router.post('/addnote', fetchuser, [
   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),], async (req, res) => {

      try {
         const { title, description, tag} = req.body;

         // if there are errors, return bad request and the errors
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
         }

         const notes = new Note({
            title, description, tag, user: req.user.id
         })
         const savedNote = await notes.save()
         res.json(savedNote)

      } catch (error) {
         console.error(error.message);
         res.status(500).send("Internal Server Error");
      }
   })


// ROUTES 3 :Update an existing  Notes using : Put "/api/notes/updatenote".  login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;

   try {
      // Create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      //Find the Notes to be updates and update it 
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // if(note.user.toString() !== req.user.id){
      //    return res.status(401).send("Not Allowed");
      // }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json({ note });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }

})



// ROUTES 4 :Delete an existing  Notes using : Delete "/api/notes/deletenote".  login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
      //Find the Notes to be deletd and delete it 
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      // if(note.user.toString() !== req.user.id){
      //    return res.status(401).send("Not Allowed");
      // }

      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ "Success": "Note has been deleted", note: note });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }

})


module.exports = router 
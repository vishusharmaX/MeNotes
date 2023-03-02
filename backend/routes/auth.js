const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Harryisagoodboy';

// ROUTES 1 : Create a User using : POST "/api/auth/createuser". NO login require
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
  let success= false;
  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  // Check Whheter the user with this email exists already 
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create  a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    success =true ;
    res.json({success,authtoken })

    //Catch errors
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
})
// ROUTES 2 :Authenticate  a User using : POST "/api/auth/login". NO login required

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password Cannot be blank').exists(),
], async (req, res) => {
  let success =false; 
  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct Crendentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({success, error: "Please try to login with correct Crendentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success,authtoken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error Occured");
  }

})


// ROUTES 3 :Get loggedin User details : POST "/api/auth/getuser".  login required

router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error Occured");
  }
})

module.exports = router 
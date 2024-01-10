const router = require("express");
const app = router();
const User = require("../models/Usermodel");
const jwt = require('jsonwebtoken');
 
let serverRole='';
let refresh = true;
let key;
app.post('/register', async (req, res) => {
    key = Math.random();
    const newUser = new User({
        key: key,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,  // Corrected typo here
        role: req.body.role
    });
    try {
        const userSaved = await newUser.save();
        res.status(200).json(userSaved);
    } catch (err) {
        res.status(500).json(err);
    }
});

console.log("getdetail",serverRole);
 

app.get('/getdetails', async (req, res) => {
    // if (serverRole === "Admin") {
        try {
            // Fetch all documents from the "user" collection
        
            
                const allUsers = await User.find();
                // Process the data to create userInfo
                const userInfo = {
                    totalUsers: allUsers.length,
                    adminCount: allUsers.filter(user => user.role === "Admin").length,
                    normalCount: allUsers.filter(user => user.role === "Normal").length,
                };
                console.log("userINFO",userInfo);
                return res.status(200).json({ message: "Accessing by the Admin user successful", userInfo ,allUsers});
            }
         catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
         }
    // } else {
    //     return res.status(401).json({ message: "Can't be accessed by the Normal User" });
    // }
});

app.post('/login', async (req, res) => {
    try {
        const usernameToFind = req.body.username.trim();  // Trim username

        console.log('Username to find:', usernameToFind);

        const namecompare = await User.findOne({ username: req.body.username } );

        console.log('namecompare:', namecompare);

        if (!namecompare) {
            console.log('User not found');
            return res.status(400).json({ message: "Wrong credentials" });
        }

        if (req.body.password === namecompare.password) {
            const token = jwt.sign({ username: namecompare.username, role: namecompare.role }, 'oidsfnsodnfoisd');
          
            serverRole=  namecompare.role;
            console.log("serverRole",serverRole)
            console.log('Password matched');
            return res.status(200).json({ message: `Login successful as ${namecompare.role}`, role:namecompare.role, token:token });
        }  
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//updating the user:

// Update user by key
app.put('/updateUser/:key', async (req, res) => {
    const { username, password } = req.body;
     refresh = req.body.refresh;
     console.log("refffffffressh",refresh);
    const { key } = req.params;
  
    try {
      // Check if the new username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser.key !== key) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Check if the new key is already taken
      const existingKey = await User.findOne({ key });
      if (existingKey && existingKey.key !== key) {
        return res.status(400).json({ message: 'Key already exists' });
      }
  
      // Assuming "key" is a unique identifier in your User model
      const updatedUser = await User.findOneAndUpdate({ key }, { username, password }, { new: true });
  
      if (updatedUser) {
        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
      } 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
   
  });
  
module.exports = app;

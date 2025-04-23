const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./User')
const EpassModel = require('./Epass');
const AuthUser = require('./AuthUser');
require("dotenv").config(); 


const app = express()
app.use(cors())
app.use(express.json())

//mongoose.connect('mongodb://127.0.0.1:27017/Company')
//.then(() => console.log('DB connected'))
//.catch(err => console.log(err))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));

//Register API Route
app.post('/register',(req,res)=>{
    UserModel.create(req.body)
    .then(res.json('Data Saved Successfully'))
    .catch(err=>res.json(err))
    })
    
// //Create API End Points (HTTP Request,Response)
// app.get('/',(req,res)=>{
// res.send('Welcome to Node JS Server')
// })


app.post('/epass', (req, res) => {
    EpassModel.create(req.body)
      .then(() => res.json("E-Pass Created"))
      .catch(err => res.json(err));
  });
  
  // Update E-Pass
  app.put('/epass/:id', (req, res) => {
    EpassModel.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.json("E-Pass Updated"))
      .catch(err => res.json(err));
  });
  
  // Get all E-Passes
  app.get('/epasses', (req, res) => {
    EpassModel.find()
      .then(data => res.json(data))
      .catch(err => res.json(err));
  });
  
// Signup Route
const bcrypt = require("bcryptjs");

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await AuthUser.findOne({ email });
    if (existing) return res.status(400).json("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    const newUser = await AuthUser.create({
      email,
      password: hashedPassword,
    });

    res.json("User registered successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});
const jwt = require("jsonwebtoken");
const SECRET_KEY = "yourSecretKey";

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthUser.findOne({ email });

    if (!user) return res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json("Invalid credentials");

    // Generate JWT Token
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    // Send token back to frontend
    res.json({ message: "Login successful", token, email: user.email });

  } catch (err) {
    res.status(500).json(err);
  }
});


app.get("/epasses/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const epasses = await EpassModel.find({ email });
    res.json(epasses);
  } catch (err) {
    res.status(500).json(err);
  }
});


//config PORT and Start Server
const PORT = 8000
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})

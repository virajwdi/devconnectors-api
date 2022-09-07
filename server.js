
const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const posts = require('./routes/posts');
const profile = require('./routes/profile');
const mongoose = require('mongoose');
const db = require('./config/key').mongoURI;
const app = express();
const passport = require('passport');
app.use(cors());
let corsOptions = {
    origin: [   'http://localhost:3000' ]
}
app.options(corsOptions, cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', users);
app.use(passport.initialize());
app.use('/api/profile',profile); 
app.use('/api/posts',posts);
mongoose.connect(db).then((res) => { console.log("conenctted", res); }).catch((err) => { console.log("err ", err) });
app.get('/',(req,res)=>{
    res.send("welcome eeee")
})

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport)
app.use('/api/profile', profile);


const port = 5000;
app.listen(port, () => {
    console.log(`listning at port ${port}`)
});

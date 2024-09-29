const express = require('express');
const credndb=require('./Credentials');
const firebase_firestore=require("firebase/firestore");
const getters=require("./getters");
const setters=require("./setters");
const winston = require("winston");
const https=require('https');
const fs=require('fs');
const multer=require("multer");
const { getHomeFromDB,getLikedUsers,getchildpids,get_post_from_postid,sendImage }=getters;
const { createUserProfile,addPost,likeit,deletePost,uploadMedia }=setters;
const { collection, query, where, getDocs } =firebase_firestore;

var key=fs.readFileSync('selfsigned.key')
var cert=fs.readFileSync('selfsigned.crt')

var options = {
    key: key,
    cert: cert
  };

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"media/");
    },
    filename: function(req,file,cb){
        var filename=file.originalname;
        cb(null,filename);
    }
});

const upload = multer({ storage: storage })


const app = express();
const db=credndb.db;
const cors= require('cors');
app.use(cors());
app.use(express.json());


//logger init
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logs/app.log" }),
    ],
  });


//paths
app.post('/login',async function(req,res){ res.send(await verifyUser(req,res) ) });
app.get('/likes',async function(req,res) { res.send(await getLikedUsers(db,req.query.postID)) });
app.post('/signup',async function(req,res) { res.send( await createUserProfile(db,req) )})
app.get('/users',async function(req,res) {  res.send(await getUserData(req,res)) } );
app.get('/post',async function(req,res) {  res.send(await get_post_from_postid(db,req.query.postID)) } );
app.get('/homepostids',async function(req,res) {  res.send(await getHome(req,res)) } );
app.get("/likeit",async function(req,res){ res.send(await likeit(db,req.query.username,req.query.postID) ) });
app.post('/newpost',async function(req,res) { var postobj=await addPost(db,req.body);res.send(postobj);});
app.get("/childpids",async function(req,res) {  res.send(await getchildpids(db,req.query.postID));  });
app.post("/postimage",upload.single('file'),function(req,res){ uploadMedia(db,req,res) })
app.delete("/deletePost",async function(req,res){ var j=await deletePost(db,req.query.postID);res.send(j) });
app.post("/getImage",function(req,res){sendImage(req,res)})


//callback handlers
async function getUserData(req,res){
    return await getters.getUserDataFromDB(db,req.query.username);
}


async function getPostsData(req,res) {
    return await getters.getPostsDataFromDB(db,req.query.postID,req.query.username);
}

async function getHome(req,res){
    return await getHomeFromDB(db,req.query.username,req.query.lastpostid,req.query.firstpostid);
}  

async function verifyUser(req,res){
    var boole = await getters.verifyCredentialsFromDB(db,req.body.username,req.body.password);
    return({isValid: boole,username: req.body.username});
}

var server = https.createServer(options, app);

const port=8000

server.listen(port, () => {
    console.log("server starting on port : " + port)
  });
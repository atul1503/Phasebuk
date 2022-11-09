const express = require('express');
const credndb=require('./Credentials');
const firebase_firestore=require("firebase/firestore");
const getters=require("./getters");
const { getHomeFromDB,getPostsDataFromDB }=getters;
const { collection, query, where, getDocs } =firebase_firestore;


const app = express();
const db=credndb.db;

const PORT=8000;
const cors= require('cors');
app.use(cors());


//paths
app.get('/users',async function(req,res) {  res.send(await getUserData(req,res)) } );
app.get('/posts',async function(req,res) {  res.send(await getPostsData(req,res)) } );
app.get('/home',async function(req,res) {  res.send(await getHome(req,res)) } );


//callback handlers
async function getUserData(req,res){
    return await getters.getUserDataFromDB(db,req.query.username);

}

async function getPostsData(req,res) {
    return await getters.getPostsDataFromDB(db,req.query.postID);
}

async function getHome(){
    //provide username as req.query
    return await getHomeFromDB(db,req.query.username,req.query.lastpostid);
    


}

app.listen(PORT,function() { console.log("App is running at port "+PORT) });

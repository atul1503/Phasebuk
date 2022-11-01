const express = require('express');

const app = express();

const credndb=require('./Credentials');
const firebase_firestore=require("firebase/firestore");

const { collection, query, where, getDocs,getDoc,doc } =firebase_firestore;
//import { collection, query, where, getDocs } from "firebase/firestore";
const db=credndb.db;

const cors= require('cors');
const { setDoc } = require('firebase/firestore');

app.use(cors());

app.get('/users',function(req,res) { return getUserData(req,res); } );

app.get('/posts',function(req,res) { return getPostsData(req,res); } );


 async function getUserData(req,res){

    var username=req.query.username;
    //console.log(username);
    var usercoll=collection(db,"User");
    var q= query(usercoll,where("username","==",username));
    var qSnapshot=await getDocs(q);
   console.log(qSnapshot);
    var userobj=qSnapshot.docs[0].data();
    console.log(qSnapshot.docs[0].id);
    return userobj;

}

async function pip() {
var a=await setDoc(doc(db,"User","Tuliinki"),
{
    username: "Tikku",
    age : 27
}
);
}

pip();


function getPostsData(req,res) {


}



module.exports=getUserData;
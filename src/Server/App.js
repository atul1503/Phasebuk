const express = require('express');
const credndb=require('./Credentials');
const firebase_firestore=require("firebase/firestore");
const getters=require("./getters");

const app = express();
const { collection, query, where, getDocs } =firebase_firestore;
const db=credndb.db;


const cors= require('cors');
const { getDefaultEmulatorHostnameAndPort } = require('@firebase/util');
app.use(cors());


//paths
app.get('/users',function(req,res) { return getUserData(req,res); } );
app.get('/posts',function(req,res) { return getPostsData(req,res); } );
app.get('/home',function(req,res) { return getHome(req,res)} )


//callback handlers
async function getUserData(req,res){
    return getters.getUserDataFromDB(db,req.query.username);
}

async function getPostsData(req,res) {
    return getters.getPostsDataFromDB(db,req.query.postID);
}

async function getHome(){
    //provide username as req.query
    


}

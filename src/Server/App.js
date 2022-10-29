const express = require('express');

const app = express();

const cors= require('cors');

app.use(cors());

app.get('/users',function(req,res) { return getUserData(req,res); } );

app.get('/posts',function(req,res) { return getPostsData(req,res); } );


function getUserData(req,res){

}

function getPostsData(req,res) {

}



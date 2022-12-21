const { deleteDoc } = require("firebase/firestore");
const firestore = require("firebase/firestore");
const {doc,getDoc,setDoc}=firestore;
const credndb= require("./Credentials");

var db=credndb.db;

async function processPosts() {
    for (var i = 0; i < 150; i++) {
      const obj = await getDoc(doc(db, "Posts", i.toString()));
      if (!obj.data()) continue;
      var vobj = obj.data();
      if(true) {
        deleteDoc(doc(db,"Posts",i.toString()));
        console.log("deleted "+i)
      } 
    }
  }

  
processPosts().then(()=>{});
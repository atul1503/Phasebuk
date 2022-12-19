const firestore = require("firebase/firestore");
const {doc,getDoc,setDoc}=firestore;
const credndb= require("./Credentials");

var db=credndb.db;

async function processPosts() {
    for (var i = 0; i < 70; i++) {
      const obj = await getDoc(doc(db, "Posts", i.toString()));
      if (!obj.data()) continue;
      var vobj = obj.data();
      if (vobj.postID) vobj = { ...vobj, postID: Number(vobj.postID) };
      if (vobj.parentPostID) vobj = { ...vobj, parentPostID: Number(vobj.parentPostID) };
      await setDoc(doc(db, "Posts", i.toString()), vobj);
      console.log("written");
    }
  }

  
processPosts().then(()=>{});
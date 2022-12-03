const { async } = require("@firebase/util");
const { getDoc, setDoc } = require("firebase/firestore");
const firestore=require("firebase/firestore");
const { collection, query, where, getDocs,orderBy,setDocgetDoc,doc } =firestore;

async function setDocinTable(db,collection_name,document_obj,id){
    await setDoc(doc(db,collection_name,id),document_obj);
 }


async function setPostFromDB(db,postObj){
    setDocinTable(db,"Posts",postObj,postObj.postID);
}

async function getMaxPostId(db){
    //console.log("hi");
    var docSnap=await getDoc(doc(db,"MaxIdTable","postidmax"));
    return docSnap.data().postidmax;
}



async function incrementMaxPostId(db){
    var docsnap=await getDoc(doc(db,"MaxIdTable","postidmax"));
    await setDoc(doc(db,"MaxIdTable","postidmax"),{ postidmax: (docsnap.data().postidmax)+1});
}



async function addPost(db,postobj){
    //console.log("hi");
    var maxi=await getMaxPostId(db);
    postobj.postID=(maxi+1).toString();
    await setDoc(doc(db,"Posts",postobj.postID.toString()),postobj);
    incrementMaxPostId(db);

}

async function createUserProfile(db,req){
    var obj=req.body;
    await setDoc(doc(db,"Credentials",obj.username),{username:obj.username,password:obj.password});
    delete obj.rep_password;
    delete obj.password;
    await setDoc(doc(db,"User",obj.username),obj);
    return {success: true};
   
}


module.exports={
    setPostFromDB,
    addPost,
    createUserProfile

}


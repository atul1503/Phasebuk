const { async } = require("@firebase/util");
const { getDoc, setDoc, increment, deleteDoc } = require("firebase/firestore");
const firestore=require("firebase/firestore");
const { collection, query, where, getDocs,orderBy,setDocgetDoc,doc } =firestore;
const { isPostLiked } =require("./getters");

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
    var maxi=await getMaxPostId(db);
    postobj.postID=(maxi+1);
    await setDoc(doc(db,"Posts",postobj.postID.toString()),postobj);
    await incrementMaxPostId(db);
    if(postobj.parentPostID>0){
        var parentpostdoc=await getDoc(doc(db,"Posts",postobj.parentPostID.toString()));
        var obj=parentpostdoc.data();
        if(obj.nocp) {obj.nocp=obj.nocp+1;}
        else {obj.nocp=1}
        await setDoc(doc(db,"Posts",postobj.parentPostID.toString()),obj);
    }

}

async function createUserProfile(db,req){
    var obj=req.body;
    await setDoc(doc(db,"Credentials",obj.username),{username:obj.username,password:obj.password});
    delete obj.rep_password;
    delete obj.password;
    await setDoc(doc(db,"User",obj.username),obj);
    return {success: true};
   
}


async function likeit(db,username,postid){
    var docref=doc(db,"LikedBy",username+postid);
    if(await (await getDoc(docref)).data()) {
        //user already liked it
        deleteDoc(docref);
        var postobj=(await getDoc(doc(db,"Posts",postid))).data();
        if(postobj.likes>0) postobj.likes--; 
        await setDoc(doc(db,"Posts",postid),postobj);   
        return({});
    }
    await setDoc(docref,{username: username,postID: postid});
    var postobj=(await getDoc(doc(db,"Posts",postid))).data();
    postobj.likes++;
    await setDoc(doc(db,"Posts",postid),postobj);
    return(postobj);

}


async function deletePost(db,postID){
    var postobj=(await getDoc(doc(db,"Posts",postID))).data();
    await deleteDoc(doc(db,"Posts",postID));
    if(postobj.likes>0){
        var q=query(collection(db,"LikedBy"),where("username","==",postID));
        var qsnapshot=await getDocs(q);
        qsnapshot.forEach(function(doc){
            deleteDoc(doc(db,"LikedBy",doc.id));
        })    
    }
    if(postobj.parentPostID<=0) return "success";
    var docref=doc(db,"Posts",postobj.parentPostID.toString());
    var parentpost=(await getDoc(docref)).data();
    parentpost.nocp--;
    await setDoc(docref,parentpost);
    return "success";
}

module.exports={
    setPostFromDB,
    addPost,
    createUserProfile,
    likeit,
    deletePost

}


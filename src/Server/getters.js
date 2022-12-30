const { getCountFromServer } = require("firebase/firestore");
const firestore=require("firebase/firestore");
const { collection, query, where, getDocs,orderBy,limit,doc,getDoc,startAfter } =firestore;


async function getUserDataFromDB(db,id){
    var usercoll=collection(db,"User");
    var q= query(usercoll,where("username","==",id));
    var qSnapshot=await getDocs(q);
    var userobj=qSnapshot.docs[0].data();
    return userobj;
}

async function getPostsDataFromDB(db,id,username){
    var postObj=(await getDoc(doc(db,"Posts",id))).data();
    return postObj;
}


async function getHomeFromDB(db,id,lastpostid,firstpostid){
    var friendcoll=collection(db,"Friendships");
    var q1=query(friendcoll,where("friend1ID","==",id));
    var qSnapshot=await getDocs(q1);
    var friendsid=[];
    qSnapshot.forEach(function(doc){
        friendsid.push(doc.data().friend2ID);
    });
    friendsid.push(id);
    //console.log(friendsid);
    var postids=[];
    var postcoll=collection(db,"Posts");
        if(lastpostid){
            lastpostid=Number(lastpostid);
        var q2=query(postcoll,where("username","in",friendsid),where("postID","<=",lastpostid),orderBy("postID","desc"),limit(10));
        }
        else if(firstpostid) {
            firstpostid=Number(firstpostid);
            var q2=query(postcoll,where("username","in",friendsid),where("postID",">=",firstpostid),orderBy("postID","desc"),limit(10),startAfter(firstpostid+10));
        }
        else{
            var q2=query(postcoll,where("username","in",friendsid),orderBy("postID","desc"),limit(10));
            //orderBy("timestamp","desc"),limit(10)
        }
        var qSnapshot=await getDocs(q2);
        //console.log(qSnapshot.docs);
        qSnapshot.forEach(function(doc){
            postids.push(doc.data().postID);
        })

        //console.log(postids);
    
    return postids;
}

async function isPostLiked(db,username,postID){
    //is post liked by this username.
    var q=query(collection(db,"LikedBy"),where("postID","==",postID),where("username","==",username));
    var qSnapshot=await getCountFromServer(q);
    if(qSnapshot.data().count>0){
        return true;
    }
    return false;

}

async function verifyCredentialsFromDB(db,id,pass){
    var creddoc=doc(db,"Credentials",id);
    var snapshot=await getDoc(creddoc);
    var ispresent=snapshot.exists();
    if(!ispresent){
        return false;
    }
    if(snapshot.data().password===pass){
        return true;
    }
    return false;
}



async function getNotificationsFromDB(db,id){
    var noticoll=collection(db,"Notifications");
    var q=query(noticoll,where("userid","==",id),where("seen","==",false));
    var qSnapshot=await getDocs(q);
    var notifs=[];
    qSnapshot.forEach(function(doc){
        notifs.push(doc.data);
    })

    return notifs;
}

async function getFriends(id){
    var friendscoll=collection(db,"RecommendedFriends");
    var q=query(friendscoll,where("userid","==",id));
    var qSnapshot=await getDocs(q);
    var recfriends=[];
    qSnapshot.forEach(function(doc){
        recfriends.push(doc.data());
    });
    }
    

async function getFriendRequestsFromDB(id){
    var q=query(collection(db,"PendingRequest"),where("AcceptorID","==",id));
    var qSnapshot=await getDocs(q);
    var FRs=[];
    qSnapshot.forEach(function(doc){
        FRs.push(doc.data());
    });
}


async function getLikedUsers(db,postID){
    var q=query(collection(db,"LikedBy"),where("postID","==",postID));
    var qSnapshot=await getDocs(q);
    var likers=[];
    qSnapshot.forEach(function(doc){
        likers.push(doc.data().username);
    })
    //
    return {likers:likers};
}


async function getchildpids(db,parentpostid){
    var parentpostid=Number(parentpostid);
    //console.log(parentpostid);
    var q=query(collection(db,"Posts"),where("parentPostID","==",parentpostid));
    var qSnapshot=await getDocs(q);
    var arr=[];
    qSnapshot.forEach(function(doc){
        arr.push(doc.data().postID);
    });
    return({arr:arr});
} 

module.exports={
    getUserDataFromDB,
    getPostsDataFromDB,
    getHomeFromDB,
    verifyCredentialsFromDB,
    getNotificationsFromDB,
    getFriends,
    getFriendRequestsFromDB,
    getLikedUsers,
    isPostLiked,
    getchildpids
};
const firestore=require("firebase/firestore");
const { collection, query, where, getDocs,orderBy } =firestore;


async function getUserDataFromDB(db,id){
    var usercoll=collection(db,"User");
    var q= query(usercoll,where("username","==",id));
    var qSnapshot=await getDocs(q);
    var userobj=qSnapshot.docs[0].data();
    return userobj;
}

async function getPostsDataFromDB(db,id){
    var postcoll=collection(db,"Post");
    var q=query(postcoll,where("postID","==",id));
    var qSnapshot=await getDocs(q);
    var postObj=qSnapshot.docs[0].data();
    return postObj;
}


async function getHomeFromDB(db,id,lastpostid){
    var friendcoll=collection(db,"Friendships");
    var q1=query(friendcoll,where("friend1ID","==",id));
    var qSnapshot=await getDocs(q1);
    var friendsid=[];
    qSnapshot.forEach(function(doc){
        friendsid.push(doc.data().friend2ID);
    });
    var posts=[];
    var postcoll=collection(db,"Posts");
    friendsid.forEach(async function(id){
        if(lastpostid){
        var q2=query(postcoll,where("username","==",id),where("postID",">=",lastpostid),orderBy("timestamp","desc").limit(10));
        }
        else{
            var q2=query(postcoll,where("username","==",id),orderBy("timestamp","desc").limit(10));
        }
        var qSnapshot=await getDocs(q2);
        qSnapshot.forEach(function(doc){
            posts.push(doc.data());
        })
    });
    return posts;
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
    var q=query(collection("PendingRequest"),where("AcceptorID","==",id));
    var qSnapshot=await getDocs(q);
    var FRs=[];
    qSnapshot.forEach(function(doc){
        FRs.push(doc.data());
    });
}


module.exports={
    getUserDataFromDB,
    getPostsDataFromDB,
    getHomeFromDB,
    verifyCredentialsFromDB,
    getNotificationsFromDB,
    getFriends,
    getFriendRequestsFromDB
};
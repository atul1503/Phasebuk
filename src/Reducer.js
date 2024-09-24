import e from "cors";


const initState={
    Home:{
        homeposts:[],
        load_prev: false,
        load_next: false
    },
    Comment_page:{
        reply_text:"",
        child_posts: [],
        post: {}
    },    
    username:"",
    login_page:{
        username:"",
        password:""
    }
}

export const reducer=(state=initState,action)=>{
    switch(action.type){
        case "add_posts_to_home":
            return {
                ...state,
                Home: {
                    ...state.Home,
                    homeposts: action.payload.posts
                }
            };
        case "set_user":
            return {
                ...state,
                username: action.payload.username
            }
        case "change_username":
            return {
                ...state,
                login_page: {
                    username: action.payload
                }
            }
        case "change_password":
            return {
                ...state,
                login_page:{
                    ...state.login_page,
                    password: action.payload
                }
            }
        case "set_load_next":
            return {
                ...state,
                Home: {
                    ...state.Home,
                    load_next: action.payload.value
                }
            }
        case "set_load_prev":
            return {
                ...state,
                Home: {
                    ...state.Home,
                    load_prev: action.payload.value
                }
            }
        case "Logout":
            return {
                ...state,
                username:""
            }
        case "set_reply":
            return {
                ...state,
                Comment_page:{
                    ...state.Comment_page,
                    reply_text: action.payload
                }
            }
        case "set_comment_post":
            return {
                ...state,
                Comment_page:{
                    ...state.Comment_page,
                    post: action.payload
                }
            }
        case "add_reply_post":
            //console.log(action.payload);
            return {
                ...state,
                Comment_page:{
                    ...state.Comment_page,
                    child_posts: action.payload
                }
            }
        case "clear_child_posts":
            return {
                ...state,
                Comment_page:{
                    ...state.Comment_page,
                    child_posts:[]
                }
            }
        case "set_like":
            {
                var nstate={...state};
                nstate.Home.homeposts=nstate.Home.homeposts.map(function(e){
                    if(e.postID===action.payload.postID){
                        if(e.isLiked){
                            e.likes-=1
                        }
                        else{
                            e.likes+=1
                        }
                        e.isLiked=action.payload.value;
                    }
                    return e;
                });
                nstate.Comment_page.child_posts=nstate.Comment_page.child_posts.map(function(e){
                    if(e.postID===action.payload.postID){
                        if(e.isLiked){
                            e.likes-=1
                        }
                        else{
                            e.likes+=1
                        }
                        e.isLiked=action.payload.value;
                    }
                    return e;
                })
                if(nstate.Comment_page.post.postID===action.payload.postID){
                    if(nstate.Comment_page.post.isLiked){
                        nstate.Comment_page.post.likes-=1
                    }
                    else{
                        nstate.Comment_page.post.likes+=1
                    }
                    nstate.Comment_page.post.isLiked=action.payload.value;
                }
            }
        default:
            return state
    }
}
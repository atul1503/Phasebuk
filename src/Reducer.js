
const initState={
    Home:{
        homeposts:[],
        load_prev: false,
        load_next: false
    },
    comment_child_posts:[],
    comment_post: null,    
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
        default:
            return state
    }
}
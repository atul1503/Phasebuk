
const initState={
    homeposts:[],
    username:"",
    login_page:{
        username:"",
        password:""
    }
}

export const reducer=(state=initState,action)=>{
    switch(action.type){
        case "add_posts_to_home":
            return {};
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
        default:
            return state
    }
}
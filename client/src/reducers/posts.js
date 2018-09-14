export default function posts(state=[], action) {
    switch(action.type) {
        case 'INCREMENT_LIKES':
            // console.log(action)
            // return [
            //     // ...state.posts.slice(0, action.id),
            //     // {...state.posts[action.id], likes: state[1].likes + 1},
            //     // ...state.posts.slice(action.id + 1)

            // ]
            break;
        
        default: 
            return state;
    }
}
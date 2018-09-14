import { 
    INCREMENT_LIKES,
    POST_COMMENT,
    ADD_ITEMS
} from './types';

// GET_ITEM, 
// GET_ITEMS, 
// DELETE_ITEMS, 
// ITEMS_LOADING,
// DECREMENT_LIKES,
//  DELETE_COMMENT,
//     EDIT_COMMENT

export function increment(id) {
    return {
        type: INCREMENT_LIKES,
        id
    }
}

export function addComment(postId, author, comment) {
    return {
        type: POST_COMMENT,
        postId,
        author,
        comment
    }
}

export function createPost(author, post) {
    return {
        type: ADD_ITEMS,
        author,
        post
    }
}

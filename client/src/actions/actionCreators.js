import { 
    GET_ITEM, 
    GET_ITEMS, 
    ADD_ITEMS, 
    DELETE_ITEMS, 
    ITEMS_LOADING,
    INCREMENT_LIKES,
    DECREMENT_LIKES,
    POST_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT
} from './types';

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

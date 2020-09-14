import { 
    FETCH_POST_LIST,
    // mutations-types에 선언된 FETCH_POST를 추가한다.
    FETCH_POST
} from './mutations-types'

export default {
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts
    },
    [FETCH_POST] (state, post) {
        state.post = post
    }    
}
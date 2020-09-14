import api from '@/api'
import { 
    FETCH_POST_LIST,
    // 1. mutations-types에 선언된 FETCH_POST 변이 타입을 추가한다.
    FETCH_POST
} from './mutations-types'

export default {
    fetchPostList ({ commit }) {
        return api.get('/posts')
            .then(response => {
                commit (FETCH_POST_LIST, response.data);
            })
    },
    fetchPost({ commit }, postId) {
        return api.get(`/posts/${postId}`)
            .then(response => {
                commit (FETCH_POST, response.data)
            })
    }
}
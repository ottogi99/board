import api from '@/api'
import { 
    FETCH_POST_LIST,
    // 1. mutations-types에 선언된 FETCH_POST 변이 타입을 추가한다.
    FETCH_POST,
    SET_ACCESS_TOKEN
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
    },
    signin ({ commit }, payload) {
        // Signin 컴포넌트의 onSubmit 메소드의 내용을 그대로 작성한다.
        const { email, password } = payload
        return api.post('/auth/signin', { email, password })
            .then(response => {
                const { accessToken } = response.data
                // 요청이 성공적으로 종료되어 토큰을 받았다면 SET_ACCESS_TOKEN 변이를 커밋한다.
                commit (SET_ACCESS_TOKEN, accessToken)
            })
    }
}
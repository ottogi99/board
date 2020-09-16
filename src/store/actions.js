import api from '@/api'
import { 
    FETCH_POST_LIST,
    // 1. mutations-types에 선언된 FETCH_POST 변이 타입을 추가한다.
    FETCH_POST,
    SET_ACCESS_TOKEN,
    SET_MY_INFO,
    DESTROY_ACCESS_TOKEN,
    DESTROY_MY_INFO,
    UPDATE_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT
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

                // 1. 토큰을 스토어에 저장하면 api 모듈의 headers에 토큰이 저장되므로 바로 사용자 정보를 불러올 수 있다.
                return api.get('/users/me')
            }).then(response => {
                // 2. 사용자 정보 요청이 성공했다면 변이를 사용하여 스토어에 사용자 정보를 저장한다.
                commit(SET_MY_INFO, response.data)
            })
    },
    signinByToken ({ commit }, token) {
        // 토큰을 스토어에 커밋한다.
        commit(SET_ACCESS_TOKEN, token)
        // 사용자의 정보를 받아온 후 스토어에 커밋한다.
        return api.get('/users/me')
            .then(response => {
                commit(SET_MY_INFO, response.data)
            })
    },
    signout ({ commit }) {
        commit(DESTROY_MY_INFO)
        commit(DESTROY_ACCESS_TOKEN)
    },
    createComment ({ commit, state }, comment) {
        // 현재의 포스팅의 ID를 상태에 접근해서 가져온다.
        const postId = state.post.id
        return api.post(`/posts/${postId}/comments`, { contents: comment })
            .then(response => {
                commit(UPDATE_COMMENT, response.data)
            })
    },
    editComment ({ commit, state }, { commentId, comment }) {
        const postId = state.post.id
        return api.put(`/posts/${postId}/comments/${commentId}`, { contents: comment })
            .then(response => {
                commit(EDIT_COMMENT, response.data)
            })
    },
    deleteComment ({ commit, state }, commentId) {
        const postId = state.post.id
        return api.delete(`/posts/${postId}/comments/${commentId}`)
            .then(response => {
                commit(DELETE_COMMENT, commentId)
            })
    }
}
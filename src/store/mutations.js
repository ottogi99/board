import { 
    FETCH_POST_LIST,
    // mutations-types에 선언된 FETCH_POST를 추가한다.
    FETCH_POST,
    SET_ACCESS_TOKEN
} from './mutations-types'
import api from '@/api'

export default {
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts
    },
    [FETCH_POST] (state, post) {
        state.post = post
    },
    [SET_ACCESS_TOKEN] (state, accessToken) {
        // 스토어 상태의 토큰을 업데이트하고
        // api 모듈을 사용하여 HTTP 헤더에 토큰을 심어준다.
        if (accessToken) {
            state.accessToken = accessToken
            api.defaults.headers.common.Authorization = `Bearer${accessToken}`
        }
        // state.accessToken = accessToken
    }
}
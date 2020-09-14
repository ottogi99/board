<template>
    <div class="post-view-page">
        <!-- <div class="post-view">
            <div>
                <h1>게시글의 제목이 노출된다.</h1>
                <span>게시판 번호 1</span>
                <strong>홍길동 . 2019-01-01 09:00</strong>
            </div>
            <p>해당 영역에는 게시글의 콘텐츠 내용이 노출된다.</p>
        </div> -->
        <!-- 1. 게시물 데이터가 있는 경우에만 컴포넌트가 노출된다. -->
        <post-view v-if="post" :post="post"/>
        <!-- 2. 게시물 데이터가 없는 경우에는 '게시글 불러오는 중...' 문구가 노출된다. -->
        <p v-else>게시글 불러오는 중...</p>
        <router-link :to="{ name: 'PostListPage' }">목록</router-link>
    </div>
</template>

<script>
// mapActions 헬퍼 함수를 추가한다.
import { mapState, mapActions } from 'vuex'
import PostView from '@/components/PostView'

export default {
    name: 'PostViewPage',
    // 1. PostViewPage 컴포넌트의 path에 정의한 동적 세그먼트 값 postId에 대한 props 값을 설정한다.
    components: {
        PostView
    },
    methods: {
        // mapActions 헬퍼 함수를 컴포넌트에 fetchPost 함수를 매핑한다.
        ...mapActions(['fetchPost'])
    },
    computed: {
        // mapState 헬퍼 함수를 통해 컴포넌트의 데이터에 post를 매핑한다.
        ...mapState([ 'post' ])
    },
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    created () {
        // 2. fetchPost 액션 실행 시 props를 통해 내려받은 postId값의 인자와 함께 호출한다.
        this.fetchPost(`/${this.postId}`)
            .catch(err => {
                // 에러 발생 시, 메시지를 노출 후 이전 페이지로 보내주는 방어코드를 추가한다.
                alert(err.response.data.msg)
                this.$router.back()
            })
    }
}
</script>
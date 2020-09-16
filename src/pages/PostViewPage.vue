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
        <post-view v-if="post" :post="post" />
        <!-- 2. 게시물 데이터가 없는 경우에는 '게시글 불러오는 중...' 문구가 노출된다. -->
        <p v-else>게시글 불러오는 중...</p>
        <router-link :to="{ name: 'PostEditPage', params: { postId } }">수정</router-link>
        <button @click="onDelete">삭제</button>
        <router-link :to="{ name: 'PostListPage' }">목록</router-link>
        <!-- 등록된 CommentList 컴포넌트를 사용한다. -->
        <comment-list v-if="post" :comments="post.comments" />
        <comment-form @submit="onCommentSubmit" />
    </div>
</template>

<script>
// mapActions 헬퍼 함수를 추가한다.
import { mapState, mapActions, mapGetters } from 'vuex'
import PostView from '@/components/PostView'
import CommentList from '@/components/CommentList'
import CommentForm from '@/components/CommentForm'
import api from '@/api'

export default {
    name: 'PostViewPage',
    // 1. PostViewPage 컴포넌트의 path에 정의한 동적 세그먼트 값 postId에 대한 props 값을 설정한다.
    components: {
        PostView,
        CommentList,
        CommentForm
    },
    methods: {
        // mapActions 헬퍼 함수를 컴포넌트에 fetchPost 함수를 매핑한다.
        ...mapActions([
            'fetchPost',
            'createComment'
        ]),
        onDelete () {
            // mapState 헬퍼 함수를 통해 매핑된 post의 id값을 변수에 할당한다.
            const { id } = this.post
            // 게시글의 ID 값과 함께 HTTP DELETE 메소드를 실행시킨다.
            api.delete(`/posts/${id}`)
                .then(response => {
                    // 게시글 삭제 성공 시, 성공에 대한 메시지를 노출한다.
                    alert('게시물이 성공적으로 삭제되었습니다.')
                    // 더 이상 노출된 메시지가 없기 때문에 리스트 페이지로 이동시킨다.
                    this.$router.push({ name: 'PostListPage' })
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        // HTTP 상태가 401인 경우 경고 메시지를 노출한다.
                        alert('로그인이 필요합니다.')
                        // 메시지 노출 후 로그인 페이지로 보낸다.
                        this.$router.push({ name: 'Signin' })
                    } else {
                        // HTTP 상태코드가 401이 아닌 경우 서버에서 내려준 메시지를 노출시켜준다.
                        alert(error.response.data.msg)
                    }
                })
        },
        onCommentSubmit (comment) {
            // 자식 컴포넌트의 submit 이벤트 핸들러로 등록시켜줄 onCommentSubmit 함수를 추가한다.
            if (!this.isAuthorized) {
                // 인증되지 않은 사용자의 경우 경고 메시지 노출 후, 로그인 페이지로 이동시켜준다.
                alert('로그인이 필요합니다')
                this.$router.push({ name: 'Signin' })
            } else {
                // 인증된 사용자의 경우 액션을 통해 API 서버를 호출한다.
                this.createComment(comment)
                    .then(() => {
                        alert('댓글이 성공적으로 작성되었습니다.')
                    })
                    .catch(error => {
                        alert(error.response.data.msg)
                    })
            }
        }
    },
    computed: {
        // mapState 헬퍼 함수를 통해 컴포넌트의 데이터에 post를 매핑한다.
        ...mapState([ 'post' ]),
        ...mapGetters([
            'isAuthorized'
        ])
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
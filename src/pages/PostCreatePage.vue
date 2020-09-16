<template>
    <div class="post-create-page">
        <h3>게시물 작성하기</h3>
        <!-- PostCreateForm 컴포넌트를 뷰에 추가한다 -->
        <post-create-form @submit="onSubmit" />
    </div>
</template>

<script>
// PostCreateForm 컴포넌트를 불러온다.
import PostCreateForm from '@/components/PostCreateForm'
// api 모듈을 추가한다
import api from '@/api'

export default {
    name: 'PostCreatePage',
    // PostCreateForm 컴포넌트를 등록한다
    components: {
        PostCreateForm
    },
    methods: {
        // PostCreateForm 컴포넌트의 submit 이벤트가 호출되면 실행할 메소드를 선언한다.
        onSubmit (payload) {
            const { title, contents } = payload
            // api/posts 엔드포인트로 통신을 시작한다.
            api.post('/posts', { title, contents })
                .then(response => {
                    alert('게시물이 성공적으로 작성되었습니다.')
                    // 게시물 작성이 성공했다면 내가 작성한 게시물 페이지로 이동한다.
                    this.$router.push({
                        name: 'PostViewPage',
                        params: { postId: response.data.id.toString() }
                    })
                })
                .catch(error => {
                    // 게시물 작성이 실패한 경우
                    if (error.response.status === 401) {
                        // HTTP 상태코드가 401 UnAuthorized라면 사용자를 로그인 페이지로 이동시킨다.
                        alert('로그인이 필요합니다.')
                        this.$router.push({ name: 'Signin' })
                    } else {
                        // 그 외의 경우 서버가 응답으로 보내준 에러 메시지를 사용자에게 노출시킨다.
                        alert(error.response.data.msg)
                    }
                })
        }
    }
}
</script>
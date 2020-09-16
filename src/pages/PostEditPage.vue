<template>
    <div class="post-edit-page">
        <h3>게시물 수정</h3>
        <!-- 게시물 데이터가 있는 경우에만 PostEditForm을 렌더한다. -->
        <post-edit-form v-if="post"
                        :post="post"
                        @submit="onSubmit" />
        <!-- 게시물 데이터가 없는 경우에는 로딩 문구를 렌더한다. -->
        <p v-else>게시물 불러오는 중...</p>
    </div>
</template>

<script>
import PostEditForm from '@/components/PostEditForm'
import { mapState } from 'vuex'
import api from '@/api'

export default {
    name: 'PostEditPage',
    components: {
        PostEditForm
    },
    props: {
        // 라우터의 파라미터를 받아오기 위한 props를 선언해준다.
        postId: {
            type: String,
            required: true
        }
    },
    // 라우터의 beforeEnter 훅에서 스토어에 저장했던 게시물 정보를 가져온다.
    computed: {
        ...mapState([ 'post' ])
    },
    methods: {
        // PostEditForm의 submit 이벤트 핸들러인 onSubmit 메소드를 선언한다.
        onSubmit (payload) {
            const { title, contents } = payload
            // PUT 메소드를 사용하여 서버로 게시물 데이터를 전송한다.
            api.put(`/posts/${this.postId}`, { title, contents })
                .then(response => {
                    // 게시물 수정이 성공했다면 사용자를 다시 게시물 페이지로 이동시켜준다.
                    alert('게시물이 성공적으로 수정되었습니다.')
                    this.$router.push({
                        name: 'PostViewPage',
                        params: { postId: response.data.id.toString() }
                    })
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        // 4. 비로그인 사용자가 게시물 수정을 시도했을 때는 로그인 페이지로 이동시킨다.
                        alert('로그인이 필요합니다.')
                        this.$router.push({ name: 'Signin' })
                    } else if (error.response.status === 403) {
                        // 5. 사용자가 이 게시물을 수정할 권한이 없다면 이전 페이지로 이동시킨다.
                        alert(error.response.data.msg)
                        this.$router.back()
                    } else {
                        // 그 외의 경우 서버에서 보내준 에러 메시지를 노출시킨다.
                        alert(error.response.data.msg)
                    }
                })
        },
    }
}
</script>
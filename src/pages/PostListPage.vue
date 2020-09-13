<template>
    <div class="post-list-page">
        <h1>포스트 게시글</h1>
        <!-- 이 부분을 옮겨준다 -->
        <!-- 자식 컴포넌트 props를 통해 posts 데이터를 내려준다. -->
        <post-list :posts="posts"/>
    </div>
</template>

<script>
// PostList 컴포넌트를 추가한다.
import PostList from '@/components/PostList'
// 커스터마이징된 axios 객체를 추가한다.
import api from '@/api'

export default {
    name: 'PostListPage',
    // PostList 컴포넌트를 등록한다.
    components: {
        PostList
    },
    // 컴포넌트 내의 데이터를 생성한다.
    data () {
        return {
            posts: []
        }
    },
    // 3. created 훅에서 API 호출을 한 후, 컴포넌트 내의 데이터에 해당 결과값을 대입한다.
    created () {
        api.get('/posts')
            .then(response => {
                this.posts = response.data
            });
    },
}
</script>
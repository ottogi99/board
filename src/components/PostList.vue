<template>
    <div>
        <table>
            <colgroup>
                <col style="width: 10%"/>
                <col style="width: 60%"/>
                <col style="width: 10%"/>
                <col style="width: 20%"/>
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">작성일</th>
                </tr>
            </thead>
            <tbody>
                <!-- 예제 게시물 내용을 작성해보자. -->
                <tr v-for="post in posts" :key="post.id">
                    <!-- 게시물번호 -->
                    <td scope="col">{{ post.id }}</td>
                    <!-- 게시물 제목과 댓글 수 -->
                    <td scope="col">
                        <router-link :to="{ name: 'PostViewPage', params: { postId: post.id.toString() } }">{{ post.title }}</router-link>
                        [{{ post.comments.length }}]
                    </td>
                    <!-- 게시물 작성자 -->
                    <td scope="col">{{ post.user.name }}</td>
                    <!-- 게시물 작성일 -->
                    <td scope="col">{{ post.createdAt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'PostList',
    // props: {
    //     posts: {
    //         type: Array
    //     }
    // }
    computed: {
        // mapState 헬퍼 함수를 이용하여 posts 상태를 컴포넌트에 매핑한다.
        ...mapState(['posts'])
    }
}
</script>
<template>
    <div class="post-view">
        <div>
            <h1>{{ post.title }}</h1>
            <span>게시물 번호 {{ post.id }}</span>
            <strong>{{ post.user.name }} . {{ post.createdAt }}</strong>
        </div>
        <p>{{ post.contents }}</p>
    </div>
</template>

<script>
export default {
    name: 'PostView',
    props: {
        // post props 속성은 반드시 Object 자료형을 가진 변수만 받아 들일 수 있다.
        post: {
            type: Object,
            required: true,
            validator (post) {
                // post props에 대한 벨리데이션을 추가한다.
                const isValidPostId = typeof post.id === 'number'
                const isValidTitle = !!post.title && post.title.length
                const isValidContents = post.contents && post.contents.length
                return isValidPostId && isValidTitle && isValidContents
            }
        }
    }
}
</script>
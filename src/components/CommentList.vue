<template>
    <ul class="comments">
        <!-- 등록된 comments props 데이터를 컴포넌트에 주입한다. -->
        <li v-for="comment in comments" :key="comment.id">
            <!-- CommentItem 컴포넌트의 edit 이벤트 핸들러로 onEdit 메소드를 등록한다. -->
            <comment-item :comment="comment" @edit="onEdit" @delete="onDelete" />
        </li>
        <li v-if="comments.length <= 0">
            입력된 댓글이 없습니다.
        </li>
    </ul>   
</template>

<script>
import CommentItem from '@/components/CommentItem'
import { mapActions } from 'vuex'

export default {
    name: 'CommentList',
    components : {
        CommentItem
    },
    // comments를 props로 등록한다.
    props: {
        comments: {
            type: Array,
            default () {
                return []
            }
        }
    },
    methods: {
        onEdit ({ id, comment }) {
            this.editComment({ commentId: id, comment })
                .then(response => {
                    alert('댓글이 수정되었습니다.')
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        alert('로그인이 필요합니다.')
                        this.$router.push({ name: 'Signin'})
                    } else {
                        alert(error.response.data.msg)
                    }
                })
        },
        onDelete (commentId) {
            this.deleteComment(commentId)
                .then(response => {
                    // 삭제 성공 시, 성공에 해당하는 메시지를 노출한다.
                    alert('댓글이 삭제되었습니다.')
                })
                .catch(error => {
                    // 삭제 실패 시, 상황에 따라 각각 처리한다.
                    if (error.response.status == 401) {
                        alert('로그인이 필요합니다.')
                        this.$router.push({ name: 'Signin' })
                    } else {
                        alert(error.response.data.msg)
                    }
                })
        },
        ...mapActions([ 
            'editComment',
            'deleteComment'
        ]),
    }
}
</script>
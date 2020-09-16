<template>
    <div class="comment-item">
        <!-- CommentList 컴포넌트에 있던 사용자 이름 부분을 그대로 가져오자. -->
        <strong>{{ comment.user.name }}</strong><span>{{ comment.createdAt }}</span>
        <!-- 댓글을 수정할 수 있는 textarea 태그와 수정 완료 버튼을 작성한다. -->
        <div v-if="isEditing">
            <textarea v-model="editMessage" rows="3"></textarea>
            <button @click="onEdit">수정완료</button>
        </div>
        <p v-else>{{ comment.contents }}</p>
        <!-- 댓글을 수정 또는 삭제할 수 있는 버튼을 추가한다. -->
        <ul v-if="isMyComment">
            <!-- 수정 버튼의 클릭 이벤트 리스너로 toggleEditMode 메소드를 연결한다. -->
            <li><button type="button" @click="toggleEditMode">{{ editButtonText }}</button></li>
            <li><button type="button" @click="onDelete">삭제</button></li>
        </ul>
    </div>
</template>

<script>
// mapState, mapGetters 헬퍼 함수를 불러온다.
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'CommentItem',
    // 컴포넌트 외부로부터 props 속성을 통해 댓글 데이터를 주입받는다.
    data () {
        return {
            // 수정 모드와 읽기 모드를 구분할 수 있도록 isEditing 변수를 추가한다.
            isEditing: false,
            // 댓글 수정 폼과 연동될 반응형 문자열 변수를 선언한다.
            editMessage: ''
        }
    },
    props: {
        comment: {
            type: Object,
            required: true,
            validator (comment) {
                const isValidCommentId = typeof comment.id === 'number'
                const isValidContents = comment.contents && comment.contents.length
                const isValidUser = !!comment.user
                return isValidCommentId && isValidContents && isValidUser
            }
        }
    },
    computed: {
        // 현재 로그인한 사용자의 정보를 스토어의 상태를 참조하여 가져온다.
        ...mapState([ 'me' ]),
        // 현재 로그인 여부를 알 수 있는 isAuthorized 게터를 가져온다.
        ...mapGetters([ 'isAuthorized' ]),
        isMyComment () {
            return this.isAuthorized && this.comment.user.id === this.me.id
        },
        // 계산된 속성을 사용하여 isEditing 값이 참일 경우 "수정 취소"를, 거짓일 경우 "수정"을 반환하도록 작성한다.
        editButtonText () {
            return this.isEditing ? '수정 취소' : '수정'
        },
        isValidComment () {
            // 수정된 댓글이 1자 이상 255자 이하면 참을 반환하고 아니면 거짓을 반환한다.
            return this.editMessage.length > 0 && this.editMessage.length < 256
        }
    },
    methods: {
        // toggleEditMode 메소드가 실행될 때마다 isEditing 변수가 반전된다.
        toggleEditMode () {
            this.isEditing = !this.isEditing
            // 수정 모드로 변할 때마다 댓글의 내용을 수정할 메시지에 바인딩해준다.
            if (this.isEditing) {
                this.editMessage = this.comment.contents
            }
        },
        onEdit () {
            // 댓글이 유효성 검증을 통과한 상태라면 edit 이벤트를 실행하고 아니라면 경고창을 노출한다.
            if (this.isValidComment) {
                this.isEditing = false
                const { id } = this.comment
                this.$emit('edit', { id, comment: this.editMessage })
            } else {
                alert('댓글은 1자 이상 255자 이하여야 합니다.')
            }
        },
        onDelete () {
            const { id } = this.comment
            // 삭제 버튼 클릭 시, comment의 id 값을 넘긴다.
            this.$emit('delete', id)
        }
    }
}
</script>
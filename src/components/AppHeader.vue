<template>
    <div class="app-header">
        <h1>Community</h1>
        <!-- 로그인한 상태라면 사용자에게 인사말을 보여준다. -->
        <div v-if="isAuthorized">
            <strong>
                <button @click="toggle">{{ me.name }}님 환영합니다.
                    <!-- isActive 값에 따라 변경되는 화살표 아이콘을 추가한다. -->
                    <i v-if="!isActive" class="fas fa-sort-down"></i>
                    <i v-else class="fas fa-sort-up"></i>
                </button>
            </strong>
            <!-- isActive가 true일 때만 보이는 박스 UI를 추가한다. -->
            <ul v-if="isActive">
                <!-- 로그아웃 버튼의 클릭 이벤트 리스너로 onClickSignout 메소드를 할당한다 -->
                <li><button @click="onClickSignout">로그아웃</button></li>
            </ul>
        </div>
        <!-- 로그인 하지 않은 상태라면 기존과 같이 로그인 버튼을 보여준다. -->
        <div v-else>
            <router-link :to="{ name: 'Signin' }">로그인</router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
    name: 'AppHeader',
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggle () {
            // toggle 메소드가 호출되면 isActive의 값은 true라면 false로, false라면 true로 반전된다.
            this.isActive = !this.isActive
        },
        onClickSignout () {
            // signout 액션을 실행한다.
            this.signout()
            // signout 액션이 수행되고 나면 메인페이지인 PostListPage로 이동시킨다.
            this.$router.push({ name: 'PostListPage' })
        },
        ...mapActions([ 'signout' ])
    },
    computed: {
        // isAuthorized 게터를 등록
        ...mapGetters([ 'isAuthorized' ]),
        // 스토어의 me 상태를 추가한다
        ...mapState([ 'me' ])
        // mapActions 헬퍼 함수를 사용하여 signout 액션을 등록한다.
    }
}
</script>
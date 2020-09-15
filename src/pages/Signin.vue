<template>
    <div class="sign-in-page">
        <h3>로그인</h3>
        <!-- 로그인 폼이 들어올 위치 -->
        <signin-form @submit="onSubmit" />
        <p>회원이 아니신가요? <router-link :to="{ name: 'Signup' }">회원가입하러 가기</router-link></p>
    </div>
</template>

<script>
import SigninForm from '@/components/SigninForm'
// import api from '@/api'
import { mapActions } from 'vuex'

export default {
    name: 'Signin',
    // Signin 컴포넌트를 등록한다.
    components: {
        SigninForm
    },
    methods: {
        onSubmit (payload) {
            // /auth/signin 엔드포인트로 사용자가 입력한 email, password 값을 보낸다.
            this.signin(payload)
                .then(response => {
                    alert('로그인이 완료되었습니다.')
                    this.$router.push({ name: 'PostListPage' })
                })
                .catch(error => {
                    // 로그인에 실패할 경우 사용자에게 에러 원인을 알려준다.
                    alert(error.response.data.msg)
                })
        },
        // signin 액션을 컴포넌트에 등록한다.
        ...mapActions([ 
            'signin' 
        ]),
    }
}
</script>
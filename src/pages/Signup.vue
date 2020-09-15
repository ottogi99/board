<template>
    <div class="sign-up-page">
        <h3>회원가입</h3>
        <!-- 커스텀 엘리먼트를 이용하여 template 영역에 추가한다. -->
        <signup-form @submit="onSubmit" />
        <p>이미 가입하셨나요? <router-link :to="{ name: 'Signin' }">로그인하러 가기</router-link></p>
    </div>
</template>

<script>
// 컴포넌트를 Signup 컴포넌트에 추가한다.
import SignupForm from '@/components/SignupForm'
import api from '@/api'

export default {
    name: 'Signup',
    // 추가된 SignupForm 컴포넌트를 components에 등록한다.
    components: {
        SignupForm
    },
    methods: {
        onSubmit (payload) {
            const { email, password, name } = payload
            api.post('/auth/signup', { name, email, password })
                .then(response => {
                    // 회원가입이 성공했다면 사용자에게 회원가입이 성공했다는 메시지를 노출하고 메인화면으로 이동한다.
                    alert('회원가입이 완료되었습니다.')
                    // 회원가입 완료 문구 노출 후 로그인 페이지로 이동시킨다.
                    this.$router.push({ name: 'Signin' })
                })
                .catch(error => {
                    // 회원가입이 실패했다면 서버로부터 전송받은 에러 메시지를 보여준다.
                    alert(error.response.data.msg)
                })
        }
    }
}
</script>
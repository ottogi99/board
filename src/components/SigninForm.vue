<template>
    <form @submit.prevent="submit">
        <fieldset>
            <!-- 이메일 입력 엘리먼트 -->
            <input type="text" v-model="email" placeholder="이메일을 입력해주세요." />
            <!-- 비밀번호 입력 엘리먼트 -->
            <input type="password" v-model="password" placeholder="비밀번호를 입력해주세요." />
            <button type="submit">로그인</button>
        </fieldset>
    </form>
</template>

<script>
export default {
    name: 'Signin',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submit () {
            const { email, password } = this
            this.$emit('submit', { email, password })
        }
    }
}
</script>
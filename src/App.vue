<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- header라는 이름을 부여받은 roter-view 컴포넌트 -->
    <router-view name="header" />
    <!-- 이름이 없는 router-view 컴포넌트는 자동으로 default라는 이름을 부여 받는다. -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 스타일을 적용해준다. */
@import 'http://localhost:8000/assets/index.css';

/* 기존 스타일을 제거 */
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

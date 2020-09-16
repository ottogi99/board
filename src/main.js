// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

// 1. 기존의 코드는 삭제한다.
// // 쿠키에 저장된 토큰을 사용하여 인증
// const savedToken = Cookies.get('accessToken')
// if (savedToken) {
//   store.dispatch('signinByToken', savedToken)
// }

// 2.비동기 처리를 위한 함수를 생성한다.
function init () {
  const savedToken = Cookies.get('accessToken')
  if (savedToken) {
    // 저장된 토큰이 존재한다면 signinByToken 액션을 반환한다.
    return store.dispatch('signinByToken', savedToken)
  } else {
    // 토큰이 존재하지 않는다면 바로 Promise를 성공시킨다.
    return Promise.resolve()
  }
}

init().then(response => {
  // init 함수의 then 체이닝 메소드 내부는 init 함수가 종료되었음을 보장받는다.
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
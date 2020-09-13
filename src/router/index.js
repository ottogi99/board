import Vue from 'vue'
import Router from 'vue-router'
// 1. PostListPage 컴포넌트를 추가한다.
import PostListPage from '@/pages/PostListPage'

Vue.use(Router)

export default new Router({
  // 라우터가 히스토리 모드로 작동하도록 설정한다.
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      component: PostListPage
    },
  ]
})

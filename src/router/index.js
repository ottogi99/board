import Vue from 'vue'
import Router from 'vue-router'
// 1. 컴포넌트를 추가한다.
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'

Vue.use(Router)

export default new Router({
  // 라우터가 히스토리 모드로 작동하도록 설정한다.
  mode: 'history',
  // 2. 라우트를 등록한다.
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      component: PostListPage
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      component: PostViewPage,
      // props 옵션을 true로 설정한다.
      props: true
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

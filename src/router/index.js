import Vue from 'vue'
import Router from 'vue-router'
// 1. 컴포넌트를 추가한다.
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'
import AppHeader from '@/components/AppHeader'
import PostCreatePage from '@/pages/PostCreatePage'
import PostEditPage from '@/pages/PostEditPage'

import store from '@/store'

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
    // /post/create 라우트가 /post/:postId 위에 선언되도록 변경해준다.
    {
      path: '/post/create',
      name: 'PostCreatePage',
      components: {
        header: AppHeader,
        default: PostCreatePage
      },
      // beforeEnter 가드 훅을 추가한다.
      beforeEnter (to, from, next) {
        const { isAuthorized } = store.getters
        if (!isAuthorized) {
          alert('로그인이 필요합니다!')
          // 로그인이 되어있지 않다면 로그인 페이지로 이동시킨다.
          next({ name: 'Signin' })
        }
        next()
      }
    },
    {
      path: '/post/:postId/edit',
      name: 'PostEditPage',
      components: {
        header: AppHeader,
        default: PostEditPage
      },
      props: {
        default: true
      },
      // 1. beforeEnter 가드 훅을 추가한다.
      beforeEnter (to, from, next) {
        // 2. 게시물 생성 페이지와 마찬가지로 비로그인 사용자는 접근할 수 없다.
        const { isAuthorized } = store.getters
        if (!isAuthorized) {
          alert('로그인이 필요합니다!')
          next({ name: 'Signin' })
          return false
        }
        // 3. 게시물 뷰 페이지에서 사용했던 fetchPost 액션을 재 사용하자.
        store.dispatch('fetchPost', to.params.postId)
          .then(response => {
            const post = store.state.post
            // 게시물 작성자의 아이디와 현재 로그인된 사용자의 아이디가 일치하는지 확인한다.
            const isAuthor = post.user.id === store.state.me.id

            if (isAuthor) {
              // 일치한다면 라우팅을 그대로 진행한다.
              next()
            } else {
              // 일치하지 않는다면 경고 문구를 노출시키고 이전 라우트로 이동시킨다.
              alert('게시물의 작성자만 게시물을 수정할 수 있습니다.')
              next(from)
            }
          })
          .catch(error => {
            // 5. 게시물 데이터 요청이 실패했다면 전 페이지로 돌아간다.
            alert(error.response.data.msg)
            next(from)
          })
      }
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      // components 속성을 사용하면 여러 개의 router-view에 컴포넌트를 렌더할 수 있다.
      components: {
        // Named Router View를 사용하여 헤더를 적용한 모습
        header: AppHeader,
        default: PostViewPage
      },
      // props 옵션을 true로 설정한다.
      props: {
        // Props값 역시 대상 components 이름으로 수정한다.
        default: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        header: AppHeader,
        default: Signup
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      // components 속성이 아니라 component를 사용하면 자동으로 이름이 없는 router-view에만 컴포넌트를 렌더한다.
      component: Signin
    }
  ]
})

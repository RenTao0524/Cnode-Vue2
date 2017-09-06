import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const topicsList = r => require.ensure([], () => r(require('@/page/topicsList')), 'topicsList');
const askList = r => require.ensure([], () => r(require('@/page/askList')), 'askList');
const shareList = r => require.ensure([], () => r(require('@/page/shareList')), 'shareList');
const jobList = r => require.ensure([], () => r(require('@/page/jobList')), 'jobList');
const goodList = r => require.ensure([], () => r(require('@/page/goodList')), 'goodList');
const post = r => require.ensure([], () => r(require('@/page/post')), 'post');
const personInfo = r => require.ensure([], () => r(require('@/page/personInfo')), 'personInfo');

const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: login
		},
		{
			path: '/manage',
			component: manage,
			name: '',
			children: [{
				path: '',
				component: home,
				meta: [],
			},
			{
				path: '/topicsList',
				component: topicsList,
				meta: ['topics'],
			},
			{
				path: '/askList',
				component:askList,
				meta: ['ask'],
			},
			{
				path: '/shareList',
				component:shareList,
				meta: ['share'],
			},
			{
				path: '/jobList',
				component:jobList,
				meta: ['job'],
			},
			{
				path: '/goodList',
				component:goodList,
				meta: ['good'],
			},
			{
				path: '/post',
				component:post,
				meta: ['post'],
			},
			{
				path: '/personInfo',
				component:personInfo,
				meta: ['说明'],
			},
			{
				path: '/vueEdit',
				component: vueEdit,
				meta: ['编辑', '文本编辑'],
			}
			]
		}
	]
})

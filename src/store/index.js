import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
	username:'',
	Access_Token:'',
	content:''
}

const mutations = {
	saveAdminInfo(state, data){
		state.username = data.username
		state.Access_Token = data.Access_Token;
	},
	saveContent(state, content){
		state.content = content
	}
}

const actions = {
	async getAdminData({commit}, data){
		commit('saveAdminInfo', data);
	},
	async getContent({commit},content){
		commit('saveContent',content)
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
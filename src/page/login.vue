<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>Cnode社区</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="Access_Token">
						<el-input type="password" placeholder="Access Token" v-model="loginForm.Access_Token"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">注册过的用户可凭账号和Access Token登录</p>
				<p class="tip">登录过的用户，自动登陆</p>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex'
	import axios from 'axios'
	export default {
	    data(){
			return {
				loginForm:{
					username: '',
					Access_Token: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
			if(!this.$store.state.username)
			{
				this.loginForm.username = this.getStore("username")
				this.loginForm.Access_Token = this.getStore("Access_Token")
				if(this.loginForm.username && this.loginForm.Access_Token){
					this.$message({
							type: 'success',
							message: '检测到您之前登录过，将自动登录'
					});
					
					this.$store.dispatch("getAdminData", this.loginForm)
					this.$router.push('manage')
				}
			}
		},
		methods: {
			//存储localStorage
			setStore(name, content){
				if (!name) return;
				if (typeof content !== 'string') {
					content = JSON.stringify(content);
				}
				window.localStorage.setItem(name, content);
			},
 			//获取localStorage
			getStore(name){
				if (!name) return;
				return window.localStorage.getItem(name);
			},
			//登陆函数
			login(name){
				if(name === this.loginForm.username){
					this.$message({
						type: 'success',
						message: '登录成功'
					});
					this.$store.dispatch("getAdminData", this.loginForm)
					try{
						this.setStore("username", this.loginForm.username)
						this.setStore("Access_Token",this.loginForm.Access_Token)
					}catch(error){
						console.log(error)
					}
					
					this.$router.push('manage')
				}else{
					this.$message({
						type: 'error',
						message: "username和Access_Token不一致"
					});
				}
			},
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const requestConfig = {
							accesstoken:this.loginForm.Access_Token
						}
						try{
							const res = await axios.post('https://cnodejs.org/api/v1/accesstoken',requestConfig).
							then((respone) => respone.data.loginname).then((name) => {
									this.login(name)
								}).catch((error) => console(error))
						}catch(err){
							console.log(error)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import './../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>

<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>主题首页</template>
						<el-menu-item index="topicsList">全部</el-menu-item>
						<el-menu-item index="askList">问题</el-menu-item>
						<el-menu-item index="shareList">分享</el-menu-item>
						<el-menu-item index="jobList">招聘</el-menu-item>
						<el-menu-item index="goodList">精华</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-edit"></i>编辑</template>
						<el-menu-item index="post">发帖</el-menu-item>
						<el-menu-item index="vueEdit">文本编辑</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="personInfo">个人信息</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<router-view></router-view>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>

<style lang="less" scoped>
	@import './../style/mixin';
	.manage_page{
	}
</style>

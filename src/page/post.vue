<template>
    <div class="fillcontain">
        <h2 style="color:red; text-align: center;">社区规定测试请勾选dev</h2>
        <div class="table_container">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="发帖类型">
                    <el-radio-group v-model="radio">
                        <el-radio :label="1">ask</el-radio>
                        <el-radio :label="2">share</el-radio>
                        <el-radio :label="3">job</el-radio>
                        <el-radio :label="4">dev</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                form: {
                title: '',
                desc: ''
                },
                radio: 4,
            }
        },
        methods: {
            onSubmit() {
                var config = {
                    accesstoken:this.$store.state.Access_Token,
                    title:'fuqi',
                    tab:'dev',
                    content:"dddddd"
                }
                if(!config.accesstoken){
                    config.accesstoken = window.localStorage.getItem("Access_Token")
                }
                /*
                switch(this.radio){
                    case 1:config.tab='ask';
                    case 2:config.tab = 'share';
                    case 3:config.tab = 'job';
                    case 4:config.tab = 'dev'
                }
                */
                try{
                    console.log(config)
                    axios.post("https://cnodejs.org/api/v1/topics",config).catch((error) => {console.log(error)})
                }catch(error){
                    console.log(error)
                }
                console.log('submit!');
            }
        }
    }
</script>

<style lang="less">
	@import './../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>

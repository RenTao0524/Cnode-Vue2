<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table
			    :data="tableData"
			    @expand='expand'
			    style="width: 100%">
			    <el-table-column type="expand">
			      <template scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="内容">
			            <contentView v-show="showContext"></contentView>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="创建时间"
			      prop="create_at">
			    </el-table-column>
			    <el-table-column
			      label="标题"
			      prop="title">
			    </el-table-column>
			    <el-table-column
			      label="作者"
			      prop="author">
			    </el-table-column>
			</el-table>
            <div class="Pagination" style="text-align: right;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="40"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import contentView from './contentView'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 40,
                count: 4800,
                currentPage: 1,
                selectTable: {},
                showContext:false
            }
        },
        created(){
            this.initData();
        },
        components: {
    		contentView,
    	},
        methods: {
            async initData(){
                this.getTopics()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(val)
                this.currentPage = val;
                //this.offset = (val - 1)*this.limit;
                this.getTopics()
            },
            async getTopics(){
                console.log(this.currentPage)
                const requestConfig = {
                    params: {
                        page: this.currentPage,
                        tab: "job"
                    }
				}
				try{
					await axios.get('https://cnodejs.org/api/v1/topics',requestConfig).
					then((respone) =>{
                        return respone.data.data
                    }).then((data)=>{
                        this.tableData = [];
                        data.forEach(item => {
                            const tableData = {};
                            tableData.author = item.author.loginname;
                            tableData.create_at = item.create_at;
                            tableData.content = item.content;
                            tableData.title = item.title;
                            this.tableData.push(tableData);
                        }) 
                        console.log(this.tableData)
                    }).catch((error) => console(error))
				}catch(err){
					console.log(error)
				}
            },
            expand(row, expanded){
                this.showContext = true
                try{
                    this.$store.dispatch("getContent", row.content)
                }catch(error){
                    console.log(error)
                }
            }
        }
    }
</script>

<style lang="less">
	@import './../style/mixin';
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
</style>

<template>
    <div class="fillcontain">
        <div id="mycontent"></div>
    </div>
</template>

<script>
     export default {
        mounted(){
            try{
                document.getElementById("mycontent").innerHTML = this.$store.state.content
            }catch(error){
                console.log(error)
            }
        }
     }
</script>

<style lang="less">
	@import './../style/mixin';
    .markdown-text{
        position:relative;
        overflow:scroll;
        height:736px;
        width:100%;

        img{
            width:100%;
        }
    }
</style>
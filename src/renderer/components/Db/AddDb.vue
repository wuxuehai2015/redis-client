<style>
    .form-label{
        width:15%;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 0px;
    }
    .form-control{
        width:60%;
    }
</style>
<template>
    <div style="width:400px;margin:10% auto;padding:50px;border-radius:5px;background: #f5f5f4;border: 1px solid #bebebe;">
        <div style="text-align: center">
            <form>
                <div class="form-group">
                    <label class="form-label">名称:</label>
                    <input type="email" class="form-control">
                </div>
                <div class="form-group">
                    <label class="form-label">主机:</label>
                    <input type="email" class="form-control">
                </div>
                <div class="form-group">
                    <label class="form-label">端口:</label>
                    <input type="email" class="form-control">
                </div>
                <div class="form-group">
                    <label class="form-label">密码:</label>
                    <input type="email" class="form-control">
                </div>
                <div class="form-actions">
                    <button class="btn btn-primary pull-center">保存</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    export default{
        data (){
            return {}
        },
        mounted: function () {
        },
        methods: {},
    }
</script>
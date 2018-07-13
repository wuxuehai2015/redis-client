<template>
  <div id="app">
    <div class="window">
      <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
          <div class="btn-group">
            <button class="btn btn-default active">
              <span class="icon icon-cloud"></span>
            </button>
            <button class="btn btn-default" @click="addDb">
              <span class="icon icon-plus"></span>
            </button>
          </div>
          <p style="width:100px;display: inline-block">
            <input class="form-control" type="text" placeholder="搜索">
          </p>

          <button class="btn btn-default pull-right" @click="exportData">
            <span class="icon icon-forward" title="导出"></span>
          </button>
        </div>
      </header>
      <!-- Your app's content goes inside .window-content -->
      <div class="window-content">
        <div class="pane-group">
          <div class="pane pane-sm sidebar">
            <DbList></DbList>
          </div>
          <div class="pane">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import DbList from './components/Db/DbList'
    export default {
        components:{
            DbList,
        },
        data(){
            return {
                client:null
            }
        },
        methods: {
            addDb: function () {

            },
            exportData: function(){
                this.$hub.$emit('export')
            }
        },
    }
</script>

<style>
  /* CSS */
</style>

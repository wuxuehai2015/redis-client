
<style>
    .window {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        min-width:500px;
    }
    .btn {
        display: inline-block;
        padding: 10px 40px;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 1.4;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: default;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);
        -webkit-app-region: no-drag;
    }

</style>
<template>
  <div id="app">
    <div class="window">
      <header class="toolbar toolbar-header">
        <div class="toolbar-actions" style="marin-top:20px;">
          <div class="btn-group">
            <button class="btn btn-default active">
              <span class="icon icon-cloud"></span>
            </button>
            <button class="btn btn-default">
                <router-link to="/add-db">
                <span class="icon icon-plus"></span>
                </router-link>
            </button>

          </div>
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
            exportData: function(){
                this.$hub.$emit('export')
            }
        },
    }
</script>

<style>
</style>
<template>
    <nav class="nav-group">
        <h5 class="nav-group-title">Favorites</h5>

        <span class="nav-group-item" @click="selectDb(key)" v-for="(db,key) in dbs" v-bind:class="{ active: db.isActive }">
            <span class="icon icon-database"></span>{{db.name}}
        </span>

    </nav>
</template>
<script>
    import{getDbList,getDb,createConnection,closeConnection} from '../../utils/db'
    import Vue from 'vue'
    export default {
        data (){
            return {
                dbs: [],
                client: null
            };
        },
        methods: {
            selectDb:function(key){

                //高亮
                this.dbs.forEach(function(value, key){
                    value.isActive = false
                })

                this.dbs[key].isActive = true

                let info = getDb(this.dbs[key].name)

                this.client && closeConnection(this.client)

                this.client = createConnection(info.address, info.port, info.pass)

                this.$hub.$emit('connection', this.client); //触发事件
            }
        },
        mounted:function () {

            let temp = getDbList()
            let dbs = []

            temp.forEach((value, key) => {
                dbs.push({name: value, isActive: false})
            })

            this.dbs = dbs

        }
    }
</script>
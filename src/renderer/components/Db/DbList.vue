<style>
    a{
        color: #737475;
        text-decoration:none;
    }

    .nav-group-item-title{
        display: inline-block;
        width:100%;
    }
</style>
<template>
    <nav class="nav-group">
        <h5 class="nav-group-title">Favorites</h5>

        <span class="nav-group-item" @click="selectDb(key)" v-for="(db,key) in dbs" v-bind:class="{ active: db.isActive }">
            <router-link :to="{path:'db', query : {dbIndex:key}}">
                <span class="icon icon-database"></span>
                <span class="nav-group-item-title">
                    {{db.name}}
                </span>
            </router-link>
        </span>

    </nav>
</template>
<script>
    import{getDbList} from '../../utils/db'
    import Vue from 'vue'
    export default {
        data (){
            return {
                dbs: [],
            };
        },
        methods: {
            selectDb:function(key){

                //高亮
                this.dbs.forEach(function(value, key){
                    value.isActive = false
                })

                this.dbs[key].isActive = true
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
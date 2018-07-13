<style>
</style>
<template>
    <table class="table-striped">
        <thead>
        <tr>
            <th>键名</th>
            <th>类型</th>
            <th>内容</th>
            <th>过期时间</th>
        </tr>
        </thead>
        <tbody v-if="list.length === 0">
        <tr>
            <td style="text-align: center" colspan="4"><h5>数据库为空</h5></td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr v-for="item in list">
            <td>{{item.key}}</td>
            <td>{{item.type}}</td>
            <td>{{item.content}}</td>
            <td>{{item.expire}}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    // var remote = require('remote')
    // var Menu = remote.require('menu')
    // var MenuItem = remote.require('menu-item')
    const {remote} = require('electron')
    const {BrowserWindow} = require('electron')
    const {Menu, MenuItem} = remote

    // Build our new menu
    var menu = new Menu()
    menu.append(new MenuItem({
        label: 'Delete',
        click: function () {
            // Trigger an alert when menu item is clicked
            alert('Deleted')
        }
    }))
    menu.append(new MenuItem({
        label: 'More Info...',
        click: function () {
            // Trigger an alert when menu item is clicked
            alert('Here is more information')
        }
    }))

    // Add the listener
    document.addEventListener('DOMContentLoaded', function () {

        let filesContext = document.querySelectorAll('.file_arq');

        filesContext.forEach(function (el) {
            el.addEventListener('click', function (event) {
                event.preventDefault()
                menu.popup(remote.getCurrentWindow());
            })
        })
    })

    import{keys, type, ttl, get} from '../../utils/db'
    import{getDbList, getDb, createConnection, closeConnection} from '../../utils/db'
    import Vue from 'vue'
    export default{
        data (){
            return {
                client: null,
                db_key: null,
                dbs: null,
                list: [],
            }
        },
        props: [
            'dbIndex',
        ],
        created: function () {
            this.$hub.$on('export', function (client) {
                self.export()
            });
        },

        watch: {
            '$route.query.dbIndex': function (db_key) {

                //关闭之前的链接
                if (this.db_key !== db_key) {
                    this.client && closeConnection(this.client)
                    this.client = null
                }

                this.db_key = db_key;

                //获取数据库配置
                let info = getDb(this.dbs[db_key].name)

                //链接数据库
                this.client = createConnection(info.address, info.port, info.pass)

                //读取数据
                this.getFields()
            }
        },
        beforeDestroy: function () {
            if (this.client !== null) {
                closeConnection(this.client)
                console.log('数据库已关闭')
                this.client = null
            }
        },
        methods: {
            getFields: async function () {
                this.list = [];
                let _keys = await keys('*', this.client)
                for (let _key of _keys) {

                    let _type = await type(_key, this.client)
                    let _ttl = await ttl(_key, this.client)

                    let _content = ''

                    switch (_type) {
                        case 'string' :
                            _content = await get(_key, this.client)
                            break
                        case 'hash' :
                            break
                        case 'list' :
                            break
                        case 'set' :
                            break
                        case 'setsort' :
                            break
                    }

                    this.list.push({
                        key: _key,
                        type: _type,
                        content: _content,
                        ttl: _ttl
                    })

                }
            },
            export: function () {
                alert('导出')
            }
        },
        mounted: function () {

            let temp = getDbList()
            let dbs = []

            temp.forEach((value, key) => {
                dbs.push({name: value, isActive: false})
            })

            this.dbs = dbs

        }
    }
</script>
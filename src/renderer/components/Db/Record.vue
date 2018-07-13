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
        <tbody v-if="client == null">
            <tr>
                <td style="text-align: center" colspan="4"><h5>请选择数据库</h5></td>
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

    import{
        keys,
        type,
        ttl,
        get
    } from '../../utils/db'
    import Vue from 'vue'
    export default{
        data (){
            return {
                client: null,
                list: [],
            }
        },
        created: function () {
            let self = this
            this.$hub.$on('connection', function (client) {
                self.client = client
                self.getFields()
            });
            this.$hub.$on('export', function (client) {
                self.export()
            });
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
    }
</script>
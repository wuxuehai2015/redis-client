<style>

    .layout {
        overflow: hidden;
        -ms-scrollbar-base-color: none;
        scrollbar-base-color: none;
    }

    -webkit-scrollbar {
        display: none
    }

    .layout-con {
        height: 100%;
        width: 100%;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .ivu-layout-header {
        background: #e9eaec;
        padding: 0 50px;
        height: 85px;
        line-height: 85px;
        boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)';
    }

    .ivu-menu-light {
        background: #fff;
    }

    .ivu-layout-sider-zero-width-trigger {
        position: absolute;
        top: 64px;
        right: -36px;
        text-align: center;
        width: 36px;
        height: 42px;
        line-height: 42px;
        background: #f8f8f9;
        color: #fff;
        font-size: 18px;
        border-radius: 0 6px 6px 0;
        cursor: pointer;
        -webkit-transition: background .3s ease;
        transition: background .3s ease;
    }

    .ivu-layout-sider {
        -webkit-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
        position: relative;
        background: #fff;
        min-width: 0;
    }

    .ivu-layout-sider-trigger {
        position: fixed;
        bottom: 0;
        text-align: center;
        cursor: pointer;
        height: 48px;
        line-height: 48px;
        color: #2d8cf0;
        background: #fff !important;
        z-index: 1000;
        -webkit-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
    }

    .ivu-card:hover {
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        box-shadow: 0 1px 0px rgba(0, 0, 0, .2);
        border-color: #eee;
    }

</style>
<template>
    <div class="layout">
        <Header>
            <Row style="top:30px;">
                <Form ref="formInline" :model="addInfo" :rules="ruleInline" inline>
                    <FormItem prop="name">
                        <Input type="text" v-model="addInfo.name" placeholder="自定义名称">
                        <Icon type="android-create" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="address">
                        <Input type="text" v-model="addInfo.address" placeholder="主机地址">
                        <Icon type="earth" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="port">
                        <Input type="text" v-model="addInfo.port" placeholder="端口">
                        <Icon type="android-locate" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="pass">
                        <Input type="password" v-model="addInfo.pass" placeholder="密码">
                        <Icon type="locked" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline')">添加</Button>
                    </FormItem>
                </Form>
            </Row>
        </Header>
        <Layout>
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="primary" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1" v-for="(db, key, index) in dbList">
                        <Icon type="soup-can"></Icon>
                        <span @click="connection(db)">{{db}}</span>
                        <Icon type="close-round" @click="deleteDb(key)"></Icon>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>主机{{this.currHost}}</BreadcrumbItem>
                        <BreadcrumbItem>数据库
                        </BreadcrumbItem>
                        <Input v-model="keyword" size="small" slot="append">
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </Breadcrumb>
                    <Card>
                        <div style="min-height:81vh">
                            <Table border :columns="columns" :data="data"></Table>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import{
        createConnection,
        closeConnection,
        addDb,
        deleteDb,
        getDb,
        getDbList,
        keys,
        type,
        ttl,
        get
    } from '../utils/db'
    const redis = require('redis')
    export default {
        data () {
            return {
                client: null,
                isCollapsed: false,
                keyword: 'key',
                columns: [
                    {
                        title: '键',
                        key: 'key'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '值',
                        key: 'content'
                    },
                    {
                        title: '过期',
                        key: 'ttl'
                    }
                ],
                data: [],
                dbList: [],
                addInfo:{
                    name: '',
                    address: '',
                    port: '',
                    pass: ''
                },
                ruleInline: {
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ]
                },
                currHost: '',
                currDb: '',

            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },

        mounted: function () {
            this.dbList = getDbList();
        },

        methods: {
            connection: function (name) {
                let info = getDb(name)
                this.client && closeConnection(this.client)
                this.client = createConnection(info.address, info.port, info.pass)

                this.currHost = '[' + name + '-' + info.address + ']'

                this.currDb = 0
                this.getFields()
            },
            getFields: async function () {
                this.data = [];
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


                    this.data.push({
                        key: _key,
                        type: _type,
                        content: _content,
                        ttl: _ttl
                    })
                }
            },
            deleteDb: function (key) {
                deleteDb(this.dbList[key])
                this.dbList = getDbList();
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addInfo.name = this.addInfo.name || this.addInfo.address;
                        this.addInfo.port = this.addInfo.port || 6379;
                        addDb(this.addInfo.name, this.addInfo.address, this.addInfo.port, this.addInfo.pass)

                        this.addInfo.name = ''
                        this.addInfo.address = ''
                        this.addInfo.port = ''
                        this.addInfo.pass = ''

                        this.$Message.success('添加成功');
                        this.dbList = getDbList();
                    } else {
                        this.$Message.error('添加失败');
                    }
                })
            }
        }
    }
</script>

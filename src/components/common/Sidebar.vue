<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="(item,index) in items">
                <template v-if="item.children">
                    <el-submenu :index="item.id" @click.native="menuFn(index)" :key="index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.menuName }}</template>
                        <el-menu-item v-for="(subItem,i) in item.children" @click="menuChildFn(index,i)" :key="i" :index="subItem.src">{{ subItem.menuName }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.id" :key="index">
                        <i :class="item.icon"></i>{{ item.menuName }}
                    </el-menu-item>
                </template>
            </template>

           <!--  <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template> -->
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Ids: [],
                touchData: [],
                // items: [
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'index',
                        title: '广告主'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '投放管理',
                        subs: [
                            {
                                index: 'basetable',
                                title: '基础表格'
                            },
                            {
                                index: 'vuetable',
                                title: 'Vue表格组件'
                            },
                            {
                                index: 'Income',
                                title: '收入报表'
                            },
                            {
                                index: 'ad_active',
                                title: '广告活动'
                            },
                            {
                                index: 'ad_project',
                                title: '广告项目'
                            },
                            {
                                index: 'ad_unit',
                                title: '广告单元'
                            }
                        ]
                    },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '3',
                    //     title: '财务管理',
                    //     subs: [
                    //         {
                    //             index: 'baseform',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: 'vueeditor',
                    //             title: '编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-document',
                    //     index: '4',
                    //     title: '统计报表',
                    //     subs: [
                    //         {
                    //             index: 'personal',
                    //             title: '基本信息'
                    //         },
                    //         {
                    //             index: 'init_passworld',
                    //             title: '修改密码'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-document',
                    //     index: '5',
                    //     title: '个人中心',
                    //     subs: [
                    //         {
                    //             index: 'personal',
                    //             title: '基本信息'
                    //         },
                    //         {
                    //             index: 'init_passworld',
                    //             title: '修改密码'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'basecharts',
                    //     title: '图表'
                    // },
                    // {
                    //     icon: 'el-icon-upload2',
                    //     index: 'drag',
                    //     title: '拖拽'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        mounted(){
            var _self = this;
            _self.$axios.get('http://182.92.82.188:8280/manage/sys/menu/getUserMenu?parentId=1&isUserMenuTree=true').then(function(res){
                // 响应成功回调
                if(typeof(res.data) != "object" ) {
                    _self.$router.push('/login');
                }else {
                    // console.log(_self.items[0].title);
                    // console.log(res.data[0].menuName);
                    _self.items = res.data;
                    console.log(_self.items);
                    for(var i = 0,len = res.data.length;i < len; i++) {
                        // _self.items[i].title = res.data[i].menuName
                        _self.Ids[i] = res.data[i].id;
                    }
                    console.log(_self.Ids);
                }
            }, function(err){
                console.log(err);
                _self.$router.push('/login');
            })
        },
        methods: {
            ajaxInit(Id,i) {
                var _self = this;
                _self.$axios.get(this.hostname+'/manage/sys/menu/getUserMenu?parentId='+Id+'&isUserMenuTree=true').then(function(res){
                    // 响应成功回调
                    _self.items[i].children = res.data;

                }, function(err){
                    console.log(err);
                })
            },
            menuFn(index) {
                var _self = this;
                var id = _self.Ids[index];

                // 判断是否是第一次点击
                if(_self.touchData.length > 0) {
                    for(let i = 0,L = _self.touchData.length; i < L;i++) {
                        if(id == _self.touchData[i]) {
                            console.log("已经点过一次了，不在调接口");
                        }else {
                            if(_self.touchData.length < _self.items.length) {
                                _self.touchData.push(id);
                                console.log("第一次点");
                                _self.ajaxInit(id,index);
                            }else {
                                // _self.touchData.push(id);
                                console.log("bug");
                                _self.ajaxInit(id,index);
                            }
                        }
                    }
                }else {
                    _self.ajaxInit(id,index);
                    _self.touchData.push(id);
                }
                
            },
            menuChildFn(index,i) {
                var _self = this;
                console.log(_self.items[index].children[i].src);
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:auto;
        overflow-x:hidden;
    }
    .sidebar > ul {
        height:100%;
    }
</style>

<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>后台管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <!-- 查询 -->
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" class="demo-form-inline">
          <el-input :placeholder="placeholder" v-model="keywords" style="width: 400px; margin-right: 12px" @keyup.enter.native="getUsers">
            <el-select v-model="select" @change="searchFieldChange" slot="prepend" style="width:118px">
              <el-option label="作者" value="sponsor"></el-option>
              <el-option label="标题" value="title"></el-option>
              <el-option label="创建时间" value="createTime"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getTopic">查询</el-button>
          </el-input>
          <el-button type="info" plain icon="el-icon-plus" @click="dialogCreateVisible = true">添加帖子</el-button>
          <el-button type="info" plain icon="el-icon-delete" @click="dialogMulDeleteVisible = true">批量删除</el-button>
        </el-form>
      </el-col>

      <el-table :data="topicList"
                style="width: 100%"
                height="680"
                ref="topicList">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="帖子内容：">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="sponsor" label="作者" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini" type="warning" plain
              @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button
              size="mini" type="danger" plain
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog title="添加帖子" center v-model="dialogCreateVisible" :visible.sync="dialogCreateVisible" :close-on-click-modal="false" @close="resetCreate" >
        <el-form ref="create" :model="create" :rules="createRules"  label-width="120px">
          <el-form-item prop="title" label="标题">
            <el-input v-model="create.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
            <el-input
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 100}"
              placeholder="请输入内容..."
              v-model="create.content">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button plain @click="dialogCreateVisible = false">取 消</el-button>
          <el-button type="primary" plain :loading="createLoading" @click="handleCreate">提交</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑帖子" v-model="dialogUpdateVisible" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false">
        <el-form ref="update" :model="update" label-width="100px">
          <el-form-item prop="title" label="标题">
            <el-input v-model="update.title"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
            <el-input
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 100}"
              placeholder="请输入内容..."
              v-model="update.content">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button plain @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" plain :loading="updateLoading" @click="updateInfo">提交</el-button>
        </div>
      </el-dialog>

      <el-pagination class="paging"
                     :current-page="filter.currentPage"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="filter.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalRows"
                     @size-change="pageSizeChange"
                     @current-change="pageCurrentChange">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
  import api from '../../config/api-config'

  let placeholders = {
    "sponsor":"请输入用户名",
    "title":"请输入标题",
    "createTime":"创建时间"
  };

  export default {
    data: function() {
      return {
        userInfo: {},
        topicList: [],
        create: {},
        update:{},
        createRules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
        },
        filter: {
          pageSize: 10,
          currentPage: 1,
          beginIndex: 0,
          username: '',
        },
        totalRows: 0,
        keywords: '', //搜索框的关键字内容
        select: 'sponsor', //搜索框的搜索字段
        loading: true,
        //selected: [], //已选择项
        dialogCreateVisible: false, //创建对话框的显示状态
        dialogUpdateVisible: false,
        createLoading: false,
        updateLoading: false,
        placeholder:placeholders["sponsor"]
      };
    },
    mounted: function() {
      this.getTopic();
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    },
    methods: {
      tableSelectionChange(val) {
        this.selected = val;
      },
      searchFieldChange(val) {
        this.select = val;
        this.placeholder=placeholders[val];
        console.log(`搜索字段： ${val} `);
      },
      pageSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.filter.pageSize = val;
        this.getTopic();
      },
      pageCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.filter.currentPage = val;
        this.getTopic();
      },
      resetCreate() {
        this.$refs.create.resetFields();
      },
      getTopic() {
        this.loading = true;
        api.reqGetTopicList().then(res => {
          this.topicList = res.data;
          //查询
          let queryData = [];
          if(this.keywords !==""){
            for (let i=0,lenI=this.topicList.length;i<lenI;i++) {
              let reg = new RegExp(this.keywords);
              console.log(this.topicList[i][this.select]);
              if(this.topicList[i][this.select].toString().match(reg)){
                queryData.push(this.topicList[i]);
              }
            }
          }
          else queryData = this.topicList;
          this.totalRows = queryData.length;
          //分页
          this.filter.beginIndex = (this.filter.currentPage-1)*this.filter.pageSize;
          this.topicList = queryData.splice(this.filter.beginIndex,this.filter.pageSize);
          this.loading = false;
        })
      },
      handleCreate(){
        this.$refs.create.validate((valid) => {
          if (valid) {
            this.create.sponsor = this.userInfo.username;
            api.reqPostTopic(this.create).then(res => {
              if(res.data.code === 0){
                this.$message.success('创建成功！');
                this.resetCreate();
                this.dialogCreateVisible = false;
                this.getTopic();
              }
              else {
                this.$message.error('创建失败！');
                this.resetCreate();
              }
            }).catch(() => {
              this.$message.error('创建失败！');
              this.resetCreate();
            })
          }
          else {
            return false;
          }
        })
      },
      handleUpdate(row) {
        this.dialogUpdateVisible = true;
        this.updateId = row._id;
        this.update.title = row.title;
        this.update.sponsor = this.userInfo.username;
        this.update.content = row.content;
      },
      updateInfo() {
        api.reqUpdateTopic(this.updateId,this.update).then(() => {
          this.$message.success('修改成功！');
          this.dialogUpdateVisible = false;
          this.getTopic();
        }).catch(() => {
          this.$message.error('修改失败！');
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将删除帖子 ' + row.title + ', 是否继续?', '提示', { type: 'warning' })
          .then(() => {
            api.reqDeleteTopic(row._id).then(() =>{
              this.$message.success('删除成功！');
              this.getTopic();
            }).catch(() => {
              this.$message.error('删除失败！');
            })
          })
          .catch(() => {
            this.$message.info('已取消操作!');
          });
      }
    }
  }
</script>

<style>
  .paging{
    text-align: center;
    margin:12px 0;
  }
</style>

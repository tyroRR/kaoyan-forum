<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>后台管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>资料管理</el-breadcrumb-item>
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
              <el-option label="文件名" value="fileName"></el-option>
              <el-option label="类型" value="type"></el-option>
              <el-option label="存储路径" value="url"></el-option>
              <el-option label="下载次数" value="count"></el-option>
              <el-option label="创建时间" value="createTime"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getFile">查询</el-button>
          </el-input>
          <el-button type="info" plain icon="el-icon-upload" @click="dialogUploadVisible = true">上传资料</el-button>
          <el-button type="info" plain icon="el-icon-delete" @click="dialogMulDeleteVisible = true">批量删除</el-button>
        </el-form>
      </el-col>

      <el-table :data="fileList"
                style="width: 100%"
                height="680"
                ref="fileList">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="fileName" label="文件名" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="url" label="存储路径" align="center"></el-table-column>
        <el-table-column prop="count" label="下载次数" align="center"></el-table-column>
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

      <el-dialog title="上传资料" center v-model="dialogUploadVisible" :visible.sync="dialogUploadVisible" :close-on-click-modal="false" @close="resetUpload" >
        <el-form ref="create" :model="create" :rules="createRules"  label-width="120px">
          <el-form-item prop="type" label="所属分类">
            <el-input v-model="create.type" placeholder="请输入类型"></el-input>
          </el-form-item>
          <el-form-item prop="files" label="文件">
            <el-upload
              class="upload-demo"
              drag
              ref="uploadFile"
              name="files"
              action=""
              :auto-upload="false"
              :before-upload="appendFile"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button plain @click="dialogUploadVisible = false">取 消</el-button>
          <el-button type="primary" plain :loading="createLoading" @click="handleUpload">提交</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改文件信息" v-model="dialogUpdateVisible" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false">
        <el-form ref="update" :model="update" label-width="100px">
          <el-form-item prop="fileName" label="文件名">
            <el-input v-model="update.fileName"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="存储路径">
            <el-input v-model="update.url"></el-input>
          </el-form-item>
          <el-form-item prop="count" label="下载次数">
            <el-input v-model="update.count"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="类型">
            <el-input v-model="update.type"></el-input>
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
    "fileName":"请输入文件名",
    "type":"请输入类型",
    "url":"请输入存储路径",
    "count":"请输入下载次数",
    "createTime":"创建时间"
  };

  export default {
    data: function() {
      return {
        userInfo: {},
        fileList: [],
        create: {},
        uploadForm: new FormData(),
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
        },
        totalRows: 0,
        keywords: '', //搜索框的关键字内容
        select: 'fileName', //搜索框的搜索字段
        loading: true,
        //selected: [], //已选择项
        dialogUploadVisible: false, //创建对话框的显示状态
        dialogUpdateVisible: false,
        createLoading: false,
        updateLoading: false,
        placeholder:placeholders["fileName"]
      };
    },
    mounted: function() {
      this.getFile();
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
        this.getFile();
      },
      pageCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.filter.currentPage = val;
        this.getFile();
      },
      resetUpload() {
        this.$refs.create.resetFields();
      },
      getFile() {
        this.loading = true;
        api.reqGetDocList().then(res => {
          this.fileList = res.data;
          //查询
          let queryData = [];
          if(this.keywords !==""){
            for (let i=0,lenI=this.fileList.length;i<lenI;i++) {
              let reg = new RegExp(this.keywords);
              console.log(this.fileList[i][this.select]);
              if(this.fileList[i][this.select].toString().match(reg)){
                queryData.push(this.fileList[i]);
              }
            }
          }
          else queryData = this.fileList;
          this.totalRows = queryData.length;
          //分页
          this.filter.beginIndex = (this.filter.currentPage-1)*this.filter.pageSize;
          this.fileList = queryData.splice(this.filter.beginIndex,this.filter.pageSize);
          this.loading = false;
        })
      },

      appendFile (file) {   // before-upload
        this.uploadForm.append('files', file);
        return false;
      },

      handleUpload(){
        this.$refs.create.validate((valid) => {
          if (valid) {
            this.uploadForm.append('type', this.create.type);
            this.$refs.uploadFile.submit();
            api.reqUploadFiles(this.uploadForm).then(res => {
              if(res.data.code === 0){
                this.$message.success('上传成功！');
                this.resetUpload();
                this.dialogUploadVisible = false;
                this.getFile();
              }
              else {
                this.$message.error('上传失败！');
                this.resetUpload();
              }
            }).catch(() => {
              this.$message.error('上传失败！');
              this.resetUpload();
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
        this.update.fileName = row.fileName;
        this.update.type = row.type;
        this.update.url = row.url;
        this.update.count = row.count;
        this.update.createTime = row.createTime;
      },

      updateInfo() {
        api.reqUpdateFile(this.updateId,this.update).then(() => {
          this.$message.success('修改成功！');
          this.dialogUpdateVisible = false;
          this.getFile();
        }).catch(() => {
          this.$message.error('修改失败！');
        })
      },

      handleDelete(row) {
        this.$confirm('此操作将删除文件 ' + row.fileName + ', 是否继续?', '提示', { type: 'warning' })
          .then(() => {
            api.reqDeleteFile(row._id).then(() =>{
              this.$message.success('删除成功！');
              this.getFile();
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

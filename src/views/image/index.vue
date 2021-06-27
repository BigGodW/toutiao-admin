<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div style="padding-bottom: 20px;" class="paddin-box">
        <el-radio-group 
        v-model="params.collect" 
        @change="loadImage"
        size="mini">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini" @click="uploadDialog=true">添加图片</el-button>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="uploadDialog"
        width=""
        center>
        <el-upload
          class="upload-demo"
          drag
          name='image'
          :action="uploadUrl"
          :headers="headers"
          :on-success="uploadSuccess"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadDialog = false">取 消</el-button>
          <el-button type="primary" @click="uploadDialog = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col v-for="image of images" :key='image.id' :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style="height: 100px"
            :src="image.url"
            fit="cover"
            :preview-src-list="srcList"
          ></el-image>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
    </el-card>
     <el-pagination
        layout="prev, pager, next"
        background
        :page-size='params.per_page'
        :total="image_count"
         @current-change="changeCurrent"	
        >
      </el-pagination>
  </div>
</template>

<script>
import {getImages} from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {
  },
  props: {},
  data () {
    return {
      uploadDialog:false,
      uploadUrl:'http://api-toutiao-web.itheima.net/mp/v1_0/user/images',
      headers:{
        Authorization: 'Bearer '+JSON.parse(window.localStorage.user).token
      },
      images:[],
      srcList:[],
      image_count:0,
      params:{
        collect:false,
        page:null,
        per_page:20
      }
    }
  },
  computed: {
  },
  watch: {},
  created () {
    this.loadImage()
  },
  mounted () {},
  methods: {
    loadImage(){
        getImages(this.params).then(res=>{
          this.images = res.data.data.results
          this.srcList = this.images.map(item=>{
            return item.url
          })
          this.image_count = res.data.data.total_count
        })
    },
    changeCurrent(value){
      this.params.page = value
      this.loadImage()
    },
    uploadSuccess(){
      this.uploadDialog = false
      this.loadImage()
      console.log('上传成功')
    }
  }
}
</script>

<style scoped lang="less"></style>
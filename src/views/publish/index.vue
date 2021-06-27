<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref="form" :model="article" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-tiptap  
          lang="zh" 
          v-model="article.content" 
          :extensions="extensions" 
          height='400'
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group  v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option v-for="item in channels" :key='item.id' :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {uploadImage} from '@/api/image'
import {addArticle, getChannels} from '@/api/article'
import { 
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Image,
  ListItem,
  BulletList,
  OrderedList,
  } from 'element-tiptap'
import 'element-tiptap/lib/index.css';

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      article:{
        title:'',
        content:null,
        channel_id:null,
        cover:{
          type:0,
          images:[]
        }
      },
      channels:[],
      content :"文章内容",
      extensions:[
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new Image({
            uploadRequest(file){
              const fd = new FormData()
              fd.append('image',file)
              return uploadImage(fd).then(res=>{
                return res.data.data.url
              })
            }
        }),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannel()
  },
  mounted () {},
  methods: {
    onSubmit (draft) {
      const message = draft? '文章保存到草稿箱':'文章发布成功'
      addArticle(this.article,draft).then(res=>{
         this.$message({
           message,
           type:'success'
         })
          this.$router.push('/article')

      })
    },
    loadChannel(){
      getChannels().then(res=>{
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
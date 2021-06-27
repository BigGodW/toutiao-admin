<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="params" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="params.status">
            <el-radio :label="null" >全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="params.channel_id" placeholder="请选择频道">
            
            <el-option 
            label="全部" 
            :value="null">
            </el-option><el-option v-for="item in channels" 
            :key="item.id" 
            :label="item.name" 
            :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="renderDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="changeDate"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{article_count}} 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column
          prop="id"
          label="文章ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="文字标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="文章状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="article_count"
         @current-change="changeCurrent"	
        >
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import {getArticles,getChannels} from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      params:{
          status:null,
          channel_id:null,
          begin_pubdate:null,
          end_pubdate:null,
          page:1,
          per_page:10
      },
      article_count:0,
      articles:[],
      channels:[],
      renderDate:[]
    }
  },
  computed: {},
  watch: {},
  created () {
      this.loadArticles(),
      this.loadChannels()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles(){
        getArticles(this.params).then(res=>{
            console.log(res.data.data)
            
            this.article_count = res.data.data.total_count
            this.articles = res.data.data.results
        })
    },
    loadChannels(){
        getChannels().then(res=>{ 
            
            this.channels = res.data.data.channels
        })
    },
    changeCurrent(value){
        this.params.page = value
        this.loadArticles()
    },
    changeDate(){
        this.params.begin_pubdate =this.renderDate? this.renderDate[0]: null ,
        this.params.end_pubdate= this.renderDate? this.renderDate[1]:null
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
</style>
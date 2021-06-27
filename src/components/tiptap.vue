<template>
  <div>
    <el-tiptap :v-model="content" :extensions='extensions'></el-tiptap>
  </div>
</template>
<script>
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
} from 'element-tiptap';
import 'element-tiptap/lib/index.css';
import ''
export default {
  name:'tiptap',
  data(){
    return{
      contents:"",
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image(),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock()
      ]
    }
  },
  components:{
    'el-tiptap':ElementTiptap
  },
  props:[]
}
</script>
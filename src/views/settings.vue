<template>
  <div>
    <div class="dialog">
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        @opened="dialogOpened"
        center
      >
        <div class="img-container">
          <img :src="cropImageUrl" alt="" ref="image" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="uploadChange">提 交</el-button>
        </span>
      </el-dialog>
    </div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户头像">
        <el-row>
          <el-col type="flex" justify="center">
            <img width="100" :src="user.photo" class="avatar" />
            <input type="file" hidden ref="imageFile" @change="imageChange" />
            <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-col>
          <el-col>
            <el-button @click="$refs.imageFile.click()">修改头像</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="user.intro"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserProfile, changePhoto } from "@/api/user";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  name: "AccountIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        email: "", // 邮箱
        intro: "", // 简介
        mobile: "", // 手机号
        name: "", // 昵称
        photo: "", // 头像
      },
      centerDialogVisible: false,
      cropImageUrl: null,
      myCropper: null,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile();
  },
  methods: {
    onSubmit() {
      console.log("保存");
    },

    loadUserProfile() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
        //console.log(res.data)
      });
    },
    imageChange(val, t) {
      const file = this.$refs.imageFile.files[0];
      const imageUrl = window.URL.createObjectURL(file);
      this.cropImageUrl = imageUrl;
      this.centerDialogVisible = true;
      if (this.myCropper) {
        this.myCropper.replace(this.cropImageUrl);
      }
    },
    dialogOpened() {
      const image = this.$refs.image;
      if(this.myCropper){
        return
      }
      this.myCropper = new Cropper(image, {
        viewModel: 1,
        aspectRatio: 1,
        dragMode:'none'
      });
    },
    // 上传头像
    uploadChange() {
      console.log("提交");
      const img = this.myCropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("photo", file);
        changePhoto(fd).then((res) => {
          this.user.photo = res.data.data.photo
          this.$message({
            message:'头像修改成功',
            type:'success'
          })
        }).catch(err=>{
          console.log(err)
        })
      });
      this.centerDialogVisible = false;
      // console.log(img)
    },
  },
};
</script>

<style lang="less" scoped>
.img-container {
  img {
    display: block;
    max-width: 100%;
  }
}
</style>
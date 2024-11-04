<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-card class="login-card" shadow="hover">
        <h2 class="login-title">欢迎登录</h2>
        <el-form :model="form" ref="formRef" label-width="80px" @submit.prevent="handleLogin">
          <el-form-item label="账号" prop="username" :rules="usernameRules">
            <el-input v-model="form.username" placeholder="请输入账号" prefix-icon="el-icon-user" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :rules="passwordRules">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" prefix-icon="el-icon-lock" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" class="login-button">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElForm } from 'element-plus';
import LoginApi, {type LoginData} from "@/api/login";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = useRouter();

const form = ref({
  username: '',
  password: '',
});

const usernameRules = [
  { required: true, message: '请输入账号', trigger: 'blur' },
];

const passwordRules = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 6, message: '密码至少为 6 位', trigger: 'blur' },
];

const formRef = ref<InstanceType<typeof ElForm>>();

const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
});

const handleLogin = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      LoginApi.login(loginData.value).then((res)=>{
        console.log(loginData.value);
        console.log(res);
        if(res.data.code == 0){
          ElMessage.info("登录成功")
        }
        router.push({name:"index"});
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        console.log("获取本地的token",res.data.token);
      }).catch((err)=>{
        ElMessage.error('登录失败！')
        console.log(err);
      })
      // 处理登录逻辑
    } else {
      console.log('验证失败');
      return false;
    }
  });
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f0f2f5, #e1e5ea); /* 渐变背景 */
}

.login-card {
  width: 400px;
  padding: 40px; /* 增加内边距 */
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); /* 深色阴影 */
  background-color: #fff;
  border: 1px solid #e3e3e3; /* 边框 */
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px; /* 增大标题 */
  color: #333;
}

.login-button {
  width: 100%;
  border-radius: 10px; /* 按钮圆角 */
  transition: background-color 0.3s, transform 0.3s; /* 添加动画 */
}

.login-button:hover {
  background-color: #409EFF; /* 鼠标悬停效果 */
  transform: translateY(-2px); /* 悬停时轻微上浮 */
}
</style>

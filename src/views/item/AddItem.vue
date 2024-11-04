<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="玩家Id">
      <el-input v-model="form.userId" />
    </el-form-item>
    <el-form-item label="道具Id">
      <el-input v-model="form.itemId" />
    </el-form-item>
    <el-form-item label="数量">
      <el-input v-model="form.count" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import AddItemApi from "@/api/Item";
import {ElMessage} from "element-plus";

/**
 * 添加道具表单
 */
const form = reactive({
  userId: '',
  itemId: '',
  count: 0,
})

/**
 * 添加道具
 */
const onSubmit = () => {
  AddItemApi.addItem(form).then((res)=>{
    console.log(res);
    if(res.data.code == 0){
      console.log(res);
      ElMessage.info("道具添加成功！");
    }
  }).catch((err)=>{
    console.log(err);
    ElMessage.error("道具添加失败！");

  })
  console.log('submit!');
}
</script>
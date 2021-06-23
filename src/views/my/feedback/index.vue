<template>
  <div class="feedback">
    <div class="main">
      <p>意见反馈</p>
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="150"
        placeholder="请填下您的意见和反馈"
        show-word-limit
      />
      <van-field
        v-model="tel"
        type="tel"
        label="联系方式:"
        placeholder="邮箱/手机号/微信"
      />
    </div>
    <button @click="submitAction">提交</button>
  </div>
</template>

<script>
import { Toast } from "vant";
import { submitAction } from "../../../api/my/index";
export default {
  data() {
    return {
      tel: "",
      message: "",
    };
  },
  methods: {
    submitAction() {
      submitAction({
        content: this.message,
        openId: localStorage.getItem("openId"),
        phone: this.tel,
      }).then((res) => {
        Toast("提交成功!");
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.feedback {
  height: calc(100% - 50px);
  background-color: #fff;
  text-align: left;
  .main {
    width: 90%;
    margin: 0 auto;
    p {
      margin: 0;
      padding: 12px;
      border-bottom: 1px solid #eee;
    }
    ::v-deep .van-field {
      border-bottom: 1px solid #eee;
    }
  }
  button {
    display: block;
    width: 90%;
    height: 50px;
    border-radius: 4px;
    font-size: 15px;
    line-height: 50px;
    background-color: #b4282d;
    color: #fff;
    border: none;
    margin: 0 auto;
    margin-top: 50px;
  }
}
</style>
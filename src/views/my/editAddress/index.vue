<template>
  <div class="edit">
    <van-field
      v-model="data.name"
      type="text"
      label="姓名:"
      label-width="60px"
    />
    <van-field
      v-model="data.mobile"
      type="tel"
      label="手机号:"
      label-width="60px"
    />
    <van-field
      v-model="data.address"
      readonly
      type="text"
      label="地址:"
      @click="showAddress"
      label-width="60px"
    />
    <!-- 点击展示地图 -->
    <van-action-sheet v-model="show" title="标题">
      <div class="content">
        <van-area
          title="标题"
          :area-list="areaList"
          @confirm="setAddress"
          @cancel="cancel"
        />
      </div>
    </van-action-sheet>
    <van-field
      v-model="data.address_detail"
      type="text"
      label="详细地址:"
      label-width="60px"
    />
    <!-- 设为默认 -->
    <div class="default">
      <van-checkbox v-model="checked" shape="square" checked-color="#bd282d"
        >复选框</van-checkbox
      >
      <p>设为默认地址</p>
    </div>
    <!-- 保存 -->
    <div class="save" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { detailAction, saveAction } from "../../../api/my/index";
import { Toast } from "vant";
export default {
  data() {
    return {
      data: {
        name: "",
        address: "",
        address_detail: "",
        mobile: "",
        is_default: 0,
      },
      show: false,
      areaList,
      checked: false,
      id: "",
    };
  },
  methods: {
    //初始化界面
    init() {
      this.id = this.$route.query.id;
      if (this.id) {
        detailAction({ id: this.id }).then((res) => {
          this.data = res.data.data;
          if (res.data.data.is_default == "1") {
            this.checked = true;
          }
        });
      }
    },
    // 控制地图控件显示隐藏
    showAddress() {
      this.show = !this.show;
    },
    //设置地址
    setAddress(res) {
      this.data.address = res.reduce((total, item) => {
        return (total += item.name + " ");
      }, "");
      this.show = false;
    },
    //取消显示
    cancel() {
      this.show = false;
    },
    //修改新增地址
    saveAddress() {
      // 如果存在id 修改,不存在新增
      if (this.id) {
        saveAction({
          address: this.data.address,
          addressId: this.id,
          checked: this.checked,
          detailadress: this.data.address_detail,
          openId: localStorage.getItem("openId"),
          telNumber: this.data.mobile,
          userName: this.data.name,
        }).then(() => {
          Toast("修改成功!");
          this.$router.go(-1);
        });
      } else {
        saveAction({
          address: this.data.address,
          checked: this.checked,
          addressId: "",
          detailadress: this.data.address_detail,
          openId: localStorage.getItem("openId"),
          telNumber: this.data.mobile,
          userName: this.data.name,
        }).then((res) => {
          Toast("添加成功!");
          this.$router.go(-1);
        });
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.edit {
  height: 100%;
  background-color: #fff;
  ::v-deep .van-cell {
    height: 60px;
    line-height: 40px;
  }
  ::v-deep .van-action-sheet__content {
    .content {
      padding-top: 0;
    }
  }
  .default {
    padding: 15px;
    display: flex;
  }
  .save {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #bd282d;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>>
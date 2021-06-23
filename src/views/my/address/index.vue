<template>
  <div class="addressList">
    <ul class="list">
      <li class="item" v-for="item in addressList" :key="item.id">
        <van-swipe-cell>
          <div class="address">
            <div class="name">
              <p>{{ item.name }}</p>
              <van-tag
                plain
                type="primary"
                v-if="item.is_default == 1"
                color="#bd282D"
                text-color="#bd282D"
                >默认</van-tag
              >
            </div>
            <div class="info">
              <p>{{ item.mobile }}</p>
              <p class="des">{{ item.address }}</p>
              <div @click="edit(item.id)"></div>
            </div>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="delAddress(item.id)"
            />
          </template>
        </van-swipe-cell>
      </li>
    </ul>
    <div class="addNew" @click="addAddress"><p>+新增地址</p></div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import { getListAction, deleteAction } from "../../../api/my/index";
export default {
  data() {
    return {
      addressList: [],
    };
  },
  methods: {
    //   初始化页面数据
    init() {
      const openId = localStorage.getItem("openId");
      getListAction({ openId: openId }).then((res) => {
        this.addressList = res.data.data;
      });
    },
    //点击跳转地址编辑
    edit(id) {
      this.$router.push({ name: "edit", query: { id } });
    },
    //添加地址
    addAddress() {
      this.$router.push("/my/edit");
    },
    //删除地址
    delAddress(id) {
      Dialog.confirm({
        message: "确定删除吗？",
      }).then(() => {
        deleteAction({
          id,
        }).then(() => {
          Toast("删除成功!");
          this.init();
        });
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.addressList {
  height: calc(100% - 50px);
}
.list {
  background-color: #fff;
  padding-bottom: 72px;
  .item {
    padding: 0 20px;
    position: relative;
    border-bottom: 1px solid #d9d9d9;

    .address {
      padding: 15px 0;
      display: flex;
      justify-content: start;
      align-items: center;
      text-align: left;
      font-size: 12px;
      color: #000;
      .name {
        width: 65px;
        font-size: 14px;
        margin-top: -10px;
        p {
          margin: 5px 0;
        }
      }
      .info {
        width: 70%;
        .des {
          color: #666;
        }
        div {
          position: absolute;
          width: 27px;
          height: 27px;
          background: url("../../../../public/images/edit.png") no-repeat 0 0;
          right: 10px;
          top: 35%;
          background-size: contain;
        }
      }
    }
  }
  ::v-deep
    .delete-button.van-button.van-button--danger.van-button--normal.van-button--square {
    height: 80%;
    top: 10%;
  }
}

.addNew {
  width: 100%;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  text-align: center;
  background-color: #fff;
  p {
    width: 80%;
    line-height: 40px;
    border: 1px solid #bd282d;
    color: #bd282d;
    margin: 15px auto;
  }
}
</style>>
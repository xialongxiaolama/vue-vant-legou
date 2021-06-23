<template>
  <div class="city">
    <input
      type="text"
      v-model.trim="iptVal"
      class="ipt"
      placeholder="   请输入搜索地址"
    />
    <ul>
      <li v-for="item in list" :key="item.list" @click="uptCityInfo(item)">
        {{ item.name }}
      </li>
    </ul>
    <div id="container"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      iptVal: "",
      city: this.$store.state.cityInfo.name,
      list: [],
    };
  },
  methods: {
    //点击更新城市信息
    uptCityInfo(val) {
      this.$store.commit("uptCityInfo", val);
      this.$router.push("/home");
    },
  },
  watch: {
    // 监听输入框数据
    iptVal() {
      var _this = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: _this.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(_this.iptVal, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          _this.list = result.tips;
          // console.log(result);
        });
      });
    },
  },
  mounted() {
    var _this = this;
    var info = this.$store.state.cityInfo;
    // 地图显示当前坐标
    // 取出公共数据 位置信息
    if (info.location) {
      var map = new AMap.Map("container", {
        mapStyle: "amap://styles/whitesmoke",
        zoom: 15, //级别
        center: [info.location.lng, info.location.lat], //中心点坐标
      });
    } else {
      var map = new AMap.Map("container");
    }

    // 获取当前城市信息, 用于周边搜索
    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          // console.log(result);
          _this.city = result.city;
        }
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.city {
  height: calc(100% - 50px);
  background-color: #fff;
  position: relative;
  #container {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 300px;
  }
  .ipt {
    width: 90%;
    margin: 0 auto;
    height: 40px;
    border: 1px solid rgb(211, 211, 211);
  }
  ul {
    padding-left: 20px;
    background-color: #fff;
    li {
      font-size: 12px;
      line-height: 28px;
      height: 28px;
      color: #000;
      text-align: left;
    }
  }
}
</style>>
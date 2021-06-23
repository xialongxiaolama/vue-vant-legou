import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityInfo: {},
    isShow: false,
  },
  mutations: {
    //更新城市信息
    uptCityInfo(state, val) {
      state.cityInfo = val;
    },
  },
  actions: {},
  modules: {},
});

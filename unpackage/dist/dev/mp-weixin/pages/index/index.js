"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_home = require("../../apis/home.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_l_echart2 = common_vendor.resolveComponent("l-echart");
  (_easycom_uni_icons2 + _easycom_l_echart2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_l_echart = () => "../../uni_modules/lime-echart/components/l-echart/l-echart.js";
if (!Math) {
  (_easycom_uni_icons + CityDots + _easycom_l_echart)();
}
const CityDots = () => "../../components/city-dots/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref([1, 2, 3]);
    const chartRef = common_vendor.ref(null);
    const alertText = common_vendor.ref(null);
    let longitude, latitude;
    const realTimeInfo = common_vendor.reactive({
      city: "",
      area: "",
      temp: 0,
      icon: "",
      text: "",
      tempMin: 0,
      tempMax: 0,
      airQuality: 0,
      airQualityText: "",
      fxLink: ""
    });
    let threeDayList = common_vendor.ref([]);
    const getCurrentLocation = () => {
      common_vendor.index.getLocation({
        type: "jcg-02",
        success: (res2) => {
          console.log("当前位置的经度：" + res2.longitude);
          console.log("当前位置的纬度：" + res2.latitude);
          if (res2.longitude && res2.latitude) {
            longitude = 108.9032;
            latitude = 34.2407;
            getCityByLngLat();
            getNowWeather();
            getAirQualityInfo();
            getThreeDaysWeatherInfo();
            getWeatherAlertInfo();
            getRainBroadcastInfo();
            getLifeIndicesData();
            getSunriseAndSunsetInfo();
          }
        }
      });
    };
    const getCityByLngLat = async () => {
      try {
        const params = { location: `${longitude},${latitude}` };
        const res2 = await apis_home.searchCity(params);
        if (res2 && res2.data) {
          const { location: location2 } = res2.data;
          const { adm2, name, updateTime } = location2[0];
          realTimeInfo.city = adm2;
          realTimeInfo.area = name;
          realTimeInfo.updateAt = updateTime;
        }
      } catch (err) {
        console.log(err);
      }
    };
    const getNowWeather = async () => {
      try {
        const params = { location: `${longitude},${latitude}` };
        const res2 = await apis_home.getRealTimeWeather(params);
        console.log("res", res2);
        if (res2 && res2.data && res2.data.now) {
          const { temp, text, icon, windDir, windScale, pressure, feelsLike, humidity } = res2.data.now;
          realTimeInfo.temp = temp;
          realTimeInfo.text = text;
          realTimeInfo.icon = icon;
          realTimeInfo.fxLink = res2.data.fxLink;
          lifeIndicesInfo.windDir = windDir;
          lifeIndicesInfo.windScale = windScale;
          lifeIndicesInfo.pressure = pressure;
          lifeIndicesInfo.feelsLike = feelsLike;
          lifeIndicesInfo.humidity = humidity;
        }
      } catch (e) {
        console.log("error", e);
      }
    };
    const goAddCity = () => {
      common_vendor.index.navigateTo({
        url: "/pages/add-city/add-city"
      });
    };
    const goDetail = () => {
      if (realTimeInfo.fxLink) {
        location.href = realTimeInfo.fxLink;
      }
    };
    const isNight = common_vendor.computed(() => (/* @__PURE__ */ new Date()).getHours() >= 20);
    const filterDate = (date, index) => {
      const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
      const day = new Date(date).getDay();
      if (index === 0)
        return "今天";
      if (index === 1)
        return "明天";
      if (index === 2)
        return "周" + weekDays[day];
    };
    const getThreeDaysWeatherInfo = async () => {
      try {
        const params = { location: `${longitude},${latitude}` };
        const { data } = await apis_home.getThreeDaysWeather(params);
        if (data) {
          threeDayList.value = data.daily;
          if (data.daily.length) {
            const { tempMax, tempMin } = data.daily[0];
            realTimeInfo.tempMin = tempMin;
            realTimeInfo.tempMax = tempMax;
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    const getAirQualityInfo = async () => {
      try {
        const params = { longitude, latitude };
        const { data } = await apis_home.getAirQuality(params);
        console.log("data", data);
        if (data && data.indexes) {
          const { aqiDisplay, category, color } = data.indexes[0];
          realTimeInfo.airQuality = aqiDisplay;
          realTimeInfo.airQualityText = category;
          realTimeInfo.AQI_color = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
        }
      } catch (err) {
        console.error(err);
      }
    };
    const getWeatherAlertInfo = async () => {
      try {
        const params = { location: `${longitude},${latitude}` };
        const { data } = await apis_home.getWeatherAlert(params);
        if (data && data.warning) {
          const { text } = data.warning;
          alertText.value = text;
        }
      } catch (error) {
        console.error(error);
      }
    };
    let rainInfo = common_vendor.reactive({ summary: "", isRain: false });
    const getRainBroadcastInfo = async () => {
      try {
        const params = { location: `${longitude},${latitude}` };
        const { data } = await apis_home.getRainBroadcast(params);
        if (data) {
          const { summary, minutely } = data;
          const index = minutely && minutely.findIndex((item) => Number(item.precip) > 0);
          rainInfo.summary = summary;
          rainInfo.isRain = index > -1 ? true : false;
        }
      } catch (error) {
        console.error(error);
      }
    };
    const indicesRules = [
      { type: 1, value: 0, en: "sport", level_cn: { 1: "宜户外运动", 2: "宜室内运动", 3: "宜室内运动" } },
      { type: 2, value: 0, en: "cw", level_cn: { 1: "适宜洗车", 2: "适宜洗车", 3: "不宜洗车", 4: "不宜洗车" } },
      { type: 3, value: 0, en: "drsg", level_cn: { 1: "适宜羽绒服", 2: "适宜厚外套", 3: "适宜厚外套", 4: "适宜薄外套", 5: "适宜衬衫", 6: "适宜T恤", 7: "适宜T恤" } },
      { type: 5, value: 0, en: "uv", level_cn: { 1: "弱", 2: "弱", 3: "中等", 4: "强", 5: "很强" } },
      { type: 9, value: 0, en: "flu", level_cn: { 1: "不易", 2: "较易", 3: "易", 4: "极易" } },
      { type: 16, value: 0, en: "spi", level_cn: { 1: "无需防晒", 2: "无需防晒", 3: "注意防晒", 4: "注意防晒", 5: "注意防晒" } }
    ];
    const lifeIndicesInfo = common_vendor.reactive({
      feelsLike: 0,
      //体感温度
      windDir: "",
      // 风向
      windScale: 1,
      //风力等级
      pressure: 0,
      //气压
      humidity: 0,
      //湿度
      sunset: "5:00",
      //日落
      uv: { text: "", level: 1 },
      // 紫外线指数
      drsg: { text: "", level: 1 },
      // 穿衣指数
      spi: { text: "", level: 1 },
      // 防晒指数
      sport: { text: "", level: 1 },
      // 运动指数
      cw: { text: "", level: 1 },
      //洗车指数
      flu: { text: "", level: 1 }
      // 感冒指数
    });
    const getLifeIndicesData = async () => {
      try {
        const params = { location: `${longitude},${latitude}`, type: "1,2,3,5,9,16," };
        const { data } = await apis_home.getLifeIndices(params);
        if (data && data.daily) {
          console.log("life", data);
          data.daily.forEach((item) => {
            indicesRules.forEach((val) => {
              if (Number(item.type) === val.type) {
                val.value = Number(item.level);
              }
            });
          });
          indicesRules.forEach((item) => {
            for (const key in lifeIndicesInfo) {
              if (key === item.en) {
                lifeIndicesInfo[item.en].text = item.level_cn[item.value];
                lifeIndicesInfo[item.en].level = item.value;
              }
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getSunriseAndSunsetInfo = async () => {
      try {
        const now = (/* @__PURE__ */ new Date()).toLocaleDateString();
        let date_arr = now.split("/");
        date_arr = date_arr.map((item) => {
          if (Number(item) < 10) {
            return "0" + item;
          } else {
            return item;
          }
        });
        console.log("date_arr", date_arr);
        const date = date_arr.join("");
        const params = { location: `${longitude},${latitude}`, date };
        const { data } = await apis_home.getSunriseAndSunset(params);
        if (data) {
          const { sunset } = data;
          console.log("sunset", sunset);
          const hours = new Date(sunset).getHours();
          const minutes = new Date(sunset).getMinutes();
          lifeIndicesInfo.sunset = hours + ":" + minutes;
        }
      } catch (error) {
      }
    };
    const res = {
      //x轴数据
      xData: ["6/11", "6/12", "6/13", "6/14", "6/15", "6/16", "6/17"],
      //y轴数据
      yData: [50, 120, 150, 220, 180, 300, 130]
    };
    const option = {
      xAxis: {
        type: "category",
        // x轴数据文字颜色
        axisLabel: {
          color: "#a7a7a7"
        },
        // x轴那天坐标轴线的颜色
        axisLine: {
          lineStyle: {
            color: "#f1f1f1"
          }
        },
        //x轴上面刻度线隐藏
        axisTick: {
          show: false
        },
        //这里是x轴数据
        data: res.xData
      },
      //设置网格
      grid: {
        top: 40,
        bottom: 30
      },
      //y轴设置
      yAxis: {
        type: "value",
        //y轴标签文字颜色
        axisLabel: {
          color: "#a7a7a7"
        },
        // y轴分割线设置为虚线
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      //设置提示为点击时
      tooltip: {
        trigger: "axis",
        triggerOn: "click",
        formatter: "{b} \n 数据: {c}"
      },
      //设置曲线的颜色
      color: ["#4e9d77"],
      series: [{
        //这里是数据
        data: res.yData,
        type: "line",
        //设置为平滑，默认为折线
        smooth: true
      }]
      //设置数据缩放，手指缩放
      // dataZoom:{
      // 		type:'inside',//inside移动端就是手指缩放，slider
      // 		id:'123',
      // }
    };
    const initCharts = async () => {
      if (!chartRef.value)
        return;
      const myChart = await chartRef.value.init(common_vendor.echarts);
      myChart.setOption(option);
    };
    common_vendor.onMounted(() => {
      getCurrentLocation();
      initCharts();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "location-filled",
          size: "28",
          color: "#fff"
        }),
        b: common_vendor.t(realTimeInfo.city),
        c: common_vendor.t(realTimeInfo.area),
        d: common_vendor.o(goAddCity),
        e: common_vendor.p({
          type: "plusempty",
          size: "28",
          color: "#fff"
        }),
        f: common_vendor.p({
          type: "more-filled",
          size: "28",
          color: "#fff"
        }),
        g: common_vendor.t(realTimeInfo.temp),
        h: common_vendor.t(realTimeInfo.text),
        i: common_vendor.t(realTimeInfo.tempMax),
        j: common_vendor.t(realTimeInfo.tempMin),
        k: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-leaf",
          size: "20",
          color: "#fff"
        }),
        l: common_vendor.t(realTimeInfo.airQuality),
        m: common_vendor.t(realTimeInfo.airQualityText),
        n: realTimeInfo.AQI_color,
        o: alertText.value
      }, alertText.value ? {
        p: common_vendor.t(alertText.value)
      } : {}, {
        q: common_vendor.f(common_vendor.unref(threeDayList), (item, index, i0) => {
          return {
            a: common_vendor.t(filterDate(item.fxDate, index)),
            b: common_vendor.t(isNight.value ? item.textDay : item.textNight),
            c: "1cf27b2a-5-" + i0,
            d: common_vendor.p({
              ["custom-prefix"]: "qweather-icons",
              type: isNight.value ? "qi-" + item.iconNight : "qi-" + item.iconDay,
              color: "#fff",
              size: "22"
            }),
            e: common_vendor.t(item.tempMin),
            f: common_vendor.t(item.tempMax),
            g: index
          };
        }),
        r: common_vendor.sr(chartRef, "1cf27b2a-6", {
          "k": "chartRef"
        }),
        s: common_vendor.t(common_vendor.unref(rainInfo).summary),
        t: !common_vendor.unref(rainInfo).isRain
      }, !common_vendor.unref(rainInfo).isRain ? {} : {}, {
        v: common_vendor.t(lifeIndicesInfo.uv.text),
        w: common_vendor.t(lifeIndicesInfo.humidity),
        x: common_vendor.t(lifeIndicesInfo.feelsLike),
        y: common_vendor.t(lifeIndicesInfo.windDir),
        z: common_vendor.t(lifeIndicesInfo.windScale),
        A: common_vendor.t(lifeIndicesInfo.sunset),
        B: common_vendor.t(lifeIndicesInfo.pressure),
        C: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-yurongfu",
          size: "40",
          color: "#000"
        }),
        D: common_vendor.t(lifeIndicesInfo.drsg.text),
        E: lifeIndicesInfo.spi.level >= 3
      }, lifeIndicesInfo.spi.level >= 3 ? {
        F: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-fangshai",
          size: "34",
          color: "#000"
        })
      } : {}, {
        G: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-no-fangshai",
          size: "34",
          color: "#000"
        }),
        H: common_vendor.t(lifeIndicesInfo.spi.text),
        I: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-shineiyundongzhongxin",
          size: "40",
          color: "#000"
        }),
        J: common_vendor.t(lifeIndicesInfo.sport.text),
        K: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-car-washing",
          size: "32",
          color: "#000"
        }),
        L: common_vendor.t(lifeIndicesInfo.cw.text),
        M: common_vendor.unref(rainInfo).isRain
      }, common_vendor.unref(rainInfo).isRain ? {
        N: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-umbrella",
          size: "36",
          color: "#000"
        })
      } : {
        O: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-no-rain",
          size: "36",
          color: "#000"
        })
      }, {
        P: common_vendor.t(common_vendor.unref(rainInfo).isRain ? "记得带伞" : "不用带伞"),
        Q: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-jiaonang",
          size: "36",
          color: "#000"
        }),
        R: common_vendor.t(lifeIndicesInfo.flu.text),
        S: common_vendor.o(goDetail)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);

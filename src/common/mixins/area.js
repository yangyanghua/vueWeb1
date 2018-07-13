import areaselection from '@/components/area/index.vue';
import {
    mapActions
  } from 'vuex';
export const mixin = {
    data() {
        return {
          preareaOptions: [],
          selectedArea: [],
          areaOptions: []
        }
      },
      components: {
        areaselection
      },
      computed: {
        areaOptionsText: function () {

            let checkcity = [];
            console.log(this.areaOptions)
            this.areaOptions.forEach((item) => {
                Object.keys(item.include).map((city) => {
                    if (item.include[city].checkAll) {
                        checkcity.push(city);
                    } else if (item.include[city].isIndeterminate) {
                        checkcity.push(city + '{' + item.include[city].listChecked.join(',') +
                            '}')
                    }
                });
            });
            return checkcity.join(', ');

        }
    },
      methods: {
        ...mapActions(['getAllAreaInfo']),
        setArea(areas) {
          console.log('setArea ', areas);
          let getSelectedArea = [];
          areas.forEach((area) => {
            Object.keys(area["include"]).forEach((province) => {
              let list = area["include"][province];
              if ((list.list.length === list.listChecked.length) && (list.listChecked.length !==
                  0)) {
                let selectedCity = {
                  provinceCode: list.cities[0].provinceCode,
                  provinceName: province,
                  cityCode: '*'
                }
                getSelectedArea.push(selectedCity);
              } else {
                let selectedCities = list.listChecked.map((city) => {
                  let currentCity = list.cities.find(x => x.name == city);
                  let toAddCity = {
                    provinceCode: currentCity.provinceCode,
                    provinceName: province,
                    cityCode: currentCity.adcode,
                    cityName: currentCity.name,
                  };
                  return toAddCity;
                });
                getSelectedArea = getSelectedArea.concat(selectedCities);
              }
            });
          });
  
          this.areaOptions = JSON.parse(JSON.stringify(this.preareaOptions));
          //  getSelectedArea 为后端所需数组
          console.log('getSelectedArea ', this.areaOptionsText,getSelectedArea, this.areaOptions);
          // this.subForm.areas = getSelectedArea;
          this.selectedArea = getSelectedArea;
          return Promise.resolve([...getSelectedArea]);
        },
        selectArea() {
          let checkFreeRgions = this.selectedArea;
          console.log(checkFreeRgions);
          this.getAllAreaInfo(checkFreeRgions).then((res) => {
            console.log(' recieve area ', res);
            this.preareaOptions = JSON.parse(JSON.stringify(res));
            this.$refs.areaSelection.show();
          })
  
        },
      },
}
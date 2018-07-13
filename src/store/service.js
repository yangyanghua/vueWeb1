import {
    http,
    api
} from '@/common/http/http.js';
// export const getProductDetail = (params = {}) => {
//     return http.get(api.getProductDetail, {
//         params: params
//     })
// }

export const getTocity = (params = {}) => {
    return http.get(api.getTocity);
  }

  
export const getRegionProvinceCity = (params = {}) => {
    return http.get(api.getTocity, { params: params })
        .then((res) => {
            return res;
        })
}

// export const getDist = function(res) {
//     return res.map(function(area) {
//         let district = (area.dictProvinces) || [];
//         let getDist = [];
//         console.log('district ', district);
//         getDist = district.map(x => {
//             let distObject = {};
//             distObject['name'] = x.name;
//             distObject['info'] = {
//                 'list': x.cities.map(x => x.name),
//                 'listChecked': [],
//             }
//             return distObject;
//         });
//         console.log(' getDist ', getDist)
//         return getDist;
//     });
// }
export const processExistArea = function(ori, params) {
    let toprocess = JSON.parse(JSON.stringify(ori));
    console.log(' toprocess ', toprocess, params);
    let provinceObj = {};
    params.forEach(city => {
        if (provinceObj[city.provinceName]) {
            provinceObj[city.provinceName].push(city.cityName);
        } else {
            if (city.cityCode === '*') {
                provinceObj[city.provinceName] = 'allCity';
            } else {
                provinceObj[city.provinceName] = [city.cityName];
            }
        }
    });
    console.log('provinceObj ', provinceObj);
    Object.keys(provinceObj).forEach((provinceName) => {
        toprocess = toprocess.map((area) => {
            if (Object.keys(area.include).indexOf(provinceName) !== -1) {
                area.include[provinceName].listChecked = (provinceObj[provinceName] === 'allCity') ? area.include[provinceName].list : provinceObj[provinceName];
                if (area.include[provinceName].listChecked.length !== 0 && area.include[provinceName].listChecked.length !== area.include[provinceName].list.length) {
                    area.include[provinceName].isIndeterminate = true;
                    area.include[provinceName].checkAll = false;
                } else if (area.include[provinceName].listChecked.length !== 0 && area.include[provinceName].listChecked.length === area.include[provinceName].list.length) {
                    area.include[provinceName].isIndeterminate = false;
                    area.include[provinceName].checkAll = true;
                } else {
                    area.include[provinceName].isIndeterminate = false;
                    area.include[provinceName].checkAll = false;
                }
            }
            return area;
        });
    });
    console.log('after process ', toprocess);
    return toprocess;
}
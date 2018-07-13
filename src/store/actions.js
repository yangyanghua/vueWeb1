import * as types from './mutation-types';
import {
    getRegionProvinceCity,
    processExistArea,
    getTocity
} from './service.js';

export const getAreaSelectionInfo = ({
    commit,
    state
},params) =>{
    // return Promise.resolve(state.areaSelection.hasInfo);
    let promise = new Promise((resolve,reject)=>{
        if(state.areaSelection.hasInfo){
            resolve(state.areaSelection.areaInfo);
        } else {
            getTocity().then(res=>{
                console.log('get city: -- ', res);
                commit(types.SET_AREA_INFO, res);
                commit(types.SET_HAS_INFO, true);
                resolve(res);
            })
        }
    });
    return promise;
};

export const getAllAreaInfo = ({
    commit,
    state
}, params) => 　{
    var promise = new Promise(function(resolve, reject) {
        if (state.area.existInfo === true) {
            if (!params) {
                return resolve(state.area.areaInfo);
            } else {
                return resolve(processExistArea(state.area.areaInfo, params));
            }
        } else {
            getRegionProvinceCity({
                version: 1
            }).then((res) => {
                let newInfo = res.map((info) => {
                    info["include"] = {};
                    info.dictProvinces = info.dictProvinces.map(x => {
                        let city = [{
                            adcode: '',
                            areaCode: '',
                            districts: [],
                            id: '',
                            name: '错误无名市',
                            provinceCode: 'wrong'
                        }];
                        x.cities = x.cities ? x.cities : city;
                        x.info = {
                            'list': x.cities.map(x => x.name),
                            'listChecked': [],
                            'cities': x.cities,
                            'provinceCode': x.cities[0].provinceCode,
                            'checkAll': false,
                            'isIndeterminate': false
                        };
                        let infoDistrict = Object.assign({}, x.info);
                        if (!x.name) {
                            return;
                        }

                        info["include"][x.name] = infoDistrict;
                        return x;
                    });
                    return info;
                });
                commit(types.SET_AREA_EXIST, true);
                commit(types.SET_AREA_ALLINFO, newInfo);
                commit(types.SET_AREA_ORIINFO, res);
                if (!params) {
                    return resolve(state.area.areaInfo);
                } else {
                    return resolve(processExistArea(state.area.areaInfo, params));
                }
            }).catch((res) => {
                reject(res);
            });
        }
    });
    return promise;
};
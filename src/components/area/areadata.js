export const areaOptions = [{
    name: '华东',
    id:1,
    dictProvinces: [
    {
        "id":9,
        "areaCode":"021",
        "adcode":"310000",
        "name":"上海市",
            cities: [{"id":73,"provinceCode":"310000",
                "areaCode":"021","adcode":"310100","name":"上海城区"}],
            listChecked: ['310100'],
            checkAll: false,
            isIndeterminate: true
        },
         {
        "id":10,
        "areaCode":"021",
        "adcode":"310000",
        "name":"江苏省",
            cities: [{"id":74,"provinceCode":"320000","areaCode":"025","adcode":"320100","name":"南京市"}, 
            {"id":75,"provinceCode":"320000","areaCode":"0510","adcode":"320200","name":"无锡市"}],
            listChecked: ['320100'],
            checkAll: true,
            isIndeterminate: false
        },
        {
        "id":11,
        "areaCode":"",
        "adcode":"330000",
        "name":"浙江省",
            cities: [{"id":88,"provinceCode":"330000","areaCode":"0574","adcode":"330200","name":"宁波市"},
             {"id":89,"provinceCode":"330000","areaCode":"0577","adcode":"330300","name":"温州市"}, 
             {"id":90,"provinceCode":"330000","areaCode":"0573","adcode":"330400","name":"嘉兴市"}],
            listChecked: ['330300'],
            checkAll: true,
            isIndeterminate: false
        }
    ]
}];
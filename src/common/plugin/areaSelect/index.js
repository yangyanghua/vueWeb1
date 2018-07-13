import Areaselect from './src/index';

Areaselect.install = function(Vue,options = {}) {
    const inBrowser = typeof window !== 'undefined'
    const DEFAULT_OPTION = {
        showDialog: false,
        initVal: [],//初始的Id内容，为Id的数组 如['34','23','32']
        confirmCallback: ()=>{
            console.log('confirm callback');
        }
    };
    let selection = {
        $vm: null,
        init(vm){
            this.$vm = vm;
        },
        show(confirmCallback,initVal){
            this.$vm.FILE_DIALOG.showDialog = true;
            if(typeof confirmCallback === "function") {
                this.$vm.FILE_DIALOG.confirmCallback = confirmCallback
            }            
            initVal&&(this.$vm.FILE_DIALOG.initVal = initVal);                    
        }
    };
    const areaOptions = Object.assign(DEFAULT_OPTION, options)
    console.log('areaoptions ', areaOptions)
    const VueAreaSelectEventBus = new Vue({
        data: {
            FILE_DIALOG: {
                ...areaOptions
            }
        }
    })
    if (inBrowser) {
        window.VueAreaSelectEventBus = VueAreaSelectEventBus
        selection.init(VueAreaSelectEventBus)
    }

  Vue.component(Areaselect.name, Areaselect);
  Vue.prototype.$selection = selection;


};

export default Areaselect;
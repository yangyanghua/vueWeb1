import Productselect from './src/index';

Productselect.install = function(Vue,options = {}) {
    const inBrowser = typeof window !== 'undefined'
    const DEFAULT_OPTION = {
        showDialog: false,
        initVal: [],//初始的所选商品内容
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
    const productOptions = Object.assign(DEFAULT_OPTION, options)
    console.log('productoptions ', productOptions)
    const VueProductSelectEventBus = new Vue({
        data: {
            FILE_DIALOG: {
                ...productOptions
            }
        }
    })
    if (inBrowser) {
        window.VueProductSelectEventBus = VueProductSelectEventBus
        selection.init(VueProductSelectEventBus)
    }

  Vue.component(Productselect.name, Productselect);
  Vue.prototype.$productSelection = selection;


};

export default Productselect;
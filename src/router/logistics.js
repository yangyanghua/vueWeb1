
 // 物流模块
//定义router
import template from '@/module/logistics/components/template/index.vue';
import template_detail from '@/module/logistics/components/template/detail.vue';
import address from '@/module/logistics/components/address/index.vue';
import address_detail from '@/module/logistics/components/address/detail.vue';
import courier from '@/module/logistics/components/courier/index.vue';
import order from '@/module/logistics/components/order/index.vue';
export default  [
    { path: '/logistics/', component: template, meta: { requiresAuth: true } },
    { path: '/logistics/template_detail', component: template_detail, meta: { requiresAuth: true } },
    { path: '/logistics/address', component: address, meta: { requiresAuth: true } },
    { path: '/logistics/address_detail', component: address_detail, meta: { requiresAuth: true } },
    { path: '/logistics/courier', component: courier, meta: { requiresAuth: true } },
    { path: '/logistics/order', component: order, meta: { requiresAuth: true } }
 
 ];



 
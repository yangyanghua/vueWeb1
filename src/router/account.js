//定义router
import password from '@/module/account/components/password/index.vue';/*修改密码*/
import constructionBank from '@/module/account/components/constructionBank/index.vue';/*建行支付查看*/ 
import constructionBank_detail from '@/module/account/components/constructionBank/detail.vue';/*建行支付修改*/ 
import subsidy from '@/module/account/components/subsidy/index.vue';/*贴息设置查看*/ 
import subsidy_detail from '@/module/account/components/subsidy/detail.vue';/*贴息设置修改*/ 
import management from '@/module/account/components/management/index.vue';/*账户管理*/
import managementDetail from '@/module/account/components/management/detail.vue';/*账户管理 新增、修改*/
import role from '@/module/account/components/role/index.vue';  /*角色管理*/
import entInfo from '@/module/account/components/entInfo/index.vue';  /*企业信息管理*/
import entUpdate from '@/module/account/components/entInfo/detail.vue';  /*修改指定企业信息*/
 export default [
    { path: '/account/password', component: password , meta: { requiresAuth: true }},
    { path: '/account/constructionBank', component: constructionBank , meta: { requiresAuth: true }},
    { path: '/account/constructionBank_detail', component: constructionBank_detail , meta: { requiresAuth: true }},
   // { path: '/account/subsidy', component: subsidy , meta: { requiresAuth: true }},
   // { path: '/account/subsidy_detail', component: subsidy_detail , meta: { requiresAuth: true }},
    { path: '/account/management', component: management , meta: { requiresAuth: true }},
    { path: '/account/managementDetail', component: managementDetail , meta: { requiresAuth: true }},
    { path: '/account/role', component: role , meta: { requiresAuth: true }},
    { path: '/account/entInfo', component: entInfo, meta: { requiresAuth: true }},
    { path: '/account/entInfo/entUpdate', component: entUpdate, meta: { requiresAuth: true }}
    
  ]

// 在线入驻

//定义router
import join from '@/module/onlineJoin/components/join/index.vue';
import writeInfo from '@/module/onlineJoin/components/join/writeInfo.vue';
import confirm from '@/module/onlineJoin/components/join/confirmContract.vue';
import audit from '@/module/onlineJoin/components/join/audit.vue';
import pay from '@/module/onlineJoin/components/join/pay.vue';
import joinSuccess from '@/module/onlineJoin/components/join/joinSuccess.vue';
import WXPay from '@/module/onlineJoin/components/join/WXPay.vue';
import payFail from '@/module/onlineJoin/components/join/payFail.vue';
//创建店铺
import storelist from '@/module/onlineJoin/components/storeOpen/storeList.vue';
import stroeType from '@/module/onlineJoin/components/storeOpen/stroeType.vue';
import fillQualification from '@/module/onlineJoin/components/storeOpen/fillQualification.vue';
import stroeAudit from '@/module/onlineJoin/components/storeOpen/stroeAudit.vue';

export default [
	{path: '/join', component: join,meta: { requiresAuth: false }},
	{path: '/join/writeInfo', component: writeInfo,meta: { requiresAuth: false }}, 
	{path: '/join/confirm', component: confirm,meta: { requiresAuth: false }},
	{path: '/join/audit', component: audit,meta: { requiresAuth: false }},
	{path: '/join/pay', component: pay,meta: { requiresAuth: false }},
	{path: '/join/joinSuccess', component: joinSuccess,meta: { requiresAuth: false }},
	{path: '/join/payfail', component: payFail,meta: { requiresAuth: false }},
	{path: '/join/slist', component: storelist,meta: { requiresAuth: false }},
	{path: '/join/stroetype', component: stroeType,meta: { requiresAuth: false }},
	{path: '/join/fillqualification', component: fillQualification,meta: { requiresAuth: false }},
	{path: '/join/stroeaudit', component: stroeAudit,meta: { requiresAuth: false }},
	{path: '/join/WXPay', component: WXPay,meta: { requiresAuth: false }},

];

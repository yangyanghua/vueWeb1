import im from '@/module/im/index.vue';
import message from '@/module/im/message.vue';
import set from '@/module/im/components/set.vue';

export default [{
    path: '/im',
    component: im,
    redirect: '/im/message',
    children: [{
        path: 'message',
        component: message
      },
      {
        path: 'set',
        component: set
      }
    ]
  }];
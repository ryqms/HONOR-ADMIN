import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

export const playerRoutes: RouteConfig = {
  path: '/players',
  component: Layout,
  redirect: 'players/list',
  meta: {
    title: 'playerMgt', //il8n信息需要额外处理
    icon: 'people' // 图标选取
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "player-list" */'@/views/player/list.vue'),
      name: 'PlayerList',
      meta: {
        title: 'playerList',
        icon: 'list'
      }
    }
  ]
}
<section class="section" v-for="item in sites" :key="item.name">
  <h2 class="section-title">{{item.name}}</h2>
  <div class="section-group">
    <a class="section-item" v-for="child in item.children" :key="child.name" :href="child.url" target="_blank">
      <img :src="child.icon" />
      <div class="item-content">
        <p class="item-title">{{child.name}}</p>
        <p>{{child.des}}</p>
      </div>
    </a>
  </div>
</section>

<script setup lang="ts">
import { ref } from 'vue'
const sites = [
  {
    name: '🤖 智能问答',
    children: [ 
      {
        name: 'True GPT4',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'http://aust001.pythonanywhere.com/menu1',
        des: '免费分享的官方plus账号'
      },
      {
        name: '大侠AI',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://chuchen.aust001.com/GPT4/',
        des: '侠之大者，为国为民！'
      },
      {
        name: 'Free GPT4',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://chatgpt-demo-beta-weld.vercel.app/',
        des: 'Free GPT4'
      },
      {
        name: 'ONEChatAI',
        icon: 'https://chat.sb-chat.com//upload/img/1689492512.png',
        url: 'https://chat.sb-chat.com/index.php?i=1262',
        des: '生尽欢，死无憾'
      },
      {
        name: '慧言AI',
        icon: 'https://chat.wisetalkai.com/favicon.ico',
        url: 'https://chat.wisetalkai.com/?inviteCode=57Y4ML/',
        des: '前三天免费，无限MJ作图，可每天签到抽奖'
      },
      {
        name: 'dongsiqie',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'http://sydney.dongsiqie.me/',
        des: 'New Bing镜像'
      },
      {
        name: '在问',
        icon: 'https://www.zaiwen.top/assets/logo-05ea5082.png',
        url: 'https://www.zaiwen.top/#/',
        des: '让知识无界,智能触手可及'
      },
      {
        name: '银河录像局',
        icon: 'https://nf.video/favicon.ico',
        url: 'https://nf.video/pfapO',
        des: '专属优惠码：xht'
      },
    ]
  }
]
</script>

<style lang="scss" scoped>
  .section {
    width: 60vw;
    height: 100%;
    .section-title {
      color: #3b2c28;
    }
    .section-group {
      display: flex;
      flex-wrap: wrap;
    }
    .section-item {
      margin: 20px 10px;
      padding: 16px;
      display: flex;
      width: 200px;
      border: 1px solid lightgray;
      img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }
      p {
        margin: 0;
        color: #8c8c8c;
        font-size: 13px;
        display:-webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 18px;
        -webkit-line-clamp:2;	//元素几行显示
        -webkit-box-orient:vertical;
      }
      .item-title {
        color: #3b2c28;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }
  }
</style>
<section class="section" v-for="item in sites" :key="item.name">
  <h2 class="section-title">{{item.name}}</h2>
  <div class="section-group">
    <a class="section-item" v-for="child in item.children" :key="child.name" :href="child.url" target="_blank">
      <img :src="child.icon" />
      <div class="item-content">
        <Badge v-if="child.recommended" type="tip" text="推荐" class="item-badge" />
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
    name: '🔍 智能搜索',
    children: [
      {
        name: '百度AI伙伴',
        icon: 'https://chat.baidu.com/favicon.ico',
        url: 'https://chat.baidu.com/',
        des: '已全面开放'
      },
      {
        name: 'New Bing',
        icon: 'https://www.bing.com/favicon.ico',
        url: 'https://www.bing.com/new',
        des: '脾气暴躁的阉割版4.0'
      },
      {
        name: '爱国版Bing镜像',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://www.agbgpt.com/web/index.html',
        des: '遇到问题，可点击右上角一键重置'
      },
      {
        name: 'New Bing镜像',
        icon: 'https://www.bing.com/favicon.ico',
        url: 'https://154.12.33.188/web/#/',
        des: '遇到问题，可点击右上角一键重置'
      },
      {
        name: 'Perplexity AI',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://www.perplexity.ai/',
        des: 'The answer to any question.'
      },
      {
        name: 'You.com',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://you.com/',
        des: 'AI chatbot to search the web'
      },
      {
        name: 'Andi',
        icon: 'https://andisearch.com/favicon.ico',
        url: 'https://andisearch.com/',
        des: 'Andi智能搜索'
      },
      {
        name: 'kuaisou',
        icon: 'https://andisearch.com/favicon.ico',
        url: 'https://www.kuaisou.com/',
        des: '人工智能搜索引擎'
      },
      {
        name: 'iAsk.Ai',
        icon: 'https://api.iowen.cn/favicon/iask.ai.png',
        url: 'https://api.iowen.cn/',
        des: '问AI问题-免费的AI搜索引擎'
      },
      {
        name: 'Consensus',
        icon: 'https://api.iowen.cn/favicon/consensus.app.png',
        url: 'https://consensus.app/?channel=aigc.cn',
        des: '一种搜索引擎，人工智能即使提取'
      },
      {
        name: 'Komo Search',
        icon: 'https://api.iowen.cn/favicon/lexii.ai.png',
        url: 'https://komo.ai/?channel=aigc.cn',
        des: 'Komo搜索利用生成式人工智能...'
      },
      {
        name: 'Lexii.ai',
        icon: 'https://api.iowen.cn/favicon/komo.ai.png',
        url: 'https://www.lexii.ai/?channel=aigc.cn',
        des: 'Lexii.ai是一个人工智能搜索...'
      },
      {
        name: 'CrowdView',
        icon: 'https://api.iowen.cn/favicon/crowdview.ai.png',
        url: 'https://crowdview.ai/?channel=aigc.cn',
        des: '人工智能搜索引擎，搜索各种...'
      },
    ]
  },
  {
    name: '🤖 智能问答',
    children: [
      {
        name: '讯飞星火',
        icon: 'https://xinghuo.xfyun.cn/static/media/gpt-logo.e9ad4150a385435f5a90b50c44dad847.svg',
        url: 'https://xinghuo.xfyun.cn/desk',
        des: '国内可用(需要申请内测资格)',
        recommended: true
      },
      {
        name: 'C知道',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://so.csdn.net/so/search?t=chat',
        des: 'CSDN C知道(免费)',
        recommended: true
      },
      {
        name: '鱼聪明AI',
        icon: 'data:image/png;base64,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',
        url: 'https://www.yucongming.com/model',
        des: '国内可用，每天100次机会，可签到领取',
        recommended: true
      },
      {
        name: 'Claude AI',
        icon: 'https://chat.claudeai.ai/_next/image?url=%2Fanthropic_app_icon.png&w=32&q=75',
        url: 'https://chat.claudeai.ai/',
        des: '国内可用，需要注册',
        recommended: true
      },
      {
        name: 'Free GPT4',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://www.talkai.cc/',
        des: 'Free GPT4',
        recommended: true
      },
      {
        name: 'Free GPT',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://ai.chatgptbox.top/index.php?id=0',
        des: 'AI 3.5模型'
      },
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
      {
        name: 'MIYA GPT',
        icon: 'https://www.miyagpt.com/favicon.ico',
        url: 'https://www.miyagpt.com/#/index',
        des: '畅享无缝对话，MIYA GPT带您领略人工智能聊天的全新境界。'
      },
      {
        name: '博识AI',
        icon: 'https://nine-ai-1317825512.cos.ap-guangzhou.myqcloud.com/web-logo/logo-noword02.png',
        url: 'http://fast.scigpt.club/user-center?inVitecode=RDGKFEXVLU',
        des: '有一定免费额度，可以使用联网4.0'
      },
      {
        name: 'BetterGPT',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://chat.ylokh.xyz/',
        des: 'Made by Yvan Lokhmotov'
      },
      {
        name: 'lyunai',
        icon: 'https://lyunai.top/favicon.ico',
        url: 'https://lyunai.top/#/chat/1002',
        des: '零云智行认知大模型'
      },
      {
        name: '行书',
        icon: 'https://www.xingshu.io/favicon.ico',
        url: 'https://www.xingshu.io/gpt4',
        des: 'GPT-4 (Beta)'
      },
      {
        name: 'ChatGPT 学术优化 3.42',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'http://104.238.160.43:8081/',
        des: '超多插件'
      },
      {
        name: 'Gradio GPT4',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'http://43.134.217.190:50000/',
        des: '使用请节约'
      },
      {
        name: 'MF GPT4',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'http://gov.sbgtx.cn:5000/api?content=%E4%BD%A0%E6%98%AF%E8%B0%81?',
        des: '是网站也是接口，直接修改网址提问'
      },
      {
        name: 'AI万能助手⚡️',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://shopcleandx.xyz/#/home/chat',
        des: '可调教的AI'
      },
      {
        name: 'WorkerGPT',
        icon: 'https://workergpt.cn/favicon.ico',
        url: 'https://workergpt.cn/#/',
        des: 'Build your own AI assistant.'
      },
      {
        name: 'Poe',
        icon: 'https://workergpt.cn/favicon.ico',
        url: 'https://chuchen.aust001.com/card2.html',
        des: '不止是poe，还有临时邮箱和虚拟卡生成器'
      },
      {
        name: 'GPT-GOD',
        icon: 'https://gptgod.online/favicon.ico',
        url: 'https://gptgod.online/#/register?invite_code=229187asiwv4zp1jlonr8zofu',
        des: 'ai问答网站'
      },
      {
        name: 'Claude2',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://www.xyhelper.com.cn/ai/',
        des: 'accesstoken点击左上角进群获取'
      },
      {
        name: 'Magic',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://chimeragpt.ninomae.top/zh',
        des: 'Friendship is Magic'
      },
      {
        name: 'ai绘画聊天',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'http://s.antdir.cn/',
        des: 'ai绘画聊天永久地址发布页'
      },
      {
        name: 'wrtn',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://wrtn.ai/',
        des: '韩国网址，不支持中文输入'
      },
      {
        name: 'inputai',
        icon: 'https://inputai-assets.s3.amazonaws.com/logo_sq.png',
        url: 'https://inputai.com/chat/gpt-4',
        des: '类似poe，绑定信用卡可白嫖七天'
      },
      {
        name: 'GPT-4 Chat UI',
        icon: 'https://gpt4.starmorph.com/favicon.ico',
        url: 'https://gpt4.starmorph.com/',
        des: 'Starmorph GPT-4 Chatbot'
      },
      {
        name: 'ChatMindAI',
        icon: 'https://beta.chatmindai.net/Logo.png',
        url: 'https://beta.chatmindai.net/home',
        des: '智慧学习，办公无忧 - AIGC让生活更简单'
      },
      {
        name: '万卷AI',
        icon: 'https://openai.com/favicon.ico',
        url: 'https://cdn.wanjuanai.net/index.html#/chat',
        des: '读书破万卷，下笔如有神'
      },
      {
        name: 'Forefront Chat',
        icon: 'https://openai.com/favicon.ico',
        url: 'https://chat.forefront.ai/',
        des: '未来已来'
      },
      {
        name: 'ora.ai',
        icon: 'https://pitchbook.com/favicon.ico',
        url: 'https://ora.ai/dashboard',
        des: 'Conversations you had with Ora chatbots'
      },
      {
        name: 'ONCETALK',
        icon: 'https://oncetalk.com/static/favicon.ico',
        url: 'https://oncetalk.com/#/',
        des: 'Hi, nice to meet you'
      },
      {
        name: 'GOD-GPT',
        icon: 'https://www.thedifferenceai.com/assets/favicon-32x32.png',
        url: 'https://www.wxblog.xyz/chat/index.html#/',
        des: '我愿称之为神'
      },
      {
        name: 'LibreChat',
        icon: 'https://www.thedifferenceai.com/assets/favicon-32x32.png',
        url: 'https://inter.klona.ai/chat/new',
        des: '超多插件'
      },
      {
        name: 'Magic',
        icon: 'https://www.thedifferenceai.com/assets/favicon-32x32.png',
        url: 'https://libre-chat.ninomae.top/chat/new',
        des: '需要注册，内部会让你惊喜'
      },
      {
        name: '夏沫的AI小站',
        icon: 'https://www.thedifferenceai.com/assets/favicon-32x32.png',
        url: 'http://v3.qqslyx.com/main.php',
        des: '免费GPT4'
      },
      {
        name: 'PondoraAI',
        icon: 'https://www.thedifferenceai.com/assets/favicon-32x32.png',
        url: 'https://ai-chat.scholarcn.com/',
        des: '免费Bing'
      },
      {
        name: 'Free GPT4',
        icon: 'https://www.thedifferenceai.com/assets/favicon-32x32.png',
        url: 'https://ai-chat.scholarcn.com/',
        des: '需要魔法，回答速度很快'
      },
      {
        name: 'ChatGPT Next Web',
        icon: 'https://www.webinfra.cloud/favicon.ico',
        url: 'https://www.webinfra.cloud/?sess_id=#/chat',
        des: '支持修改url和key'
      },
      {
        name: 'BetterGPT',
        icon: 'https://chuchen.aust001.com/GPT4/favicon.ico',
        url: 'https://bettergpt.chat/',
        des: '由Jing Hua制作，支持修改url和key'
      },
    ]
  },
  {
    name: '🎨 智能绘画',
    children: [
      {
        name: 'Scribble Diffusion',
        icon: 'https://scribblediffusion.com/favicon.ico',
        url: 'https://scribblediffusion.com/',
        des: 'Turn your sketch into a refined image using AI'
      },
      {
        name: 'Free AI Image',
        icon: 'https://openailabs-site.azureedge.net/public-assets/d/6443f55efe/favicon-32x32.png',
        url: 'https://images.ylokh.xyz/',
        des: 'Generate Images using AI'
      },
      {
        name: '哩布哩布',
        icon: 'https://www.liblibai.com/favicon.ico',
        url: 'https://www.liblibai.com/',
        des: '中国领先原创AI模型分享社区'
      },
      {
        name: 'MidJourney - AI Draw',
        icon: 'https://www.midjourney.com/favicon.ico',
        url: 'https://mj.xyhelper.com.cn/',
        des: 'MidJourney国内镜像(accesstoken同Claude2)'
      },
      {
        name: '1Chat',
        icon: 'https://openai.com/favicon.ico',
        url: 'https://1.11chat.cc/',
        des: '国内免费'
      }
    ]
  },
  {
    name: '🛠️ 智能工具',
    children: [
      {
        name: '百度翻译',
        icon: 'https://fanyi.baidu.com/favicon.ico',
        url: 'https://fanyi.baidu.com/',
        des: '百度翻译',
        recommended: true
      },
      {
        name: '有道翻译',
        icon: 'https://shared.youdao.com/dict/market/translation-website-ab/v2/img/logo.50fdfa99.png',
        url: 'https://fanyi.youdao.com/',
        des: '有道翻译',
        recommended: true
      },
      {
        name: 'AI工具集',
        icon: 'https://ai-bot.cn/wp-content/uploads/2023/07/ai-bot-favicon.png',
        url: 'https://ai-bot.cn/',
        des: '众多AI工具',
        recommended: true
      },
      {
        name: 'monica.im',
        icon: 'https://monica.im/logo.png',
        url: 'https://monica.im/',
        des: 'AI智能助手插件(Chrome|Edge)',
        recommended: true
      },
      {
        name: 'CURL To Code',
        icon: 'https://curlconverter.com/favicon.ico',
        url: 'https://curlconverter.com',
        des: 'curl转code',
        recommended: true
      },
      {
        name: '身份生成器',
        icon: 'https://www.dizhishengcheng.com/Public/img/haoweichi.ico',
        url: 'https://www.dizhishengcheng.com/',
        des: '生成外国身份信息'
      },
      {
        name: '在线音乐播放器',
        icon: 'http://p1.music.126.net/-xMsNLpquZTmMZlIztTgHg==/109951165953469081.jpg',
        url: 'https://xht.aust001.com/music.html',
        des: '打开网站自动播放，自动随机下一首'
      },
      {
        name: '沉浸式翻译',
        icon: 'https://store-images.s-microsoft.com/image/apps.56263.d49a3368-918f-446f-8d8b-4dadb0f08e8e.cdbc41ed-1d7d-4505-afe8-a6a5e9625173.cee8f208-68bb-4658-8c00-42a1875c9156?mode=scale&h=100&q=90&w=100',
        url: 'https://microsoftedge.microsoft.com/addons/detail/%E6%B2%89%E6%B5%B8%E5%BC%8F%E7%BF%BB%E8%AF%91/amkbmndfnliijdhojkpoglbnaaahippg',
        des: '神级翻译插件：支持AI、支持翻译pdf'
      },
      {
        name: 'Dupay',
        icon: 'https://www.dupay.one/img/depay.png',
        url: 'https://dupay.one/web-app/register-h5?invitCode=5fRvhH&lang=zh-cn',
        des: '免费申请一张VISA标准卡'
      },
      {
        name: 'Pico',
        icon: 'https://picoapps.xyz/favicon.png',
        url: 'https://picoapps.xyz/chatbot-builder',
        des: '网站开发及部署神器'
      },
      {
        name: 'D-ID',
        icon: 'https://studio.d-id.com/favicon/apple-icon-57x57.png',
        url: 'https://studio.d-id.com/',
        des: '视频制作神器'
      },
      {
        name: '谷歌临时邮箱',
        icon: 'https://www.emailnator.com/images/logo.webp?2245a08de0624eb2d3f7cecc7337e846',
        url: 'https://www.emailnator.com/',
        des: '谷歌临时邮箱'
      },
      {
        name: '临时邮箱+接码',
        icon: 'https://smailpro.com/img/smailpro.com/favicon.ico?v=1.2',
        url: 'https://smailpro.com/advanced',
        des: '这位更是重量级'
      },
      {
        name: 'Framer',
        icon: 'https://framerusercontent.com/sites/icons/default-favicon.v3.png',
        url: 'https://talk-to-our-ai.framer.ai/',
        des: 'AI帮你一分钟做网站'
      },
      {
        name: 'FOFA',
        icon: 'https://fofa.info/favicon.ico',
        url: 'https://fofa.info/',
        des: '强大的搜索工具'
      },
      {
        name: 'Dify',
        icon: 'https://cloud.dify.ai/favicon.ico',
        url: 'https://cloud.dify.ai/',
        des: '构建自己的专属AI'
      },
      {
        name: '虚拟信用卡生成器',
        icon: 'https://inputai-assets.s3.amazonaws.com/logo_sq.png',
        url: 'http://gov.0aii.com/',
        des: '大有用处！'
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
      padding: 16px 18px;
      display: flex;
      width: 200px;
      border: 1px solid lightgray;
      position: relative;
      .item-badge {
        position: absolute;
        right: 5px;
        top: 5px;
      }
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
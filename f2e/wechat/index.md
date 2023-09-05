# 微信小程序

## 1、简介

## 2、官网

## 3、使用
### 3.1、框架

### 3.2、组件
#### 3.2.1、scroll-view
横向滚动
```html
<scroll-view class="scroll-view_H" scroll-x="true">
  <view class="scroll-view-item_H">111</view>
  <view class="scroll-view-item_H">222</view>
  <view class="scroll-view-item_H">333</view>
</scroll-view>

.scroll-view_H{
  white-space: nowrap;
  width: 100%;
}
.scroll-view-item_H{
  display: inline-block;
  width: 100%;
  height: 300rpx;
  background-color: green;
}
```

#### 3.2.2、button

##### 3.2.2.1、id传参
:::warning
id传参只能传基本类型，传对象无法解析
:::
```html
<button type="default" plain="true" bindtap="bannerBtnClick" id="{{item.type}}">查看详情</button>

// 获取参数
bannerBtnClick:function(e){
  console.log(e.target.id)
}
```

##### 3.2.2.2、data-传参
```html
<button type="default" plain="true" bindtap="bannerBtnClick" data-type="{{item.type}}">查看详情</button>

// 获取参数
bannerBtnClick:function(e){
  console.log(e.target.dataset.type)
},
```

##### 3.2.2.3、点击事件
```html
<button type="default" plain="true" bindtap="bannerBtnClick">查看详情</button>

### 3.3、API
#### 3.3.1、路由跳转
##### 3.3.1.1、跳转
```html
wx.navigateTo({
  url: '/pages/home/activity/activity',
})
```

##### 3.3.1.2、url传参
```html
wx.navigateTo({
  url: '/pages/home/activity/activity?id=1',
})

// 页面获取参数
onLoad:function(options){
  console.log(options.id)
}
```

##### 3.3.1.4、返回
```html
wx.navigateBack({
  delta: 1
})
```

#### 3.3.2、API
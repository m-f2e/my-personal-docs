# 鸿蒙OS
## 1、简介
鸿蒙OS是一款基于Linux内核的物联网操作系统，支持物联网应用开发，支持多种硬件平台，支持多种应用场景，支持多种应用开发语言，支持多种应用运行环境。

## 2、开发环境
### 2.1、编辑器
https://developer.harmonyos.com/cn/develop/deveco-studio

### 2.2、编辑器操作
#### 2.2.1、快捷键
格式化代码
```shell
Option+Command+L
```
#### 2.2.2、生成代码块
:::tip 
设置 -> Preferences -> Editor -> Live Templates -> 新建Template Group -> 新建Live Template
:::
#### 2.2.3、格式化代码
```shell
Option+Command+F

### 2.2、开发文档
https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/start-overview-0000001478061421-V3

## 3、基础组件
### 3.1、Text
```js
// 普通Text
Text('普通Text')
  .fontSize(30)
  .fontColor(0xff0000)
  .fontWeight(FontWeight.Bold)
// 边框宽度+边框颜色
Text('边框宽度+边框颜色')
  .fontSize(30)
  .fontColor(0xff0000)
  .fontWeight(FontWeight.Bold)
  .border({ width: 2 })
  .borderColor(0xccc)
// 行高
Text('行高')
  .fontSize(30)
  .fontWeight(FontWeight.Bold)
  .fontColor(0xff0000)
  .backgroundColor(Color.Gray)
  .lineHeight(100)
// 点击事件
Text(this.message)
  .fontSize(30)
  .fontWeight(FontWeight.Bold)
  .fontColor(0xff0000)
  .onClick((e: ClickEvent) => {
    this.message = 'hello arkts'
    console.log('', e.x)
  })
// 装饰器
Text(this.message)
  .fontSize(30)
  .fontWeight(FontWeight.Bold)
  .fontColor(0xff0000)
  .decoration({
    type: TextDecorationType.LineThrough, // None, Underline, Overline, LineThrough
    color: Color.Green
  })
// 对其方式
Text(this.message)
  .fontSize(30)
  .fontWeight(FontWeight.Bold)
  .fontColor(0xff0000)
  .width('100%')
  .textAlign(TextAlign.End) // Start、Center、End
// 文本截断与maxLines配合
Text('文本截断文本截断文本截断文本截断')
  .fontSize(30)
  .fontWeight(FontWeight.Bold)
  .fontColor(0xff0000)
  .width('100%')
  .maxLines(1)
  .textOverflow({
    overflow: TextOverflow.Ellipsis // Clip、Ellipsis、None
  })
// 文本间距
Text('文本间距')
  .fontSize(30)
  .fontWeight(FontWeight.Bold)
  .fontColor(0xff0000)
  .letterSpacing(30)
// 文本大小写
Text('hello world')
  .fontSize(30)
  .fontWeight(FontWeight.Bold)
  .fontColor(0xff0000)
  .textCase(TextCase.UpperCase) //Normal、LowerCase、UpperCase
```

## 3、基础组件
### 3.2、Image
:::tip 网络图需要申请网络权限
`module.json5`
```js
{
  "module": {
    "name": "entry",
    "type": "entry",
    "description": "$string:module_desc",
    "mainElement": "EntryAbility",
    "deviceTypes": [
      "phone",
      "tablet"
    ],
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      }
    ],
    ...
  }
}
```
:::
```js
// 网络图
Image('https://images.unsplash.com/photo-1682686581580-d99b0230064e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
  .height(200)

// 本地media图
Image($r('app.media.icon'))
  .height(100)
  .interpolation(ImageInterpolation.High) // 图片插值，处理清晰度

// 本地rawfile图
Image($rawfile('icon.png'))
  .height(100)
  .interpolation(ImageInterpolation.High) // 图片插值，处理清晰度

// 图片缩放类型
Image($rawfile('icon.png'))
  .height(300)
  .objectFit(ImageFit.ScaleDown) // 比例展示
  .interpolation(ImageInterpolation.High) // 图片插值，处理清晰度
```

### 3.3、Button
```js
// 普通按钮
Button('普通文本')

// 按钮类型
Button('普通文本', { type: ButtonType.Normal, stateEffect: true }) // Normal，Capsule，Circle

// 自定义内容
Button({ type: ButtonType.Normal, stateEffect: true }) {
  Row() {
    LoadingProgress().width(20).height(20).margin({ left: 12 }).color(0xFFFFFF)
    Text('loading').fontSize(12).fontColor(0xffffff).margin({ left: 5, right: 12 })
  }.alignItems(VerticalAlign.Center)
}.borderRadius(8).backgroundColor(0x317aff).width(90).height(40)

// 点击事件
Button('点击事件', { type: ButtonType.Normal, stateEffect: true })
  .onClick(() => {
    console.log('点击事件')
  })

// 按钮尺寸
Button('点击事件', { type: ButtonType.Normal, stateEffect: true })
  .width(100)
  .height(40)
  .margin({ top: 20 })

// 按钮状态配置
Button('点击状态配置')
  .stateStyles({
    pressed: {
      .backgroundColor(Color.Green)
    },
    normal: {
      .backgroundColor(Color.Yellow)
    }
  })
  .onClick((e) => {
    this.focusable1 = !this.focusable
    console.log('-------2');
  })
```

### 3.4、CheckBox
```js
// 普通用法
Checkbox().select(true)

// 事件
Checkbox()
  .select(true)
  .onChange((value: boolean) => {
    console.info('Checkbox1 change is'+ value)
  })

// 自定义颜色
Checkbox()
  .select(true)
  .onChange((value: boolean) => {
    console.info('Checkbox1 change is'+ value)
  })

// 多选-分组
Checkbox({name: 'checkbox1',  group: 'checkboxGroup'})
  .select(true)
  .selectedColor(0xed6f21)
  .onChange((value: boolean) => {
    console.info('Checkbox1 change is'+ value)
  })
Checkbox({name: 'checkbox2',  group: 'checkboxGroup'})
  .select(false)
  .selectedColor(0x39a2db)
  .onChange((value: boolean) => {
    console.info('Checkbox2 change is'+ value)
  })
CheckboxGroup({ group: 'checkboxGroup' })
  .selectedColor('#007DFF')
  .onChange((itemName: CheckboxGroupResult) => {
    console.info("checkbox group content" + JSON.stringify(itemName))
  })
```

### 3.5、Radio
```js
Radio({ value: 'Radio1', group: 'radioGroup' }).checked(true)
  .height(50)
  .width(50)
  .onChange((isChecked: boolean) => {
    console.log('Radio1 status is ' + isChecked)
  })
Radio({ value: 'Radio2', group: 'radioGroup' }).checked(false)
  .height(50)
  .width(50)
  .onChange((isChecked: boolean) => {
    console.log('Radio2 status is ' + isChecked)
  })
```

### 3.6、Progress
```js
Progress({ value: 20, total: 150, type: ProgressType.Linear })
  .color(Color.Grey)
  .value(50)
  .width(100)
  .style({ strokeWidth: 20, scaleCount: 30, scaleWidth: 20 })
```

### 3.7、Slider
```js
Slider({
  value: this.inSetValueTwo,
  min: 0,
  max: 100,
  step: 10,
  style: SliderStyle.InSet,
  direction: Axis.Horizontal,
})
  .showTips(true)
  .onChange((value: number, mode: SliderChangeMode) => {
    this.inSetValueTwo = value
    console.info('value:' + value + 'mode:' + mode.toString())
  })
```

### 3.8、Navigation && Navigator
```js
@Entry
@Component
struct NavigationPage {
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  @State currentIndex: number = 0
  @State Build: Array<Object> = [
    {
      text: 'add',
      num: 0
    },
    {
      text: 'app',
      num: 1
    },
    {
      text: 'collect',
      num: 2
    }
  ]

  build() {
    Column() {
      Navigation() {
        TextInput({ placeholder: 'search...' })
          .width('90%')
          .height(40)
          .backgroundColor('#FFFFFF')
          .margin({ top: 8 })
        List({ space: 12, initialIndex: 0 }) {
          ForEach(this.arr, (item) => {
            ListItem() {
              Navigator({ target: 'pages/Index', type: NavigationType.Push }) {
                Text('' + item)
                  .width('90%')
                  .height(72)
                  .backgroundColor('#FFFFFF')
                  .borderRadius(24)
                  .fontSize(16)
                  .fontWeight(500)
                  .textAlign(TextAlign.Center)
              }.params({ text: item }) // 传参数到Detail页面
            }.editable(true)
          }, item => item)
        }
        .layoutWeight(1)
        .width('100%')
        .margin({ top: 12, left: '10%' })
      }
      .title(this.NavigationTitle)
      .titleMode(NavigationTitleMode.Full)
      .menus(this.NavigationMenus)
      .toolBar(this.NavigationToolbar)
      .hideTitleBar(false)
      .hideToolBar(false)
      .onTitleModeChange((titleModel: NavigationTitleMode) => {
        console.info('titleMode' + titleModel)
      })
    }.width('100%').height('100%').backgroundColor('#F1F3F5')
  }

  @Builder NavigationTitle() {
    Column() {
      Text('Title')
        .fontColor('#182431')
        .fontSize(30)
        .lineHeight(41)
        .fontWeight(700)
      Text('subtitle')
        .fontColor('#182431')
        .fontSize(14)
        .lineHeight(19)
        .opacity(0.4)
        .margin({ top: 2, bottom: 20 })
    }.alignItems(HorizontalAlign.Start)
  }

  @Builder NavigationMenus() {
    Row() {
      Image($r('app.media.icon'))
        .width(24)
        .height(24)
      Image($r('app.media.icon'))
        .width(24)
        .height(24)
        .margin({ left: 24 })
      Image($r('app.media.icon'))
        .width(24)
        .height(24)
        .margin({ left: 24 })
    }
  }

  @Builder NavigationToolbar() {
    Row() {
      ForEach(this.Build, item => {
        Column() {
          Image(this.currentIndex == item.num ? $r('app.media.icon') : $r('app.media.icon'))
            .width(24)
            .height(24)
          Text(item.text)
            .fontColor(this.currentIndex == item.num ? '#007DFF' : '#182431')
            .fontSize(10)
            .lineHeight(14)
            .fontWeight(500)
            .margin({ top: 3 })
        }.width(104).height(56).justifyContent(FlexAlign.Center)
        .onClick(() => {
          this.currentIndex = item.num
        })
      })
    }.backgroundColor(Color.White).width('100%').justifyContent(FlexAlign.SpaceEvenly)
  }
}
```

### 3.9、Dialog

## 4、组件进阶用法
### 4.1、@Builder自定义函数
```js
// 全局自定义函数
@Builder function NavigationMenus() {
  Row() {
    Image($r('app.media.icon'))
      .width(24)
      .height(24)
  }
}

@Builder NavigationMenus() {
  Row() {
    Image($r('app.media.icon'))
      .width(24)
      .height(24)
  }
}

// 使用
build() {
  Column() {
    this.NavigationMenus()
  }
}
```

### 4.2、@BuilderParams自定义回调
```js
@Component
struct Hello {
  @BuilderParam callback: () => void

  build() {
    Text('hello')
      .onClick(() => {
        this.callback && this.callback()
      })
  }
}

// 使用
hello() {
  console.log('callback=======')
}

hello1: () => void = () => {
  console.log('callback1=======')
}

Hello({ callback: () => {
  console.log("----")
}})
Hello({ callback: this.hello.bind(this) })
Hello({ callback: this.hello1 })
```

```js
@Component
struct First {
  @BuilderParam child?: CustomBuilder

  build() {
    if (this.child) {
      this.child()
    }
  }
}

First({ child: this.NavigationTitle })
```

### 4.3、@Styles自定义样式
```js
// 全局样式
@Styles function textStyle() {
  .backgroundColor(Color.Red)
}

// 组件样式
@Styles textStyle2() {
  .backgroundColor(Color.Red)
}

Text('------1111').textStyle()
Text('------2222').textStyle2()
```

### 4.4、@Extend扩展样式
```js
// 全局组件扩展样式
@Extend(Text) function textExtend() {
  .fontColor(Color.Blue)
  .backgroundColor(Color.Green)
}

// 局部组件扩展样式
@Extend(Text) function textExtend() {
  .fontColor(Color.Blue)
  .backgroundColor(Color.Green)
}
```

### 4.5、自定义dialog
#### 4.5.1、自定义dialog内容
```js
@Entry
@Component
struct CallBackPage {
  @State message: string = 'Hello World'
  @State inputValue: string = 'click me'

  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialog1({
      inputValue: $inputValue
    }),
    // customStyle: true, // 自定义样式
  })
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            this.dialogController.open()
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}

@CustomDialog
struct CustomDialog1 {
  @Link inputValue: string
  controller: CustomDialogController

  build() {
    Column() {
      Text('change text').fontSize(20).margin({top: 20, bottom: 10})
      TextInput({ placeholder: '111', text: this.inputValue }).height(60).width('90%').onChange((v) => {
        this.inputValue = v
      })
    }
    .backgroundColor(Color.White)
    .borderRadius(8)
  }
}
```

#### 4.5.2、自定义dialog样式
```js
dialogController: CustomDialogController = new CustomDialogController({
  builder: CustomDialog1({
    inputValue: $inputValue
  }),
  customStyle: true, // 自定义样式
})
```

#### 4.5.3、自定义回调
```js
@Entry
@Component
struct CallBackPage {
  @State message: string = 'Hello World'
  @State inputValue: string = 'click me'

  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialog1({
      inputValue: this.inputValue,
      changeInputValue: (val: string) => {
        this.inputValue = val
      }
    }),
    customStyle: true, // 自定义样式
  })
  build() {
    Row() {
      Column() {
        Text(this.inputValue)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            this.dialogController.open()
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}

@CustomDialog
struct CustomDialog1 {
  // @Link inputValue: string
  inputValue: string
  changeInputValue: (val: string) => void
  controller: CustomDialogController

  build() {
    Column() {
      Text('change text').fontSize(20).margin({top: 20, bottom: 10})
      TextInput({ placeholder: '111', text: this.inputValue }).height(60).width('90%').onChange((v) => {
        this.inputValue = v
      })
        .onChange((v) => {
          this.changeInputValue && this.changeInputValue(v)
        })
    }
    .backgroundColor(Color.White)
    .borderRadius(8)
  }
}
```

## 5、实用开发案例
### 5.1、实现单例
```js
export class GlobalContext {
  private constructor() { }
  private static instance: GlobalContext;
  private _objects = new Map<string, Object>();

  public static getContext(): GlobalContext {
    if (!GlobalContext.instance) {
      GlobalContext.instance = new GlobalContext();
    }
    return GlobalContext.instance;
  }

  getObject(value: string): Object | undefined {
    return this._objects.get(value);
  }

  setObject(key: string, objectClass: Object): void {
    this._objects.set(key, objectClass);
  }
}
```
使用
```js
import { GlobalContext } from '../common/utils/GlobalContext';

export default class EntryAbility extends Ability {
  onCreate(want: Want) {
    GlobalContext.getContext().setObject('abilityWant', want);
  }

  async onWindowStageCreate(windowStage: window.WindowStage) {
    GlobalContext.getContext().setObject('display', await display.getDefaultDisplaySync());
    windowStage.loadContent('pages/TabIndex');
  }
};
```
### 5.2、实现屏幕适配
```js
import display from '@ohos.display';
import { GlobalContext } from './GlobalContext';
import FileManagerIndex from '../../pages/FileManagerIndex';


let context = getContext(this);
const DESIGN_WIDTH = 360;
const DESIGN_HEIGHT = 780;

/**
 * Fits tools with different sizes and lengths
 */
export default class DimensionUtil {
  static adaptDimension(value: number): number {
    let deviceDisplay: display.Display = GlobalContext.getContext().getObject('display') as display.Display;
    let widthScale = deviceDisplay.width / DESIGN_WIDTH;
    let virtualHeight = widthScale * DESIGN_HEIGHT;
    let designDim = Math.sqrt(DESIGN_WIDTH * DESIGN_WIDTH + DESIGN_HEIGHT * DESIGN_HEIGHT);
    let virtualDim = Math.sqrt(deviceDisplay.width * deviceDisplay.width + virtualHeight * virtualHeight);
    return virtualDim * value / designDim;
  }

  /**
   * Obtains the screen horizontal adaptation px.
   */
  static getPx(value: Resource): number {
    let beforeVp = context.resourceManager.getNumber(value.id);
    return DimensionUtil.adaptDimension(beforeVp);
  }

  /**
   * Obtains the screen horizontal adaptation vp.
   */
  static getVp(value: Resource): number {
    let beforeVp = context.resourceManager.getNumber(value.id);
    return px2vp(DimensionUtil.adaptDimension(beforeVp));
  }

  /**
   * Obtains the screen horizontal adaptation fp.
   */
  static getFp(value: Resource): number {
    let beforeFp = context.resourceManager.getNumber(value.id);
    return px2fp(DimensionUtil.adaptDimension(beforeFp));
  }
}
```

### 5.3、获取屏幕宽高
```js
window.getLastWindow(context)
  .then((windowClass: window.Window) => {
    let windowProperties = windowClass.getWindowProperties();
    this.screenWidth = px2vp(windowProperties.windowRect.width);
    this.screenHeight = px2vp(windowProperties.windowRect.height);
  })
  .catch((error: Error) => {
    Logger.error('Failed to obtain the window size. Cause: ' + JSON.stringify(error));
  })
```
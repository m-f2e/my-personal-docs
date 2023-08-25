# TypeScript简介

## 1、简介
`TS`是`JS的超集`，所有JS基础的类型都包含在内

## 2、安装
```shell
npm install typescript -g
```

## 3、语法

### 3.1、基本数据类型
:::tip
基础类型：`Boolean`、`Number`、`String`、`null`、`undefined` 以及 ES6 的  `Symbol`和 ES10 的`BigInt`
:::

#### 3.1.1、Boolean类型
:::warning
使用构造函数 Boolean 创造的对象不是布尔值
```ts
let a = new Boolean(1)
typeof a // 'object'
```
:::

```ts
let boolean1: boolean = true
let boolean2: boolean = Boolean(1)
// console.log('boolean1==', typeof boolean1) // boolean1== boolean
// console.log('boolean2==', typeof boolean2) // boolean2== boolean
```

#### 3.1.2、Number类型
:::tip
支持十六进制、十进制、八进制和二进制
:::
```ts
let notANumber: number = NaN;//Nan
let number1: number = 1 //整数
let number2: number = Number(1)
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制s
```

#### 3.1.3、String类型
```ts
let string1: string = 'hello'
let string2: string = String('hello')

// 字符串模板
let a = 1
let str: string = `dddd${a}`
```

#### 3.1.4、Null和undefined类型
:::tip
与`void`的区别是，`undefined`和`null`是所有类型的子类型。也就是说`undefined`类型的变量，可以赋值给`string`类型的变量：
```ts
// 这样写会报错 void类型不可以分给其他类型
let test: void = undefined
let num2: string = "1"
num2 = test
```
```ts
//这样是没问题的
let test: null = null
let num2: string = "1"
num2 = test
 
//或者这样的
let test: undefined = undefined
let num2: string = "1"
num2 = test
```
:::
```ts
let null1: null = null
let null2: null = undefined
``` 

#### 3.1.5、空值类型
:::tip
`JavaScript`没有空值`（Void）`的概念，在`TypeScript`中，可以用`void`表示没有任何返回值的函数
:::
```ts
function foo(): void {
  console.log('foo');
}
```
void也可以定义`undefined`和`null`类型
```ts
let void1: void = undefined
let void2: void = null
```
#### 3.1.6、symbol类型
```ts
let symbol1: symbol = Symbol()
let symbol2: symbol = Symbol('hello')
```

### 3.2、Any 类型 和 unknown 顶级类型
:::tip
- 如果是any类型在对象没有这个属性的时候还在获取是不会报错的
- 如果是unknow 是不能调用属性和方法
:::
```ts
let any1: any = 1
let any2: any = '1'
```
### 3.3、interface接口
#### 3.3.1、定义接口
```ts
interface Point {
  x: number;
  y: number;
}
let point: Point = { x: 1, y: 2 }
```
#### 3.3.2、可选属性？
```ts
interface Point {
  x: number;
  y?: number; // 可选类型
}
let point: Point = { x: 1 }
```

#### 3.3.3、任意属性[propName: string]
```ts
interface Point {
  x: number;
  y: number;
  [propName: string]: any;
}
let point: Point = { x: 1, y: 2, z: '3' }
```

#### 3.3.4、只读属性
:::tip
`readonly`只读属性是不允许被赋值的只能读取
:::
```ts
interface Point {
  readonly x: number;
  y: number;
}
let point: Point = { x: 1, y: 2 }
```

#### 3.3.5、函数类型
```ts
interface Point {
  x: number;
  cb: () => void; // 无参数，无返回值
  fn: (x: number, y: number) => number;

}
let point: Point = { 
  x: 1, 
  cb: () => {}, 
  fn: (x: number, y: number) => {
    return x + y
  } 
}
```

#### 3.3.6、interface接口的继承
```ts
interface Point {
  x: number;
  y: number;
}
interface Point2 extends Point {
  z: number;
}
let point2: Point2 = { x: 1, y: 2, z: 3 }
```

#### 3.3.7、interface接口的合并
:::tip
重名`interface`可以合并
:::
```ts
interface Point3 {
  x: number;
  y: number;
}
interface Point3 {
  z: number;
}
let point3: Point3 = { x: 1, y: 2, z: 3 }
```

### 3.4、type
#### 3.4.1、定义类型
```ts
type Point = {
  x: number;
  y: number;
}
let point: Point = { x: 1, y: 2 }
```

#### 3.4.2、类型别名
```ts
type MyInt number;
let myInt: MyInt = 1
```

### 3.5、数组
#### 3.5.1、定义数组
```ts
let arr1: number[] = [1, 2, 3]
let arr1: string[] = ['1', '2', '3']
let arr2: Array<number> = [1, 2, 3]
let arr3: any[] = ['1', '2', 3]
```

#### 3.5.2、接口表示数组
```ts
interface NumberArray {
  [index: number]: number;
}
let arr4: NumberArray = [1, 2, 3]
```

#### 3.5.3、多维数组
```ts
let arr5: number[][] = [[1], [2, 3]]
```

#### 3.5.4、元组
```ts
let arr6: [string, number] = ['1', 2]
```
#### 3.5.5、arguments类数组
```ts
function Arr(...args: any):IArguments {
  let arr: IArguments = arguments
  return arr
}
const arr = Arr(1, 2, 3)
```

### 3.6、函数
#### 3.6.1、定义函数
```ts
function add(x: number, y: number): number {
  return x + y
}
```

#### 3.6.2、可选参数
```ts
function add2(x: number, y?: number): number {
  return x + y
}
```

#### 3.6.3、默认参数
```ts
function add3(x: number, y: number = 1): number {
  
}
```

#### 3.6.4、接口定义函数
```ts
interface Add {
  (x: number, y: number): number
}
let add4: Add = function (x: number, y: number): number {
  return x + y
}
```

#### 3.6.5、剩余参数
```ts
function add5(arr: number[], ...args: number[]): number[] {
  return arr.concat(args)
}
```

#### 3.6.6、函数重载
```ts
function add(x: number, y: number): number
function add(x: string, y: string): string
function add(x: any, y: any): any {
  return x + y
}
```

```ts
function fn(params: number): void
function fn(params: string, params2: number): void
function fn(params: any, params2?: any): void {
  
}
```

### 3.7、类型断言 | 联合类型 | 交叉类型
#### 3.7.1、类型断言
```ts
let str: any = '1'
let str2: string = str as string
```

使用any临时断言
```ts
(windos as any).abc = 123
```
阈值 [ the threshold value ]
断言const
```ts
let name: string = 'mz' as const
name = 'mz' // 报错
```

#### 3.7.2、联合类型 |
```ts
let phone: number | string = '1'

const fn = (x: number | string): boolean => {
  return !!x
}
```

#### 3.7.3、交叉类型 &
```ts
interface Person {
  name: string
}
interface Man {
  sex: string
}
const person: Person & Man = {
  name: 'mz',
  sex: '男'
}
```

### 3.8、内置对象
:::tip
- ECMAScript 的内置对象: Boolean、Number、string、RegExp、Date、Error
- DOM 和 BOM 的内置对象: Document、HTMLElement、Event、NodeList 等
:::
```ts
let b: Boolean = new Boolean(1)
console.log(b)
let n: Number = new Number(true)
console.log(n)
let s: String = new String('哔哩哔哩关注小满zs')
console.log(s)
let d: Date = new Date()
console.log(d)
let r: RegExp = /^1/
console.log(r)
let e: Error = new Error("error!")
console.log(e)
```
代码雨示例：
```ts
<canvas id="canvas"></canvas>

let canvas = document.querySelector('#canvas') as HTMLCanvasElement
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
canvas.height = 300
canvas.width = 300
// canvas.height = screen.availHeight; //可视区域的高度
// canvas.width = screen.availWidth; //可视区域的宽度
let str: string[] = 'XMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSB'.split('')
let Arr = Array(Math.ceil(canvas.width / 10)).fill(0) //获取宽度例如1920 / 10 192

const rain = () => {
  ctx.fillStyle = 'rgba(0,0,0,0.05)'//填充背景颜色
  ctx.fillRect(0, 0, canvas.width, canvas.height)//背景
  ctx.fillStyle = "#0f0"; //文字颜色
  Arr.forEach((item, index) => {
    ctx.fillText(str[ Math.floor(Math.random() * str.length) ], index * 10, item + 10)
    Arr[index] = item >= canvas.height || item > 10000 *  Math.random() ? 0 : item + 10; //添加随机数让字符随机出现不至于那么平整
  })
}
setInterval(rain, 40)
```
效果：
<canvas id="canvas"></canvas>

### 3.9、类
#### 3.9.1、定义类
```ts
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
```

#### 3.9.2、类的修饰符
:::tip
- public: 公有属性，外部可访问
- private: 私有属性，只能在内部访问，外部不可访问
- protected: 受保护的属性，内部和继承的子类中访问，外部不可访问
:::
```ts
class Person {
  public name: string
  private age: number
  protected sex: string
  constructor(name: string, age: number, sex: string) {
    this.name = name
    this.age = age
    this.sex = sex
  }
}
```

#### 3.9.3、类|协议的继承
```ts
interface IPerson {
  get(type: boolean): boolean
}
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
class Student extends Person implements IPerson {
  constructor(name: string) {
    super(name)
  }
  get(type: boolean): boolean {
    return type
  }
}
```

#### 3.9.4、static静态属性和方法
:::tip
静态方法之间可以使用`this`互相访问
:::
```ts
class Person {
  static name: string
  constructor(name: string) {
   
  }
  static getName(): string {
    return Person.name
  }
  static setName(name: string): void {
    const name = this.getName()
  }
}
```

#### 3.9.5、抽象类
```ts
abstract class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  print():string {
    return this.name
  }
  abstract getName(): string
}

class Student extends Person {
  constructor(name: string) {
    super(name)
  }
  getName(): string {
    return this.name
  }
}
```
实现Dom示例：
```ts
// 实现dom
interface Options {
  el: string | HTMLElement
}
interface VueCls {
  init(): void
  options: Options
}
interface Vnode {
  tag: string
  text?: string
  props?: {
    id?: number | string
    key?: number | string | object
  }
  children?: Vnode[]
}

class MyDom {
  constructor() {
    
  }
  private createElement(el: string): HTMLElement {
    return document.createElement(el)
  }
  protected setText(el: Element, text: string|null): void {
    el.innerText = text
  }
  protected render(createElement: Vnode): HTMLElement {
    const el = this.createElement(createElement.tag)
    if (createElement.children && Array.isArray(createElement.children)) {
      createElement.children.forEach((item) => {
        const child = this.render(item)
        this.setText(child, item.text ?? null)
        el.appendChild(child)
      })
    } else {
      this.setText(el, createElement.text ?? null)
    }
    return el
  }
}

class MyVue extends MyDom implements VueCls {
  options: Options
  constructor(options: Options) {
    super()
    this.options = options
    this.init()
  }
  static version() {
    return '1.0.0'
  }
  public init() {
    let app = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el
    let data: Vnode = {
      tag: 'div',
      props: {
        id: 1,
        key: 1
      },
      children: [
        {
          tag: 'div',
          text: '123'
        },
        {
          tag: 'div',
          text: '1234566'
        }
      ]
    }
    app?.appendChild(this.render(data))
    this.mount(app as Element)
  }

  public mount(el: Element) {
    document.body.appendChild(el)
  }
}

const v = new MyVue({
  el: '#app'
})
```

### 3.10、枚举
#### 3.10.1、数字枚举
```ts
enum Types {
  Red,
  Green,
}

// 默认从0开始
enum Types2 {
  Red = 0,
  Green = 1,
}

// 增长枚举
enum Types3 {
  Red = 1,
  Green,
}
```

#### 3.10.2、字符串枚举
```ts
enum Types {
  Red = 'red',
  Green = 'green'
}
```

#### 3.10.3、接口枚举
```ts
enum Types {
  Red = 1,
  Green,
}

interface Person {
  color: Types.Red | Types.Green
}
```
### 3.11、never类型
:::tip
`never`类型来表示不应该存在的状态
:::
#### 3.11.1、never类型的使用
```ts
function error(message: string): never {
  throw new Error(message)
}
function loop(): never {
  while(true) {}
}
```

#### 3.11.2、never使用场景
```ts
type A = 'a' | 'b' | 'c'
 
function isXiaoMan(value:A) {
   switch (value) {
       case "a":
           break 
       case "b":
          break 
       case "c":
          break 
       default:
          //是用于场景兜底逻辑
          const error:never = value;
          return error
   }
}
```

### 3.12、symbol类型
#### 3.12.1、symbol类型的使用
```ts
const s1 = Symbol()
const s2 = Symbol()
console.log(s1 === s2) // false

const s3 = Symbol('key')
```

#### 3.12.2、用作对象的key
:::tip
- symbol定义的属性，是不能通过如下方式遍历拿到的
:::
```ts
let sym = Symbol()
let obj = {
  [sym]: 123
}
console.log(obj[sym])

// 拿不到
Object.keys(obj)
// 拿不到
Object.getOwnPropertyNames(obj)

// 可以拿到
Object.getOwnPropertySymbols(obj)
// 可以拿到
Reflect.ownKeys(obj)
```

#### 3.12.3、Symbol.iterator迭代器
:::tip
- [...]是基于迭代器实现的
- [x, y] = [1, 2]是基于迭代器实现的
:::
```ts
const arr = [1,2,3,4];
let iterator = arr[Symbol.iterator]();

console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: 4, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }
```

#### 3.12.4、Symbol for of 迭代器
```ts
const obj = {
    max: 5,
    current: 0,
    [Symbol.iterator]() {
        return {
            max: this.max,
            current: this.current,
            next() {
                if (this.current == this.max) {
                    return {
                        value: undefined,
                        done: true
                    }
                } else {
                    return {
                        value: this.current++,
                        done: false
                    }
                }
            }
        }
    }
}
console.log([...obj])
 
for (let val of obj) {
   console.log(val);
}
```

#### 3.12.5、Symbol.for全局唯一
:::tip
- 不存在创建，直接返回
- 存在直接返回
:::
```ts
console.log(Symbol.for('key') === Symbol.for('key'))
// true
```

#### 3.12.6、Symbol.keyFor
```ts
console.log(Symbol.keyFor(Symbol.for('key')))
// key
```

#### 3.12.7、gen迭代器
```ts
function* gen() {
  yield 1
  yield 2
}
const g = gen()
console.log(g.next())
console.log(g.next())
```

### 3.13、泛型
#### 3.13.1、泛型的定义
```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

function add<T>(a: T, b: T): Array<T> {
  return [a, b]
}

add<number>(1, 2)
add<string>('1', '2')
```
#### 3.13.2、泛型接口
```ts
interface MyInter<T> {
  (age: T): T
}

function fn<T>(arg: T): T {
  return arg
}

let fn1: MyInter<number> = fn
```

#### 3.13.3、keyof约束
```ts
function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
let o = { name: '123' }
prop(o, 'name')
```

#### 3.13.4、泛型类
```ts
class Sub<T> {
  attr: T[] = []
  add(item: T) {
    this.attr.push(item)
  }
}
let sub = new Sub<number>()
sub.add(1)
```

### 3.14、装饰器Decorator
#### 3.14.1、class装饰器
```ts
const Base:ClassDecorator = (target: any) => {
  console.log('Base=', target)
  target.prototype.name = 'Base'
  target.prototype.fn = () => {
    console.log('class Base fn', '---', target.name)
  }
}

@Base
class Hello {

}

const hello = new Hello()
hello.fn()
```

#### 3.14.2、装饰器工厂
```ts
// 装饰器
const Base = (name: string) =>  {
  const fn:ClassDecorator = (target: any) => {
    target.prototype.myName = name
    target.prototype.fn = () => {
      console.log('class Base fn', '---', target.prototype.myName)
    }
  }
  return fn
}

@Base('hello base')
class Hello {

}

const hello = new Hello()
hello.fn()
```

#### 3.14.3、方法装饰器
```ts
const Get = (url: string) => {
  const fn: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
    setTimeout(() => {
      descriptor.value({ url })
    }, 1000)
  }
  return fn
}

class Hello {
  @Get('http://www.baidu.com')
  getData(data: any) {
    console.log('getData==', data)
  }
}

const hello = new Hello()
```

#### 3.14.4、参数装饰器
```ts
const Result = () => {
  console.log('333333')
  const fn: ParameterDecorator = (target: any, key: string, index: number) => {
    console.log('333333', target, key, index)
  }
  return fn
}

class Hello {
  getData(@Result() data: any) {
    console.log('getData==', data)
  }
}

const hello = new Hello()
```

#### 3.14.5、属性装饰器
```ts
const Met = () => {
  console.log('444444')
  const fn: PropertyDecorator = (target: any, key: string) => {
    console.log('444444')
  }
  return fn
}

class Hello {
  @Met()
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const hello = new Hello()
```

#### 3.14.6、开始存续元数据`reflect-metadata`
安装
```sh
npm i reflect-metadata
```
使用
```ts
//1.类装饰器 ClassDecorator 
//2.属性装饰器 PropertyDecorator
//3.参数装饰器 ParameterDecorator
//4.方法装饰器 MethodDecorator PropertyDescriptor 'https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10'
//5.装饰器工厂
import axios from 'axios'
import 'reflect-metadata'
const Get = (url:string) => {
   const fn:MethodDecorator = (target:any,key,descriptor:PropertyDescriptor) => {
        axios.get(url).then(res=>{
            const key = Reflect.getMetadata('key',target)
            descriptor.value(key ? res.data[key] : res.data)
        })
   }
   return fn
}
 
const Result = () => {
    const fn:ParameterDecorator = (target:any,key,index) => {
        Reflect.defineMetadata('key','result',target)
    }
    return fn
}
 
@Base('/api')
class Http {
    @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
    getList (@Result() data:any) {
        // console.log(data)
    }
    // @Post('/aaaa')
    create () {
 
    }
}
 
const http = new Http() as any
```

### 3.15、class
```ts
class Hello {
  name: string
  constructor(name: string) {
    this.name = name
  }
  fn(this: Hello) {
    console.log(this.name)
  }
}
```

<script setup lang="ts">
import { onMounted } from 'vue'

// 装饰器
const Base = (name: string) =>  {
  console.log('11111111111')
  const fn:ClassDecorator = (target: any) => {
    target.prototype.myName = name
    target.prototype.fn = () => {
      console.log('class Base fn', '---', target.prototype.myName)
    }
  }
  return fn
}

const Get = (url: string) => {
  console.log('222222')
  const fn: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
    setTimeout(() => {
      descriptor.value({ url })
    }, 1000)
  }
  return fn
}

const Result = () => {
  console.log('333333')
  const fn: ParameterDecorator = (target: any, key: string, index: number) => {
    console.log('333333', target, key, index)
  }
  return fn
}

const Met = () => {
  console.log('444444')
  const fn: PropertyDecorator = (target: any, key: string) => {
    console.log('444444')
  }
  return fn
}

@Base('hello base')
class Hello {
  @Met()
  name: string
  constructor(name: string) {
    this.name = name
  }
  @Get('http://www.baidu.com')
  getData(@Result() data: any) {
    console.log('getData==', data)
  }
}

const hello = new Hello()

// 实现dom
interface Options {
  el: string | HTMLElement
}
interface VueCls {
  init(): void
  options: Options
}
interface Vnode {
  tag: string
  text?: string
  props?: {
    id?: number | string
    key?: number | string | object
  }
  children?: Vnode[]
}

class MyDom {
  constructor() {
    
  }
  private createElement(el: string): HTMLElement {
    return document.createElement(el)
  }
  protected setText(el: Element, text: string|null): void {
    el.innerText = text
  }
  protected render(createElement: Vnode): HTMLElement {
    const el = this.createElement(createElement.tag)
    if (createElement.children && Array.isArray(createElement.children)) {
      createElement.children.forEach((item) => {
        const child = this.render(item)
        this.setText(child, item.text ?? null)
        el.appendChild(child)
      })
    } else {
      this.setText(el, createElement.text ?? null)
    }
    return el
  }
}

class MyVue extends MyDom implements VueCls {
  options: Options
  constructor(options: Options) {
    super()
    this.options = options
    this.init()
  }
  static version() {
    return '1.0.0'
  }
  public init() {
    let app = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el
    let data: Vnode = {
      tag: 'div',
      props: {
        id: 1,
        key: 1
      },
      children: [
        {
          tag: 'div',
          text: '123'
        },
        {
          tag: 'div',
          text: '1234566'
        }
      ]
    }
    app?.appendChild(this.render(data))
    this.mount(app as Element)
  }

  public mount(el: Element) {
    document.body.appendChild(el)
  }
}

const v = new MyVue({
  el: '#app'
})


onMounted(() => {
  let canvas = document.querySelector('#canvas') as HTMLCanvasElement
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.height = 300
  canvas.width = 300
  // canvas.height = screen.availHeight; //可视区域的高度
  // canvas.width = screen.availWidth; //可视区域的宽度
  let str: string[] = 'XMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSB'.split('')
  let Arr = Array(Math.ceil(canvas.width / 10)).fill(0) //获取宽度例如1920 / 10 192
  
  const rain = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)'//填充背景颜色
    ctx.fillRect(0, 0, canvas.width, canvas.height)//背景
    ctx.fillStyle = "#0f0"; //文字颜色
    Arr.forEach((item, index) => {
      ctx.fillText(str[ Math.floor(Math.random() * str.length) ], index * 10, item + 10)
      Arr[index] = item >= canvas.height || item > 10000 *  Math.random() ? 0 : item + 10; //添加随机数让字符随机出现不至于那么平整
    })
  }
  setInterval(rain, 40)
})
</script>

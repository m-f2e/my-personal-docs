# Vitest简介
## 1、简介
:::tip 安装要求
Vitest 需要 Vite >=v3.0.0 和 Node >=v14.18
:::
Vitest 是一个由 Vite 提供支持的极速单元测试框架。

## 2、官网
中文官网：https://cn.vitest.dev<br/>
英文官网：https://vitest.dev

## 3、使用
### 3.1、在线试用(打开慢，可能需要梯子)
官网地址：https://vitest.new<br/>
完整地址：https://stackblitz.com/edit/vitest-dev-vitest-sewyba?file=README.md&initialPath=__vitest__/

### 3.2、安装
<TabCodeGroup v-model="tab">
  <TabCodeItem title="npm" name="0">
    $ npm install -D vitest
  </TabCodeItem>
  <TabCodeItem title="yarn" name="1">
    $ yarn add -D vitest
  </TabCodeItem>
  <TabCodeItem title="pnpm" name="2">
    $ pnpm add -D vitest
  </TabCodeItem>
</TabCodeGroup>

### 3.3、语法
#### 3.3.1、简单实用
sum.js
```js
export function sum(a, b) {
  return a + b
}
```
sum.test.js
```js
import { test, expect } from "vitest";
import { sum } from "../src/sum";

test.skip('add(1, 2) should return 3', () => {
  expect(sum(1, 2)).toBe(3);
})
```
#### 3.3.2、多个测试单元
```js
import { test, expect, describe } from "vitest";
import { sum } from "../src/sum";

describe('sum test', () => {
  test('add before', () => {
    console.log('$---before');
  })
  test('add(1, 2) should return 3', () => {
    expect(sum(1, 2)).toBe(3);
  })
})
```
#### 3.3.3、concurrent(同时执行多个测试)
```js
import { describe, it } from "vitest";

describe('suite', () => {
  it('serial test', async () => {

  })
  it.concurrent('concurrent test1', async ({ expect }) => {

  })
  it.concurrent('concurrent test2', async ({ expect }) => {
    
  })
})
```
#### 3.3.4、跳过测试
```js
import { test, expect, describe } from "vitest";
import { sum } from "../src/sum";

describe('sum test', () => {
  test.skip('add before', () => {
    console.log('$---before');
  })
  test('add(1, 2) should return 3', () => {
    expect(sum(1, 2)).toBe(3);
  })
})
```
#### 3.3.5、快照
```js
import { expect } from "vitest";
import { it } from "vitest";

it('render corrently', () => {
  const result = render()
  expect(result).toMatchSnapshot()
})
```

#### 3.3.6、测试覆盖率
```shell
$ vitest run --coverage
```

#### 3.3.7、测试筛选
:::tip
将只执行包含 basic 的测试文件,如：
```js
basic.test.ts
basic-foo.test.ts
basic/foo.test.ts
```
:::
```shell
$ vitest basic
```
#### 3.3.8、toEqual
:::tip
`toEqual`断言实际值是否等于接收到的值或具有相同的结构（如果是对象，则递归比较它们
:::
```ts
expect(Math.sqrt(4)).toEqual(2)
```

#### 3.3.9、toBe
:::tip
`toBe`可以用于断言原始类型是否相等，或者对象是否共享相同的引用。
:::
```ts
import { describe, it, expect } from "vitest";

const stock = {
  type: 'apples',
  count: 13,
}

describe('vitest api', () => {
  it('stock are not the same', () => {
    const refStock = stock
    expect(stock).toBe(refStock)
  })
})
```

#### 3.3.10、toContain(数组|字符串)
:::tip
`toContain`断言实际值是否在数组中, 还可以检查一个字符串是否是另一个字符串的子字符串。
:::
```ts
expect([1,2,3]).toContain(1);
```

#### 3.3.11、toMatch(正则)
:::tip
`toMatch`断言字符串是否与正则表达式或字符串匹配。
:::
```ts
expect('applefruits').toMatch('fruit');
```

### 3.4、命令行
#### 3.4.1、监听模式
```shell
$ vitest
```

#### 3.4.2、vitest run
:::tip
在没有监听模式的情况下执行单次运行。
:::
```shell
$ vitest --run
```

## 4、示例
### 4.1、设置系统时间
```ts
import { expect } from "vitest";
import { describe, it, beforeEach, afterEach, vi } from "vitest";

function purchase() {
  const currentHour = new Date().getHours()
  const [open, close] = [9, 17]

  if (currentHour > open && currentHour < close) {
    return { message: 'Success' }
  }
  return { message: 'Error' }
}

describe('purchasing flow', () => {
  beforeEach(() => {
    // 告诉 vitest 我们使用模拟时间
    vi.useFakeTimers()
  })
  afterEach(() => {
    // 每次测试运行后恢复日期
    vi.useRealTimers()
  })
  it('allows purchases within business hours', () => {
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)

    expect(purchase()).toEqual({ message: 'Success' })
  })

  it('disallows purchases outside of business hours', () => {
    // 将时间设置在工作时间之外
    const date = new Date(2000, 1, 1, 19)
    vi.setSystemTime(date)

    // 访问 Date.now() 将生成上面设置的日期
    expect(purchase()).toEqual({ message: 'Error' })
  })
})
```

### 4.2、



<script setup>
import { ref } from 'vue'
const tab = ref('0')
</script>
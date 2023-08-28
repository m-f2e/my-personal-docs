# TypeScript进阶用法

## 1、Proxy
:::tip
Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）
:::

## 2、Reflect
:::tip
Reflect 对象可以用于操作 JavaScript 函数的属性和方法
:::

## 3、TypeScript API
### 3.1、Partial(转可选)
:::tip
将T中的所有属性设置为可选
:::
源码：
```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
使用:
```ts
type p = Partial<{ a: 1, b: 2, c: 3 }>;
```


### 3.2、Pick(选取属性)
:::tip
从类型定义T的属性中，选取指定一组属性，返回一个新的类型定义。
:::
源码：
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
使用:
```ts
type p = Pick<{ a: 1, b: 2, c: 3 }, 'a'|'b'>;
```
### 3.3、Readonly(只读)
:::tip
将T中的所有属性设置为只读
:::
源码：
```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```
使用:
```ts
type p = Readonly<{ a: 1, b: 2, c: 3 }>;
```

### 3.4、Record(键值对)
:::tip
将T中的所有属性设置为键值对
:::
源码：
```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```
使用:
```ts
type p = Record<'a' | 'b', number>;
```

### 3.5、Exclude
:::tip
从类型定义T的属性中，移除指定一组属性，返回一个新的类型定义。
:::
源码：
```ts
type Exclude<T, U> = T extends U ? never : T;
```
使用:
```ts
type p = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;
```

### 3.6、infer(占位符)
:::tip
`infer`是`TypeScript`新增到的关键字 `充当占位符`
:::
#### 3.6.1、infer关键字
```ts
type Infer<T> = T extends any ? T : never;
```
使用:
```ts
type p = Infer<string>;
```

```ts
type Inter<T> = T extends Array<any> ? T[number] : T;

type A = Infer<(boolean | string)[])>
```
#### 3.6.2、infer关键字
使用`inter`修改
```ts
type Infer<T> = T extends Array<infer U> ? U : T

type A = Infer<(string | Symbol)[]>
```

#### 3.6.3、提取元素
提取头部元素
```ts
type Arr = ['a', 'b', 'c']

type First<T extends any[]> = T extends [infer First, ...any[]] ? First : []

type a = First<Arr>
```
提取尾部元素
```ts
type Arr = ['a', 'b', 'c']

type Last<T extends any[]> = T extends [...any[], infer Last] ? Last : []

type a = Last<Arr>
```

剔除第一个元素shift
```ts
type Arr = ['a', 'b', 'c']

type Shift<T extends any[]> = T extends [unknown, ...infer Rest] ? Rest : []

type a = Shift<Arr>
```
剔除最后一个元素pop
```ts
type Arr = ['a', 'b', 'c']

type Pop<T extends any[]> = T extends [...infer Rest, unknown] ? Rest : []

type a = Pop<Arr>
```

#### 3.6.4、infer递归
```ts
type Arr = [1, 2, 3]

type ReveArr<T extends any[]> = T extends [infer First, ...infer rest] ? [...ReveArr<rest>, First] : T

type a = ReveArr<Arr>
```

## 6、示例
### 6.1、any类型
```ts
type Person = {
  name: string
  age: number
}

const proxy = (obj: any, key: any) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log(`get key======>${key}`);
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log(`set key======>${key}`);
      return Reflect.set(target, key, value, receiver)
    }
  })
}

const logAccess = (obj: Person, key: 'name' | 'age') => {
  return proxy(obj, key)
}

const man: Person = logAccess({ name: 'man', age: 18 }, 'name')
console.log(man.name)
man.name = 'man2'
```

### 6.2、泛型+keyof
```ts
type Person = {
    name: string
    age: number
  }

  const proxy = (obj: any, key: any) => {
    return new Proxy(obj, {
      get(target, key, receiver) {
        console.log(`get key======>${key}`);
        return Reflect.get(target, key, receiver)
      },
      set(target, key, value, receiver) {
        console.log(`set key======>${key}`);
        return Reflect.set(target, key, value, receiver)
      }
    })
  }

  const logAccess = <T extends object>(obj: T, key: keyof T): T => {
    return proxy(obj, key)
  }

  const man: Person = logAccess({ name: 'man', age: 18 }, 'name')
  console.log(man.name)
  man.name = 'man2'
```

### 6.3、实现mobx
```ts
// mobx
const list:Set<Function> = new Set()
const autorun = (fn: Function) => {
  if (fn) {
    list.add(fn)
  }
}
const observable = <T extends object>(params: T) => {
  return new Proxy(params, {
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      list.forEach(fn => {
        fn()
      })
      return result
    }
  })
}

const pp = observable({ name: 'pp' })
autorun(() => {
  console.log(pp.name)
})
pp.name = 'pp2'
```

<script setup lang="ts">
  // mobx
  const list:Set<Function> = new Set()
  const autorun = (fn: Function) => {
    if (fn) {
      list.add(fn)
    }
  }
  const observable = <T extends object>(params: T) => {
    return new Proxy(params, {
      set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver)
        list.forEach(fn => {
          fn()
        })
        return result
      }
    })
  }

  const pp = observable({ name: 'pp' })
  autorun(() => {
    console.log(pp.name)
  })
  pp.name = 'pp2'


  type Person = {
    name: string
    age: number
  }

  const proxy = <T extends object, K extends keyof T>(obj: T, key: K) => {
    return new Proxy(obj, {
      get(target, key, receiver) {
        console.log(`get key======>${key}`);
        return Reflect.get(target, key, receiver)
      },
      set(target, key, value, receiver) {
        console.log(`set key======>${key}`);
        return Reflect.set(target, key, value, receiver)
      }
    })
  }

  const logAccess = (obj: Person, key: 'name' | 'age') => {
    return proxy(obj, key)
  }

  const man: Person = logAccess({ name: 'man', age: 18 }, 'name')
  console.log(man.name)
  man.name = 'man2'
</script>
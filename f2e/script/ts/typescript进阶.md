# TypeScript进阶用法

## 1、Proxy
:::tip
Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）
:::

## 2、Reflect
:::tip
Reflect 对象可以用于操作 JavaScript 函数的属性和方法
:::

## 3、示例
### 3.1、any类型
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

### 3.2、泛型+keyof
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

### 3.3、实现mobx
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
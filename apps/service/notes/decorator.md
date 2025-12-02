# 1.装饰器是什么？
## 装饰器主要集中在class上使用，为什么普通函数无法使用，因为函数提升, 

### 类装饰器

```ts
    @animal()
    class People {

    }
    
    // 相当于animal(People) || People
    function animal(target) {}
```

### 类方法装饰

```ts
    class Animal {
        @meat()
        eat() {

        }
    }

    // 相当于Animal.prototype.eat = meat(Animal.prototype.eat)
    function eat(target, name, descriptor) {}
```

### 类属性装饰

```ts
    class Animal {
        @increase(1)
        weight: number
    }

    // 相当于Animal.prototype.eat = meat(Animal.prototype.eat)
    function increase(target, propKey) {}
```

### 参数装饰器

```ts
    class Animal {
        eat(@vegetable food: string) {

        }
    }

    // 相当于Animal.prototype.eat = meat(Animal.prototype.eat)
    function vegetable(target, propKey, paramIndex) {}
```
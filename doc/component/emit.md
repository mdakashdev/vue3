# defineEmits

```text
Easy concept - 
Parent theke child a jane and Child theke parent a jabe

Main concept need hocche - child theke data neya. so native @input diye input trigger value dhora jai
so, @input=method assign kore, sei method a value dhora jai and sekhane theke emit call kora jai

emi korar way hocche - defineEmit kore, eita ke akta kichu te store korete hobe
then seta ke, as a function hisabe call korte hobe, signatur hobe (event, value)

parent - ei exact same event name ta dhorte hobe aar sekhane jekono method assign kore valu update kora jabe.

aar v-model er khetre seta auto kora hocche.
parent theke data pass korar jonno - modelValue props recv korche;
```



খুব ভালো। এবার **`defineEmits()`**-টা একদম ভিতর থেকে বুঝি।

তুমি `defineProps()` বুঝেছো, এখন `defineEmits()` বুঝলে Parent ↔ Child communication পুরো clear হয়ে যাবে।

---

# Step 1

```ts
const emit = defineEmits();
```

এটা কী return করে?

একটা **function** return করে।

অর্থাৎ

```ts
console.log(typeof emit)
```

Output

```text
function
```

তাই পরে আমরা লিখতে পারি

```ts
emit(...)
```

---

# Step 2

ধরো

```ts
const emit = defineEmits();
```

তারপর

```ts
emit("save");
```

মানে

> Parent-এর কাছে `"save"` event পাঠাও।

---

# Step 3

Event-এর সাথে data-ও পাঠানো যায়।

```ts
emit("save", user);
```

অথবা

```ts
emit("login", token);
```

---

# Step 4

তোমার code

```ts
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();
```

এটা একটু ভেঙে দেখি।

---

## Part 1

```ts
const emit =
```

মানে

একটা function তৈরি হচ্ছে।

---

## Part 2

```ts
defineEmits<...>()
```

এখানে TypeScript-কে বলা হচ্ছে

> "এই function কোন event accept করবে?"

---

## Part 3

```ts
(e: "update:modelValue", value: string): void
```

মানে

এই function

প্রথম parameter

```ts
"update:modelValue"
```

হতেই হবে।

দ্বিতীয় parameter

```ts
string
```

হতেই হবে।

---

অর্থাৎ

এটা valid

```ts
emit("update:modelValue", "Akash")
```

---

এটা invalid

```ts
emit("save", "Akash")
```

কারণ

```text
save
```

declare করা হয়নি।

---

এটাও invalid

```ts
emit("update:modelValue", 100)
```

কারণ

```text
100
```

string না।

---

# তাই TypeScript error দিবে

এটাই Type Safety.

---

# এখন Parent-এর সাথে connect করি

Child

```ts
emit("update:modelValue", "Akash")
```

Parent

```vue
<BaseInput
    @update:modelValue="username = $event"
/>
```

Vue internally

```text
Child

↓

emit("update:modelValue","Akash")

↓

Parent

↓

username="Akash"
```

---

# `v-model` হলে

তুমি লিখছো

```vue
<BaseInput
    v-model="username"
/>
```

Vue নিজে বানায়

```vue
<BaseInput
    :modelValue="username"
    @update:modelValue="username = $event"
/>
```

অতএব

Child

```ts
emit("update:modelValue","Akash")
```

↓

Parent

```ts
username = "Akash"
```

---

# এটা JavaScript function হিসেবেও ভাবতে পারো

ধরো

```ts
function emit(eventName, payload){
    console.log(eventName)
    console.log(payload)
}
```

এখন

```ts
emit("update:modelValue","Akash")
```

Output

```text
update:modelValue

Akash
```

Vue internally console.log করে না।

বরং

যে Parent

```vue
@update:modelValue
```

listen করছে,

তার কাছে event পাঠিয়ে দেয়।

---

# মনে রাখার সহজ উপায়

`defineProps()`

👉 Parent থেকে Child-এ data **receive** করার জন্য।

```text
Parent  -----------> Child
         props
```

`defineEmits()`

👉 Child থেকে Parent-এ **notification/event** পাঠানোর জন্য।

```text
Parent <----------- Child
          emit
```

---

## আমি তোমাকে একটা challenge দিই।

`v-model` বাদ দিয়ে আমরা **নিজেরা** `defineProps()` + `defineEmits()` ব্যবহার করে `BaseInput` বানাবো। এতে তুমি বুঝবে `v-model` আসলে কীভাবে কাজ করে। আমার অভিজ্ঞতায়, এই exercise করার পর `defineEmits()` আর কখনও confusing লাগে না।

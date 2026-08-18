# State Management

তাই **official state management library হলো Pinia**।

আগে Vuex ছিল, কিন্তু এখন **Pinia recommended**।


## State Management কেন লাগে?

ধরো তোমার app-এ login user আছে।

```text
App
├── Navbar
├── Sidebar
├── Profile
└── Dashboard
```

সব component-এর user data লাগছে।

যদি props দিয়ে পাঠাও,

```text
Dashboard <-- App ---> Profile
               │
               ▼
             Navbar
```

> একই data বারবার pass করতে হবে। like (username) apps theke props Dashboard, profile and Navbar a jacche.

mane, global akta state maintain kora, jekhan theke `username` sobai peye jabe. sob component ekoi store theke data porte parbe.

State Management বলছে,

```text
            Store
        (Global State)
         username
         token
         theme
         language
         cart
          ▲
          │
 ┌────────┼────────┐
 │        │        │
Navbar Profile Dashboard
```

সব component একই Store থেকে data পড়তে পারবে।

---

# Pinia Install

```bash
pnpm install pinia
```

---

# Folder Structure

```text
src/
│
├── stores/
│   ├── counter.ts
│   └── auth.ts
│
├── App.vue
└── main.ts
```

---

# main.ts

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
```

---

# Create Store

`stores/counter.ts`

```ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {

  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count,
    increment
  }

})
```

---

# Use Store

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>

<h2>{{ counter.count }}</h2>

<button @click="counter.increment()">
Increment
</button>

</template>
```

---

# Flow

```text
User Click
↓
counter.increment()
↓
Store
↓
count++
↓
UI Auto Update
```

---

# Pinia Store-এর ৩টা Main Part

## 1. State

```ts
const count = ref(0)
```

Data

---

## 2. Action

```ts
function increment() {
    count.value++
}
```

Method

---

## 3. Getter (Computed)

```ts
const double = computed(() => count.value * 2)
```

Derived State

---

# বড় Project-এ Store

```text
stores/
auth.ts
user.ts
theme.ts
cart.ts
product.ts
notification.ts
```

---

# তোমার শেখার Order

### Day 1

* কেন State Management লাগে
* Local State (`ref`)
* Global State

### Day 2

* Pinia Install
* `defineStore()`
* State

### Day 3

* Actions

### Day 4

* Getters

### Day 5

* Multiple Stores

### Day 6

* Async API Call
* Login Example

### Day 7

* Persist State (localStorage)

---

### তোমার জন্য একটা ছোট Project

`Auth Store` বানাও।

State:

```ts
user
token
isAuthenticated
```

Actions:

```text
login()
logout()
setUser()
```

Getter:

```text
isLoggedIn
```

এটা বানাতে পারলে Pinia-এর সবচেয়ে common real-world pattern শিখে যাবে।













চমৎকার প্রশ্ন। **একটা `username` দিয়েই Pinia-এর প্রয়োজন বুঝি।**

---

# প্রথমে Pinia ছাড়া

`App.vue`

```ts
const username = ref('Akash')
```

```text
App.vue
   │
   ├── Navbar
   ├── Sidebar
   └── Profile
```

যদি `Navbar`-এ username দেখাতে চাও:

```vue
<Navbar :username="username" />
```

যদি `Profile`-এও লাগে:

```vue
<Profile :username="username" />
```

যদি `Sidebar`-এও লাগে:

```vue
<Sidebar :username="username" />
```

Flow

```text
App.vue
   │
   ├────────► Navbar
   │
   ├────────► Sidebar
   │
   └────────► Profile
```

একই data বারবার props দিয়ে পাঠাতে হচ্ছে।

---

# যদি আরও গভীরে লাগে?

ধরো

```text
App
 └── Dashboard
      └── UserCard
           └── UserInfo
```

`UserInfo`-তে `username` লাগবে।

তাহলে

```text
App
↓
Dashboard
↓
UserCard
↓
UserInfo
```

প্রতিটি component-এর মাধ্যমে `username` pass করতে হবে।

এটাকে বলে **Prop Drilling**।

---

# এখন Pinia ব্যবহার করি

Store

```ts
// stores/user.ts

const username = ref('Akash')
```

এখন

```text
            Pinia Store
          username = Akash
             ▲
             │
 ┌───────────┼───────────┐
 │           │           │
Navbar    Sidebar    Profile
```

এখন কোনো props লাগবে না।

Navbar

```ts
const userStore = useUserStore()
```

```vue
{{ userStore.username }}
```

---

Profile

```ts
const userStore = useUserStore()
```

```vue
{{ userStore.username }}
```

---

Sidebar

```ts
const userStore = useUserStore()
```

```vue
{{ userStore.username }}
```

সবাই একই data পড়ছে।

---

# Update হলে কী হবে?

ধরো Profile-এ user নাম change করল।

```ts
userStore.username = 'Rahim'
```

তখন

```text
Pinia

username = Rahim
```

↓

Navbar

```text
Rahim
```

↓

Sidebar

```text
Rahim
```

↓

Profile

```text
Rahim
```

**এক জায়গায় update করলে সব component automatically update হয়ে যাবে।**

---

# বাস্তব উদাহরণ (Authentication)

Login-এর পরে backend থেকে আসে:

```json
{
  "user": {
    "name": "Akash"
  },
  "token": "abc123"
}
```

Store-এ রাখলে:

```text
Pinia

username = Akash
token = abc123
```

এখন

* Navbar → `username`
* Profile → `username`
* Dashboard → `username`
* Settings → `username`

কেউ props চায় না।

সবাই Store থেকে নেয়।

---

## এক লাইনে

**Props** হলে:

```text
Parent → Child → Child → Child
```

**Pinia** হলে:

```text
Store ↔ যে Component-এর দরকার, সে সরাসরি Store থেকে নেবে
```

এটাই Pinia-এর সবচেয়ে বড় সুবিধা।

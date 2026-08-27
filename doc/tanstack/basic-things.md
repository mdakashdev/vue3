# Basic understanding 

```
import { ref, onMounted } from "vue";
import { getUsers } from '../api/userApi.ts'

const users = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchUsers = async () => {
  try {
    const response = await getUsers()
    users.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
```

- fetchUsers akta function, ei funciton ta call hobe jokhob component initial render hobe, tokhon `onMounted hook` diye call hobe
- then api theke data niye ese `users` a rakhbe
- jodi error hoi tobe error a rakhbe
- `loading` ta prothome `true` set kora ache, so finally loading false hoye jabe

mane ekhane 3 ta kaj hocche
- fetch api data and store using hook
- error catch
- loading false 

# TanStack

> jodi amra `tanStack` use kori tobe data fetch and store, error, loading gulo lagbe na, ei gulo peye jabo


## TanStack Query আসলে কী করবে?

TanStack Query তোমার এই কাজগুলো manage করবে:

```text
API Request
Loading state
Error state
Success state
Caching
Refetching
Retry
Background fetching
Request deduplication
```

তাই Component-এ আর এগুলো manually লিখতে হবে না:

```ts
const users = ref([])
const loading = ref(true)
const error = ref(null)
```

---

## Install

Vue-এর জন্য TanStack Query package:

```bash
pnpm add @tanstack/vue-query
```

---

## App-এ TanStack Query configure

`main.ts`:

```ts
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
const queryClient = new QueryClient()

app.use(VueQueryPlugin, {
  queryClient,
})
```

তাহলে application-এর মধ্যে TanStack Query available হবে।

---

## এখন আসল পরিবর্তন: `useUsers.ts`

একটা composable তৈরি করো:

```text
src/
├── api/
│   ├── axios.ts
│   └── userApi.ts
│
├── composables/
│   └── useUsers.ts
│
└── views/
    └── AboutView.vue
```

`useUsers.ts`:

```ts
import { useQuery } from '@tanstack/vue-query'
import { getUsers } from '@/api/userApi'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
```

এখানে খুব গুরুত্বপূর্ণ দুইটা জিনিস:

### `queryKey`

```ts
queryKey: ['users']
```

TanStack Query-এর কাছে এটা হচ্ছে:

> এই data-টার identity হলো `users`।

এই key ব্যবহার করে TanStack Query cache manage করবে।

### `queryFn`

```ts
queryFn: getUsers
```

TanStack Query-কে বলছো:

> যখন users-এর data দরকার হবে, `getUsers()` call করো।

---

## এখন `AboutView.vue`

```vue
<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'

const {
  data,
  isLoading,
  isError,
  error,
} = useUsers()
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>

  <div v-else-if="isError">
    Error: {{ error?.message }}
  </div>

  <div v-else>
    <div v-for="user in data?.data" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>
```

## তাহলে Axios আর TanStack Query-এর কাজ আলাদা

এটা খুব ভালোভাবে মাথায় রাখো:

```text
┌───────────────────────────────┐
│       TanStack Query          │
│                               │
│ Loading                       │
│ Error                         │
│ Cache                         │
│ Refetch                       │
│ Retry                         │
│ Server State                  │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│            Axios              │
│                               │
│ HTTP Request                  │
│ GET / POST / PUT / DELETE     │
│ Headers                       │
│ Base URL                      │
│ Timeout                       │
│ Interceptors                  │
└───────────────┬───────────────┘
                ↓
           Backend API
```

অর্থাৎ:

**Axios বলে:**

> "আমি Backend-এ HTTP request পাঠাব।"

**TanStack Query বলে:**

> "এই server data-টা আমি manage করব—loading, error, cache, refetch ইত্যাদি।"

---

## তোমার বর্তমান code বনাম TanStack

### এখন

```text
AboutView
   ↓
getUsers()
   ↓
Axios
   ↓
API

AboutView নিজেই manage করছে:
✓ data
✓ loading
✓ error
```

### TanStack Query দিয়ে

```text
AboutView
   ↓
useUsers
   ↓
TanStack Query
   ↓
getUsers()
   ↓
Axios
   ↓
API

TanStack Query manage করছে:
✓ data
✓ loading
✓ error
✓ cache
✓ refetch
✓ retry
```

**এটাই TanStack Query-এর actual use।** Axios replace করা না; Axios-এর উপরে বসে **server state management** করা।





# Question

1. composable step ta ki thaktei hobe, mane thaka lagbe ?

না, **Composable থাকতেই হবে না।** ❌

TanStack Query সরাসরি Component থেকেও ব্যবহার করতে পারো।

যেমন:

```ts
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
})
```

### তাহলে Composable কেন রাখবে?

যখন একই query logic **একাধিক component-এ reuse** করতে চাও:

```text
UserList.vue ──┐
               ├──→ useUsers()
Profile.vue  ──┘
```


### সহজ rule

```text
Simple:
Component → TanStack Query → API Service → Axios

Reusable / Large project:
Component → Composable → TanStack Query → API Service → Axios
```

**তাই Composable optional; TanStack Query ব্যবহার করার জন্য Composable বাধ্যতামূলক না।**

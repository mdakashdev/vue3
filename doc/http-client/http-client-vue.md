## 1. Vue-তে HTTP Client কী?

Vue নিজে HTTP client দেয় না।

সাধারণত ব্যবহার করবে **Axios**।

```bash
npm install axios
```

তারপর:

```ts
import axios from 'axios'

const response = await axios.get('/api/users')

console.log(response.data)
```

---

## 2. প্রথমে একটা simple GET request করো

ধরো Laravel API:

```text
GET /api/users
```

Vue:

```ts
<script setup lang="ts">
import axios from 'axios'

async function getUsers() {
  const response = await axios.get('/api/users')

  console.log(response.data)
}

getUsers()
</script>
```

এখানে:

```text
axios.get()
     ↓
GET request
     ↓
Laravel
     ↓
JSON response
```

---

## 3. API response state-এ রাখবে

```ts
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const users = ref([])

async function getUsers() {
  const response = await axios.get('/api/users')

  users.value = response.data
}

getUsers()
</script>
```

Template:

```vue
<template>
  <div v-for="user in users" :key="user.id">
    {{ user.name }}
  </div>
</template>
```

এখন flow:

```text
API
 ↓
response.data
 ↓
users.value
 ↓
Template
```

---

# 4. তারপর POST

Login-এর মতো:

```ts
const response = await axios.post('/api/login', {
  email: 'test@gmail.com',
  password: '123456'
})
```

এখানে:

```text
axios.post(
    URL,
    Request Body
)
```

---

# 5. Production project-এ সরাসরি Component থেকে Axios না করাই ভালো

শুরুতে:

```text
Component
    ↓
Axios
    ↓
API
```

বোঝার জন্য ঠিক আছে।

কিন্তু পরে:

```text
Component
    ↓
Service / API layer
    ↓
Axios
    ↓
Backend
```

যেমন:

```text
src/
├── api/
│   ├── axios.ts
│   └── userApi.ts
│
├── stores/
│   └── user.ts
│
├── views/
│   └── Users.vue
│
└── components/
```

`userApi.ts`:

```ts
import axios from './axios'

export function getUsers() {
  return axios.get('/users')
}
```

Component:

```ts
const response = await getUsers()
```

এতে Component-এর মধ্যে HTTP implementation ছড়িয়ে পড়ে না।

---

# 6. তোমার Learning Order

আমি এখন এই sequence-এ যেতে বলব:

### HTTP Client

```text
1. Axios install
        ↓
2. GET
        ↓
3. POST
        ↓
4. PUT / PATCH
        ↓
5. DELETE
        ↓
6. Request Body
        ↓
7. Query Parameters
        ↓
8. Headers
        ↓
9. Error Handling
        ↓
10. Loading State
```

তারপর **Axios instance**:

```text
axios.create()
```

তারপর:

```text
Base URL
Authorization Header
Interceptors
```

তারপর Pinia-এর সাথে:

```text
Component
    ↓
Pinia Action
    ↓
API Service
    ↓
Axios
    ↓
Laravel API
```

এটাই তোমার জন্য সবচেয়ে important real-world pattern।

**তাই এখন Auth-এ যাওয়ার দরকার নেই। আগে Axios দিয়ে একটা ছোট `User CRUD API` integrate করলে HTTP Client + API Integration + Pinia—তিনটাই একসাথে solid হবে।**

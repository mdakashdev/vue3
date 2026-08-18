# my understanding summary

- http client use kora hoi - data neya deyar jonno 
- client hocche - fetch(), http-client, axios and tanstack query
- tahole client install korte hobe then configure after thar use korte hobe
- folder strcutre or data neya and deyar jonno proven architecure use kori, dui dhoroner 1. small app 2. Large app
- small app: Component > Service
- large app: components > composables (reusable logic) > stores (state management) > services (api layer bola hoi)
- `1st service` a userService.ts using client `axios` 
  - then `2nd store` userStore.ts a service use korbe 
  - then `3rd a composables` useUsers and 
  - last `4th components` UserList.vue


```text
userService.ts  → Service / API Layer
userStore.ts    → Store / State Management
useUsers.ts     → Composable / Reusable Logic
UserList.vue    → Component / UI
```



> tahole Service ta kei API layer bola hoi?

হ্যাঁ, **এই architecture-এ `Service`-কেই সাধারণত API Layer বলা হয়।** ✅

```text
userService.ts
      ↓
API Layer / Service Layer
      ↓
HTTP Client (Axios / fetch)
      ↓
Backend API
```

তবে terminology একটু flexible:

* **Service** → code-এর layer/organization
* **API Layer** → backend API communication-এর responsibility
* তাই `userService.ts` → **API Service / API Layer** বলা যায়।

উদাহরণ:

```ts
// userService.ts

export const getUsers = () => {
  return axios.get('/users')
}

export const createUser = (data) => {
  return axios.post('/users', data)
}
```

এখানে `userService.ts`-এর মূল দায়িত্ব হলো **Backend API-এর সাথে communication করা**।



# HTTP Client

**HTTP Client হলো এমন একটি tool/library, যেটা frontend application থেকে backend server/API-তে HTTP request পাঠায় এবং response গ্রহণ করে।**

Frontend থেকে চিন্তা করলে, **HTTP Client হলো frontend-এর মাধ্যমে backend/API-র সাথে যোগাযোগ করার মাধ্যম।**

```text
Frontend
   ↓ HTTP Request
Backend / API
   ↓ HTTP Response
Frontend
```

যেমন: Vue/React/Angular থেকে `GET /users` call করে user data আনা।


## Type

> fetch(), HttpClient, Axios, TanStack Query

- api call korar jonno `official` http client hocche - fetch() and HttpClient
- official alternative hocche - Axios and TanStack Query
- TanStack Query এটা আসলে HTTP client না; API data fetching/caching/`server-state management`-এর জন্য।


## Flow Diagram

Component
Service / API layer using axios
Store 


> api diye data neya and deyar jonno vue te composable use kore ? naki onno way te kore? eitai ki Service / API layer ?

হ্যাঁ, **Vue-তে API call organize করার জন্য composable ব্যবহার করা যায়**, কিন্তু **Composable আর Service/API layer একই জিনিস না**।

Professional structure-এ সাধারণত:

```text
Component
   ↓
Composable
   ↓
Service / API Layer
   ↓
HTTP Client (Axios / fetch)
   ↓
Backend API
```

### পার্থক্যটা

**Service / API Layer** → শুধু API communication-এর দায়িত্ব।

```ts
// services/userService.ts

export const getUsers = () => {
  return axios.get('/users')
}

export const createUser = (data) => {
  return axios.post('/users', data)
}
```

**Composable** → API call-এর সাথে UI-related state/manage করে।

```ts
// composables/useUsers.ts

const users = ref([])
const loading = ref(false)

const fetchUsers = async () => {
  loading.value = true
  users.value = await getUsers()
  loading.value = false
}
```

**Component** → composable ব্যবহার করবে।

```text
UserList.vue
     ↓
useUsers()
     ↓
userService
     ↓
Axios
     ↓
API
```

👉 তাই **Service/API layer = API communication**, আর **Composable = সেই API data/state কে component-এর জন্য ব্যবহারযোগ্য করা**।


> store mane state management , actuall flow ta bolo

হ্যাঁ। **Store = State Management**। Vue frontend-এর actual professional flow সাধারণত এমন:

```text
Component
    ↓
Composable
    ↓
Store
    ↓
Service / API Layer
    ↓
HTTP Client (Axios / fetch)
    ↓
Backend API
```

তবে **সব API call-এর জন্য Store লাগবেই—এমন না।**

### Example: User List

```text
UserList.vue
    ↓
useUsers()
    ↓
userStore.fetchUsers()
    ↓
userService.getUsers()
    ↓
Axios
    ↓
GET /users
    ↓
Backend
```

Response ফেরত এলে:

```text
Backend
   ↓
Axios
   ↓
userService
   ↓
Store
   ↓
users state update
   ↓
Composable
   ↓
Component re-render
```

### চারটার কাজ এক লাইনে

| Layer           | কাজ                             |
| --------------- | ------------------------------- |
| **Component**   | UI দেখায় / user interaction নেয় |
| **Composable**  | reusable frontend logic         |
| **Store**       | shared/global state রাখে        |
| **Service/API** | backend API call করে            |
| **HTTP Client** | actual HTTP request পাঠায়       |

**Important:** ছোট application-এ এটা হতে পারে:

```text
Component → Service → Axios → API
```

আর বড় application-এ:

```text
Component → Composable → Store → Service → Axios → API
```

এটাই মূল architecture।


> 2 ta architecture er simple 2 ta example dau get user list


### 1️⃣ Small App — Store/Composable ছাড়া

```text
UserList.vue
    ↓
userService.ts
    ↓
Axios
    ↓
GET /users
    ↓
Backend
```

```ts
// userService.ts
export const getUsers = () => {
  return axios.get('/users')
}
```

```ts
// UserList.vue
const users = ref([])

const loadUsers = async () => {
  const response = await getUsers()
  users.value = response.data
}

loadUsers()
```

এখানে **Component সরাসরি Service ব্যবহার করছে**।

---

### 2️⃣ Large App — Composable + Store

```text
UserList.vue
    ↓
useUsers()
    ↓
userStore
    ↓
userService.ts
    ↓
Axios
    ↓
GET /users
    ↓
Backend
```

```ts
// userService.ts
export const getUsers = () => {
  return axios.get('/users')
}
```

```ts
// userStore.ts
export const useUserStore = defineStore('user', () => {

  const users = ref([])

  const fetchUsers = async () => {
    const response = await getUsers()
    users.value = response.data
  }

  return { users, fetchUsers }
})
```

```ts
// useUsers.ts
export const useUsers = () => {

  const store = useUserStore()

  return {
    users: store.users,
    fetchUsers: store.fetchUsers
  }
}
```

```ts
// UserList.vue
const { users, fetchUsers } = useUsers()

fetchUsers()
```

### মূল difference

```text
Small:
Component → Service → API

Large:
Component → Composable → Store → Service → API
```

**Store দরকার হয় যখন `users` state একাধিক component/page-এর মধ্যে share করতে হবে।**

> 2 tar folder structure

হ্যাঁ, একই **User List** example-এর জন্য দুইটা folder structure:

### 1️⃣ Small App

```text
src/
├── components/
│   └── UserList.vue
│
├── services/
│   └── userService.ts
│
├── views/
│   └── Users.vue
│
└── App.vue
```

Flow:

```text
UserList.vue
    ↓
userService.ts
    ↓
Axios
    ↓
API
```

---

### 2️⃣ Large App

```text
src/
├── components/
│   └── UserList.vue
│
├── composables/
│   └── useUsers.ts
│
├── stores/
│   └── userStore.ts
│
├── services/
│   └── userService.ts
│
├── views/
│   └── Users.vue
│
└── App.vue
```

Flow:

```text
UserList.vue
    ↓
useUsers.ts
    ↓
userStore.ts
    ↓
userService.ts
    ↓
Axios
    ↓
API
```

**সহজ rule:**

```text
Small project → Component + Service

Large project → Component + Composable + Store + Service
```


এই ৩টা প্রশ্ন আসলে **Frontend API Integration-এর পুরো picture**। একদম practicalভাবে ধরো।

## 1. Frontend → Backend configure কীভাবে হয়?

ধরো Vue application থেকে User List আনবে।

```text
Vue Frontend
     ↓
HTTP Request
     ↓
Backend API
     ↓
Database
     ↓
Backend Response
     ↓
Vue Frontend
```

Frontend-এ প্রথমে **API Base URL** configure করা হয়:

```text
VITE_API_URL=https://api.example.com
```

তারপর HTTP client configure:

```ts
axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
```

এরপর API service:

```ts
userService.getUsers()
```

যেটা internally:

```text
GET /users
```

call করবে।

Backend response:

```json
{
  "data": [
    { "id": 1, "name": "Akash" }
  ]
}
```

Frontend সেই data নিয়ে UI-তে দেখাবে।

### অর্থাৎ কাজগুলো সাধারণত:

```text
Environment Config
       ↓
HTTP Client
       ↓
API Service
       ↓
API Call
       ↓
Response Handling
       ↓
State/UI
```

---

# 2. এক application থেকে আরেক application-এর সাথে API দিয়ে connect কীভাবে হয়?

এখানে Frontend থাকা **অবশ্যই প্রয়োজন নেই**।

ধরো:

```text
Employee Management System
            ↓
       REST API
            ↓
      Auth Service
```

Employee Management System বলছে:

```http
POST https://auth.example.com/api/login
```

Auth Service response দিচ্ছে:

```json
{
  "access_token": "xxxxx"
}
```

আবার ধরো:

```text
Employee Management
        ↓
      API
        ↓
Payroll System
```

Employee Management Payroll API call করতে পারে:

```http
GET https://payroll.example.com/api/salary/1001
```

এখানে দুই application-এর মধ্যে communication-এর জন্য সাধারণত থাকে:

* API endpoint
* HTTP method
* Request headers
* Request body
* Authentication
* Response format
* Error handling
* Timeout/retry
* API version

Professional environment-এ এটাকে অনেক সময় **API Integration** বা **Service-to-Service Communication** বলা হয়।

### Real company example

```text
Frontend
   ↓
Backend API
   ↓
Auth Service
   ↓
Payment Service
   ↓
Notification Service
   ↓
External APIs
```

সবগুলো HTTP/REST API দিয়েই connect হতে পারে।

---

# 3. Data নেওয়া/দেওয়ার সময় Security কী কী দেখতে হয়?

এটাই সবচেয়ে important অংশ।

### ① HTTPS ব্যবহার

```text
❌ http://api.example.com
✅ https://api.example.com
```

Data encrypted অবস্থায় যাওয়া উচিত।

---

### ② Authentication

Backend যেন বুঝতে পারে:

> "এই request কে করছে?"

Common:

```text
JWT
OAuth 2.0
Session + Cookie
API Key
```

---

### ③ Authorization

Authentication মানে:

> তুমি কে?

Authorization মানে:

> তুমি এটা করতে পারবে?

Example:

```text
Admin → DELETE /users/10 ✅

Employee → DELETE /users/10 ❌
```

---

### ④ Token নিরাপদভাবে handle করা

Frontend-এ authentication token কোথায় রাখা হচ্ছে সেটা গুরুত্বপূর্ণ।

বিশেষ করে:

```text
XSS
Token theft
CSRF
```

এর বিরুদ্ধে proper strategy দরকার।

---

### ⑤ Backend validation অবশ্যই করতে হবে

Frontend validation:

```text
email required
password required
```

করলেও backend-এ আবার validation করতে হবে।

কারণ attacker frontend bypass করে সরাসরি API call করতে পারে।

```text
Frontend Validation ❌ যথেষ্ট নয়

Frontend Validation
        +
Backend Validation ✅
```

---

### ⑥ Sensitive data পাঠানো যাবে না

যেমন:

```text
password
credit card information
secret keys
private tokens
```

অপ্রয়োজনে frontend-এ পাঠানো উচিত নয়।

---

### ⑦ CORS

Frontend:

```text
https://app.example.com
```

Backend:

```text
https://api.example.com
```

এদের cross-origin request-এর জন্য backend-এ **CORS policy** configure করতে হয়।

---

### ⑧ Rate Limiting

ধরো:

```text
POST /login
```

কেউ হাজার হাজার request পাঠাচ্ছে।

তাই backend:

```text
1000 requests ❌
reasonable limit ✅
```

দিয়ে abuse control করে।

---

### ⑨ API Authorization + Role/Permission

শুধু token valid হলেই সব API access দেওয়া যাবে না।

```text
Admin
Manager
Employee
Customer
```

অনুযায়ী permission control করতে হবে।

---

## পুরো picture একসাথে

```text
                 ┌─────────────────┐
                 │    Frontend     │
                 │ Vue/React/etc.  │
                 └────────┬────────┘
                          │
                    HTTPS Request
                          │
                          ▼
                 ┌─────────────────┐
                 │   Backend API   │
                 ├─────────────────┤
                 │ Authentication  │
                 │ Authorization   │
                 │ Validation      │
                 │ Rate Limiting   │
                 │ CORS            │
                 └────────┬────────┘
                          │
                          ▼
                    ┌──────────┐
                    │ Database │
                    └──────────┘
```

আর multiple application হলে:

```text
App A
  │
  │ API
  ▼
App B
  │
  │ API
  ▼
App C
  │
  │ API
  ▼
External Service
```

**তুমি Frontend Engineer হিসেবে মূলত এই পুরো chain-এর মধ্যে `Frontend → API` অংশটা deeply বুঝবে; কিন্তু Backend API কীভাবে authentication, authorization, validation, CORS, rate limiting দিয়ে request secure করে—সেটাও বুঝতে হবে।**


---
> tumi jei 2 ta folder structure dile, sei ekoi folder structure ki react and angular er jonno

হ্যাঁ, **conceptually একই**, কিন্তু framework অনুযায়ী কিছু folder/file-এর নাম ও convention পরিবর্তন হয়।

তুমি যে architecture দেখেছো:

```text
Component
   ↓
Composable / Hook
   ↓
Store
   ↓
Service / API
   ↓
HTTP Client
   ↓
Backend
```

এটা তিন framework-এই করা যায়।

| Concept        | Vue         | React         | Angular           |
| -------------- | ----------- | ------------- | ----------------- |
| UI             | Component   | Component     | Component         |
| Reusable logic | Composable  | Custom Hook   | Service           |
| State          | Pinia       | Zustand/Redux | Signal Store/NgRx |
| API layer      | Service     | Service       | Service           |
| HTTP           | Axios/fetch | Axios/fetch   | HttpClient        |

### Vue

```text
src/
├── components/
├── composables/
├── stores/
├── services/
└── views/
```

### React

```text
src/
├── components/
├── hooks/
├── stores/
├── services/
└── pages/
```

### Angular

Angular-এ একটু আলাদা convention:

```text
src/app/
├── components/
├── services/
├── stores/
├── pages/
└── core/
```

Angular-এ আলাদা `composables` সাধারণত থাকে না, কারণ **Service + Signals** দিয়ে একই ধরনের কাজ করা হয়।

**তাই architecture একই, কিন্তু implementation/convention framework অনুযায়ী আলাদা।**

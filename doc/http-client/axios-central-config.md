# central config

- instance create then sei instance dhore method gulo dhorte hobe.
- তাই api.get() মানে Axios-এর ওই configured instance ব্যবহার করে GET request করা।

## interceptor

- Interceptor দিয়ে Axios request/response যাওয়ার আগে বা আসার পরে automatically কিছু কাজ করা হয়।
- backend theke response asar por, api.interceptors.response ei modhe diye asbe.
- request jabar age , api,interceptors.request ei moddhe diye jai. je kono kichu add korte pari.


## global Error handle

হ্যাঁ, **এই `axios.ts`-এর response interceptor-এ common/global API error handling করা যায়।** ✅

```ts
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      // unauthorized
    }

    if (error.response?.status === 500) {
      // server error
    }

    return Promise.reject(error)
  }
)
```

তাহলে:

```text
যেকোনো Component
      ↓
API call
      ↓
axios.ts
      ↓
Response Interceptor
      ↓
Common Error Handling
```

তবে **সব error এখানেই handle করতে হবে না**।

যেমন:

* `401` → global handling করা যায়
* `500` → global notification করা যায়
* `network error` → global handling করা যায়
* `422 validation error` → নির্দিষ্ট form/component-এ দেখানো ভালো

অর্থাৎ **common/global error → interceptor**, আর **specific business/UI error → component/composable layer**।









# summary

after install, axios component a import kore then use kora jai like

```ts
import axios from 'axios'
const response = await axios.get('/api/users')
console.log(response.data)
```

kintu amar user er list lagbe, so ami easily component a axios import kore then use korte pari,
jodi emon hoi 10 ta component a lagbe, tahole `axios.get()` sob component a call korte hobe.


- 10 component jeno call korte na hoi তাই Service/API Layer বানানো হয়
- Component শুধু বলবে: const response = await getUsers(), `getUsers()` কীভাবে API call করছে সেটা Component জানবে না।
- সাধারণত feature/domain অনুযায়ী API file আলাদা করা হয়। like - userApi.ts, productApi.ts


# Solution 

`api/` or `service/` name folder neya then `central config` and `feature/module` onujai kaj gulo kora.

- api or service jei name hok na keno - eita ke amra api layer boli
- vue er khetre apra `api/` folder use korbo, ekhane sob api related kaj


```text
// userApi.ts
getUsers()
getUser()
createUser()
updateUser()
deleteUser()
```

```text
// productApi.ts
getProducts()
getProduct()
createProduct()
updateProduct()
deleteProduct()
```

- ekhane dektechi api/ name a folder niyecho - eita service folder name hobe na?

হ্যাঁ, **দুটোই হতে পারে**। এখানে মূল বিষয় হলো **naming convention**।

তুমি চাইলে:

```text id="6qz2c8"
src/
├── services/
│   ├── axios.ts
│   ├── userService.ts
│   ├── productService.ts
│   └── authService.ts
```

এখানে `services/` = **API/Service Layer**।

অথবা:

```text id="knz9as"
src/
├── api/
│   ├── axios.ts
│   ├── userApi.ts
│   ├── productApi.ts
│   └── authApi.ts
```

এখানে `api/` = **API Layer**।

### তাহলে কোনটা use করবে?

আমি সাধারণত এভাবে রাখতাম: api/

কারণ এখানে files-গুলো **specifically API communication** করছে।

আর যদি Service শুধু API call না করে আরও business logic/service কাজ করে, তখন:

```text id="6wx7t4"
services/
```

নামটা বেশি appropriate।

**Short answer: `api/` এবং `services/`—দুটোই valid; project convention অনুযায়ী choose করবে।**

---

`axios.ts` = **Axios-এর central configuration**
এখানে পরে তুমি common জিনিস রাখতে পারো: baseURL, Authorization token, interceptors, error handling, timeout

# Describe Axios-এর central configuration

### প্রথমে এইটা দেখো

```text
Component
   ↓
Axios
   ↓
Backend API
```

মানে `Users.vue`-এর ভিতরেই তুমি লিখছো:

```ts
import axios from 'axios'
const response = await axios.get('/users')
```

এখন ধরো তোমার 10টা component আছে:

```text
Users.vue       → axios.get()
Profile.vue     → axios.get()
Dashboard.vue   → axios.get()
Employee.vue    → axios.post()
```

তাহলে **Axios-এর code পুরো application-এর বিভিন্ন Component-এর মধ্যে ছড়িয়ে যাচ্ছে।**

---

## তাই Service/API Layer বানানো হয়

```text
Component
   ↓
userApi.ts
   ↓
Axios
   ↓
Backend
```

Component শুধু বলবে:

```ts
const response = await getUsers()
```

আর `getUsers()` কীভাবে API call করছে সেটা Component জানবে না।

```ts
// userApi.ts

export function getUsers() {
  return axios.get('/users')
}
```

এখন:

```text
Users.vue
   │
   │ getUsers()
   ↓
userApi.ts
   │
   │ axios.get('/users')
   ↓
Backend
```

### কেন এটা ভালো?

ধরো কালকে Axios বাদ দিয়ে `fetch()` ব্যবহার করবে।

❌ Direct Axios করলে:

```text
Users.vue
Profile.vue
Dashboard.vue
Employee.vue
...
```

অনেক জায়গায় change করতে হতে পারে।

✅ Service layer থাকলে:

```text
userApi.ts
     ↓
   Axios
```

শুধু `userApi.ts`/API layer-এর implementation change করার সুযোগ থাকে।

---

### আর `axios.ts` কেন আলাদা?

```text
api/
├── axios.ts
└── userApi.ts
```

`axios.ts` = **Axios-এর central configuration**

যেমন:

```ts
const axios = Axios.create({
  baseURL: 'https://api.example.com'
})
```

এখানে পরে তুমি common জিনিস রাখতে পারো:

```text
baseURL
Authorization token
interceptors
error handling
timeout
```

আর `userApi.ts` = **User-related API**

```ts
getUsers()
getUser()
createUser()
updateUser()
deleteUser()
```

তাহলে পুরো concept:

```text
                    API Layer
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
        axios.ts             userApi.ts
      configuration        User API methods
             │                   │
             └─────────┬─────────┘
                       ↓
                    Backend
```

**সবচেয়ে important:** `Service/API Layer` বানানোর উদ্দেশ্য হলো **Component-কে API/HTTP implementation থেকে আলাদা রাখা।** এটাই মূল কথা।

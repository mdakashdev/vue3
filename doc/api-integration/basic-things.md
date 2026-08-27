# Api Integration 

## http client - axios 

axios use kore api integration korechi se jonno 

1. axios install korte hobe 
2. folder structure - src/api nite hobe
3. axios.ts central configuration banate hobe
4. module / feature onujai data get / post korte hobe
5. component / composable or others jaigai import kore use korte hobe


## TanStack

TanStack Query Axios-এর replacement না; দুটো আলাদা layer-এর tool।

Axios আর TanStack Query-এর কাজ আলাদা

অর্থাৎ:

**Axios বলে:**

> "আমি Backend-এ HTTP request পাঠাব।"

**TanStack Query বলে:**

> "এই server data-টা আমি manage করব—loading, error, cache, refetch ইত্যাদি।"


## Question 
1. dhori, fronent akta project ache, aar Bakend B er sathe communication korbe, 
   tahole amar backend api src/api/axios.ts a sob config kore dilei hoye jai, aar kichu lage na ? 

   
> হ্যাঁ, **Frontend F → Backend B** communication-এর basic setup হিসেবে `src/api/axios.ts`-এ central Axios configuration করলেই হয়। ✅

```text id="3t3x0k"
Frontend F Project
      ↓
src/api/axios.ts
      ↓
Backend B API
```

যেমন:

```ts id="v5b8v5"
const api = axios.create({
  baseURL: 'https://backend-b.com/api',
  timeout: 10000,
})
```

তারপর:

```text id="q4j4b1"
api/
├── axios.ts
├── userApi.ts
├── productApi.ts
└── authApi.ts
```

`userApi.ts`:

```ts id="q2h8mj"
import api from './axios'

export const getUsers = () => {
  return api.get('/users')
}
```

তবে একটা **important correction**:

`axios.ts`-এ সব configuration দিলেই **পুরো integration শেষ**—এটা না। `axios.ts` হলো **common HTTP configuration**।

অর্থাৎ **communication-এর infrastructure `axios.ts`-এ**, কিন্তু কোন API call করবে, কী data পাঠাবে, authentication কীভাবে হবে—এসব আলাদা API/service layer-এ থাকবে।

**তোমার ধারণাটা ঠিক: Frontend project F -এ Backend B-এর জন্য একটি central `axios.ts` instance রাখাই মূল starting point।**

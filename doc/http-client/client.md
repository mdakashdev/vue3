# HTTP/API call

Vue, Angular, React—তিনটাতেই HTTP/API call করার জন্য কয়েকটা common option আছে। তবে **framework-এর official/native option** আলাদা।

| Framework           | Main / Official HTTP Client | Popular Alternative   |
| ------------------- | --------------------------- | --------------------- |
| **Vue**             | `fetch()`                   | Axios                 |
| **Angular**         | `HttpClient`                | Axios                 |
| **React**           | `fetch()`                   | Axios                 |
| **React + Next.js** | `fetch()`                   | Axios, TanStack Query |

## 1. Vue

Vue নিজে কোনো built-in HTTP client দেয় না।

সবচেয়ে basic:

```ts
const response = await fetch('/api/users')
const data = await response.json()
```

অথবা **Axios**:

```ts
import axios from 'axios'

const response = await axios.get('/api/users')
```

সাধারণত Vue project-এ:

```text
Vue
 ├── fetch()
 └── Axios
```

---

## 2. Angular

Angular-এর নিজের **official `HttpClient`** আছে।

```ts
import { HttpClient } from '@angular/common/http'

constructor(private http: HttpClient) {}

this.http.get('/api/users')
```

Modern Angular-এ `inject()` দিয়েও:

```ts
private http = inject(HttpClient)

this.http.get('/api/users')
```

Angular শেখার সময় **HttpClient-ই আগে ভালোভাবে শেখা উচিত**।

```text
Angular
 └── HttpClient ⭐
```

---

## 3. React

React নিজে কোনো HTTP client দেয় না।

তাই Vue-এর মতো:

```ts
const response = await fetch('/api/users')
const data = await response.json()
```

অথবা:

```ts
import axios from 'axios'

const response = await axios.get('/api/users')
```

React ecosystem-এ আরেকটা গুরুত্বপূর্ণ জিনিস হলো **TanStack Query**।

এটা আসলে HTTP client না; API data fetching/caching/server-state management-এর জন্য।

```text
React
 ├── fetch()
 ├── Axios
 └── TanStack Query ⭐
```

## সহজভাবে মনে রাখো

```text
Vue
 → fetch / Axios

Angular
 → HttpClient ⭐

React
 → fetch / Axios
 → TanStack Query (server state)
```

তুমি যেহেতু এখন **Vue → Angular → React** তিনটা framework শিখছো, HTTP Integration শেখার সময় আমি এই order-টা recommend করব:

**1. Native `fetch()` → 2. Axios → 3. Angular `HttpClient` → 4. TanStack Query**

এরপর **API service layer → interceptor → authentication token → error handling → loading state → caching** এগুলো শিখলে professional-level HTTP integration বোঝা শুরু হবে।

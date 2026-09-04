# step

Step 1 — Login API


# my understanding

frontend login page theke user and password diye submit korle seita jabe backend. sekhane theke verify hoye asbe je user valid.

authentication successful hole, backend theke access token / cookie / session back dibe

then, frontend ke jante hobe - ei user authenticated and seta store kore rakte hobe 

1. login page
2. api call 
3. backend verify
4. return response - token / cookie / session
5. store authenticated (bec. frontend ke to jante hobe)
6. route protect - Send credential with API requests

common bisoy hocche - kichu page `login user` dekte pabe like - (dashboard, profile, list) aar kichu login chara pabe like - `home, about, contact`

---

# Auth

## 1. Frontend থেকে Authentication কী?

সহজভাবে:

> **Authentication = “আমি কে?” — এটা verify করা।**

ধরো তোমার application আছে:

```text
Vue Frontend
     ↓
Laravel Backend
```

User Login page-এ দিল:

```text
Email: akash@gmail.com
Password: 123456
```

Frontend এই information backend-এ পাঠাবে:

```text
POST /api/login
```

Backend check করবে:

```text
এই email আছে?
Password ঠিক আছে?
```

ঠিক হলে backend বলবে:

```text
Login successful
এটা তোমার authentication credential/token
```

তারপর frontend সেই authentication information ব্যবহার করে বুঝবে:

```text
User = logged in
```

---

## 2. Authentication কেন করি?

কারণ application-এর সব data সবার জন্য open রাখা যায় না।

ধরো তোমার application-এ:

```text
Public:
├── Home
├── About
├── Contact

Authenticated:
├── Dashboard
├── Profile
├── Orders
├── Settings
```

User login না করলে:

```text
/login
   ↓
email + password
   ↓
Laravel
   ↓
success
   ↓
authenticated
   ↓
/dashboard
```

আর login না করা অবস্থায় `/dashboard` access করতে চাইলে:

```text
/dashboard
      ↓
Are you authenticated?
      ↓
     NO
      ↓
/login
```

এটাই frontend authentication-এর একটা বড় কাজ।

---

## 3. Frontend authentication-এ কী কী লাগে?

একটা সাধারণ Vue + Laravel authentication system-এ সাধারণত এগুলো লাগে:

```text
                 Authentication
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
     Login          Logout          Register
        │
        ↓
   Authentication
    Credential
        │
        ↓
   Auth State
        │
        ↓
  Protected Routes
        │
        ↓
  Authenticated API
```

আর technical level-এ:

### ① Login API

Backend:

```text
POST /api/login
```

Frontend থেকে:

```text
email
password
```

---

### ② Authentication credential

Login successful হলে backend কোনো authentication mechanism দেয়।

Commonly:

```text
Access Token
```

অথবা Laravel Sanctum-এর মতো:

```text
Session / Cookie
```

তোমার backend কী ব্যবহার করছে তার ওপর frontend implementation depend করবে।

---

### ③ Auth State

Frontend-কে জানতে হবে:

```text
isAuthenticated = true
```

এবং user কে:

```text
user = {
    id: 1,
    name: "Akash",
    email: "akash@gmail.com"
}
```

এখানে **Pinia** খুব useful।

যেমন:

```text
Pinia Auth Store

user
token
isAuthenticated
login()
logout()
```

---

### ④ Protected Routes

ধরো:

```text
/login
/register
```

Public।

কিন্তু:

```text
/dashboard
/profile
/settings
```

Protected।

Vue Router তখন check করবে:

```text
User authenticated?
       ↓
   YES → Dashboard
   NO  → Login
```

এটাকে সাধারণত **Route Guard** দিয়ে করা হয়।

---

### ⑤ Authenticated API Request

Login করার পরে user যদি profile চায়:

```text
GET /api/me
```

তখন backend-কে prove করতে হবে:

> “আমি authenticated user।”

Token-based authentication হলে request-এর সাথে token যায়:

```text
Authorization: Bearer <token>
```

তারপর Laravel token verify করে।

---

### ⑥ Logout

User logout করলে:

```text
Logout button
     ↓
POST /api/logout
     ↓
credential/token invalidate
     ↓
Pinia auth state clear
     ↓
/login
```

---

# 5. পুরো flow একবার দেখো

তোমার Vue + Laravel project-এ একটা typical flow:

```text
             Vue Frontend
                  │
                  │
             Login Page
                  │
                  ↓
        email + password
                  │
                  ↓
          POST /api/login
                  │
                  ↓
          Laravel Backend
                  │
             Validate User
                  │
          ┌───────┴───────┐
          │               │
        Failed          Success
          │               │
          ↓               ↓
     Error Message    Token/Cookie
                          │
                          ↓
                    Pinia Auth Store
                          │
                          ↓
                   isAuthenticated
                       = true
                          │
                          ↓
                     Dashboard
```

তারপর:

```text
Dashboard
    │
    ↓
GET /api/me
    │
    ↓
Laravel
    │
    ↓
Authenticated User
    │
    ↓
User data
```

---

## 6. তাহলে Frontend-এর আসল দায়িত্ব কী?

একটা খুব important বিষয়:

**Frontend নিজে authentication করে না।**

Frontend মূলত authentication flow manage করে।

Backend আসল verification করে।

```text
Vue
 │
 ├── Login form
 ├── Send credentials
 ├── Store authentication state
 ├── Protect routes
 ├── Send credential with API requests
 └── Logout

Laravel
 │
 ├── Validate credentials
 ├── Verify password
 ├── Issue/validate token or session
 ├── Identify user
 └── Protect API
```

অর্থাৎ:

> **Frontend বলে “user authenticated কি না এবং UI কী দেখাবে”; Backend নিশ্চিত করে “user আসলেই authenticated কি না।”**

এটা খুব important distinction।

---

## 7. তোমার জন্য Authentication শেখার roadmap

তুমি যেহেতু এখন Vue 3 + TypeScript + Pinia + Axios শিখছো, আমি এই order-এ শেখার recommend করব:

```text
1. Login API
       ↓
2. Axios
       ↓
3. Auth API Service
       ↓
4. Pinia Auth Store
       ↓
5. Login.vue
       ↓
6. Token/Cookie handling
       ↓
7. /me API
       ↓
8. Vue Router Guard
       ↓
9. Logout
       ↓
10. Persistent Login
```

এরপর:

```text
Forgot Password
Email Verification
Refresh Token
Role / Permission
Authorization
```

**তাই এখনই code শুরু না করে এই mental modelটা মাথায় রাখো:**

```text
Login
  ↓
Backend verifies
  ↓
Credential
  ↓
Frontend stores/manages auth state
  ↓
Router protects pages
  ↓
API requests carry authentication
  ↓
Logout clears authentication
```

এরপর চাইলে আমরা **Step 1: `POST /login` → Vue থেকে Laravel-এ login request** একদম beginner-friendlyভাবে শুরু করতে পারি।

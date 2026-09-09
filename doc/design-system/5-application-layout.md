# Layout

এখানে মূলত ৩টা জিনিস থাকবে: 1. sidebar, 2. header / Top bar, 3. main content

```text
AppLayout
├── Sidebar
├── Header / Top bar
└── Main Content
      └── RouterView
```

- amader lagbe `layout structure`, component & layout gulo kothai hobe tar. like 

```text
src/
├── layouts/
│   └── AppLayout.vue
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.vue
│   │   └── Header.vue

```


1. structure banate hobe 
2. skeleton banbo 
3. 


## layout-এর structural skeleton

হ্যাঁ — **কিন্তু এখনো আমরা পুরো visual design follow করছি না।** এটা খুব important distinction।

আমরা যে code বসিয়েছি:

```vue
<template>
  <div class="min-h-screen">
    <!-- Sidebar - পরে আসবে -->

    <main>
      <RouterView />
    </main>
  </div>
</template>
```

এটা মূলত **layout-এর structural skeleton**।

আমরা যে design follow করছি সেটা হলো:

```text
Figma Design
     ↓
┌──────────────────────────────────┐
│             Header               │
├──────────┬───────────────────────┤
│ Sidebar  │                       │
│          │    Main Content       │
│          │                       │
│          │    RouterView         │
│          │                       │
└──────────┴───────────────────────┘
```

### তাই আমরা ২টা layer-এ কাজ করছি

**১. Structure — এখন করছি**

```text
AppLayout
├── Sidebar
├── Header
└── Main Content
      └── RouterView
```

**২. Visual Design — পরের ধাপে**

Figma-এর মতো:

* Sidebar width
* Header height
* background
* border
* spacing
* typography
* logo
* navigation items
* active state
* user profile
* responsive behavior

এগুলো আমরা **তোমার Design Tokens + Tailwind + shadcn** দিয়ে implement করব।

---

### আর একটা important ব্যাপার

আমরা কিন্তু **random একটা layout বানাচ্ছি না**।

আমাদের আগে যে admin dashboard design/practice layout ঠিক করেছিলাম, সেটার concept follow করেই এগোচ্ছি:

```text
Design
  ↓
Layout structure
  ↓
Components
  ↓
Styling
  ↓
Responsive
```

অর্থাৎ এখনকার:

```vue
<RouterView />
```

এটা Figma-এর কোনো visual element না।

এটা হলো **Vue application architecture-এর অংশ**, যার জায়গায় পরে Figma design-এর actual page content render হবে।

### এখন পরের কাজ

এখন আমরা **Figma design অনুযায়ী Sidebar-এর actual structure + sizing + spacing** তৈরি করব।

মানে আর শুধু skeleton না:

```text
Sidebar
├── Logo
├── Dashboard
├── Users
├── Settings
└── Logout
```

এবং এখানেই আমরা প্রথমবার তোমার **Design Tokens বাস্তবে Layout-এর মধ্যে ব্যবহার** করব।

---


## Draft 

then amra design dekhe suru korbo.

এটা মূলত layout-এর structural skeleton।


---

## Layout বলতে আমরা কী বানাব?

তোমার admin application-এর জন্য একটা **App Shell**:

```text
┌──────────────────────────────────────────────┐
│                  Topbar                      │
├───────────────┬──────────────────────────────┤
│               │                              │
│   Sidebar     │         Main Content         │
│               │                              │
│   Dashboard   │                              │
│   Users       │         <RouterView />       │
│   Settings    │                              │
│               │                              │
└───────────────┴──────────────────────────────┘
```

## আমরা সরাসরি বড় layout বানাব না

Step-by-step করব:

**Step 1:** `AppLayout.vue` তৈরি
**Step 2:** Sidebar
**Step 3:** Header
**Step 4:** `RouterView` বসানো
**Step 5:** Sidebar/Header-এর design tokens + shadcn ব্যবহার
**Step 6:** Responsive/mobile behavior
**Step 7:** কোন page-এ layout থাকবে, কোন page-এ থাকবে না — যেমন Login

শেষে structure হবে:

```text
src/
├── layouts/
│   └── AppLayout.vue
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.vue
│   │   └── Header.vue
│   │
│   └── ui/
│       └── button/
│
└── views/
    ├── Dashboard.vue
    ├── Users.vue
    └── auth/
        └── Login.vue
```

**একটা গুরুত্বপূর্ণ architectural point:** `Login` page-এ সাধারণত `AppLayout` থাকবে না; Dashboard/Users-এর মতো authenticated pages-এ থাকবে।

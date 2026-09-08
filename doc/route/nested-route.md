# Concept nested routes

## Draft

অর্থাৎ `RouterView` হলো **placeholder**, যেখানে child route-এর component বসবে।

“আমাদের admin pages-এর parent layout হচ্ছে AppLayout.vue।” ✅

so, amra admin page er jonno sobkichu kortechi.

amader need - 


```text
/           → AppLayout + Dashboard
/users      → AppLayout + Users
/settings   → AppLayout + Settings
```

---


```ts
{
  path: '/',
  component: AppLayout,
  children: [
    {
      path: '',
      component: HomeView
    }
  ]
}
```

## 1. প্রথমে `path: '/'`

```ts
path: '/'
```

এর মানে:

> Browser URL যদি `/` হয়, তাহলে এই route match করবে।

অর্থাৎ:

```text
http://localhost:5173/
```

---

## 2. `component: AppLayout`

```ts
component: AppLayout
```

এর মানে:

> `/` URL এ গেলে **AppLayout component-কে render করো।**

তোমার `AppLayout.vue`:

```vue
<template>
  <div class="min-h-screen">
    <Sidebar />

    <main>
      <RouterView />
    </main>
  </div>
</template>
```

তাই প্রথমে Vue এটা render করবে:

```text
AppLayout
├── Sidebar
└── main
    └── RouterView
```

---

## 3. তাহলে `children` কেন?

এটাই মূল বিষয়।

```ts
children: [
```

এর মানে:

> `AppLayout`-এর ভিতরে আরও route থাকবে।

অর্থাৎ `AppLayout` হচ্ছে **parent route**।

আর `children` হচ্ছে তার **child routes**।

Visualize করলে:

```text
/
└── AppLayout
    └── children
```

---

## 4. এবার child-এর `path: ''`

```ts
children: [
  {
    path: '',
    component: HomeView
  }
]
```

এখানে `path: ''` মানে:

> Parent-এর path `/` এর পর আর কোনো additional path নেই।

তাই:

```text
parent path = /
child path  = ''
```

দুটো মিলে:

```text
/
```

অর্থাৎ browser-এ:

```text
http://localhost:5173/
```

---

## 5. `HomeView` কোথায় render হবে?

এখানে সবচেয়ে important অংশ:

তোমার `AppLayout.vue`-তে আছে:

```vue
<RouterView />
```

এই `RouterView` হচ্ছে **child route-এর জায়গা**।

তাই পুরো flow:

```text
Browser
   │
   │  /
   ↓
Router
   │
   ↓
AppLayout
   │
   ├── Sidebar
   │
   └── <main>
          │
          ↓
       <RouterView />
          │
          ↓
       HomeView
```

তাই browser-এ তুমি দেখতে পাবে:

```text
┌───────────────────────────────┐
│                               │
│ Sidebar                       │
│                               │
│ Dashboard    HomeView         │
│ Users                         │
│ Settings                      │
│                               │
└───────────────────────────────┘
```

### একটা খুব important distinction

`AppLayout` নিজে **HomeView না**।

বরং:

```text
AppLayout
    ↓
  RouterView
    ↓
  HomeView
```

অর্থাৎ `RouterView` হলো **placeholder**, যেখানে child route-এর component বসবে।

এই conceptটা বুঝে গেলে পরের দিকে:

```ts
children: [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'users',
    component: Users
  },
  {
    path: 'settings',
    component: Settings
  }
]
```

করলে automatically:

```text
/           → AppLayout + Dashboard
/users      → AppLayout + Users
/settings   → AppLayout + Settings
```

হবে।

**এইটাই Admin Layout-এর মূল routing pattern।**

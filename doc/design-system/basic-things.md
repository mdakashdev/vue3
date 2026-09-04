# Design System 

## my understanding

Tools
- tailwind, login page and layout structure.
- token
- theme

akta sketch / figma example niye sob gulo dhap korbe.

Goal হলো consistency

- sketch pabar por, 
- First, `design language` ber korbo like -` Colors` (Primary, Secondary), (Primary #2563EB; Background #FFFFFF -> ei gulor design token hote pare)
- Second, `Typography` ber korbe (Font Family, Heading, Body) (H1: 32px / 700, Body: 16px / 400)
- Third, `Spacing` system বুঝবে - ধরো Figma-তে বারবার দেখলে: 4px, 8px, 12px, 16px, etc তাহলে বুঝবে design একটা spacing system follow করছে।
- 
- Fourth, `theme create` korbe - Professional project-এ সাধারণত design values centralized রাখার চেষ্টা করা হয়।
- Fifth, Base UI Components like - button, input, select, etc ei gulo business logic lage na, eigulo small reusable UI components.
    `jante hobe` - ei khetre ki sob project a ei gulo banai naki, kono framework use kore or onno kichu !!!
- Six, application-specific components
- Layout : application-এর structure।
- Pages
- Raw CSS কোথায় - component a

## Phase 1 — Figma Analysis
## Phase 2 — Design System
## Phase 3 — Global Setup
## Phase 4 — UI Components
## Phase 5 — Layout
## Phase 6 — Pages
## Phase 7 — Behavior





## professional project

Vue + Tailwind project-এ,

Flow:
 
Figma/Sketch
↓
Design System -> understanding DS like - color / typography / spacing / radius
↓
create Theme/Tokens → Layout -> Global CSS + Tailwind Configuration
↓
Components (Base UI & Business) -> Layout
↓
Pages


## 1. প্রথমে Figma / Sketch দেখে কী করব?

ধরো Figma-তে তুমি একটা Dashboard পেয়েছো।

সরাসরি:

> "আচ্ছা, আগে Dashboard.vue বানাই"

এভাবে শুরু না করাই ভালো।

আগে Figma থেকে **design language** বের করবে।

যেমন:

### Colors

```text
Primary
Secondary
Background
Foreground
Muted
Border
Error
Success
Warning
```

ধরো Figma-তে:

```text
Primary     #2563EB
Background  #FFFFFF
Foreground  #111827
Muted       #6B7280
Border      #E5E7EB
Success     #16A34A
Error       #DC2626
```

এগুলোই তোমার **design tokens** হতে পারে।

---

## 2. Typography বের করবে

Figma থেকে দেখবে:

```text
Font Family
Heading
Body
Small text
Button text
Label
```

যেমন:

```text
Font: Inter

H1: 32px / 700
H2: 24px / 600
H3: 20px / 600

Body: 16px / 400
Small: 14px / 400
```

তারপর project-এর global typography সেট করবে।

---

## 3. Spacing system বুঝবে

এটা খুব গুরুত্বপূর্ণ।

ধরো Figma-তে বারবার দেখলে:

```text
4px
8px
12px
16px
24px
32px
48px
64px
```

তাহলে বুঝবে design একটা spacing system follow করছে।

তুমি component-এ random:

```html
<div class="mt-[17px] px-[23px]">
```

এভাবে লিখবে না।

বরং:

```html
<div class="mt-4 px-6">
```

অথবা design token ব্যবহার করবে।

**Goal হলো consistency।**

---

## 4. তারপর Theme তৈরি করবে

এখানেই তোমার প্রশ্নের মূল উত্তর।

তুমি বলেছো:

> token থেকে variable use করি?

**হ্যাঁ। Exactly.**

Professional project-এ সাধারণত design values centralized রাখার চেষ্টা করা হয়।

যেমন:

```css
:root {
  --color-primary: #2563eb;
  --color-background: #ffffff;
  --color-foreground: #111827;
  --color-muted: #6b7280;
  --color-border: #e5e7eb;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

তারপর Tailwind-এর মাধ্যমে এগুলো ব্যবহার করতে পারো।

---

## 5. তারপর Base UI Components

এখন component বানানোর সময়।

প্রথমে **small reusable UI components**।

যেমন:

```text
components/
│
├── ui/
│   ├── Button.vue
│   ├── Input.vue
│   ├── Select.vue
│   ├── Checkbox.vue
│   ├── Modal.vue
│   ├── Card.vue
│   ├── Badge.vue
│   └── Spinner.vue
```

এগুলো business logic জানবে না।

যেমন:

```vue
<Button>
  Login
</Button>
```

অথবা:

```vue
<Input
  v-model="email"
  placeholder="Enter email"
/>
```

---

## 6. তারপর Business Components

এরপর application-specific components।

ধরো তুমি HRMS বানাচ্ছো।

তাহলে:

```text
components/
│
├── ui/
│   ├── Button.vue
│   ├── Input.vue
│   └── Modal.vue
│
├── users/
│   ├── UserCard.vue
│   ├── UserTable.vue
│   └── UserForm.vue
│
├── employees/
│   ├── EmployeeCard.vue
│   └── EmployeeTable.vue
```

এগুলো UI components-এর উপর build হবে।

---

## 7. তারপর Layout

এরপর application-এর structure।

যেমন:

```text
layouts/
│
├── DefaultLayout.vue
├── AuthLayout.vue
└── DashboardLayout.vue
```

Dashboard:

```text
┌─────────────────────────────────────┐
│ Header                              │
├──────────┬──────────────────────────┤
│ Sidebar  │                          │
│          │       Page Content       │
│          │                          │
└──────────┴──────────────────────────┘
```

এটা `DashboardLayout.vue` handle করবে।

---

## 8. তারপর Pages

এখন actual page তৈরি করবে।

```text
views/
│
├── auth/
│   └── Login.vue
│
├── dashboard/
│   └── Dashboard.vue
│
└── users/
    ├── UserList.vue
    ├── UserCreate.vue
    └── UserEdit.vue
```

`UserList.vue` নিজে সব UI তৈরি করবে না।

বরং:

```vue
<UserTable />

<Button>
  Add User
</Button>
```

---

## 9. তাহলে Raw CSS কোথায়?

এখানে একটা important distinction আছে।

**প্রতিটা component-এর জন্য raw CSS লিখে যাওয়া professional default approach না**, বিশেষ করে Tailwind ব্যবহার করলে।

যেমন এটা avoid করা ভালো:

```vue
<style scoped>

.user-card {
  padding: 20px;
  border-radius: 10px;
  background: white;
}

.user-card-title {
  font-size: 20px;
}

</style>
```

এর পরিবর্তে:

```vue
<div class="rounded-lg bg-background p-5">
```

Tailwind utility ব্যবহার করবে।

তবে raw CSS নিষিদ্ধ না।

Global/custom CSS দরকার হলে:

```css
@layer base {
  body {
    font-family: var(--font-sans);
  }
}
```

অথবা complex custom component/style হলে CSS ব্যবহার করা যায়।

---

## 10. আমি Vue + Tailwind project করলে structure এমন রাখতাম

একটা medium/large project-এর জন্য:

```text
src/
│
├── assets/
│
├── components/
│   ├── ui/
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   ├── Card.vue
│   │   ├── Modal.vue
│   │   └── Badge.vue
│   │
│   ├── users/
│   │   ├── UserTable.vue
│   │   └── UserForm.vue
│   │
│   └── shared/
│       ├── AppHeader.vue
│       ├── AppSidebar.vue
│       └── EmptyState.vue
│
├── layouts/
│   ├── AuthLayout.vue
│   └── DashboardLayout.vue
│
├── views/
│   ├── auth/
│   │   └── Login.vue
│   │
│   ├── dashboard/
│   │   └── Dashboard.vue
│   │
│   └── users/
│       ├── UserList.vue
│       └── UserCreate.vue
│
├── composables/
│
├── services/
│
├── stores/
│
├── router/
│
├── types/
│
├── lib/
│
├── styles/
│   ├── tokens.css
│   └── main.css
│
└── App.vue
```

---

## 12. সবচেয়ে practical workflow

তুমি যখন real project পাবে এবং Figma দেবে, আমি তোমাকে এই sequence follow করতে বলব:

## Phase 1 — Figma Analysis

```text
1. Colors
2. Typography
3. Spacing
4. Border radius
5. Shadows
6. Icons
7. Breakpoints
8. Components
9. States
```

---

## Phase 2 — Design System

```text
tokens
  ↓
colors
typography
spacing
radius
shadows
```

---

## Phase 3 — Global Setup

```text
Tailwind
+
CSS variables
+
Fonts
+
Base styles
```

---

## Phase 4 — UI Components

```text
Button
Input
Select
Card
Modal
Table
Badge
Dropdown
```

---

## Phase 5 — Layout

```text
AuthLayout
DashboardLayout
Header
Sidebar
Footer
```

---

## Phase 6 — Pages

```text
Login
Dashboard
Users
Profile
Settings
```

---

## Phase 7 — Behavior

তারপর:

```text
API
State
Form validation
Loading
Error
Empty state
Success
Responsive
Authentication
Permissions
```

---

## সবচেয়ে important কথা

তুমি **Figma → component copy** করবে না।

বরং:

```text
Figma
 ↓
Design System বুঝি
 ↓
Tokens তৈরি করি
 ↓
Reusable UI তৈরি করি
 ↓
Application components তৈরি করি
 ↓
Layout তৈরি করি
 ↓
Pages তৈরি করি
 ↓
Business logic/API যুক্ত করি
```

এটাই আমি তোমাকে **professional frontend workflow** হিসেবে শেখার পরামর্শ দেব।
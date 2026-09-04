# Step 4 - Base Components / Small reusable UI components

1. Folder তৈরি করো
2. Button create
3. use Component in anywhere app
4. use button variant 

---


আমরা আগে **৩টা reusable component** বানাবো:

```text
components/ui/
├── Button.vue
├── Input.vue
└── Card.vue
```

প্রথমে শুধু **`Button.vue`** বানাবো।

এখানে তুমি শিখবে:

* `props`
* `variants`
* Tailwind theme ব্যবহার
* reusable component
* Figma button → Vue component conversion

**পরের step: `Button.vue`** — একদম step-by-step করব।


চলো শুরু করি। **Step 4 — Base Components → প্রথমে `Button.vue`**।

আমরা একবারে সব কিছু করব না। আগে basic reusable button বানাবো, তারপর `variant` যোগ করব।


## 1. Folder তৈরি করো

```text
src/
└── components/
    └── ui/
        └── Button.vue
```

## 2. প্রথম version

`Button.vue`:

```vue
<script setup lang="ts">
</script>

<template>
  <button
    class="bg-primary text-white rounded-md px-4 py-2"
  >
    <slot />
  </button>
</template>
```

এখানে তিনটা জিনিস লক্ষ্য করো:

```html
bg-primary
```

→ আমাদের **Theme-এর primary color**

```html
rounded-md
```

→ আমাদের **Theme-এর radius**

```html
px-4 py-2
```

→ Tailwind-এর **spacing scale**

অর্থাৎ আমরা ইতিমধ্যে আমাদের design system + Tailwind একসাথে ব্যবহার করছি।

---

## 3. এখন App-এ ব্যবহার করি

```vue
<script setup lang="ts">
import Button from './components/ui/Button.vue'
</script>

<template>
  <Button>
    Save
  </Button>
</template>
```

Browser-এ:

```text
┌─────────────────┐
│      Save       │
└─────────────────┘
```

দেখাবে।

## এখানে `<slot />` কেন?

কারণ Button component-টা যেন শুধু `Save`-এর জন্য fixed না হয়।

```vue
<Button>Save</Button>

<Button>Login</Button>

<Button>Submit</Button>

<Button>Create User</Button>
```

সবগুলো একই reusable component।

---

## কিন্তু এখন একটা সমস্যা আছে

আমাদের Figma design-এ শুধু একটা button থাকবে না। থাকবে:

```text
Primary
Secondary
Danger
```

এখন যদি আমরা এভাবে আলাদা component বানাই:

```text
PrimaryButton.vue
SecondaryButton.vue
DangerButton.vue
```

তাহলে reusable design system সুন্দর হবে না।

তার বদলে **একটা `Button.vue` + `variant` prop** করব:

```vue
<Button variant="primary">
  Save
</Button>

<Button variant="secondary">
  Cancel
</Button>

<Button variant="danger">
  Delete
</Button>
```

**এটাই আমাদের পরের ছোট step।**

এখন তুমি উপরের basic `Button.vue` বানিয়ে browser-এ `Save` button দেখো। তারপর আমরা `variant` implement করব।


# variant
চলো `variant` যোগ করি। লক্ষ্য হবে **একটা `Button.vue` থেকেই Primary / Secondary / Danger control করা**।

## 1. `Button.vue`

```vue
<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface Props {
  variant?: ButtonVariant
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>

<template>
  <button
    class="rounded-md px-4 py-2 text-white"
    :class="{
      'bg-primary': variant === 'primary',
      'bg-secondary': variant === 'secondary',
      'bg-danger': variant === 'danger',
    }"
  >
    <slot />
  </button>
</template>
```

## 2. এখন ব্যবহার

```vue
<Button variant="primary">
  Save
</Button>

<Button variant="secondary">
  Cancel
</Button>

<Button variant="danger">
  Delete
</Button>
```

এখানে গুরুত্বপূর্ণ বিষয়:

```text
variant="primary"
       ↓
variant === 'primary'
       ↓
bg-primary
       ↓
Theme-এর --color-primary
       ↓
#2563EB
```

একইভাবে:

```text
variant="danger"
       ↓
bg-danger
       ↓
Theme-এর --color-danger
```

## 3. কেন `type ButtonVariant` করলাম?

এইটা:

```ts
type ButtonVariant = 'primary' | 'secondary' | 'danger'
```

মানে Button-এর `variant` **শুধু এই ৩টা value নিতে পারবে**।

তাই এটা valid:

```vue
<Button variant="primary" />
<Button variant="danger" />
```

কিন্তু এটা ভুল:

```vue
<Button variant="hello" />
```

TypeScript তোমাকে error দেখাবে।

---

## একটা important observation

আমরা এখন **design decision component-এর ভিতরে hardcode করছি**:

```ts
'bg-primary'
'bg-secondary'
'bg-danger'
```

এটা ঠিক আছে। কারণ:

```text
Theme
  ↓
colors define করে

Button
  ↓
কোন variant-এ কোন color ব্যবহার হবে সেটা define করে
```

অর্থাৎ **Theme বলে "কোন color আছে", আর Component বলে "কোথায়/কীভাবে সেটা ব্যবহার হবে"।**

পরের step-এ আমরা Button-এর **hover, disabled, loading এবং size (`sm | md | lg`)** যোগ করব।



# Question 

> sob project a ki ei base / small reusable ui component gulo banai naki, kono framework or onno kono way theke use kore?

1. নিজেরা Base UI Component বানায়
2. UI Component Library ব্যবহার করে
3. সবচেয়ে common বাস্তব approach: **Library + নিজের components**

হ্যাঁ, সব project-এ team নিজে সব ছোট UI component from scratch বানায় না।

সাধারণত ৩টা approach দেখা যায়।

### 1. নিজেরা Base UI Component বানায়

যেমন আমরা করছি:

```text
components/ui/
├── Button.vue
├── Input.vue
├── Card.vue
├── Modal.vue
├── Badge.vue
└── Select.vue
```

এটা বেশি common যখন:

* কোম্পানির নিজস্ব design system আছে
* Figma design খুব custom
* একই component অনেক জায়গায় reuse হবে
* UI-এর উপর team-এর বেশি control দরকার

---

### 2. UI Component Library ব্যবহার করে

অনেক project সরাসরি existing library ব্যবহার করে।

Vue ecosystem-এ যেমন:

* shadcn-vue
* Vuetify
* PrimeVue
* Element Plus

তখন তুমি নিজে সব কিছু zero থেকে বানাবে না।

যেমন library থেকে Button পেয়ে গেলে:

```vue
<Button>
  Save
</Button>
```

---

### 3. সবচেয়ে common বাস্তব approach: **Library + নিজের components**

এটাই খুব practical approach।

ধরো তুমি **shadcn-vue** ব্যবহার করছো।

তাহলে basic:

```text
Button
Input
Dialog
Dropdown
Select
```

library থেকে নিতে পারো।

> কিন্তু business-specific component নিজে বানাবে:

```text
UserTable
UserForm
UserProfile
DashboardCard
OrderStatus
```

Structure হতে পারে:

```text
components/
├── ui/
│   ├── Button.vue       ← reusable UI
│   ├── Input.vue
│   ├── Dialog.vue
│   └── Select.vue
│
├── users/
│   ├── UserTable.vue    ← business component
│   ├── UserForm.vue
│   └── UserCard.vue
│
└── dashboard/
    └── StatsCard.vue
```
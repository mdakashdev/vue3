# shadcn-vue

after install we get 

lib/utils.ts
components.json


when install shadcn-vue, with installation

@lucide/vue
class-variance-authority
clsx
tailwind-merge
tw-animate-css

eigulo install hoi.



## install
```bash
pnpm dlx shadcn-vue@latest init
```

### কেন `pnpm dlx`?

`pnpm dlx` হলো মোটামুটি `npx`-এর equivalent।

```text
npm  → npx shadcn-vue@latest init
pnpm → pnpm dlx shadcn-vue@latest init
```

তাই তোমার ক্ষেত্রে:

```bash
cd your-project
pnpm dlx shadcn-vue@latest init
```

## Question 

? Which component library would you like to use? › - Use arrow-keys. Return to submit.
❯   Reka UI - Optimized for fast development, easy maintenance, and accessibility.
---

এখানে **`Reka UI` select করো** এবং `Enter` দাও। ✅

কারণ shadcn-vue এখন underlying accessible component primitives হিসেবে **Reka UI** ব্যবহার করে।

তোমার জন্য গুরুত্বপূর্ণ হলো:

```text
shadcn-vue
   ↓
Reka UI
   ↓
Button / Dialog / Select / ...
   ↓
তোমার project-এর component code
```

এটা **তোমার নিজের `Button.vue` replace করছে না**। `init` শুধু project-এ shadcn-এর setup তৈরি করবে।

👉 এখন **Enter চাপো**। পরের prompt যেটা আসবে সেটা আমাকে দাও।

---

? Which icon library would you like to use? › - Use arrow-keys. Return to submit.
❯   Lucide
Tabler Icons
HugeIcons
Phosphor Icons
Remix Icon

এখানে **`Lucide` select করো** → `Enter`। ✅

কারণ Lucide:

* clean এবং modern
* dashboard/admin UI-তে খুব common
* shadcn ecosystem-এর সাথে ভালোভাবে fit করে
* icon naming সহজ, যেমন `User`, `Search`, `Settings`, `Trash2`

আমাদের practice design-এর জন্যও এটা ভালো fit করবে।

```text
Icon Library
    ↓
Lucide
    ↓
Button / Input / Sidebar / Table
    ↓
consistent icons
```

👉 **Lucide → Enter**

এরপর যে prompt আসবে সেটা দাও।

---

? Which font would you like to use? › - Use arrow-keys. Return to submit.
❯   Inter
Geist
Noto Sans
Nunito Sans
Figtree
Roboto
Raleway
DM Sans
Public Sans
↓ Outfit

এখানে Inter select করো → Enter। ✅

---

? Which color would you like to use as the base color? › - Use arrow-keys. Return to submit.
❯   Neutral
Stone
Zinc
Mauve
Olive
Mist
Taupe

এখানে **`Neutral` select করো** → `Enter`। ✅

কারণ আমাদের practice design-এ আমরা আগে যে neutral color scale নিয়েছিলাম সেটা:

```text
neutral-50
neutral-100
neutral-200
...
neutral-900
```

তাই `Neutral` আমাদের design-এর সাথে সবচেয়ে natural match করবে।

তবে একটা গুরুত্বপূর্ণ বিষয়:

**এটা আমাদের `primary` color-এর replacement না।**

```text
Base color = Neutral
       ↓
shadcn-এর default UI/base styling-এর foundation

Primary = #2563EB
       ↓
আমাদের application-এর brand color
```

অর্থাৎ পরে আমরা চাইলে:

```css
--color-primary: #2563eb;
```

আমাদের existing primary color ব্যবহার করতেই পারব।

👉 **Neutral → Enter**

এরপর যে prompt আসবে সেটা পাঠাও।



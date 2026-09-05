# concept

- এটা project-এ shadcn-এর foundation/setup তৈরি করে। `pnpm dlx shadcn-vue@latest init`
- যে component দরকার, সেটা add করবে - `pnpm dlx shadcn-vue@latest add button` sahte reka-ui install hoi

    এটাই shadcn-এর একটা গুরুত্বপূর্ণ concept।

    ধরো তোমার project-এ শুধু: Button, Input, Card লাগবে। তাহলে shadcn পুরো ৫০টা component project-এ ঢুকিয়ে দেবে না। তুমি যেগুলো দরকার শুধু সেগুলো নেবে |


**Component-এর source code তোমার project-এ চলে আসে।**

তাই পরে তুমি চাইলে `Button.vue` নিজের design অনুযায়ী modify করতে পারবে।

---

হ্যাঁ, **ঠিক তাই।** shadcn-vue প্রথমে install/init করার পর **প্রতিটা component আলাদাভাবে add করতে হয়।**

## Flow টা এমন:

**1. প্রথমে shadcn setup**

```bash
pnpm dlx shadcn-vue@latest init
```

এটা project-এ shadcn-এর foundation/setup তৈরি করে।

তারপর:

**2. যে component দরকার, সেটা add করবে**

Button দরকার:

```bash
pnpm dlx shadcn-vue@latest add button
```

Input দরকার:

```bash
pnpm dlx shadcn-vue@latest add input
```

Card দরকার:

```bash
pnpm dlx shadcn-vue@latest add card
```

Dialog দরকার:

```bash
pnpm dlx shadcn-vue@latest add dialog
```

---

### কেন আলাদা আলাদা?

এটাই shadcn-এর একটা গুরুত্বপূর্ণ concept।

ধরো তোমার project-এ শুধু:

```text
Button
Input
Card
```

লাগবে।

তাহলে shadcn পুরো ৫০টা component project-এ ঢুকিয়ে দেবে না।

তুমি যেগুলো দরকার শুধু সেগুলো নেবে:

```text
shadcn init
     ↓
project setup

add button
     ↓
Button.vue

add input
     ↓
Input.vue

add card
     ↓
Card.vue
```

এবং সবচেয়ে গুরুত্বপূর্ণ:

**Component-এর source code তোমার project-এ চলে আসে।**

তাই পরে তুমি চাইলে `Button.vue` নিজের design অনুযায়ী modify করতে পারবে।

এ কারণেই shadcn-কে traditional `"npm install করে component import"` library-এর মতো ভাবলে পুরো picture টা পাওয়া যায় না।

# shadcn-vue

after install we get 

lib/utils.ts
    এখানে সাধারণত cn() utility থাকবে:
components.json  --> এটা shadcn-এর configuration file।
  এখানে shadcn জানে: components কোথায় রাখবে?, utils কোথায়? styles কোথায়? alias কী?
  অর্থাৎ এটা shadcn CLI-এর configuration।
src/styles/main.css
    এটা সবচেয়ে interesting, কারণ আমাদের আগের Theme setup-এর সাথে এখন shadcn-এর setup এসেছে।
    এখন এখানে shadcn-এর generated CSS/theme variables থাকবে।
    তাই এখনই নিজের আগের main.css overwrite/delete কোরো না।

when install shadcn-vue, with installation

@lucide/vue --> Icon library।
class-variance-authority --> এটা আমাদের Button-এর মতো component-এর variant/size management সহজ করে। shadcn সাধারণত এই ধরনের logic-কে cva() দিয়ে organize করে।
clsx --> Conditional class name তৈরি করার utility। disabled = true হলে opacity-50 যোগ হবে।
tailwind-merge --> Tailwind class conflict intelligently merge করে। শেষে conflicting px class-এর মধ্যে appropriate one রাখা যায়।
tw-animate-css  --> Tailwind-এর সাথে animation/transition utilities-এর জন্য।

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





## add button component 

# Design compatible 

1. Target hocche shadcn Button-কে এমনভাবে customize করব যেন, amar **primary theme** ব্যবহার করে।


## Step 1: Design Token → shadcn Theme Mapping

```
Figma Design
↓
Your Theme / Tokens
↓
shadcn Button
↓
Your project's Button design
```

* সহজভাবে

অর্থাৎ **component architecture shadcn-এর**, কিন্তু **visual design/theme তোমার Design System-এর**।

এটাই আমরা চাচ্ছি।

আর একটা গুরুত্বপূর্ণ কথা: **shadcn-এর component code ব্যবহার করছি মানেই shadcn-এর design রাখতে হবে—এমন না।** shadcn-এর মূল সুবিধাই হলো component source code তোমার project-এর মধ্যে থাকে, তাই theme/design নিজের মতো control করতে পারো।

tar mane, shadcn er design token value ba design na use kore, amar token / design use korar jonnoo mapping ta kore dilam

shadcn = component implementation
তোমার tokens = visual design

## Problem: name collision

Both your @theme and shadcn's @theme inline were defining --color-primary and --color-secondary. The last one in the file always wins.

## Solution: namespaced brand- colors

src/styles/main.css — your @theme block:

 ```css                                                                                                                                          
   @theme {                                                                                                                                      
     /* your tokens → separate namespace, no collision */                                                                                        
     --color-brand-primary:   var(--ds-primary);    /* #2563eb */                                                                                
     --color-brand-secondary: var(--ds-secondary);  /* #64748b */                                                                                
     --color-brand-danger:    var(--ds-danger);      /* #dc2626 */                                                                               
   }                                                                                                                                             
 ```                                                                                                                                             

shadcn's @theme inline block — untouched:

 ```css                                                                                                                                          
   @theme inline {                                                                                                                               
     --color-primary:   var(--primary);   /* shadcn black — for shadcn Button */                                                                 
     --color-secondary: var(--secondary); /* shadcn white — for shadcn Button */                                                                 
   }                                                                                                                                             
 ```                                                                                                                                             

## Now you have two independent sets:

┌────────────────────┬─────────────────────────────┬──────────────────┐                                                                         
│ Tailwind class     │ Color                       │ Used by          │                                                                         
├────────────────────┼─────────────────────────────┼──────────────────┤                                                                         
│ bg-primary         │ shadcn default (near black) │ shadcn <Button>  │                                                                         
├────────────────────┼─────────────────────────────┼──────────────────┤                                                                         
│ bg-secondary       │ shadcn default (near white) │ shadcn <Button>  │                                                                         
├────────────────────┼─────────────────────────────┼──────────────────┤                                                                         
│ bg-brand-primary   │ #2563eb (your blue)         │ your <Button> ✅ │                                                                         
├────────────────────┼─────────────────────────────┼──────────────────┤                                                                         
│ bg-brand-secondary │ #64748b (your slate)        │ your <Button> ✅ │                                                                         
├────────────────────┼─────────────────────────────┼──────────────────┤                                                                         
│ bg-brand-danger    │ #dc2626 (your red)          │ your <Button> ✅ │

## আমরা কী করব?

> আমার recommendation হলো **shadcn Button রেখে তোমার design token/theme-এর সাথে integrate করব**।

মানে:

```text
Figma Design
     ↓
Your Theme / Tokens
     ↓
shadcn Button
     ↓
Your project's Button design
```

এটাই real-world approach।

তোমার আগের design যদি ছিল:

```text
primary   → blue
secondary → purple
danger    → red
```

তাহলে shadcn Button-কে এমনভাবে customize করব যেন:

```vue
<Button>
  Save
</Button>
```

তোমার **primary theme** ব্যবহার করে।

আর:

```vue
<Button variant="secondary">
  Cancel
</Button>
```

তোমার **secondary theme** ব্যবহার করবে।

এবং:

```vue
<Button variant="destructive">
  Delete
</Button>
```

তোমার **danger theme** ব্যবহার করবে।

# Example 

- in this folder `test-design.png`

> small Admin Dashboard + Login + Users management design রেখেছি, যাতে তুমি real project-এর মতো পুরো workflow practice করতে পারো।

Project: Vue Admin

Design-এ মূলত ৩টা অংশ আছে:

Design System : Colors, Typography , Spacing , Radius , Shadows
Dashboard: Sidebar , Header , Statistics cards , Overview chart, Recent activity
Users : User table
Authentication: Login form


STEP 2
Design Tokens
↓
STEP 3
Theme + Tailwind
↓
STEP 4
Base Components
Button
Input
Card
Badge
↓
STEP 5
Layout
Sidebar
Header
↓
STEP 6
Login Page
↓
STEP 7
Dashboard Page
↓
STEP 8
Users Page
↓
STEP 9
Responsive Design
↓
STEP 10
API Integration
↓
STEP 11
Authentication


Flow হবে:

```text

3. Project Folder Structure
        ↓
4. Figma Design Analyze
        ↓
5. Design Tokens বের করা
        ↓
6. Theme setup
        ↓
7. Base Components
        ↓
8. Layout
        ↓
9. Pages
```

# Step-1: Vue Project Scaffold
- vue project setup

**Project Setup** বলতে আমি প্রথমে Vue project scaffolding বোঝাচ্ছি।

আমাদের practical project-এর জন্য শুরু হবে:

```text
Vue 3, TypeScript, Vite, Vue Router, Pinia, Tailwind CSS
```

# Step-2: Tailwind Setup

- Tailwind install `pnpm add tailwindcss @tailwindcss/vite`
- Configure in `vite.config.ts`
    tailwindcss() মূলত Vite-এর সাথে Tailwind CSS-কে integrate করে।
    tailwindcss() → Vite-কে Tailwind CSS-এর styles process করতে সাহায্য করে।
    ফলে তুমি Vue component-এ Tailwind-এর class যেমন flex, text-red-500, p-4, bg-blue-500 ইত্যাদি ব্যবহার করতে পারো।
- style.css create and import tailwind 
- style.css ke full apllicaiton a diye deyar jonno - main.ts a import




তোমার ক্ষেত্রে যেহেতু **Vue 3 + TypeScript + Tailwind** নিয়ে already কাজ করছো, আমি চাই আমরা একদম **real-world project setup** হিসেবে করি।

তাই **Step 1-এর কাজ শুধু Vue project scaffold করা**।

যেমন:

```bash
npm create vue@latest vue-admin
```

তারপর prompts-এ:

```text
TypeScript       → Yes
JSX              → No
Vue Router       → Yes
Pinia             → Yes
Vitest            → No
ESLint            → Yes
Prettier          → Yes
Vue DevTools      → Yes
```

তারপর project run করব।

**এরপর Step 2-তে Tailwind + design system নিয়ে যাব।**

# sketch

ekhane sketch niye kaj,

এখানে আমরা Figma design থেকে প্রথমে বের করব:

Colors
Typography
Spacing
Border Radius
Shadows

এবং এগুলোকে আমাদের Vue project-এর theme/token system-এ convert করব। 

এটাই আসলে Figma → Code workflow-এর সবচেয়ে important practical step।

`Note:` 
ekjon designer er kache theke ei gulo niye nibo 
or na pele design theke AI diye ber kore nibo.

tokens.css er sobkichu designer dite parbe


1. `Design language` er each part niye kaj suru kori - 

Color: (Semantic Colors)
Primary    → Blue
Secondary  → Purple
Success    → Green
Warning    → Amber
Danger     → Red

Neutral Colors: (Neutral সাধারণত text, background, border ইত্যাদির জন্য।)
N-50 -> Page background
N-100 -> Light background
N-200 -> Border
N-300 -> Disable border
N-400 -> Placeholder
N-500 -> Secondary text
N-600 -> Body text
N-700 -> Strong text
N-800 -> Heading
N-900 -> Primary text

Typography:
Font Family
    Inter
Font Sizes
    H1 -> Page heading
    H2 -> Section heading
    H3 -> Card heading
    Body -> Normal text
    Small -> Secondary text
    Caption -> Helper/caption
Font Weight
    Regular 
    Medium 
    Semibold
    Bold

Spacing:
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px

Border Radius:
None
SM
MD
LG
XL
Full

Shadows:
None
SM
MD
LG


2. Now language er part gulo ke code a convert korbo. `token create` korbo 

tokens.css
src/styles/tokens.css -> এখানে আমাদের raw design tokens রাখব।

3. `Theme` create kora
   src/styles/main.css
```
@theme {}
```
eivabe theme ereate korbo




# Step - Design language

akta figma / sketch jokhon hate pabo, then kaj hocche `design language analysis` kora.

ei design er `color, typography, spacing, border radius, shadow, iconography, layout, component styles` kemon hobe, / ei part gulor আমি কী কী visual rule দেখছি
mane sohoj vabe bolle - ei design ta ke `part part` think kora, then setar note kore; akta example dei -

- Part-1:Color
  Primary color - blue
  Secondary color - red
- Part-2:Spacing:
  8px, 12px, 16px

aar এই সব একসাথে হলো Design Language, tahole color ke bolte pari, design language er akta part.

**“Color হলো design language-এর একটা part.”**

| Figma-তে যা দেখছো                    | তুমি কী বলবে           |
| ------------------------------------ | ---------------------- |
| Blue `#2563EB`                       | **Color**              |
| Inter, 16px, 400                     | **Typography**         |
| 8px, 16px, 24px                      | **Spacing**            |
| 8px rounded                          | **Border Radius**      |
| Soft shadow                          | **Shadow / Elevation** |
| একই ধরনের icons                      | **Iconography**        |
| Sidebar + Header + Content structure | **Layout**             |
| Button, Input, Card-এর visual rules  | **Component styles**   |


> এই পুরো collection = Design Language

> **Design-এর পুরো visual rules / full collection একসাথে = Design Language**

```text
Design Language
│
├── Color
│   └── Primary = Blue
│
├── Typography
│   └── Inter / 16px / 400
│
├── Spacing
│   └── 8 / 16 / 24px
│
├── Border Radius
│   └── 8px
│
└── Shadow
    └── Soft shadow
```

তারপর এগুলোকে code-এ আনতে গিয়ে **specific reusable values** বানাবে—এগুলো হলো **Design Tokens**।

যেমন:

```css
:root {
  --color-primary: #2563EB;
  --font-family: Inter;
  --spacing-md: 16px;
  --radius-md: 8px;
}
```

এখানে:

```text
Figma decision
     ↓
Primary color = Blue
     ↓
Code representation
     ↓
--color-primary: #2563EB
     ↓
Design Token
```

তাই তোমার example:

> “Design Language-এ Primary color blue পেয়েছিলাম → `--color-primary: #2563EB` বানালাম → এটা Design Token”

**হ্যাঁ, একদম ঠিক।** ✅

---

# Design tokens

design language er sob part ke গুলোকে code-এ নিয়ে আসবে **Design Tokens** হিসেবে।

যেমন Figma থেকে বুঝলে:

```text
Primary color = Blue
Spacing = 8px system
Radius = 8px
Font = Inter
```

Code-এ:

```css
--color-primary: #2563EB;
--spacing-unit: 8px;
--radius-md: 8px;
--font-family: Inter;
```

এগুলো হলো **Design Tokens**।

**“Color হলো design language-এর একটা part.”**

আর **Color, Typography, Spacing ইত্যাদি individual categories**; এগুলোর values (`#2563EB`, `16px`, `8px`) হলো **tokens**।

# Step - Design Theme

**Theme create করা মানে হলো—আমাদের application-এর visual/design rules-গুলোকে একটা centralized system হিসেবে define করা**, যাতে পুরো application একই design follow করে।

### Theme ছাড়া

একেক component-এ তুমি নিজে নিজে লিখছো:

```html
<button class="bg-[#2563EB] rounded-[8px]">
```

আর অন্য জায়গায়:

```html
<div class="bg-[#2563EB] rounded-[8px]">
```

এখানে design values ছড়িয়ে আছে।

---

### Theme থাকলে

আমরা আগে define করলাম:

```css
@theme {
  --color-primary: #2563EB;
  --radius-md: 8px;
}
```

এখন component-এ:

```html
<button class="bg-primary rounded-md">
```

Tailwind জানে:

```text
bg-primary
    ↓
#2563EB

rounded-md
    ↓
8px
```

এটাই **theme-এর practical benefit**।

---


```css
@theme {
  --color-primary: var(--color-primary);
  --radius-md: var(--radius-md);
}
```

এখানে আমরা Tailwind-কে বলছি:

> "এই design values-গুলো Tailwind-এর utility class হিসেবে available করো।"

তাই:

```text
Design Token
     ↓
Tailwind Theme
     ↓
Tailwind utility
     ↓
Component
```

### এক লাইনে মনে রাখো

> **Design Tokens = design-এর reusable values**
> **Theme = application/framework-কে সেই design rules কীভাবে ব্যবহার করতে হবে তার configuration**

Theme = application/framework-কে সেই design rules কীভাবে ব্যবহার করতে হবে তার configuration
tar mane ki, jodi theme a primary-color na ditam --color-primary: var(--color-primary); tahole eita ki tailwind theke peto 
akta simple example dau, ami theme a eita deyar por ki tailwind er ta ovverride korlam naki ami new dilam


তুমি আসলে Tailwind-এর theme-এ একটা নতুন design token / color যোগ করেছো:


আর Tailwind-এর ক্ষেত্রে **`@theme` হলো Tailwind-এর theme configuration করার জায়গা**।

## Question

```
tarmane amar understand hocche, 
- primary name akta new variable add korlam ja tailwind a chilo na, 
- aar bg-blue-500 a age theke chilo, ami jodi caitam sei variable a use korte partam, new akat color code diye
- theme er uddeso hocche, amader project er color code gulo sob kichu te apply korte parbo, tailwind er gulo na. 
- kono jaigai caile tailwind er gulo use korte parbo.

last question, --color-primary mane, bg-primary, text-primary, etc-primary
```


হ্যাঁ, **তোমার understanding ঠিক আছে।** শুধু একটা ছোট correction:

> Theme-এর উদ্দেশ্য শুধু color না; project-এর **পুরো design rules** Tailwind-এ usable করা—color, font, radius, shadow, typography ইত্যাদি।

আর তোমার last question-এর উত্তর: **হ্যাঁ, exactly।**

```css
@theme {
  --color-primary: #2563eb;
}
```

`--color-primary` হলো **একটা color theme variable/token**।

Tailwind-এর `color` namespace-এর কারণে এটা থেকে related utility তৈরি হয়:

```html
bg-primary
text-primary
border-primary
ring-primary
outline-primary
decoration-primary
```

মানে:

```text
--color-primary
       ↓
 ┌─────┼──────┬─────────┐
 ↓     ↓      ↓         ↓
bg-   text-  border-   ring-
primary primary primary primary
```

উদাহরণ:

```html
<button class="bg-primary text-white">
  Save
</button>

<p class="text-primary">
  Welcome
</p>

<input class="border-primary" />
```

সব জায়গায় একই:

```text
#2563EB
```

ব্যবহার হবে।

**এই জন্যই `--color-primary` শুধু একটা variable না—Tailwind-এর কাছে এটা একটা semantic color definition**, যেটা বিভিন্ন utility দিয়ে বিভিন্ন CSS property-তে ব্যবহার করা যায়।

## question 

```
--text-xl: var(--font-size-xl);
--font-weight-regular: var(--font-weight-regular);
--spacing-1: var(--spacing-1);
--radius-sm: var(--radius-sm);
--shadow-sm: var(--shadow-sm);

ekhane namespace gulo ki ki, aar kivabe use korbo, aar tailwind er namespace gulo ba ekhane kon pattern a eigulo korte hoi
```

Namespace তুমি নিজের ইচ্ছামতো --abc-* বানালেই Tailwind utility তৈরি করবে না।

Tailwind যে namespace-গুলোকে চেনে, সেই namespace-এর pattern follow করতে হয়।

এটাই @theme বোঝার মূল বিষয়।


### 1. Namespace কী?

Tailwind-এর `@theme`-এ variable-এর **prefix** দেখে Tailwind বুঝে ওই variable দিয়ে কোন ধরনের utility তৈরি করবে।

যেমন:

```css
@theme {
  --color-primary: #2563eb;
}
```

এখানে:

```text
--color-     ← namespace
primary      ← name
```

অর্থাৎ:

```text
namespace = color
name      = primary
```

---

### 2. গুরুত্বপূর্ণ Tailwind namespaces

Tailwind v4-এ commonly ব্যবহৃত namespaceগুলো:

| Namespace         | কী define করে         | Example              | ব্যবহার                      |
| ----------------- | --------------------- | -------------------- | ---------------------------- |
| `--color-*`       | Color                 | `--color-primary`    | `bg-primary`, `text-primary` |
| `--text-*`        | Font size             | `--text-xl`          | `text-xl`                    |
| `--font-*`        | Font family           | `--font-sans`        | `font-sans`                  |
| `--font-weight-*` | Font weight           | `--font-weight-bold` | `font-bold`                  |
| `--tracking-*`    | Letter spacing        | `--tracking-wide`    | `tracking-wide`              |
| `--leading-*`     | Line height           | `--leading-normal`   | `leading-normal`             |
| `--spacing-*`     | Spacing scale         | `--spacing-4`        | `p-4`, `m-4`, `gap-4`        |
| `--radius-*`      | Border radius         | `--radius-md`        | `rounded-md`                 |
| `--shadow-*`      | Box shadow            | `--shadow-md`        | `shadow-md`                  |
| `--breakpoint-*`  | Responsive breakpoint | `--breakpoint-lg`    | `lg:`                        |
| `--ease-*`        | Transition easing     | `--ease-in`          | `ease-in`                    |
| `--animate-*`     | Animation             | `--animate-spin`     | `animate-spin`               |

---

### 8. তাহলে Pattern কী?

এটাই সবচেয়ে important।

Tailwind-এর `@theme`-এ সাধারণ pattern:

```css
@theme {
  --namespace-name: value;
}
```

যেমন:

```css
@theme {
  --color-primary: #2563eb;

  --text-xl: 20px;

  --font-weight-bold: 700;

  --spacing-4: 16px;

  --radius-md: 8px;

  --shadow-md: 0 4px 6px rgb(0 0 0 / 8%);
}
```

তারপর Tailwind namespace অনুযায়ী utility তৈরি/ব্যবহার করতে পারে:

```text
--color-primary
      ↓
bg-primary
text-primary
border-primary


--text-xl
      ↓
text-xl


--font-weight-bold
      ↓
font-bold


--spacing-4
      ↓
p-4
m-4
gap-4


--radius-md
      ↓
rounded-md


--shadow-md
      ↓
shadow-md
```

আর একটা জিনিস মনে রেখো:

**Namespace তুমি নিজের ইচ্ছামতো `--abc-*` বানালেই Tailwind utility তৈরি করবে না।**

Tailwind যে namespace-গুলোকে চেনে, সেই namespace-এর pattern follow করতে হয়।

এটাই `@theme` বোঝার মূল বিষয়।

---


# Design system

design language + tokens + Components , mane sob kichu miliye hocche - design system.
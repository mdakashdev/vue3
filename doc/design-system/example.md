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

Note: 
ekjon designer er kache theke ei gulo niye nibo 
or na pele design theke AI diye ber kore nibo.


1. Design language er each part niye kaj suru kori - 

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


2. Now languer er part gulo ke code a convert korbo. token create korbo 



STEP 3 — Design Tokens + Tailwind Theme

Step 3.1 — tokens.css
src/styles/tokens.css -> এখানে আমাদের raw design tokens রাখব।




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


# Design system

design language + tokens + Components , mane sob kichu miliye hocche - design system.
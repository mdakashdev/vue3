# নিজে AI ব্যবহার করে Figma/Sketch → Vue + Tailwind


- ai diye kaj korar jonno root a - `design` akta folder create korechi; like -
```
design
├── dashboard.png
├── sidebar.png
├── header.pnp
├── 
├── 
```
eita source hisabe use kora jai. but now amra ektu onno vabe korbo. eivabe korle AI assumption kore answer dibe, tai amade eexact raw data ja, fima te ache.

1. amra figma theke api er maddhome raw json data ber korbo - follow `@doc/figma/basic-things.md`
2. figma api create - figma-api-test

---

① Parser
Figma/Sketch থেকে actual nodes বের করবে।

② AI Analyzer
Nodes দেখে বলবে এটা Sidebar, Header, Card, Button ইত্যাদি।

③ Generator
Semantic model + tokens থেকে deterministic ভাবে Vue/Tailwind code বানাবে।

---


হ্যাঁ। এখন requirement একদম clear। তুমি জানতে চাচ্ছো:

> **Figma/Sketch design input হিসেবে দিলে AI কীভাবে automatically এই Vue + Tailwind component বানাবে?**

এখানে মূল trick হলো **Figma → Tailwind class সরাসরি generate না করা**। মাঝখানে একটা structured representation রাখতে হবে।

## 1\. Figma থেকে প্রথমে raw design data নাও

ধরো Figma-তে sidebar:

```
Sidebar
├── width: 256px
├── height: 100vh
├── background: #FFFFFF
├── border-right: #E5E7EB
│
├── Logo Container
│   ├── padding: 24px
│   └── font: 16px / 600
│
└── Navigation
    ├── horizontal padding: 12px
    ├── gap: 4px
    │
    └── Nav Item
        ├── padding: 8px 12px
        ├── radius: 6px
        ├── font: 14px / 400
        └── hover background: #F1F5F9
```

এই data ideally **Figma API / plugin থেকে** আসবে। Screenshot থেকে করলে একই information AI vision দিয়ে infer করতে হবে।

---

# 2\. তারপর Figma data → UI intermediate representation

এখানে তোমার নিজের একটা JSON schema থাকবে।

যেমন:

```
{
  "component": "Sidebar",
  "type": "aside",

  "layout": {
    "width": 256,
    "height": "100vh",
    "display": "flex",
    "direction": "column"
  },

  "style": {
    "background": "#FFFFFF",
    "borderRight": {
      "width": 1,
      "color": "#E5E7EB"
    }
  },

  "children": [
    {
      "component": "Logo",
      "type": "div",
      "style": {
        "padding": "24px",
        "fontSize": 16,
        "fontWeight": 600
      }
    },

    {
      "component": "Navigation",
      "type": "nav",
      "style": {
        "paddingX": 12,
        "gap": 4
      },

      "children": [
        {
          "component": "NavItem",
          "text": "Dashboard",
          "style": {
            "paddingX": 12,
            "paddingY": 8,
            "fontSize": 14,
            "borderRadius": 6
          }
        }
      ]
    }
  ]
}
```

**এটাই আসল intermediate layer।**

---

# 3\. এরপর Token mapping

Raw `256px`, `24px`, `12px` ইত্যাদি সরাসরি code-এ না দিয়ে token-এর সাথে map করবে।

যেমন:

```
256px → w-64

24px → p-6

12px → px-3

8px → py-2

14px → text-sm

6px → rounded-md

#FFFFFF → bg-background

#E5E7EB → border-border
```

তখন intermediate representation:

```
{
  "width": {
    "value": 256,
    "token": "w-64"
  },

  "padding": {
    "value": 24,
    "token": "p-6"
  },

  "fontSize": {
    "value": 14,
    "token": "text-sm"
  }
}
```

---

# 4\. তারপর AI/code generator Tailwind বের করবে

তখন তোমার desired output automatically পাওয়া যাবে:

```
<template>
  <aside class="w-64 min-h-screen border-r bg-background">
    <div class="p-6 font-semibold">
      Logo
    </div>

    <nav class="px-3 space-y-1">
      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm hover:bg-accent"
      >
        Dashboard
      </a>

      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm hover:bg-accent"
      >
        Users
      </a>

      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm hover:bg-accent"
      >
        Settings
      </a>
    </nav>
  </aside>
</template>

<script setup lang="ts">
</script>
```

---

# কিন্তু এখানে একটা important problem আছে

Figma জানে না যে:

```
Frame → Sidebar
Frame → Navigation
Frame → NavItem
```

এগুলো semantic component।

Figma শুধু জানে:

```
Frame
Frame
Text
Rectangle
Auto Layout
```

তাই তোমার AI-কে **semantic inference** করতে হবে।

যেমন:

```
Figma Node
    ↓
Frame
width = 256
height = 1024
vertical layout
border-right
    ↓
AI inference
    ↓
"এইটা সম্ভবত Sidebar"
```

তারপর:

```
Frame
padding = 24
contains Text "Logo"
    ↓
"Logo/Header area"
```

এবং:

```
Vertical Auto Layout
contains repeated frames
same dimensions
same typography
    ↓
"Navigation list"
    ↓
"NavItem component"
```

এটা খুব গুরুত্বপূর্ণ কারণ **Design → Code-এর কঠিন অংশ CSS generate করা না, semantic structure বুঝে ফেলা।**

---

# 5\. তাই তোমার AI pipeline এমন হওয়া উচিত

```
                Figma / Sketch
                       │
                       ▼
                ┌─────────────┐
                │ Parser      │
                └──────┬──────┘
                       │
                       ▼
              Raw Design Tree
                       │
                       ▼
                ┌─────────────┐
                │ AI Analyzer │
                └──────┬──────┘
                       │
                       ▼
             Semantic UI Tree
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        Design Tokens       Components
             │                   │
             └─────────┬─────────┘
                       ▼
                Code Generator
                       │
                       ▼
                  Vue + Tailwind
```

---

# 6\. Semantic UI Tree-টাই তোমার core

আমি তোমার জায়গায় হলে এই structure-টা central model বানাতাম:

```
{
  "type": "Sidebar",

  "layout": {
    "width": "256px",
    "height": "100vh"
  },

  "children": [
    {
      "type": "SidebarHeader",
      "children": [
        {
          "type": "Logo",
          "text": "Logo"
        }
      ]
    },

    {
      "type": "SidebarNavigation",
      "children": [
        {
          "type": "NavItem",
          "label": "Dashboard",
          "href": "#"
        },
        {
          "type": "NavItem",
          "label": "Users",
          "href": "#"
        },
        {
          "type": "NavItem",
          "label": "Settings",
          "href": "#"
        }
      ]
    }
  ]
}
```

এখন এই একই model থেকে তুমি চাইলে generate করতে পারবে:

```
Vue + Tailwind
React + Tailwind
HTML + CSS
Vue + SCSS
React + CSS Modules
```

অর্থাৎ **AI-এর output সরাসরি code না।**

AI-এর output হবে:

> **Semantic UI Tree + Design Tokens**

তারপর deterministic code generator সেটা code-এ convert করবে।

---

# 7\. আর তোমার example-এ hardcoded HTML না করে component বানানো আরও ভালো

তুমি যেটা দিয়েছো:

```
<a>Dashboard</a>
<a>Users</a>
<a>Settings</a>
```

AI ideally এটা generate করবে:

```
<template>
  <aside class="w-64 min-h-screen border-r bg-background">
    <div class="p-6 font-semibold">
      Logo
    </div>

    <nav class="px-3 space-y-1">
      <a
        v-for="item in navigation"
        :key="item.label"
        :href="item.href"
        class="block rounded-md px-3 py-2 text-sm hover:bg-accent"
      >
        {{ item.label }}
      </a>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const navigation = [
  { label: 'Dashboard', href: '#' },
  { label: 'Users', href: '#' },
  { label: 'Settings', href: '#' },
]
</script>
```

এটা বেশি maintainable।

---

## 8\. সবচেয়ে practical architecture

তোমার project-টা আমি এভাবে ভাগ করতাম:

```
src/
├── parser/
│   ├── figma/
│   └── sketch/
│
├── analyzer/
│   ├── layout-analyzer
│   ├── token-analyzer
│   └── semantic-analyzer
│
├── design-system/
│   ├── tokens
│   ├── theme
│   └── mappings
│
├── ui-model/
│   ├── component-schema
│   └── layout-schema
│
└── generators/
    ├── vue/
    ├── react/
    ├── tailwind/
    └── css/
```

এখানে সবচেয়ে গুরুত্বপূর্ণ ৩টা জিনিস:

**① Parser**\
Figma/Sketch থেকে actual nodes বের করবে।

**② AI Analyzer**\
Nodes দেখে বলবে এটা Sidebar, Header, Card, Button ইত্যাদি।

**③ Generator**\
Semantic model + tokens থেকে deterministicভাবে Vue/Tailwind code বানাবে।

---

### একটা sentence-এ পুরো idea

**Figma → Raw Nodes → AI Semantic UI Tree → Design Tokens/Theme → Component Spec → Vue/Tailwind Generator → তোমার এই `<aside>` code।**

এভাবে করলে AI-কে প্রতিবার পুরো code invent করতে হবে না; **AI শুধু design বুঝবে, আর তোমার generator reliable code লিখবে।** এটা production-grade করার জন্য অনেক ভালো architecture।

# others 

হ্যাঁ, **ঠিক এইভাবে করতে পারো**—বিশেষ করে তুমি যদি **Pi coding agent** ব্যবহার করো। Pi project-এর working directory থেকে files access করতে পারে এবং `@` দিয়ে নির্দিষ্ট file prompt-এর সাথে attach/reference করা যায়। Images-ও `@screenshot.png` হিসেবে দেওয়া যায়, যদি selected model image input support করে। ([GitHub][1])

তবে একটা distinction আছে:

### তোমার project structure

ধরো:

```text
my-vue-project/
├── src/
├── public/
├── design/
│   ├── dashboard.png
│   ├── sidebar.png
│   └── design-notes.md
├── package.json
└── ...
```

তারপর project directory-তে Pi চালাবে:

```bash
cd my-vue-project
pi
```

এখন Pi-কে বলতে পারো:

```text
@design/sidebar.png

Analyze this sidebar design.

Do not write code yet.

Identify:
- width
- height
- padding
- gap
- border
- colors
- typography
- radius
- active state
- hover state

For every property give:

Design value → Tailwind class
```

অথবা command line থেকেই:

```bash
pi @design/sidebar.png "Analyze this sidebar design and give me the Tailwind classes. Do not write code yet."
```

Pi-এর official usage অনুযায়ী `@file` syntax দিয়ে files message-এর সাথে include করা যায়। ([GitHub][1])

---

## কিন্তু Figma file হলে?

এখানে একটু আলাদা।

যদি তোমার কাছে থাকে:

```text
design/
└── dashboard.fig
```

তাহলে শুধু:

```text
@design/dashboard.fig
```

দিয়ে AI-কে Figma-এর ভিতরের design structure বুঝিয়ে দেওয়া **সাধারণ image-এর মতো straightforward নয়**।

কারণ `.fig` হলো Figma-এর native design file। AI coding agent-এর জন্য সবচেয়ে সহজ input হলো:

```text
Figma
   ↓
Export
   ↓
PNG / JPG
   ↓
AI
```

অথবা Figma API/plugin দিয়ে structured design data বের করা—ওটা advanced workflow।

---

# তোমার জন্য আমি এখন যেটা recommend করব

তুমি এখন এই workflow follow করো:

```text
Figma
   ↓
Sidebar export as PNG
   ↓
design/sidebar.png
   ↓
Pi
   ↓
@design/sidebar.png
   ↓
AI analysis
   ↓
Design properties
   ↓
Tailwind classes
   ↓
Vue component
```

### তারপর দ্বিতীয় prompt

প্রথম prompt-এর analysis পাওয়ার পরে:

```text
Now implement only this sidebar
in my existing Vue 3 + Tailwind project.

Before writing code:

1. Inspect my existing Tailwind theme/tokens.
2. Reuse existing design tokens whenever possible.
3. Do not create duplicate colors.
4. Follow the existing project conventions.
5. Do not modify unrelated files.

Create/update the Sidebar component only.

Use the attached design as the visual source of truth.
```

এখানে একটা বড় সুবিধা হচ্ছে Pi শুধু screenshot দেখবে না—**তোমার actual project-এর `tailwind.css`, theme, components, router ইত্যাদিও inspect করতে পারবে।**

---

### আর `AGENTS.md` ব্যবহার করলে আরও ভালো

তোমার project root:

```text
my-vue-project/
├── AGENTS.md
├── design/
│   └── sidebar.png
├── src/
└── package.json
```

`AGENTS.md`-তে লিখতে পারো:

```md
# Project Instructions

## Frontend
- Vue 3
- TypeScript
- Tailwind CSS
- Use <script setup lang="ts">

## Design
- Reuse existing design tokens.
- Do not hardcode colors if a project token exists.
- Prefer Tailwind utilities.
- Do not modify unrelated components.

## Workflow
- Analyze the design before writing code.
- Ask before making large architectural changes.
```

Pi startup-এ project-এর `AGENTS.md`/`CLAUDE.md` context হিসেবে load করতে পারে। ([GitHub][1])

**এটাই তোমার জন্য সবচেয়ে practical setup।**

আর একটা জিনিস মনে রেখো: **AI-কে প্রথমেই “এই design-এর code বানাও” বলবে না।** আমরা যে workflow শিখছি সেটা হবে:

> **Analyze → Verify → Map to Tailwind → Implement → Compare → Adjust**

এতে তুমি AI-এর generated code blindly accept না করে **কেন `w-64`, `px-3`, `space-y-1`, `rounded-md` এসেছে সেটা নিজেও বুঝতে পারবে।**

[1]: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md?utm_source=chatgpt.com "pi/packages/coding-agent/docs/usage.md at main · earendil-works/pi · GitHub"

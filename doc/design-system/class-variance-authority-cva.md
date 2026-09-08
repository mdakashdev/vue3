# cva - Class Variance Authority

Default syntax: 
```ts
cva(
"default-class", 
{
  variants: {},
  defaultVariants: {},
}
)
```

- khub easy, joto gulo variants lagbe, props hisabe vabte paro sei gulo define kore, sei vaiants dile kon kon class pabe sei gulo 
  define kore dile holo.
- default a ki pabe seta diye dite hobe.


use:
```html
<Button variant="primary" size="lg" class="w-full">
  Save
</Button>
```

- ekhane `primary` mane, varient primary diye ja declare korechi sei class gulo pabe

---

## Describe

চলো তাহলে `cva()` বুঝি। এটা বুঝলে shadcn Button customize করা খুব সহজ হবে।

তোমার `button/index.ts`-এ মূল অংশটা এরকম:

```ts
export const buttonVariants = cva(
  "inline-flex items-center justify-center ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white",
        outline: "border bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### `cva()` আসলে কী করছে?

সহজভাবে:

> **একটা component-এর বিভিন্ন variant অনুযায়ী CSS class তৈরি করে।**

ধরো:

```ts
buttonVariants({
  variant: "default",
  size: "lg"
})
```

এটা internally এমন class তৈরি করবে:

```text
inline-flex ...
bg-primary
text-primary-foreground
h-10
px-6
```

অর্থাৎ:

```text
variant = "default"
       ↓
bg-primary

size = "lg"
       ↓
h-10 px-6
```

---

### তোমার project-এ আমরা কী করতে চাই?

তোমার Design System:

```text
primary
secondary
danger
```

তাই shadcn-এর:

```text
default
secondary
destructive
```

এর বদলে আমরা চাইতে পারি:

```text
primary
secondary
danger
```

তখন CVA হবে conceptually:

```ts
variant: {
  primary: "bg-primary text-primary-foreground ...",
  secondary: "bg-secondary text-secondary-foreground ...",
  danger: "bg-destructive text-destructive-foreground ...",
}
```

তারপর:

```vue
<Button variant="primary">
  Save
</Button>

<Button variant="danger">
  Delete
</Button>
```

এবং **component-এর ভিতরের implementation shadcn-এরই থাকবে।**

এটাই shadcn-এর সবচেয়ে useful দিক:

```text
Shadcn Component
       ↓
CVA
       ↓
তোমার Variant API
       ↓
তোমার Theme Tokens
```

### এখন আমরা কী change করব?

পরের ছোট step-এ শুধু `buttonVariants`-এর:

```ts
variant: {
   ...
}
```

অংশটা customize করব।

**`Button.vue` এখনো touch করব না।**
কারণ variant system-এর আসল জায়গা হলো `buttonVariants`।

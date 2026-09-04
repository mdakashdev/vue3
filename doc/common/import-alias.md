# Import alias কী?

আমরা সাধারণত এভাবে import করি:

```ts
import Button from '../../components/ui/Button.vue'
```

কিন্তু alias থাকলে:

```ts
import Button from '@/components/ui/button/Button.vue'
```

এখানে `@` → `src` বোঝাবে।

---

## Step 1 — `tsconfig.json` দেখো

তোমার project root-এর `tsconfig.json` খুলে আমাকে এর content দাও।

কারণ তোমার Vite/Vue/TypeScript setup অনুযায়ী **ঠিক কোথায় alias add করতে হবে সেটা দেখে** করাই ভালো।

সাধারণত শেষ পর্যন্ত এমন কিছু থাকবে:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```


Example - tsconfig.json

```json
{
  "files": [],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    }
  ]
}
```

এতে shadcn-vue root `tsconfig.json` থেকেই alias detect করতে পারছে।


এটা তোমার **root `tsconfig.json`**। এখানে সরাসরি alias না দিয়ে তোমার ক্ষেত্রে `tsconfig.app.json`-এ দিতে হবে, 

কারণ Vue source code-এর TypeScript configuration ওখানে আছে।

## Step 2 — `tsconfig.app.json` খোলো

সাধারণ Vue + Vite project-এ এটা এমন ধরনের হবে:

```json
{
  "compilerOptions": {
    
  }
}
```

## Step 3 — Vite-এও alias থাকতে হবে

শুধু TypeScript জানলেই হবে না।

TypeScript:

```text
@/components
      ↓
src/components
```

Vite-ও যেন এটা বুঝতে পারে।

তোমার `vite.config.ts` খুলে content দাও।

**ওখানে আমরা `@ → src` alias configure করব।** 


**`vite.config.ts`:**

```ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
},
```

তাহলে দুটোই একই mapping বুঝবে:

```text
@/components/Button.vue
        ↓
src/components/Button.vue
```




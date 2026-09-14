# Tailwind CSS Setup

আমাদের design অনুযায়ী পরবর্তীতে **Design Tokens + Theme** বানাব। তার আগে Tailwind ঠিকভাবে configure করি।

যদি Tailwind এখনো install না করে থাকো:

```bash
pnpm add tailwindcss @tailwindcss/vite
```

তারপর `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
```

তারপর `src/styles/main.css`:

```css
@import "tailwindcss";
```

এবং `main.ts`-এ এটা থাকতে হবে:

```ts
import './styles/main.css'
```

তারপর test:

```vue
<template>
  <div class="text-3xl font-bold">
    Vue Admin
  </div>
</template>
```

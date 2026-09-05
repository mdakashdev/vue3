# Structure 

তোমার বর্তমান `main.css` বড় হওয়ার কারণ হলো এখানে কয়েকটা আলাদা responsibility একসাথে আছে:

```text
main.css
├── imports
├── তোমার Design System mapping
├── shadcn theme
├── light theme variables
├── dark theme variables
└── global/base styles
```

Professional project-এ এগুলো আলাদা করা অনেক cleaner।

### আমি তোমার project-এ এভাবে রাখতাম

```text
src/
└── styles/
    ├── main.css
    ├── tokens.css
    ├── theme.css
    ├── shadcn.css
    └── base.css
```

Responsibility:

| File         | কাজ                            |
| ------------ | ------------------------------ |
| `tokens.css` | তোমার raw Design Tokens        |
| `theme.css`  | তোমার token → Tailwind mapping |
| `shadcn.css` | shadcn semantic theme          |
| `base.css`   | global/base CSS                |
| `main.css`   | শুধু সবকিছু import করবে        |

তাহলে `main.css` হবে খুব ছোট:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@import "tailwindcss";
@import "tw-animate-css";

@import "./tokens.css";
@import "./theme.css";
@import "./shadcn.css";
@import "./base.css";
```

### তারপর structure

#### `tokens.css`

শুধু:

```css
:root {
  --ds-primary: #2563eb;
  --ds-secondary: #64748b;
  --ds-success: #16a34a;
  --ds-warning: #f59e0b;
  --ds-danger: #dc2626;

  /* typography */
  --ds-font-sans: "Inter", sans-serif;

  /* spacing */
  --ds-spacing-1: 4px;
  --ds-spacing-2: 8px;

  /* radius */
  --ds-radius-sm: 4px;
  --ds-radius-md: 8px;

  /* ... */
}
```

এটা হবে **তোমার Design System-এর source of truth**।

---

#### `theme.css`

এখানে থাকবে তোমার token-গুলোকে Tailwind utility-তে expose করা:

```css
@theme {
  --color-brand-primary: var(--ds-primary);
  --color-brand-secondary: var(--ds-secondary);
  --color-brand-success: var(--ds-success);
  --color-brand-warning: var(--ds-warning);
  --color-brand-danger: var(--ds-danger);

  --color-neutral-50: var(--ds-neutral-50);
  --color-neutral-100: var(--ds-neutral-100);

  --font-sans: var(--ds-font-sans);

  --text-xs: var(--ds-font-size-xs);
  --text-sm: var(--ds-font-size-sm);
  --text-md: var(--ds-font-size-md);

  --spacing-1: var(--ds-spacing-1);
  --spacing-2: var(--ds-spacing-2);

  --radius-sm: var(--ds-radius-sm);
  --radius-md: var(--ds-radius-md);

  --shadow-sm: var(--ds-shadow-sm);
}
```

---

#### `shadcn.css`

এখানে থাকবে shadcn-এর semantic variables:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);

  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  /* ... */
}

:root {
  --radius: 0.625rem;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  --primary: var(--ds-primary);
  --primary-foreground: #ffffff;

  --secondary: var(--ds-secondary);
  --secondary-foreground: #ffffff;

  --destructive: var(--ds-danger);
  --destructive-foreground: #ffffff;

  /* অন্যান্য shadcn variables */
}

.dark {
  /* dark theme */
}
```

---

#### `base.css`

এখানে: base.css-এ আমরা পুরো application-এর global/default CSS behavior রাখি।

```css
@custom-variant dark (&:is(.dark *));

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

---

### তাহলে পুরো architecture হবে

```text
                    Design System
                         │
                    tokens.css
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
         theme.css              shadcn.css
              ↓                     ↓
       Tailwind utilities      shadcn semantics
              │                     │
              └──────────┬──────────┘
                         ↓
                    Components
                         ↓
                  Button / Input / Card
```

এটা **অনেক বেশি maintainable**।

আর একটা গুরুত্বপূর্ণ বিষয়: `main.css`-কে সব CSS রাখার জায়গা হিসেবে ভাববে না। এটাকে **CSS entry point** হিসেবে ভাববে।

```text
main.css = "সব global style কোথা থেকে load হবে"
```

তোমার ক্ষেত্রে আমি এখনই এই segregation করতাম। এরপর **একটা একটা করে current `main.css` থেকে কোন code কোন file-এ যাবে**, সেটা করে নিতে পারি।

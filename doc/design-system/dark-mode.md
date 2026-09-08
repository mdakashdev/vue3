# root html a dark class add hole, .dark theke value nei

হ্যাঁ, **ঠিক তাই**। ✅

যদি:

```html
<html class="dark">
```

হয়, তাহলে CSS-এর:

```css
.dark {
  --primary: ...;
  --background: ...;
}
```

এই values active হবে।

কারণ তোমার আছে:

```css
@custom-variant dark (&:is(.dark *));
```

এটা Tailwind-কে বলে যে `.dark` class থাকলে dark variant apply করতে হবে।

### একটা গুরুত্বপূর্ণ distinction

`.dark` থেকে variable নেওয়া **CSS-এর সাধারণ behavior**:

```css
.dark {
  --primary: red;
}
```

আর:

```html
<html class="dark">
```

হলে:

```text
--primary = red
```

হয়ে যায়।

কিন্তু Tailwind-এর:

```html
<div class="dark:bg-black">
```

এটা কাজ করার জন্য তোমার:

```css
@custom-variant dark (&:is(.dark *));
```

configuration দরকার।

---

### তোমার Button-এর ক্ষেত্রে

shadcn Button:

```css
bg-primary
```

ব্যবহার করছে।

Light mode:

```text
<html>
   ↓
--primary = var(--ds-primary)
   ↓
#2563eb
```

Dark mode:

```text
<html class="dark">
   ↓
.dark { --primary: ... }
   ↓
bg-primary
   ↓
.dark-এর --primary value
```

**সুতরাং তুমি একদম ঠিক বুঝেছো।**

আর এই কারণেই আমরা `tokens.css` আর `shadcn.css` আলাদা করছি—`tokens.css` হবে তোমার design values-এর source, আর `shadcn.css`-এর `:root`/`.dark` হবে semantic theme layer।

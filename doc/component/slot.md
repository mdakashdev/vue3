# SLOT

`slot` হলো **Parent component থেকে Child component-এর ভিতরে HTML/content পাঠানোর উপায়।**

যদি `props` দিয়ে **data** পাঠানো হয়, তাহলে `slot` দিয়ে **UI/content** পাঠানো হয়।

---

# Props vs Slot

## Props

Parent

```vue
<BaseButton label="Save" />
```

Child

```vue
<button>{{ label }}</button>
```

Output

```html
<button>Save</button>
```

এখানে শুধু **text** পাঠানো হয়েছে।

---

## Slot

Parent

```vue
<BaseButton>
  Save
</BaseButton>
```

Child

```vue
<button>
  <slot />
</button>
```

Output

```html
<button>
  Save
</button>
```

এখানে Parent-এর ভিতরের content (`Save`) Child-এর `<slot />`-এ বসে গেছে।

---

# Example 1 (Simple)

### Child (BaseCard.vue)

```vue
<template>
  <div class="card">
    <slot />
  </div>
</template>
```

---

### Parent

```vue
<BaseCard>
  <h2>Welcome</h2>
  <p>Hello Vue</p>
</BaseCard>
```

Output

```html
<div class="card">
  <h2>Welcome</h2>
  <p>Hello Vue</p>
</div>
```

---

# Example 2 (Named Slot)

Child

```vue
<template>
  <div>
    <header>
      <slot name="header" />
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
```

Parent

```vue
<BaseLayout>

  <template #header>
    <h1>Dashboard</h1>
  </template>

  <p>Main Content</p>

  <template #footer>
    <button>Save</button>
  </template>

</BaseLayout>
```

Output

```text
----------------------
Dashboard
----------------------
Main Content
----------------------
Save
----------------------
```

---

# কখন Slot ব্যবহার করবো?

ধরো তুমি `BaseButton` বানাচ্ছো।

Props দিয়ে:

```vue
<BaseButton label="Save" />
```

এখন যদি icon দিতে চাও?

```vue
<BaseButton>
  <IconSave />
  Save
</BaseButton>
```

এটা `slot` ছাড়া সম্ভব নয়।

---

# Props vs Slot

| Props                           | Slot                              |
| ------------------------------- | --------------------------------- |
| Data পাঠায়                     | HTML / Component / Content পাঠায় |
| `label="Save"`                  | `<BaseButton>Save</BaseButton>`   |
| String, Number, Boolean, Object | যেকোনো Vue template content       |

---

# সহজে মনে রাখো

```
Props
Parent --------> Child
      Data
```

```
Slot
Parent --------> Child
      HTML / UI Content
```

---

## Interview-তে যদি জিজ্ঞেস করে

> **What is a slot in Vue?**

তুমি বলতে পারো:

> **"A slot is a placeholder inside a child component where the parent component can inject custom content. Props pass data, while slots pass template/UI content."**

---

### শেখার Order

Slot-এর ৩টা level আছে:

1. ✅ **Default Slot** (`<slot />`)
2. ✅ **Named Slot** (`<slot name="header" />`)
3. ✅ **Scoped Slot** (Child → Parent data pass করে render control দেয়)

প্রথমে **Default Slot** ভালোভাবে বুঝো, তারপর **Named Slot**, শেষে **Scoped Slot**। এগুলো জানলেই Vue-এর প্রায় সব practical slot use case cover হয়ে যাবে।

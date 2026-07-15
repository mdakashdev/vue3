## Step 1: Project Structure বুঝে নাও

`src` ফোল্ডারের ভিতরে এমন structure বানাও:

```text
src
│
├── components
│   └── BaseInput.vue
│
├── App.vue
│
└── main.js
```

যদি `components` folder না থাকে, তাহলে তৈরি করো।

---

## Step 2: `BaseInput.vue` তৈরি করো

`src/components/BaseInput.vue`

এখন শুধু এই simple template লিখো:

```vue
<template>
  <div>
    <label>Name</label>
    <input type="text" />
  </div>
</template>

<script setup>
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 6px;
}

input {
  padding: 8px;
  width: 300px;
}
</style>
```

এখনও `props` বা `v-model` ব্যবহার করব না। আগে component render হচ্ছে কিনা দেখি।

---

## Step 3: `App.vue`-তে Component Import করো

`src/App.vue`

```vue
<template>
  <BaseInput />
</template>

<script setup>
import BaseInput from './components/BaseInput.vue'
</script>
```

---

## Step 4: Run করে দেখো

যদি `npm run dev` চালু থাকে, browser-এ দেখবে:

যদি এটা দেখতে পাও, তাহলে প্রথম component successfully render হয়েছে।

---

## এরপর কী শিখব?

আমাদের roadmap হবে:

**এখন শুধু Step 1–4 শেষ করো।**

যখন browser-এ input দেখতে পাবে, আমাকে শুধু **"done"** বলো। এরপর আমরা `props` দিয়ে `label` এবং `placeholder` dynamic করব, এবং আমি প্রতিটি line কেন লিখছি সেটাও ব্যাখ্যা করব।

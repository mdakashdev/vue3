# Two Way Binding 

## v-model

এটা Vue-এর সবচেয়ে গুরুত্বপূর্ণ concept গুলোর একটি।

---

# প্রথমে সমস্যা বুঝি

ধরো,  তোমার Parent (`App.vue`) একটা value রাখে।

```ts
const username = ref('')
```

এখন তুমি চাইছো `BaseInput` এই value দেখাবে।

আর user input দিলে **Parent-এর `username` update হবে।**

অর্থাৎ data দুই দিকে যাবে।

```
Parent (App.vue)  ---------> Child (BaseInput.vue)
        value

Parent (App.vue) <--------- Child (BaseInput.vue)
      new value
```

এই দুই-way communication-ই `v-model`।

---

# Step 1: Parent → Child

Parent বলছে

```vue
<BaseInput v-model="username" />
```

Vue এটা নিজের ভিতরে convert করে:

```vue
<BaseInput
  :modelValue="username"
  @update:modelValue="username = $event"
/>
```

**এটাই আসল magic।**

অর্থাৎ

```
v-model = :modelValue + @update:modelValue
```

---

# Step 2: Child value receive করছে

```ts
const props = defineProps({
    modelValue: String
})
```

এখন Child-এর কাছে value এসেছে।

```
Parent : username = "Akash"
↓
Child: modelValue = "Akash"
```

---

# Step 3: Input-এ দেখাচ্ছে

```vue
<input
    :value="modelValue"
/>
```

অর্থাৎ

```
username->modelValue->input.value
```

---

# Step 4: User typing

ধরো user লিখল

```
Akash Ali
```

Input-এর value এখন

```
Akash Ali
```

কিন্তু... Parent এখনও জানে না।

```
Parent

username = ""

❌ update হয়নি
```

---

# Step 5: Child Parent-কে জানাচ্ছে

```ts
const emit = defineEmits([
    "update:modelValue"
])
```

এটা বলে

> "আমি Parent-কে event পাঠাতে পারি।"

---

User লিখছে

```vue
@input="emit('update:modelValue', newValue)"
```

অর্থাৎ

```
Child

↓

emit

↓

Parent
```

Event যাচ্ছে

```
update:modelValue

payload = "Akash Ali"
```

---

# Step 6: Parent receive করছে

মনে আছে? Vue convert করেছিল

```vue
@update:modelValue="username = $event"
```

এখন

```
$event = "Akash Ali"
```

তাই

```
username

=

"Akash Ali"
```

---

# পুরো Flow

```
Parent

username

↓

:modelValue

↓

Child

modelValue

↓

<input>

↓

User typing

↓

emit()

↓

update:modelValue

↓

Parent

username updated
```

---

# একটা বাস্তব উদাহরণ

ধরো তোমার মেয়ে আঁকছে।

```
বাবা (Parent)

↓

"এই নাও কাগজ"

↓

মেয়ে (Child)

↓

আঁকল

↓

"বাবা, এটা নাও"

↓

বাবা কাগজটা নিয়ে রাখল
```

এখানে

```
কাগজ

=

modelValue

↓

ফিরিয়ে দেওয়া

=

emit()
```

---

## এক লাইনে মনে রাখো

**`v-model` আসলে Vue-এর shorthand।**

```vue
v-model="username"
```

মানে Vue নিজে লিখে দেয়:

```vue
:modelValue="username"
@update:modelValue="username = $event"
```

**এই একটি লাইন বুঝে গেলে `v-model`-এর ৯০% concept পরিষ্কার হয়ে যায়।**
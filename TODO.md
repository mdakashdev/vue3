## Tomorrow / Next 
- TypeSctipt Implement korbo
- type er jonno akta alada folder banabo
- project setup with ts, component creat, define props and type interface use korbo others project a
- v-model niye kaj korbo
- emit niye jante hobe


## 20-07-2026

- v-model শুধু input field-এর value ধরার জন্য নয়, বরং UI এবং JavaScript-এর data-কে দুই দিক থেকে (two-way) sync রাখার জন্য ব্যবহার করা হয়।

- Example: 
যখন তুমি input-এ লিখবে:

```
Hello
```

তখন:

```js
name.value = "Hello";
```

আবার যদি JavaScript থেকে করো:

```js
name.value = "Hasan";
```

তাহলে input-এ স্বয়ংক্রিয়ভাবে **Hasan** দেখাবে।

অর্থাৎ sync দুই দিকেই হয়।

```text
Input  ─────────► ref(name)
  ▲                  │
  │                  ▼
  ◄───────────────────
```

### Custom Component-এর ক্ষেত্রেও একই

```vue
<BaseInput v-model="username" />
```
এখানে `v-model`-এর কাজ:

* Parent-এর `username` → Child-তে পাঠানো।
* Child-এ user কিছু লিখলে → Parent-এর `username` update করা।

---

মনে রাখার সহজ নিয়ম
- @input → User কিছু লিখেছে।
- $event.target.value → User কী লিখেছে সেটা বের করো।
- emit("update:modelValue", value) → সেই value Parent-কে পাঠিয়ে দাও।

```
parent a,
<BaseInput v-model="username" /> eitar equivalent hocche 
<BaseInput
  :modelValue="username"
  @update:modelValue="username = $event"
/>

orthar @update:modelValue eita diye emit dhorche and update korteche.

তাই মনে রাখো
✅ Parent → Child: modelValue prop দিয়ে value যায়।
✅ Child → Parent: emit("update:modelValue", value) দিয়ে update যায়।
```
---

> v-model : two-way binding

`v-model` হলো Vue-এর একটি directive, যা **two-way data binding** করার জন্য ব্যবহার করা হয়। অর্থাৎ, UI (যেমন input) এবং JavaScript-এর data একে অপরের সাথে স্বয়ংক্রিয়ভাবে sync থাকে।

### `v-model` কেন ব্যবহার করি?

### কীভাবে কাজ করে?

```vue
<input v-model="name">
```

এটি আসলে নিচের কোডের সংক্ষিপ্ত রূপ:

```vue
<input
  :value="name"
  @input="name = $event.target.value"
/>
```
---

> always kono kichu korte hole, age native element ke consider a niye asbe, actually jei kaj ta korbo seita, html element a kivabe hoi them implement korbe

### Custom Component-এর ক্ষেত্রে

```vue
<MyInput v-model="username" />
```

এটি Vue নিচের মতো করে পরিবর্তন করে:

```vue
<MyInput
  :modelValue="username"
  @update:modelValue="username = $event"
/>
```

তাই custom component-এ `v-model` ব্যবহার করতে হলে `modelValue` prop এবং `update:modelValue` event থাকতে হয়।

---

### সংক্ষেপে

`v-model` ব্যবহার করি কারণ এটি:

* Two-way data binding করে।
* কোড কম লিখতে হয়।
* Form handling সহজ করে।
* UI এবং data সবসময় sync রাখে।
* Custom component-এ parent ও child-এর মধ্যে value আদান-প্রদান সহজ করে।

**মনে রাখার সহজ নিয়ম:**

* `:value` → Data দেখায়।
* `@input` → Data পরিবর্তন করে।
* `v-model` → এই দুইটি কাজ একসাথে করে।




## 15-07-2026
- project name: vue 3 using composition api
- Parent component থেকে data receive করছে। defineProps
- props, project setup and ts implement

- project setup with typescript
- create component
- props receive using types

```
Project setup with TypeScript:
Follow: vue docs - https://vuejs.org/guide/quick-start.html
Install Node.js version ^22.18.0 || >=24.12.0
pnpm create vue@latest
```

1. Setup
In general think koro, ami kichui jani na about vue; but project create korte pari, sei project a ki folder, ki file ache seta o jani na
seta initial amar janar need nai. project setup er  jonno vue docs follow korlei install kora jai and akta perfect Scaffolding pabo. 
enough!

2. TS
TypeScript or without TypeScript
ami jodi TS install kori tobe - tobe assign value string er jaigai number dei tobe error dekhabe and inside component er vitor
interface likhte parbo, sei interface ke type hisabe use korte parbo. 

but without TS ei gulo korte parbo na 
```Exp1
const name = "John";
name = 123;
```

```Exp2
let name: string = "John";
name = 123;

interface Props {
  title: string;
  count?: number;
}
const props = defineProps<Props>();

<MyComponent title="Hello" count="abc" /> দিলে TypeScript error দেখাবে, কারণ count number হওয়া উচিত।
```

- typescript install (existing project);  existing project a install / migrate kora ektu kothin, tai initial project ke ts soho koro 
- aar jodi existing project big hoi, tobe ts soho project init kore, then component gulo dhire dhire ekhane niye aso (migrate)
- separate folder for types

3. Props
props recv korbo using props type



### 13-07-2026

### 09-07-2026

Done:
- ✓ Created BaseInput component
- ✓ Used Props

Next:
- BaseInput a jei pattern a props recv korechi, seta ki pattern, eikhane aar onno perfect ki patter use kora jai.
- TypeScript implement korte cai.
- vue 3 te Page (routing) implement korte hobe.
- css (design) implement korte hobe
- 

### Others

```text
Stack International Bangladesh 
React + Next.js	45–55%	50–60%	
Angular	15–20%	12–18%	
Vue.js + Nuxt	10–15%	10–15%	
```


React er framework next 
Vue er framework nuxt


ami Jodi stencil diye kono package / library banai seta ki , vue(nuxt), react(next) and angular a use korte parbo ?
হ্যাঁ, পারবে। আসলে Stencil.js-এর সবচেয়ে বড় সুবিধাই এটি।
Stencil দিয়ে যদি একটি component library/package বানাও, তাহলে সেটা:

✅ React (Next.js)
✅ Vue (Nuxt)
✅ Angular
✅ Svelte
✅ Astro
✅ এমনকি Plain HTML/JavaScript
—সব জায়গায় ব্যবহার করা যায়।

যদি npm UI Library বানাতে চাও
Ranking:
🥇 Stencil.js
🥈 Lit
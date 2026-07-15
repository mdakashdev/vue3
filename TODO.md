## Tomorrow / Next 
- TypeSctipt Implement korbo

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
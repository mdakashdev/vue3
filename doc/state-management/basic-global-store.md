# making basic global store

## Type Type store 

- Setup Store (eita korechi)
- Options Store

## install pinia

- global store use korar jonno pinia install kora lagbe
- https://pinia.vuejs.org/getting-started.html
- install pinia -  `pnpm add pinia`

## Create Stores

- Create a `stores` folder.
- Create store files inside it, for example, `state.ts`.
- Import `defineStore` from pinia and using `defineStore` 
- for state using ref, import form vue

## Registration & create state
- Import the store into the component where you want to use it.
- Destructure the required states and use the template.
- Example: `create-state.md`

## Create Actions / Method
- Follow create-action.md

## Create Computed method
- Pinia-এর terminology-তে এটা getter।
- getter/computed-এর জন্য reactive value pabar jonno - storeToRef use kora.
- Follow create-computed.md


# Important

## storeToRefs() কেন?

- যখন store থেকে property destructure করো:
- const { count, doubleNumber } = store ; তখন ref-এর reactive connection হারানোর সমস্যা হতে পারে।
- const store = useStateStore() ; → Store object-এর property সরাসরি ব্যবহার করলে: `storeToRefs() দরকার নেই।`
- actions/methods-এর জন্য storeToRefs() লাগে না


# Basic Tasks

1. Create global store --> `done`
2. Create state with initial value -> `done`
3. Export store in any component or pages --> `done`
4. Use store / read state in multiple component --> `done`
5. Update state using Actions / Methods - so define method in store; like - `increment and decrement` --> `done`
6. Using computed / getter / selector --> `done`


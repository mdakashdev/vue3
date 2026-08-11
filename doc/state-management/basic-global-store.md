# making basic global store

## install pinia

- global store use korar jonno pinia install kora lagbe
- https://pinia.vuejs.org/getting-started.html
- install pinia -  `pnpm add pinia`

## Create Stores

- Create a `stores` folder.
- Create store files inside it, for example, `state.ts`.
- Import `defineStore` from pinia and using `defineStore` 
- for state using ref, import form vue

## Registration
- Import the store into the component where you want to use it.
- Destructure the required states and use the template.
- Example: `create-state.md`

## Create Actions / Method
- Follow create-action.md

## Create Computed method
- Getter and Selector Approach
- Follow create-getter-and-selector.md

# Basic Tasks

1. Create global store --> `done`
2. Create state with initial value -> `done`
3. Export store in any component or pages --> `done`
4. Use store / read state in multiple component --> `done`
5. Update state using Actions / Methods - so define method in store; like - `increment and decrement` --> `done`
6. Using computed / getter / selector --> `pending`


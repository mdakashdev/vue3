# VUE 3

## Global Note 

1. Setup : 
   In general think koro, ami kichui jani na about vue; but project create korte pari, sei project a ki folder, ki file ache seta o jani na
   seta initial amar janar need nai. project setup er  jonno vue docs follow korlei install kora jai and akta perfect Scaffolding pabo.
   enough!
2. Re-usable component
    se jonno easy way hocche- html element tag use ke follow kora. like ami input component develop korte cai tobe -
    https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input ekhane sob attribut ache, eita dekhe dekhe kora jai.
3. like - <input type="text" name="name" /> eita jodi follow kori tobe hoi - <input :type="type" :name="name" />

# Application ready guideline

## 1. Build Vue App

- Project setup with TypeScript:
- Follow: vue docs - https://vuejs.org/guide/quick-start.html
- Install Node.js version ^22.18.0 || >=24.12.0
- pnpm create vue@latest
- note: ready hobar kono kichu dekhar dorkar nai, just dekhbo scafolding paichi and run hocche

## 2. Create Component

- kono kichu na vebei akta component create kore then seta ke akta page / main page import kore output dekha.
- src er vitor components folder er vitor.
- Component Doc: https://vuejs.org/guide/essentials/component-basics.html
- akta reusable component banate hole, native html element korlei hoi tahole easy develop kora jai.
- component registration / direct uses - ami cai component ta use korbo tobe, je kono page a jeye or component a jeye import kore use kora jai.


## 3. Props passing and rcv

- parent compnent theke props name diye pass korte hoi - like type="text" 
- child compoent a props recv korar jonno defineProps korte hoi
- aar typeSctipt er jonno interface diye props rcv kore defineProps a pass kore dilei hoi
- mane - props receive using types
- props niye @doc/prop.md te likha ache

## 4. Emit

- child theke parent a data rccv korar jonno - emit use kori
- emit niye @docs/emit.md te likha ache

## 5. v-model - Two way binding

- mane 2 dike thekei data update hobe, parent theke child and child theke parent.
- vue te easyliy kora jai v-model diye
- tow way niye bistarito deya ache @doc/tow-way-binding.md te.


## 6. Routing

- route er jonno `vue-router` install korte hobe
- router akta folder create kore, sekhane route create korte hobe form vue-router
- then app.vue / main a router-view use korlei pauwa jabe, then url/page-name use korlei hobe



# Feature Topics

## LATER 
- Component Register
- Type separate folder 

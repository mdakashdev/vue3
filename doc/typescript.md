# TypeScript

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
## making component
* Imagine HTML element, and all attributes
* then convert it, your customize component

## 

```html
<input
        type="text"
        name="first_name"
        placeholder="John Doe"
        readonly
        disabled
        required
>
<BaseInput
        label="Email"
        type="text"
        name="first_name"
        placeholder="John Doe"
        disabled="true"
        required="true"
        readonly="true"
/>
```
> then BaseInput component a jeye props gulo define kore input element er moddhe props bind korlei hobe.
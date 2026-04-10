import {$} from "bun"
await $`bunup`;
await $`bunx svelte-package -i src/svelte -o dist/svelte`;

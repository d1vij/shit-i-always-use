<script lang="ts">
import { onMount } from "svelte";

const { text }: { text: string } = $props();
let ref = $state<HTMLDivElement | null>(null);

onMount(() => {
    if (!ref) return;
    const commentElm = document.createComment(text);
    ref.replaceWith(commentElm);
});
</script>

<div bind:this={ref}></div>

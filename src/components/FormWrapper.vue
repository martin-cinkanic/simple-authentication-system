<script setup>
defineProps({
    label: {type: String, default: ''}
})
</script>
<template>
    <div class="flex flex-col gap-2 w-96">
        <span class="text-2xl font-semibold text-center text-neutral-800">{{ label }}</span>
        <form class="flex flex-col gap-4 p-4 rounded-md border border-neutral-200 w-full">
            <slot></slot>
        </form>
    </div>
</template>
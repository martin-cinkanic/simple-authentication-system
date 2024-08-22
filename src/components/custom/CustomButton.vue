<script setup>
defineProps({
    color: {
        type: String,
        default: 'sky',
        validator: (value) => ['sky', 'red'].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})
</script>
<template>
    <button 
    class="px-2 py-2 text-white font-semibold rounded-md whitespace-nowrap"
    :class="{
            'saturate-0 opacity-30 cursor-not-allowed': disabled,
            [`bg-${color}-500`]: 1,
            [`hover-bg-${color}-600`]: !disabled,
            'hover:brightness-110': !disabled,
        }"
     :disabled="disabled" >
        <slot></slot>
    </button>
</template>
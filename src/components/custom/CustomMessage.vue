<script setup>
defineProps({
    msg: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'success',
        validator: (value) => ['success', 'error'].includes(value)
    }
})
</script>
<template>
    <div v-if="msg" class="w-full rounded-md p-2 border"
        :class="{ 'text-red-500 border border-red-500 bg-red-100': type == 'error', 'text-emerald-500 border border-emerald-500 bg-emerald-100': type == 'success' }">
        <span>{{ msg }}</span>
    </div>
</template>
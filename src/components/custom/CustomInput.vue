<script setup>
defineProps({
    label: {type: String, default: ''},
    type: {type: String, default: ''},
    error: {type: String, default: ''},
    required: {type: String, default: ''},
    attrs:{type: Object,
        default: () => ({})},
})
const model = defineModel('model')
</script>
<template>
    <div class="flex flex-col gap-1">
        <span class="font-semibold text-neutral-600">{{ label }}</span>
        <input v-model="model" v-bind="attrs" :type="type" class="py-1 px-2 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600"/>
        <span class="text-sm text-red-500">{{ error }}</span>
    </div>
</template>
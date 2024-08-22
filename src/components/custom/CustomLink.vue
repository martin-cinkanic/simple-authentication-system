<script setup>
defineProps({
    routeName: {
        type: String,
        required: true,
        default: ''
    }
})
</script>
<template>
    <router-link :to="{ name: routeName }" class="text-sky-500 hover:text-sky-600">
        <slot></slot>
    </router-link>

</template>
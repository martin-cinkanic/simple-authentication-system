<script setup>
import CustomButton from '../components/custom/CustomButton.vue';
import { useAuthStore } from '../stores/authStore';
const { user, logout } = useAuthStore()
</script>
<template>
  <main>
    <div class="flex flex-col gap-4 items-center justify-center p-8">
      <h1 class="text-4xl text-center">Welcome, {{ user?.name }}!</h1>
      <CustomButton color="red" @click="logout">Log out</CustomButton>
    </div>
  </main>
</template>

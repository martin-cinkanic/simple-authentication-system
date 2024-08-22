<script setup>
import { ref, watch } from 'vue';
import * as yup from 'yup';
import CustomButton from './custom/CustomButton.vue';
import CustomInput from './custom/CustomInput.vue';
import FormWrapper from './FormWrapper.vue';
import { useAuthStore } from '../stores/authStore';
import { useForm } from 'vee-validate';
import CustomMessage from './custom/CustomMessage.vue';
import CustomLink from './custom/CustomLink.vue';
import { InvalidLoginOrEmail } from '../utils/errors';

const { login } = useAuthStore();

const schema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    password: yup.string().required('Password is required')
});

const { meta, values, errors, defineField } = useForm({
    validationSchema: schema,
});


const [email] = defineField('email');
const [password] = defineField('password');

const loginError = ref('');

const loginUser = () => {
    try {
        login(email.value, password.value);
    } catch (error) {
        if (error instanceof InvalidLoginOrEmail) {
            loginError.value = error?.message;
        } else {
            loginError.value = 'An unexpected error occurred. Please try again.';

        }
    }
}
watch(values, () => {
    if (loginError.value != '') {
        loginError.value = '';
    }
})
</script>
<template>
    <FormWrapper label="Login" @submit.prevent="loginUser">
        <CustomInput v-model:model="email" label="Email" type="text" :error="errors.email" />
        <CustomInput v-model:model="password" label="Password" type="password"
            :error="errors.password" />
        <CustomMessage :msg="loginError" type="error" />
        <CustomButton color="sky" :disabled="!meta.valid" type="submit">Log in</CustomButton>
        <div class="flex flex-col items-center justify-center">
            <span>Don't have an account yet?</span>
            <CustomLink route-name="register">Sign Up</CustomLink>
        </div>
    </FormWrapper>
</template>
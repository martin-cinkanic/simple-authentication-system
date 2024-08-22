<script setup>
import { ref, watch } from 'vue';
import * as yup from 'yup';
import CustomButton from './custom/CustomButton.vue';
import CustomInput from './custom/CustomInput.vue';
import FormWrapper from './FormWrapper.vue';
import { useForm } from 'vee-validate';
import { useAuthStore } from '../stores/authStore';
import CustomMessage from './custom/CustomMessage.vue';
import { EmailAlreadyRegistered } from '../utils/errors';
import CustomLink from './custom/CustomLink.vue';

const { register } = useAuthStore();

const schema = yup.object({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[\W_]/, 'Password must contain at least one special character'),
    passwordRepeat: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match')
});

const { meta, errors, defineField } = useForm({
    validationSchema: schema,
});


const [name] = defineField('name');
const [email] = defineField('email');
const [password] = defineField('password');
const [passwordRepeat] = defineField('passwordRepeat');

const registerError = ref('');

const registerUser = () => {
    try {
        register(name.value, email.value, password.value);
    } catch (error) {
        if (error instanceof EmailAlreadyRegistered) {
            registerError.value = error?.message;
        } else {
            registerError.value = 'An unexpected error occurred. Please try again.';

        }

    }
}
watch(email, () => {
    if (registerError.value != '') {
        registerError.value = '';
    }
})
</script>
<template>
    <FormWrapper label="Register" @submit.prevent="registerUser">
        <CustomInput v-model:model="name" label="Name" type="text" :error="errors.name" />
        <CustomInput v-model:model="email" label="Email" type="text" :error="errors.email" />
        <CustomInput v-model:model="password" label="Password" type="password" :error="errors.password" />
        <CustomInput v-model:model="passwordRepeat" label="Repeat Password" type="password"
            :error="errors.passwordRepeat" />
        <CustomMessage :msg="registerError" type="error" />
        <CustomButton color="sky" :disabled="!meta.valid" type="submit">Sign Up</CustomButton>
        <div class="flex flex-col items-center justify-center">
            <span>Already have an account?</span>
            <CustomLink route-name="login">Sign In</CustomLink>
        </div>
    </FormWrapper>
</template>
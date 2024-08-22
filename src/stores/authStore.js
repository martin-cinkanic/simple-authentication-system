import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../utils/helpers';
import { EmailAlreadyRegistered, InvalidLoginOrEmail } from '../utils/errors';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);

  const isAuthenticated = computed(() => !!user.value);
  const router = useRouter();

  // Actions
  function login(email, password) {
    const users = loadUsers();

    const foundUser = users?.find(
      (u) => u.email == email && u.password == password
    );
    if (foundUser == undefined) {
      throw new InvalidLoginOrEmail();
    }
    saveToLocalStorage('user', foundUser);
    user.value = foundUser;

    router.push({ name: 'dashboard' });
  }

  function loadUsers() {
    const users = getFromLocalStorage('users');
    console.log('users', users);
    return users != null ? users : [];
  }

  function register(name, email, password) {
    const users = loadUsers();

    // Check if the email already exists
    const emailExists = users.some((u) => u.email === email);
    if (emailExists) {
      throw new EmailAlreadyRegistered();
    }
    //Add user to the list of users
    users.push({ name, email, password });
    saveToLocalStorage('users', users);

    login(email, password);
  }

  function logout() {
    user.value = null;
    removeFromLocalStorage('user');
    router.push({ name: 'login' });
  }

  function loadUser() {
    user.value = getFromLocalStorage('user');
  }

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    loadUser,
  };
});

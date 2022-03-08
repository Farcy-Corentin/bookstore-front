<script setup>
import {ref} from "vue";
import { useRouter } from 'vue-router'

import auth from '../store/AuthStore.js'

const router = useRouter()

const form = ref({
  email: null,
  password: null
})

async function onSubmit () {
  try {
    await auth.login(form.value)
    await auth.fetchUser()
    await router.push('/')
  } catch (e) {
    console.warn(e)
  }
}
</script>

<template>
<div class="wrapper">
  <form action="" @submit.prevent="onSubmit">
    <h2 class="h3 mb-3 fw-normal text-center">Sign in</h2>
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" v-model="form.email" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating mb-2">
      <input type="password" class="form-control" id="floatingPassword" v-model="form.password" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
      <button class="btn btn-lg btn-primary w-100" type="submit">Se connecter</button>
  </form>
</div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>

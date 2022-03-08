<script setup>
import {ref} from "vue";
import auth from "../store/AuthStore";
import {useRouter} from "vue-router";

const form = ref({
  name: null,
  email: null,
  password: null
})

const router = useRouter()

async function onSubmit () {
  try {
    await auth.register(form.value)
    await router.push('/')
  } catch (e) {
    console.warn(e)
  }
}
</script>

<template>
  <div class="wrapper">
    <form action="" @submit.prevent="onSubmit">
      <h2 class="h3 mb-3 fw-normal text-center">Sign up</h2>
      <div class="form-floating mb-2">
        <input type="text" class="form-control" id="floatingName" v-model="form.name" placeholder="Password">
        <label for="floatingName">Name</label>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" v-model="form.email" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating mb-2">
        <input type="password" class="form-control" id="floatingPassword" v-model="form.password" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
      <button class="btn btn-lg btn-primary w-100" type="submit">S'enregistrer</button>
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

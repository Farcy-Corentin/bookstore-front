<script setup>

import {RouterLink, RouterView, useRouter} from 'vue-router'

import auth from './store/AuthStore.js'

const router = useRouter()
async function fetchUser() {
  await auth.fetchUser()
}

async function logout() {
  await auth.logout()
  await router.push('/')
}

const {user, isLogged} = auth.useAuth()

fetchUser()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
                  aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <RouterLink class="navbar-brand" to="/">Navbar</RouterLink>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/">Home</RouterLink>
              </li>
              <li v-if="!isLogged" class="nav-item">
                <RouterLink class="nav-link" to="/login">Login</RouterLink>
              </li>
              <li v-if="!isLogged" class="nav-item">
                <RouterLink class="nav-link" to="/register">Register</RouterLink>
              </li>
              <li v-if="isLogged" class="nav-item">
                <a class="nav-link" @click="logout">Logout</a>
              </li>
              <li v-if="isLogged" class="nav-item">
                <RouterLink class="nav-link" to="/profile">{{ user.name }}</RouterLink>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <RouterView/>
</template>

<style>

</style>

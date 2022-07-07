<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <router-link :to="{name: 'user'}"><h1>leaf</h1></router-link>
    <div>
      <button>menu</button>
    </div>
  </header>

  <RouterView />
</template>

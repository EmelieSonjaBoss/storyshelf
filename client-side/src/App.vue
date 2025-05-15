<script setup lang="ts">
import { RouterView } from "vue-router";
import MainHeader from "./components/MainHeader.vue";
</script>

<template>
  <MainHeader />
  <transition name="fade" mode="out-in">
    <RouterView />
  </transition>
</template>

<style scoped>
</style>

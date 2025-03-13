<script setup lang="ts">
  import ExceptionHandlerProvider from "./providers/ExceptionHandlerProvider.vue";
</script>

<template>
  <UApp>
    <ExceptionHandlerProvider>
      <main class="px-3 pt-20">
        <RouterView />
      </main>
    </ExceptionHandlerProvider>
  </UApp>
</template>

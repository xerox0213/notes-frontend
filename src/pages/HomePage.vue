<script setup lang="ts">
  import { useUserStore } from "../stores/userStore";

  const userStore = useUserStore();
</script>

<template>
    <pre>
        {{ userStore.user }}
    </pre>
</template>

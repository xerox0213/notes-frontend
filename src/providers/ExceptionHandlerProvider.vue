<script lang="ts">
  import { type InjectionKey, provide } from "vue";

  import { CsrfMismatchException } from "../exceptions";
  export const key = Symbol() as InjectionKey<(exception: unknown) => void>;
</script>

<script setup lang="ts">
  // eslint-disable-next-line no-undef
  const toast = useToast();

  const handleException = (exception: unknown) => {
    if (exception instanceof CsrfMismatchException) {
      toast.add({
        title: "Uh oh! Something went wrong.",
        description: "Your sessin has expired",
        color: "error",
        icon: "i-lucide-wifi",
      });
    } else if (exception instanceof TypeError) {
      toast.add({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        color: "error",
        icon: "i-lucide-wifi",
      });
    }
  };

  provide(key, handleException);
</script>

<template>
  <slot />
</template>

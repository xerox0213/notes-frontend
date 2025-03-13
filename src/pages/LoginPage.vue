<script lang="ts">
  import { reactive } from "vue";
  import { z } from "zod";
  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Must be at least 3 letters"),
  });

  export type LoginSchema = z.output<typeof schema>;
</script>

<script setup lang="ts">
  const form = reactive<Partial<LoginSchema>>({
    email: undefined,
    password: undefined,
  });
</script>

<template>
  <UForm
    :schema="schema"
    :state="form"
    class="mx-auto max-w-md rounded-(--ui-radius) border border-(--ui-border-accented) p-7"
  >
    <h1 class="text-center text-2xl font-bold">Sign in</h1>
    <div class="space-y-3">
      <UFormField label="Email" name="email">
        <UInput class="w-full" type="email" />
      </UFormField>

      <UFormField label="Password" name="email">
        <UInput class="w-full" type="password" />
      </UFormField>
    </div>

    <div class="mt-6 space-y-3">
      <UButton
        type="submit"
        color="primary"
        size="lg"
        class="flex w-full items-center justify-center"
      >
        Sign in
      </UButton>

      <UButton
        to="/register"
        color="neutral"
        size="lg"
        class="flex w-full justify-center"
      >
        No account yet ? Sign up
      </UButton>
    </div>
  </UForm>
</template>

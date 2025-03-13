<script lang="ts">
  import { z } from "zod";

  const schema = z.object({
    first_name: z.string().min(3, "Must be at least 3 characters"),
    last_name: z.string().min(3, "Must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Must be at least 3 characters"),
  });

  export type RegistrationSchema = z.output<typeof schema>;
</script>

<script setup lang="ts"></script>

<template>
  <UForm
    :validate-on="['change']"
    class="mx-auto max-w-md rounded-(--ui-radius) border border-(--ui-border-accented) p-7"
  >
    <h1 class="text-center text-2xl font-bold">Sign up</h1>

    <div class="space-y-3">
      <UFormField label="First name" name="first_name">
        <UInput class="w-full" />
      </UFormField>

      <UFormField label="Last name" name="last_name">
        <UInput class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput class="w-full" type="email" />
      </UFormField>

      <UFormField label="Password" name="password">
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
        Sign up
      </UButton>

      <UButton
        to="/login"
        color="neutral"
        size="lg"
        class="flex w-full justify-center"
      >
        Already an account ? Sign in
      </UButton>
    </div>
  </UForm>
</template>

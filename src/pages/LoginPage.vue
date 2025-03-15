<script lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { inject, reactive, ref } from "vue";
  import { z } from "zod";

  import { getUser, initSession, login } from "../api/auth";
  import {
    InvalidLoginException,
    LoginValidationException,
  } from "../exceptions";
  import { router } from "../plugins/router";
  import { key } from "../providers/ExceptionHandlerProvider.vue";
  import { useUserStore } from "../stores/userStore";
  import type { LoginValidationError } from "../types";
  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Must be at least 3 letters"),
  });

  export type LoginSchema = z.output<typeof schema>;
</script>

<script setup lang="ts">
  const toast = useToast();

  const userStore = useUserStore();

  const form = reactive<Partial<LoginSchema>>({
    email: undefined,
    password: undefined,
  });

  const loading = ref(false);

  const apiValidationErrors = ref<Required<LoginValidationError["errors"]>>({
    email: [],
    password: [],
  });

  const handleException = inject(key) as (exception: unknown) => void;

  const onSubmit = async (event: FormSubmitEvent<LoginSchema>) => {
    try {
      loading.value = true;
      await initSession();
      await login(event.data);
      userStore.user = await getUser();
      showSuccess();
      router.push({ name: "home" });
    } catch (exception) {
      if (exception instanceof LoginValidationException) {
        setValidationApiErrors(exception.reason.errors);
      } else if (exception instanceof InvalidLoginException) {
        showInvalidLoginException();
      } else {
        handleException(exception);
      }
    } finally {
      loading.value = false;
    }
  };

  const showSuccess = () => {
    toast.add({
      title: "Successful login.",
      description: "You have successfully logged in.",
      icon: "i-lucide-party-popper",
    });
  };

  const showInvalidLoginException = () => {
    toast.add({
      title: "Uh, oh! Something went wrong.",
      description: "Invalid email or password.",
      color: "error",
      icon: "i-lucide-circle-alert",
    });
  };

  const setValidationApiErrors = (errors: LoginValidationError["errors"]) => {
    for (const key in errors) {
      const field = key as keyof LoginValidationError["errors"];
      apiValidationErrors.value[field] = errors[field] as string[];
    }
  };
</script>

<template>
  <UForm
    :schema="schema"
    :state="form"
    :validate-on="['change']"
    class="mx-auto max-w-md rounded-(--ui-radius) border border-(--ui-border-accented) p-7"
    @submit="onSubmit"
  >
    <h1 class="text-center text-2xl font-bold">Sign in</h1>
    <div class="space-y-3">
      <UFormField label="Email" name="email">
        <UInput
          v-model="form.email"
          class="w-full"
          type="email"
          @change="apiValidationErrors.email = []"
        />
        <template #error>
          <p v-for="(error, index) in apiValidationErrors.email" :key="index">
            {{ error }}
          </p>
        </template>
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          v-model="form.password"
          class="w-full"
          type="password"
          @change="apiValidationErrors.password = []"
        />
        <template #error>
          <p
            v-for="(error, index) in apiValidationErrors.password"
            :key="index"
          >
            {{ error }}
          </p>
        </template>
      </UFormField>
    </div>

    <div class="mt-6 space-y-3">
      <UButton
        :loading="loading"
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

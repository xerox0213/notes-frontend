<script lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { inject, reactive, ref } from "vue";
  import { z } from "zod";

  import { register } from "../api/auth";
  import { RegistrationException } from "../exceptions";
  import { key } from "../providers/ExceptionHandlerProvider.vue";
  import type { RegistrationError } from "../types";

  const schema = z.object({
    first_name: z.string().min(3, "Must be at least 3 characters"),
    last_name: z.string().min(3, "Must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Must be at least 3 characters"),
  });

  export type RegistrationSchema = z.output<typeof schema>;
</script>

<script setup lang="ts">
  const handleException = inject(key) as (exception: unknown) => void;

  const loading = ref(false);

  const toast = useToast();

  const form = reactive<Partial<RegistrationSchema>>({
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    password: undefined,
  });

  const apiErrors = ref<Required<RegistrationError["errors"]>>({
    first_name: [],
    last_name: [],
    email: [],
    password: [],
  });

  const onSubmit = async (event: FormSubmitEvent<RegistrationSchema>) => {
    try {
      loading.value = true;
      await register(event.data);
      showSuccess();
      resetForm();
    } catch (exception) {
      if (exception instanceof RegistrationException) {
        setApiErrors(exception.reason.errors);
      } else {
        handleException(exception);
      }
    } finally {
      loading.value = false;
    }
  };

  const showSuccess = () => {
    toast.add({
      title: "Successful registration",
      description: "You have successfully registered.",
      icon: "i-lucide-party-popper",
    });
  };

  const resetForm = () => {
    form.last_name = "";
    form.first_name = "";
    form.email = "";
    form.password = "";
  };

  const setApiErrors = (errors: RegistrationError["errors"]) => {
    for (const key in errors) {
      const field = key as keyof RegistrationError["errors"];
      apiErrors.value[field] = errors[field] as string[];
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
    <h1 class="text-center text-2xl font-bold">Sign up</h1>

    <div class="space-y-3">
      <UFormField label="First name" name="first_name">
        <UInput
          v-model="form.first_name"
          class="w-full"
          @change="apiErrors.first_name = []"
        />
        <template #error>
          <p v-for="(error, index) in apiErrors.first_name" :key="index">
            {{ error }}
          </p>
        </template>
      </UFormField>

      <UFormField label="Last name" name="last_name">
        <UInput
          v-model="form.last_name"
          class="w-full"
          @change="apiErrors.last_name = []"
        />
        <template #error>
          <p v-for="(error, index) in apiErrors.last_name" :key="index">
            {{ error }}
          </p>
        </template>
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput
          v-model="form.email"
          class="w-full"
          type="email"
          @change="apiErrors.email = []"
        />
        <template #error>
          <p v-for="(error, index) in apiErrors.email" :key="index">
            {{ error }}
          </p>
        </template>
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          v-model="form.password"
          class="w-full"
          type="password"
          @change="apiErrors.password = []"
        />
        <template #error>
          <p v-for="(error, index) in apiErrors.password" :key="index">
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

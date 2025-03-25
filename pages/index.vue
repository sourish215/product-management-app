<script setup lang="ts">
// Set page title dynamically
useHead({
  title: "Home",
});
</script>

<template>
  <div>
    <v-container class="text-center">
      <h1 class="text-h3 my-6">Product Management System</h1>
      <p class="text-body-1 mb-6">
        Welcome to the Product Management System. Use the navigation to manage
        your products.
      </p>

      <NuxtLink
        to="/products"
        class="text-decoration-none text-h6 bg-blue-lighten-1 text-white pa-2 rounded"
      >
        View Products
      </NuxtLink>
    </v-container>
  </div>
</template>

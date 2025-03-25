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

      <v-btn
        color="primary"
        size="large"
        to="/products"
        class="ma-2 text-h6 text-none"
      >
        View Products
      </v-btn>
    </v-container>
  </div>
</template>

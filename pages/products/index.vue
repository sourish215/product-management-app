<script setup>
import ProductList from "@/components/ProductList.vue";
// Set page title dynamically
useHead({
  title: "Product List",
});
</script>

<template>
  <div>
    <v-container>
      <h1 class="text-h4 my-4">Product Management</h1>
      <ProductList />
    </v-container>
  </div>
</template>

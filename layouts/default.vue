<template>
  <v-app>
    <v-app-bar app color="primary" class="px-6" dark>
      <v-app-bar-title>
        <NuxtLink to="/" class="text-decoration-none text-white">
          Product Management
        </NuxtLink>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <NuxtLink
        to="/"
        active-class="active-link"
        class="text-decoration-none text-h6 text-white default-link mr-4"
        >Home</NuxtLink
      >
      <NuxtLink
        to="/products"
        active-class="active-link"
        class="text-decoration-none text-h6 text-white default-link"
      >
        Products
      </NuxtLink>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <v-footer app padless>
      <v-container>
        <div class="text-center">
          &copy; {{ new Date().getFullYear() }} — Product Management System
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style lang="css" scoped>
.default-link {
  transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  opacity: 0.8;
}

.active-link {
  color: white !important;
  opacity: 1;
}
</style>

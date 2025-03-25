<script setup lang="ts">
import { useDateFormat } from "~/composables/useDateFormat";
import type { Product } from "~/types/Product";

const route = useRoute();
const router = useRouter();

const { formatDate } = useDateFormat();

const product = ref<Product>({} as Product);

// Fetch product data using id
const getProductById = async () => {
  try {
    product.value = await $fetch(`/api/products/${route.params.id}`);
  } catch (error) {
    console.error("Error fetching product:", error);
    // Redirect to product list page if product not found
    router.push("/products");
  }
};

// Set page title dynamically
useHead({
  title: () => product.value.name || "Product Details",
});

// Format date string for display
const formatDateString = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return formatDate(date);
};

onMounted(() => {
  getProductById();
});
</script>

<template>
  <div>
    <v-container>
      <v-card class="mx-auto my-4" max-width="600">
        <v-card-title class="text-h4 mb-4">
          {{ product.name }}
        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-currency-usd" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Price</v-list-item-title>
              <v-list-item-subtitle>
                ${{ product.price?.toFixed(2) }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-package-variant" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Quantity</v-list-item-title>
              <v-list-item-subtitle>
                {{ product.quantity }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-cash-multiple" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Total Amount</v-list-item-title>
              <v-list-item-subtitle>
                ${{ product.total_amount?.toFixed(2) }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-calendar-plus" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Created At</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDateString(product.created_at ?? "") }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-calendar-edit" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Last Updated</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDateString(product.updated_at ?? "") }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            class="text-none text-body-1"
            @click="$router.push('/products')"
          >
            Back to List
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

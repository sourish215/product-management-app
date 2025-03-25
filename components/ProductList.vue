<script setup lang="ts">
import type { VForm } from "vuetify/components";
import { useDateFormat } from "~/composables/useDateFormat";
import type { Product, ProductInput } from "~/types/Product";
// Page title
useHead({
  title: "Product List",
});

const router = useRouter();

const { formatDate } = useDateFormat();

const products = ref<Product[]>([]);
const dialog = ref(false);
const deleteDialog = ref(false);
const valid = ref(false);
const form = ref<VForm | null>(null);

// Default form item
const defaultProductItem: ProductInput = {
  name: "",
  price: 0,
  quantity: 0,
};

const editedProduct = ref<Partial<Product>>({ ...defaultProductItem });
const deleteProduct = ref<Partial<Product>>({ ...defaultProductItem });
const editedProductIndex = ref(-1);

const headers = [
  { title: "Name", key: "name" },
  { title: "Price", key: "price" },
  { title: "Quantity", key: "quantity" },
  { title: "Total Amount", key: "total_amount" },
  { title: "Created At", key: "created_at" },
  { title: "Updated At", key: "updated_at" },
  { title: "Actions", key: "actions", sortable: false },
];

const formTitle = computed(() => {
  return editedProductIndex.value === -1 ? "New Product" : "Edit Product";
});

const loading = ref(false);

// Fetch products from API
const getProducts = async () => {
  loading.value = true;
  try {
    products.value = await $fetch("/api/products");
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

// Format date for display
const formatDateString = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return formatDate(date);
};

// Open dialog for adding/editing product
const openProductDialog = (item?: Product) => {
  if (item) {
    editedProductIndex.value = products.value.findIndex(
      (p) => p.id === item.id
    );
    editedProduct.value = { ...item };
  } else {
    editedProductIndex.value = -1;
    editedProduct.value = { ...defaultProductItem };
  }
  dialog.value = true;
};

// Close dialog
const closeDialog = () => {
  dialog.value = false;
  // Wait for dialog close animation to complete
  setTimeout(() => {
    editedProduct.value = { ...defaultProductItem };
    editedProductIndex.value = -1;
  }, 300);
};

// Create or update product
const handleSaveProduct = async () => {
  if (form.value && !form.value.validate()) return;

  try {
    if (editedProductIndex.value > -1) {
      // Update existing product
      const id = editedProduct.value.id;
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct.value),
      });
    } else {
      // Create new product
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct.value),
      });
    }

    closeDialog();
    getProducts();
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

// Confirm delete
const confirmDeleteProduct = (item: Product) => {
  deleteProduct.value = item;
  deleteDialog.value = true;
};

// Delete product
const handleDeleteProduct = async () => {
  try {
    await fetch(`/api/products/${deleteProduct.value.id}`, {
      method: "DELETE",
    });

    deleteDialog.value = false;
    getProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

function onProductClick(id?: string) {
  if (!id) {
    return;
  }
  router.push(`/products/${id}`);
}

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div>
    <!-- Product Table -->
    <v-data-table
      :headers="headers"
      :items="products"
      :loading="loading"
      :items-per-page="5"
      :items-per-page-options="[5, 10, 15]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2 text-none text-body-1"
            @click="openProductDialog()"
          >
            Add Product
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
      </template>

      <template v-slot:item.name="{ item }">
        <span class="clickable-item" @click="onProductClick(item.id)">
          {{ item.name }}
        </span>
      </template>

      <template v-slot:item.price="{ item }">
        ${{ (item.price ?? 0).toFixed(2) }}
      </template>

      <template v-slot:item.total_amount="{ item }">
        ${{ (item.total_amount ?? 0).toFixed(2) }}
      </template>

      <template v-slot:item.created_at="{ item }">
        {{ formatDateString(item.created_at ?? "") }}
      </template>

      <template v-slot:item.updated_at="{ item }">
        {{ formatDateString(item.updated_at ?? "") }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          color="#1E88E5"
          @click="openProductDialog(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="confirmDeleteProduct(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- Product Form Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedProduct.name"
                    label="Product Name"
                    required
                    :rules="[(v) => !!v || 'Name is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.number="editedProduct.price"
                    label="Price"
                    type="number"
                    prefix="$"
                    required
                    :rules="[
                      (v) => !!v || 'Price is required',
                      (v) => v > 0 || 'Price must be greater than 0',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.number="editedProduct.quantity"
                    label="Quantity"
                    type="number"
                    required
                    :rules="[
                      (v) => !!v || 'Quantity is required',
                      (v) => v >= 0 || 'Quantity must be positive',
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1 text-none"
            variant="text"
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-darken-1 text-none"
            variant="text"
            @click="handleSaveProduct"
            :disabled="!valid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Delete Product</v-card-title>
        <v-card-text>
          Are you sure you want to delete "{{ deleteProduct.name }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1 text-none"
            variant="text"
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red-darken-1 text-none"
            variant="text"
            @click="handleDeleteProduct"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.clickable-item {
  cursor: pointer;
}

.clickable-item:hover {
  color: #1e88e5;
}
</style>

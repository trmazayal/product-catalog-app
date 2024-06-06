<script setup>
import { useProductStore } from '@/stores/product';
import { onMounted } from 'vue';

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});

const goToPage = async (page) => {
  if (page > 0 && page <= productStore.totalPages) {
    await productStore.goToPage(page);
  }
};

const getPaginationRange = () => {
  const totalPages = productStore.totalPages;
  const currentPage = productStore.currentPage;
  const range = 2;
  let start = Math.max(currentPage - range, 1);
  let end = Math.min(currentPage + range, totalPages);

  if (currentPage - range < 1) {
    end = Math.min(end + (range - (currentPage - 1)), totalPages);
  }

  if (currentPage + range > totalPages) {
    start = Math.max(start - (range - (totalPages - currentPage)), 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto p-4 text-center">
    <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">List of Products</h1>
    <div class="mt-4 flex justify-center">
      <NuxtLink to="/products/create" class="mt-4 px-3 py-1 text-sm text-white bg-green-600 rounded-md">Create Product</NuxtLink>
    </div>
  </div>

  <div class="max-w-screen-xl mx-auto p-4">
    <div v-if="productStore.loading" class="flex justify-center">
      <div class="loader"></div> <!-- Loading spinner -->
    </div>
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <template v-for="product in productStore.products" :key="product.id">
        <div class="bg-white border border-gray-100 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <img
              :src="product.image"
              class="w-full h-48 object-cover object-center"
              alt="Product Image"
              @error="event => event.target.src = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=338&ext=jpg'"
            />
            <h2 class="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{{ product.title }}</h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ product.description }}</p>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-lg font-semibold text-gray-800 dark:text-white">{{ product.price }}</span>
            <NuxtLink :to="'/products/' + product.id" class="px-3 py-1 text-sm text-white bg-blue-700 rounded-md">View</NuxtLink>
          </div>
        </div>
      </template>
    </div>

    <nav aria-label="Page navigation example" class="mt-4 flex justify-center space-x-2">
      <ul class="inline-flex -space-x-px text-base h-10">
        <li>
          <button @click="goToPage(productStore.currentPage - 1)" :disabled="productStore.currentPage === 1" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        <li v-for="page in getPaginationRange()" :key="page">
          <button @click="goToPage(page)" :class="{'text-blue-600 border border-gray-300 bg-blue-50': page === productStore.currentPage, 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700': page !== productStore.currentPage, 'dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === productStore.currentPage && page !== 1}" class="flex items-center justify-center px-4 h-10">{{ page }}</button>
        </li>
        <li>
          <button @click="goToPage(productStore.currentPage + 1)" :disabled="productStore.currentPage === productStore.totalPages" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

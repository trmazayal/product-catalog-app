<script>
export default {
  data() {
    return {
      products: [],
      currentPage: 1,
      totalPages: 0,
    };
  },
  async mounted() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const runtimeConfig = useRuntimeConfig();
      const products = await $fetch(runtimeConfig.public.baseUrl + `/products?page=${this.currentPage}&limit=10`);
      const allProducts = await $fetch(runtimeConfig.public.baseUrl + '/products');
      this.products = products;
      this.totalPages = Math.ceil(allProducts.length / 10);
    },
    async goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        await this.fetchProducts();
      }
    },
  },
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto p-4 text-center">
    <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">Products</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-400">List of products</p>
  </div>

  <div class="max-w-screen-xl mx-auto p-4">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <template v-for="product in products" :key="product.id">
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
    <div class="mt-4 flex justify-center space-x-2">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 text-sm text-white bg-blue-700 rounded-md disabled:bg-gray-400"
      >
        Previous
      </button>
      <span class="text-lg text-gray-800 dark:text-white">{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 text-sm text-white bg-blue-700 rounded-md disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  </div>
</template>

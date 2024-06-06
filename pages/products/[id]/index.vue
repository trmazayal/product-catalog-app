<script>
  export default {
    data () {
      return {
        product: []
      }
    },
    async mounted() {
      const runtimeConfig = useRuntimeConfig()
      this.product = await $fetch(runtimeConfig.public.baseUrl + '/products/' + this.$route.params.id)
    },
  }
</script>

<template>
<div class="max-w-screen-xl mx-auto p-4 flex items-center relative">
  <NuxtLink to="/products" class="px-3 py-1 text-sm text-white bg-blue-700 rounded-md mr-auto">Back to Products</NuxtLink>
  <h1 class="text-3xl font-semibold text-gray-800 dark:text-white absolute left-1/2 transform -translate-x-1/2">Product Detail</h1>
</div>


  <div class="max-w-screen-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <div class="flex flex-col items-center">
      <img :src="product.image"
          alt="Product Image"
          class="w-full max-w-xs rounded-lg shadow-md mb-6"
          @error="event => event.target.src = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=338&ext=jpg'">
      <h1 class="text-3xl font-semibold text-gray-800 dark:text-white mb-2">{{ product.title }}</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ product.description }}</p>
      <p class="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">$ {{ product.price }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Created at: {{ new Date(product.created_at).toLocaleString() }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Updated at: {{ new Date(product.updated_at).toLocaleString() }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">Product ID: {{ product.id }}</p>
    </div>
  </div>


  <!-- update product -->
  <div class="max-w-screen-xl mx-auto p-4 mt-4">
    <a :href="'/products/' + product.id + '/update'" class="px-3 py-1 text-sm text-white bg-green-600 rounded-md">Update Product</a>
  </div>
</template>

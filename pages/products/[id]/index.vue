<script setup>
import { useProductStore } from '@/stores/product';
import { useRouter, useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';

const route = useRoute();
const router = useRouter();
const store = useProductStore();

// Fetch product on mount
onMounted(async () => {
    await store.fetchProduct(route.params.id);
});

const deleteProduct = async () => {
    const confirmation = confirm("Are you sure you want to delete this product?");
    if (confirmation) {
        try {
            await store.deleteProduct(store.product.id);
            router.push('/products');
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("There was an error deleting the product. Please try again.");
        }
    }
};
</script>

<template>
<div class="max-w-screen-xl mx-auto p-4 flex items-center relative">
    <NuxtLink to="/products" class="px-3 py-1 text-sm text-white bg-blue-700 rounded-md mr-auto">Back to Products</NuxtLink>
    <h1 class="text-3xl font-semibold text-gray-800 dark:text-white absolute left-1/2 transform -translate-x-1/2">Product Detail</h1>
</div>

<div class="max-w-screen-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <div class="flex flex-col items-center">
        <img :src="store.product.image"
             alt="Product Image"
             class="w-full max-w-xs rounded-lg shadow-md mb-6"
             @error="event => event.target.src = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=338&ext=jpg'">
        <h1 class="text-3xl font-semibold text-gray-800 dark:text-white mb-2">{{ store.product.title }}</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ store.product.description }}</p>
        <p class="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">$ {{ store.product.price }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Created at: {{ new Date(store.product.created_at).toLocaleString() }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Updated at: {{ new Date(store.product.updated_at).toLocaleString() }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">Product ID: {{ store.product.id }}</p>
    </div>
</div>

<!-- update and delete product -->
<div class="max-w-screen-xl mx-auto p-4 mt-4 flex space-x-4">
    <NuxtLink :to="'/products/' + store.product.id + '/update'" class="px-3 py-1 text-sm text-white bg-green-600 rounded-md">Update Product</NuxtLink>
    <button @click="deleteProduct" class="px-3 py-1 text-sm text-white bg-red-600 rounded-md">Delete Product</button>
</div>
</template>

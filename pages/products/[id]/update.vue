<script setup>
import { useProductStore } from '@/stores/product';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useProductStore();

const fetchProduct = async () => {
    await store.fetchProduct(route.params.id);
};

const updateProduct = async () => {
    try {
        await store.updateProduct(route.params.id);
        router.push('/products/' + route.params.id);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error updating product:', error);
    }
};

fetchProduct();
</script>

<template>
    <div class="max-w-screen-xl mx-auto p-4 text-center">
        <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">Update Product</h1>
    </div>
    <div class="max-w-screen-xl mx-auto p-4">
        <form @submit.prevent="updateProduct">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                    <input v-model="store.product.title" type="text" id="title" name="title" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
                </div>
                <div>
                    <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
                    <input v-model="store.product.price" type="number" id="price" name="price" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
                </div>
                <div class="sm:col-span-2">
                    <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
                    <textarea v-model="store.product.description" id="description" name="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required></textarea>
                </div>
                <div class="sm:col-span-2">
                    <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Image URL</label>
                    <input v-model="store.product.image" type="url" id="image" name="image" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <button type="submit" class="px-3 py-1 text-sm text-white bg-blue-700 rounded-md">Update</button>
            </div>
        </form>
    </div>
</template>

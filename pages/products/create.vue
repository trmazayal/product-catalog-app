<script>
export default {
    data() {
        return {
            product: {
                title: '',
                price: 0,
                description: '',
                image: ''
            }
        }
    },
    methods: {
        async createProduct() {
            const runtimeConfig = useRuntimeConfig()
            await $fetch(runtimeConfig.public.baseUrl + '/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.product)
            })
            this.$router.push('/products')
        }
    }
}
</script>

<template>
    <div class="max-w-screen-xl mx-auto p-4 text-center">
        <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">Create Product</h1>
    </div>
    <div class="max-w-screen-xl mx-auto p-4">
        <form @submit.prevent="createProduct">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
            <input v-model="product.title" type="text" id="title" name="title" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
            </div>
            <div>
            <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
            <input v-model="product.price" type="number" id="price" name="price" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
            </div>
            <div class="sm:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea v-model="product.description" id="description" name="description" rows="3" class="mt-1 block
            w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required></textarea>
            </div>
            <div class="sm:col-span-2">
            <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Image URL</label>
            <input v-model="product.image" type="url" id="image" name="image" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
            </div>
        </div>
        <div class="mt-4 flex justify-end">
            <button type="submit" class="px-3 py-1 text-sm text-white bg-blue-700 rounded-md">Create</button>
        </div>
        </form>
    </div>
</template>
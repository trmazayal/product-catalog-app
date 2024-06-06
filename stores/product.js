import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
    state: () => ({
        product: {
            title: '',
            price: 0,
            description: '',
            image: ''
        }
    }),
    actions: {
        async fetchProduct(productId) {
            const runtimeConfig = useRuntimeConfig();
            this.product = await $fetch(`${runtimeConfig.public.baseUrl}/products/${productId}`);
        },
        async createProduct(productData) {
            const runtimeConfig = useRuntimeConfig();
            await $fetch(`${runtimeConfig.public.baseUrl}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
            // Clear product data after successful creation
            this.product = {
                title: '',
                price: 0,
                description: '',
                image: ''
            };
        },
        async updateProduct(productId) {
            const runtimeConfig = useRuntimeConfig();
            await $fetch(`${runtimeConfig.public.baseUrl}/products/${productId}`, {
                method: 'PUT',
                body: this.product
            });
        },
        async deleteProduct(productId) {
            const runtimeConfig = useRuntimeConfig();
            await $fetch(`${runtimeConfig.public.baseUrl}/products/${productId}`, {
                method: 'DELETE'
            });
        }
    },
    getters: {
        getProduct: (state) => state.product
    }
});

import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
    state: () => ({
        product: {
            title: '',
            price: 0,
            description: '',
            image: ''
        },
        currentPage: 1,
        totalPages: 0,
        loading: false,
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
            this.clearProduct();
        },
        async fetchProducts() {
            this.loading = true;
            try {
                const runtimeConfig = useRuntimeConfig();
                const products = await $fetch(`${runtimeConfig.public.baseUrl}/products?page=${this.currentPage}&limit=10`);
                const allProducts = await $fetch(`${runtimeConfig.public.baseUrl}/products`);
                this.products = products;
                this.totalPages = Math.ceil(allProducts.length / 10);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
        async goToPage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
                await this.fetchProducts();
            }
        },
        async updateProduct(productId) {
            const runtimeConfig = useRuntimeConfig();
            await $fetch(`${runtimeConfig.public.baseUrl}/products/${productId}`, {
                method: 'PUT',
                body: this.product
            });
            // Clear product data after successful update
            this.clearProduct();
        },
        async deleteProduct(productId) {
            const runtimeConfig = useRuntimeConfig();
            await $fetch(`${runtimeConfig.public.baseUrl}/products/${productId}`, {
                method: 'DELETE'
            });
        },
        clearProduct() {
            this.product = {
                title: '',
                price: 0,
                description: '',
                image: ''
            };
        }
    },
    getters: {
        getProduct: (state) => state.product
    }
});

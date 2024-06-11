describe('import vue component', () => {
    test('Footer test case', async () => {
        const  cmp = await import('../components/Footer.vue')
        expect(cmp).toBeDefined()
    })
    test('NavBar test case', async () => {
        const  cmp = await import('../components/NavBar.vue')
        expect(cmp).toBeDefined()
    })
})

describe('import vue page', () => {
    test('Home test case', async () => {
        const  cmp = await import('../pages/index.vue')
        expect(cmp).toBeDefined()
    })
})

describe('import vue layout', () => {
    test('DefaultLayout test case', async () => {
        const  cmp = await import('../layouts/default.vue')
        expect(cmp).toBeDefined()
    })
})
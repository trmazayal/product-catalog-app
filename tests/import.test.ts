describe('import vue component', () => {
    test('import vue component', async () => {
        const  cmp = await import('../components/Footer.vue')
        expect(cmp).toBeDefined()
    })
    test('template import vue component', async () => {
        const  cmp = await import('../components/Footer.vue')
        expect(cmp).toBeDefined()
    })
    test('template import vue component 123', async () => {
        const name = 'Footer'
        const  cmp = await import('../components/' + name + '.vue')
        expect(cmp).toBeDefined()
    })
})
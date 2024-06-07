export default defineNuxtPlugin(({ $pinia }) => {
    return {
      provide: {
        stores: useProductStore($pinia),
      },
    };
  });

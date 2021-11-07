export const sleep = async (time = 300): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, time);
  });
};

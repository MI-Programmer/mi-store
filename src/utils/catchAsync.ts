export const catchAsync = (func: Function) => {
  return async (...args: any[]) => {
    try {
      return await func(...args);
    } catch (error: any) {
      return { message: error.message, status: "error" };
    }
  };
};

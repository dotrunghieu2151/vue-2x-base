export function nextMiddlewareFactory(context, middlewares, routerNext) {
  const subsequentMiddleware = middlewares.shift();
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return routerNext;

  return (...parameters) => {
    if (parameters.length) {
      // redirect if middle return next with params
      return routerNext(...parameters);
    }
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextMiddlewareFactory(context, middlewares, routerNext);
    subsequentMiddleware({ context, next: nextMiddleware });
  };
}
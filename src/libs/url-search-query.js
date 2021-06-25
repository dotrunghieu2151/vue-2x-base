const urlSearchQuery = (options) => ({
  toUrlSearchParam() {
    const urlSearchParam = new URLSearchParams();
    for (const [key, value] of Object.entries(options)) {
      if (Array.isArray(value)) {
        value.forEach(val => {
          urlSearchParam.append(`${key}[]`, val);
        })
      } else {
        urlSearchParam.append(key, value);
      }
    }
    return urlSearchParam;
  },
})

export default urlSearchQuery;

function apiResponseTransformer(obj, responseData) {
    if (responseData instanceof Array) {
        return responseData
          .map((data) => {
                return new obj(data);
            })
          .filter(Boolean);
    }
    return new obj(responseData);
}

export default apiResponseTransformer;
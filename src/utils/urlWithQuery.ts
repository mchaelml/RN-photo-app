const urlWithQuery = (url: string, query?: string | null) => `${url}${query ? `?${query}` : ""}`;

export default urlWithQuery;

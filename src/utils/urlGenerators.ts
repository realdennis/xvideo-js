const host = "https://www.xvideos.com";
const getIndexPageURL = (page: number) =>
  page === 0 ? host : `${host}/new/${page}`;

const getSearchPageURL = (keyword: string, page: number) =>
  `${host}/?k=${keyword}&p=${page}`;

export { getIndexPageURL, getSearchPageURL };

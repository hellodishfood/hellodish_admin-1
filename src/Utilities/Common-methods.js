export const totalPageCount = (arr, dataPerPage) => {
  return  Math.ceil(arr.length / dataPerPage)
};

export const currentDataArray = (arr, currentPage, dataPerPage) => {
  return  arr.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage)
};

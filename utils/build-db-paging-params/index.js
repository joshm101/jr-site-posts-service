const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1

const buildDBPagingParams = (
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE
) => {
  // (1 * 10) = 10 - 10 = 0 skipped for first page
  // (2 * 10) = 20 - 10 = 10 skipped to get 2nd page, etc.
  const skip = (page * pageSize) - pageSize

  return { skip, limit: pageSize }
}

module.exports = {
  buildDBPagingParams,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE
}

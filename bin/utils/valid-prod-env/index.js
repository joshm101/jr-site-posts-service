/**
 * Ensures proper environment variables are defined
 * for a production environment.
 * @return {boolean} Whether or not required environment
 * variables are set.
 */
const validProdEnv = () => {
  const {
    JR_SITE_PROD_DB_CONNECTION_URI,
    JR_SITE_PROD_DB_CONNECTION_USERNAME,
    JR_SITE_PROD_DB_CONNECTION_PASSWORD
  } = process.env

  if (!JR_SITE_PROD_DB_CONNECTION_URI) {
    console.error(
      'ERROR: JR_SITE_PROD_DB_CONNECTION_URI environment ' +
      'variable is not set. Exiting.'
    )

    return false
  }

  if (!JR_SITE_PROD_DB_CONNECTION_USERNAME) {
    console.error(
      'ERROR: JR_SITE_PROD_DB_CONNECTION_USERNAME environment ' +
      'variable is not set. Exiting.'
    )

    return false
  }

  if (!JR_SITE_PROD_DB_CONNECTION_PASSWORD) {
    console.error(
      'ERROR: JR_SITE_PROD_DB_CONNECTION_PASSWORD environment ' +
      'variable is not set. Exiting.'
    )

    return false
  }

  return true
}

module.exports = validProdEnv

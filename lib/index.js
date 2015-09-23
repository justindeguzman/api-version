
/*
 * api-version
 */

function apiVersion (version) {
  return function (req, res, next) {
    var err

    if (!req.query.version) {
      err = new Error('UnspecifiedVersionError')
      err.message = 'Please specify version X of the API via ?version=X.'
      err.status = 400
      return next(err)
    } else if (parseInt(req.query.version, 10) < version) {
      err = new Error('OutdatedVersionError')
      err.message = 'You are using an outdated version of the API. Please ' +
        'update.'
      err.status = 400
      return next(err)
    }

    delete req.body.version

    return next()
  }
}

/*
 * Module exports.
 */

module.exports = apiVersion

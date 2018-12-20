const jwt = require('jsonwebtoken')
const secret = require('crypto').randomBytes(15).toString('hex');

const auth = {
  sign (id) {
    return jwt.sign(
      {id}, secret
    )
  },
  ensure () {
    return (req, res, next) => {
      const auth = req.get('token')
      if (!auth) {
        res.status(401)
        throw Error('No token')
      }
      try {
        req.user = this.verify(auth)
        console.log(req.user)
      } catch (e) {
        res.status(401)
        throw e
      }
      next()
    }
  },
  verify (token) {
    return jwt.verify(token, secret)
  }
}

module.exports = auth

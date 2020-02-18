const jwt = require('jsonwebtoken')

module.exports = ({ request }) => {
  const token = request.get('Authorization')
  if (!token) throw new Error('No token provided')

  const decoded = jwt.verify(token, 'pavelskisecret')

  return decoded.id
}
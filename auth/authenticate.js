import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

  const token = req.header("X-Auth") || req.cookies?.token
  req.isAuth = false

  if(!token) {
    // req.authError = "No token provided"
    req.authError = "Not allowed to do anyting without token, buddy"
    return next()
  }

  try {
    const decodedUser = jwt.verify( token, process.env.JWT_SECRET)
    req.isAuth = true
    req.user = decodedUser
  }
  catch(err) {
    req.authError = err.message
    return next() 
  }
  
  next()
}

export default auth
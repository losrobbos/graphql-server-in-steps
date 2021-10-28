import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

  const token = req.header("X-Auth") || req.cookies?.token
  req.isAuth = false

  if(!token) return next()

  try {
    const decodedUser = jwt.verify( token, process.env.JWT_SECRET)
    req.isAuth = true
    req.user = decodedUser
  }
  catch {
    return next() 
  }
  
  next()
}

export default auth
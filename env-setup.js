import dotenv from 'dotenv'

dotenv.config()

const arrRequiredVars = [
  "JWT_SECRET"
]


// startup env check
const arrMissing = []

arrRequiredVars.forEach((envVar) => {
  if(!process.env[envVar]) {
    arrMissing.push( `Please provide variable ${envVar} in your environment` )
  }
})

if(arrMissing.length) {
  console.log()
  console.log("ENV setup not complete!")
  console.log( arrMissing.join("\n") )
  console.log()
  process.exit()
}

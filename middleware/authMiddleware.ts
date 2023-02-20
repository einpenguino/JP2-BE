const jwt = require("jsonwebtoken");
const {UserCreds} = require("../models");
const asyncHandler = require("express-async-handler");

// const auth = asyncHandler(async (req, res, next) => {
//   // console.log(req.cookies[Object.keys(req.cookies)])
//   if (
//     req.cookies
//     // req.headers.authorization &&
//     // req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // token = req.headers.authorization.split(" ")[1];
//       let token = req.cookies[Object.keys(req.cookies)]
//       console.log(token)
//       // console.log(token)
//       //decodes token id
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       // console.log(decoded.id)
//       // console.log(UserCreds)
//       req.user = await UserCreds.findById(decoded.id).select("-password");
//       // const result = await UserCreds.find({_id:decoded.id})
//       // console.log(result)

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }else{
//     res.status(400).json("Not authorized, no token")
//   }
// });

const auth = asyncHandler(async (req : any, res : any) => {
  if (req.headers.cookie) {
    try {
      let token = req.headers.cookie.split('=')[1]
      // console.log(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded)
      return decoded
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }else{
    res.status(400).json("Not authorized, no token")
  }
});

export { auth };

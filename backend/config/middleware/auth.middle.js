const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../../model/blacklist.model");

const auth = async(req, res, next) => {
  var token = req.headers.authorization;
//   console.log(token);

  let blackListCheck = await BlacklistModel.findOne({token})

  if(blackListCheck){
    res.send({msg : "Please login first"})
  }else{

  jwt.verify(token, "masai", function (err, decoded) {
    if (err) {
      console.log(err);
    } else {
      next();
    }
  });
};
}


module.exports = {
  auth,
};

import jwt from "jsonwebtoken";
import config from "../config/index";

const { JWT_SECRET } = config;

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "토큰 없음. 인증이 거부됨!!!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "토근이 유효하지 않습니다." });
  }
};

export default auth;

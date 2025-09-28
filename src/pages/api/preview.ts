import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).send("Invalid secret");
  }

  const accessToken = jwt.sign({ role: "preview" }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ role: "preview" }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.setHeader("Set-Cookie", [
    serialize("accessToken", accessToken, { httpOnly: true, path: "/", maxAge: 900 }),
    serialize("refreshToken", refreshToken, { httpOnly: true, path: "/", maxAge: 604800 })
  ]);

  res.setPreviewData({});
  res.redirect("/");
}

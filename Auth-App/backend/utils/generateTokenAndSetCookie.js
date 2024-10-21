import jwt from 'jsonwebtoken'

// method to create jwttoken for cookie
export const generateTokenAndSetCookie = (res , userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SERET, {expiresIn: "7d",})

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite : "strict",  // csrf
        maxAge : 7 * 24 * 60 * 60 * 1000  // 7 days expired

    })
     return token;

}
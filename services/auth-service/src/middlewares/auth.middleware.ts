// const accessToken = signAccessToken(user._id.toString());

// const refreshToken = signRefreshToken(user._id.toString());

// await createSession(
//   user._id.toString(),
//   refreshToken
// );

// res.cookie("refreshToken", refreshToken, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// });

// const payload = verifyRefreshToken(token);

// const session = await getSession(payload.userId);

// if (!session) {
//   throw new Error("Session Expired");
// }

// const accessToken = signAccessToken(
//   payload.userId
// );


// Logout
// await deleteSession(userId);

// res.clearCookie("refreshToken");
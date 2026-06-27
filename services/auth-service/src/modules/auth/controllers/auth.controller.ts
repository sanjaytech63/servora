// import { AppError } from "../../../errors/AppError";

// export const register = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//     });

//     if (user) {
//       throw new AppError(
//         "Email already exists",
//         409
//       );
//     }

//     res.status(201).json({
//       success: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
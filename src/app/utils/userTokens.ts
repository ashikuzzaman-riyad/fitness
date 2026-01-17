// import httpStatus from "http-status-codes";
// import { JwtPayload } from "jsonwebtoken";
// import { generateToken, verifyToken } from "./jwt";
// import AppError from "../errors/ApiError";
// import { isActive, IUser } from "../modules/user/user.interface";
// import  envVars  from "../config/index";
// import { User } from "../modules/user/user.model";

// export const createUserToken = (user: Partial<IUser>) => {
//   const JwtPayload = {
//     userId: user._id,
//     email: user.email,
//     role: user.role,
//   };
//   const accessToken = generateToken(
//     JwtPayload,
//     envVars.JWT_TOKEN,
//     envVars.JWT_EXPIRES
//   );
//   const refreshToken = generateToken(
//     JwtPayload,
//     envVars.JWT_REFRESH_TOKEN,
//     envVars.JWT_REFRESH_EXPIRES
//   );
//   return {
//     accessToken,
//     refreshToken,
//   };
// };
// export const createNewAccessTokenWithRefreshToken = async (
//   refreshToken: string
// ) => {
//   const verifyRefreshToken = verifyToken(
//     refreshToken,
//     envVars.JWT_REFRESH_TOKEN,
//   ) as JwtPayload;
//   const isUserExists = await User.findOne({ email: verifyRefreshToken.email });
//   if (!isUserExists) {
//     throw new AppError(httpStatus.BAD_REQUEST, "User Not Exists");
//   }
//   if (!isUserExists) {
//     throw new AppError(httpStatus.BAD_REQUEST, "User Not Exists");
//   }
//   if (
//     isUserExists.isActive === isActive.BLOCKED ||
//     isUserExists.isActive === isActive.INACTIVE
//   ) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       `User is ${isUserExists.isActive}`
//     );
//   }
//   if (isUserExists.isDeleted) {
//     throw new AppError(httpStatus.BAD_REQUEST, `User is Deleted`);
//   }

//   const JwtPayload = {
//     userId: isUserExists._id,
//     email: isUserExists.email,
//     role: isUserExists.role,
//   };
//   const accessToken = generateToken(
//     JwtPayload,
//     envVars.JWT_TOKEN,
//     envVars.JWT_EXPIRES
//   );
//   return accessToken;
// };

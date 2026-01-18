// modules/user/user.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import * as userService from "./user.service";
import { request } from "http";


export const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});


export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.getUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});


export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.updateUser(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});


export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user deleted successfully",
    data: result,
  });
});


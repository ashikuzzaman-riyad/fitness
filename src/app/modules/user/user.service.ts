// modules/user/user.service.ts
import { prisma } from "../../shared/prisma";
import { Role } from "@prisma/client";

export const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) => {
  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: Role.USER,
    },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const updateUser = async (
  id: string,
  payload: { name?: string; email?: string; password?: string; role?: Role },
) => {
  return prisma.user.update({
    where: { id },
    data: {
      ...payload,
    },
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};

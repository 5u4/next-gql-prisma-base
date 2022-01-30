import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/prisma/client";

export type Context = {
  prisma: PrismaClient;
};

type NextContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export const createContext = async (_: NextContext): Promise<Context> => {
  return { prisma };
};

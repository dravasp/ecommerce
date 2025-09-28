import prisma from "../../lib/db";
import redis from "../../lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cacheKey = "products:all";
  const cached = await redis.get(cacheKey);
  if (cached) return res.status(200).json(JSON.parse(cached));

  const products = await prisma.product.findMany();
  await redis.set(cacheKey, JSON.stringify(products), "EX", 300);
  res.status(200).json(products);
}

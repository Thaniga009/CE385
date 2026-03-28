import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { z } from "zod";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// schema validation ด้วย zod
const QueryInputSchema = z.object({
  model: z.enum(["User", "Order"]), // จำกัด model
  action: z.enum(["findMany", "findFirst", "findUnique", "count"]), // จำกัด action
  args: z.record(z.unknown()).optional().default({}),
});

export type QueryInput = z.infer<typeof QueryInputSchema>;

export async function runQuery(input: unknown) {
  // 1. validate input
  const { model, action, args } = QueryInputSchema.parse(input);

  // 2. เลือก prisma model
  const prismaModel = prisma[model.toLowerCase() as keyof typeof prisma] as any;

  if (!prismaModel || typeof prismaModel[action] !== "function") {
    throw new Error(`Invalid model or action: ${model}.${action}`);
  }

  // 3. run query
  const result = await prismaModel[action](args);

  return result;
}
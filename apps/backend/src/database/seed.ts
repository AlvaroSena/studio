import { seed } from "drizzle-seed";
import { db } from ".";
import { collaborators } from "./schema";

async function main() {
  await seed(db, { collaborators }, { count: 2 });
}

main();

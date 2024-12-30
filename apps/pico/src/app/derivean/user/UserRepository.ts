import { db } from "~/app/derivean/db/db";
import { withUserRepository } from "~/app/user/withUserRepository";

export const UserRepository = withUserRepository({ database: db });

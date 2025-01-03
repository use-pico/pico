import type { Database } from "~/app/derivean/db/Database";
import { withUserRepository } from "~/app/user/withUserRepository";

export const UserRepository = withUserRepository<Database>();

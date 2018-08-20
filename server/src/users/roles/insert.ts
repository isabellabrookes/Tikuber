import {getConnection} from "typeorm";
import {Role} from "./entity";

const addRoleTypes = async () => {
 await getConnection()
   .createQueryBuilder()
   .insert()
   .into(Role)
   .values([
     {type: "Admin"},
     {type: "User"}
   ])
   .execute();
}


export { addRoleTypes }

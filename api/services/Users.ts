import { randomUUID } from "crypto";
import User from "../db/models/user";
import { Transaction } from "objection";

export type UserResource = {
    id?: string;
    name: string;
    firstName?: string;
    lastName?: string;
    email: number;
    provider?: string;
    providerId?: string;
    providerRef?: string;
    photo?: string;
  };

export default class Users {
    public static eagerFields: any = {
        provider: true
    };
    public static async findOrCreate(userResource:UserResource): Promise<UserResource> {

        const userResult = await User.transaction(async trx => {

            let user = await User.query(trx)
            .withGraphJoined(Users.eagerFields)
            .findOne({
                providerId: userResource.providerId,
                providerRef: userResource.providerRef
            });

            if (!user) {
                userResource.id = randomUUID();
                user = await User.query(trx).insert(userResource).withGraphJoined(Users.eagerFields);
            }

            return this.toResouce(user);
            
          });
          return userResult;     
    } 

    public static toResouce(graph: any): UserResource {

        let u:UserResource = {
            id: graph.id,
            name: graph.name,
            firstName: graph.firstName,
            lastName: graph.lastName,
            email: graph.email,
        };

        if (graph.provider) {
            u.provider = graph.provider.name;
        }
        
        return u;
    }
    
}
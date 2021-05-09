//User domain
import { UserPrimitives } from '../../User/domain/User';


/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Aggregates and value object specification for the Chat entity.
 */

export interface ChatPrimitives {
    _id: string;
    name: string;
    ownedBy: string;
    memebers: UserPrimitives[];
    createdAt: string;
}
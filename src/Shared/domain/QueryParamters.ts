
/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Specification of the parameters for queries.
 */
export interface QueryParameters {
    limit?: number;
    orderBy?: string;
    startingAt?: string | null;
}
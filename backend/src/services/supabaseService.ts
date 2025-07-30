import { supabase } from "../client/supabase"; // Assuming you have a supabase client export

// ... your other service functions

/**
 * Creates a record in the 'pool_requests' table.
 * @param poolId The ID of the pool to join.
 * @param passengerId The ID of the user requesting to join.
 * @returns The newly created request object.
 */
export const createPoolJoinRequestInDb = async (poolId: number, PassengerId: string) => {
    // Now, create the request with all the necessary IDs.
    const { data: requestData, error: requestError } = await supabase
        .from('pool_requests')
        .insert({
            pool_id: poolId,
            passenger_id: PassengerId
        })
        .select()
        .single();

    if (requestError) {
        console.error('Supabase error creating join request:', requestError.message);
        throw requestError;
    }
    return requestData;
};

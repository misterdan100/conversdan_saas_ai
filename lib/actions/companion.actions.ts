"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create a companion");
  }

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const supabase = createSupabaseClient();
  const { userId } = await auth();

  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('session_history') // select the table
    .select('companions:companion_id (*)') //select the column, * all in the column and return as a companions object
    .order('created_at', { ascending: false }) // order by created at, recents first
    .limit(limit) // get just this limits

  if(error) throw new Error( error.message )

  return data.map(({ companions }) => companions ) // access to the companion object created in .select()
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('session_history') // select the table
    .select('companions:companion_id (*)') //select the column, * all in the column and return as a companions object
    .eq( 'user_id', userId) // select only the column user_id value is equal to userId
    .order('created_at', { ascending: false }) // order by created at, recents first
    .limit(limit) // get just this limits

  if(error) throw new Error( error.message )

  return data.map(({ companions }) => companions ) // access to the companion object created in .select()
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions') // select the table
    .select() //select all registers in the table
    .eq( 'author', userId) // select only regisers with a specific userId
    .order('created_at', { ascending: false }) // order by created at, recents first

  if(error) throw new Error( error.message )

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId,has } = await auth()
  const supabase = createSupabaseClient();

  let limit = 0;

  if(has({ plan: 'pro' })) {
    return true;
  } else if(has({ feature: '3_companion_limit' })) {
    limit = 3;
  } else if( has({ feature: '10_companion_limit'})) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from( 'companions' )
    .select('id', {count: 'exact'}) // add count property to the response with total numbers of register wich are equal to the request
    .eq('author', userId)

  if(error) throw new Error(error.message)

  const companionCount = data?.length

  if( companionCount >= limit ) {
    return false
  } else {
    return true
  }
}

export const switchBookmarkCompanion = async (companionId: string, newBookmark: boolean) => {
  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('companions') 
    .update({ bookmark: newBookmark})
    .eq('id', companionId)
    .select()

  if( error ) throw new Error(error.message)

  return data[0]
}
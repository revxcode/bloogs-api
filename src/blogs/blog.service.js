// business logic
// internal validation

import supabase from "../utils/supabase/index.js";

const getAllPost = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(...error);

  return data
};

const getUniquePost = async (postId) => {
  const { data, error } = await supabase
    .from('posts')
    .select("*")
    .eq('id', postId);

  if (data.length <= 0) throw new Error("Post not found.");

  if (error) throw new Error(...error);

  return data
}

const addPost = async (postData) => {
  const time = new Date();
  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...postData,
      created_at: time.toISOString(),
      updated_at: time.toISOString()
    })
    .select()

  if (error) throw new Error(...error);

  return data;
};

const editPost = async (postId, postData) => {
  const time = new Date();

  postId = Number(postId);

  const findPost = await getUniquePost(postId);

  if (findPost.length <= 0) throw new Error("Post not found.");

  const availableKey = Object.keys(postData);

  const isAllSame = availableKey.every(key => findPost[0][key] == postData[key])

  if (isAllSame) throw new Error("No data changes.");

  const { data, error } = await supabase
    .from('posts')
    .update({
      ...postData,
      updated_at: time.toISOString()
    })
    .eq('id', postId)
    .select();

  if (error) throw new Error(...error);

  return data;
};

const removePost = async (postId) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;

  return true;
}

export { getAllPost, addPost, getUniquePost, editPost, removePost };
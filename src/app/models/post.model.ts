export interface Post {
  id: string;
  from_name: string;
  from_id: string;
  message: string;
  type: string;
  created_time: string;
}

export interface UserPosts {
  user_id: string;
  name: string;
  posts: Post[];
}

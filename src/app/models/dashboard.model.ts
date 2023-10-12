export interface Dashboard {
  user_id: string;
  name: string;
  total_posts: number;
  median_num_of_chars: number;
  monthly_posts_statistics: number[];
  longest_post: string;
}

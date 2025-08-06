export interface Photo {
  photo_id: string;
  user_id: string;
  image_url: string;
  image_title: string;
  taken_at: string;
  created_at: string;
}

export interface PhotoFeed {
  feed_id: string;
  user_id: string;
  rule_id: string;
  summary: string;
  image_url: string;
  created_at: string;
}

export interface Comment {
  comment_id: string;
  user_id: string;
  feed_id: string;
  comment: string;
  created_at: string;
}

export interface AccessRule {
  rule_id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
}

export interface PhotoState {
  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;
  addPhoto: (photo: Photo) => void;
  removePhoto: (photoId: string) => void;
  clearPhotos: () => void;
}

export interface FeedState {
  feeds: PhotoFeed[];
  setFeeds: (feeds: PhotoFeed[]) => void;
  addFeed: (feed: PhotoFeed) => void;
  removeFeed: (feedId: string) => void;
  clearFeeds: () => void;
}

export interface CommentState {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  removeComment: (commentId: string) => void;
  clearComments: () => void;
}

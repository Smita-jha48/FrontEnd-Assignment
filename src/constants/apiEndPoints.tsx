export const BACKEND_URL = "http://localhost:8083/";


export const FETCH_POSTS = {
  url: "api/feed/posts",
  method: "GET",
}
export const CREATE_POST = {
  url: "api/post/create",
  method: "POST",
};
export const READ_POST = {
  url: "api/post/read",
  method: "POST",
};

export const EDIT_POST = {
  url: "api/post/update",
  method: "PUT",
};

export const DELETE_POST = {
  url: "api/post/delete",
  method: "DELETE",
};

export const LIKE_POST = {
  url: "api/post/like",
  method: "POST",
};

export const UNLIKE_POST = {
  url: "api/post/unlike",
  method: "POST",
};
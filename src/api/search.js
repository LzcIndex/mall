import request from "./request";

export async function likeSearch(value) {
  let resp = await request.get("/likeSearch", {
    params: {
      likeValue: value,
    },
  });
  return resp;
}

export async function search(type, page, size) {
  let resp = await request.get("/search", {
    params: {
      type,
      page,
      size,
    },
  });
  return resp;
}

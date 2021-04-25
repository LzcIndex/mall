import request from "./request";
export async function getGoodsByIds(value) {
  return await request.get("/getGoodsByIds", {
    params: { value },
  });
}

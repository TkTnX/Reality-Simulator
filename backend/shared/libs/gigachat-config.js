import qs from "qs";

let body = qs.stringify({
  scope: "GIGACHAT_API_PERS",
});

export const gigachatConfig = (url, clientId, authKey) => ({
  method: "post",
  maxBodyLength: Infinity,
  url,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    RqUID: clientId,
    Authorization: `Basic ${authKey}`,
  },
  data: body,
});

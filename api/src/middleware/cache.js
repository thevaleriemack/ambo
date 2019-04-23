import mcache from 'memory-cache';

const log = (key) => {
  console.log("Cache cleared", key);
}

export const requestCache = new mcache.Cache();

export default (duration) => {
  return (req, resp, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = requestCache.get(key);
    if (cachedBody !== null) {
      resp.send(cachedBody);
      return;
    } else {
      resp.sendResponse = resp.send;
      resp.send = (body) => {
        requestCache.put(key, body, duration * 1000, (key) => {
          if (process.env.NODE_ENV === "development") log(key);
        });
        resp.sendResponse(body);
      }
      next();
    }
  }
}

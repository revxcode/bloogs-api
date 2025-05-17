import rateLimit from "express-rate-limit";

const limiter = async () => {
  return rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: "Too many requests, Please try again after 1 minutes."
  });
}

export { limiter }
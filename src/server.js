import app, { PORT } from "./app.js";
import blogRouter from "./api/blogs/blog.route.js";
import { limiter } from "./api/blogs/blog.middleware.js";

app.use('/api/blog', limiter, blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
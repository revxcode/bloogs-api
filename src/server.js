import app, { PORT } from "./app.js";
import blogRouter from "./blogs/blog.route.js";

app.use('/api/blog', blogRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
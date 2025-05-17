import z from 'zod'

const createSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  subtitle: z.string().min(3, { message: "subtitle must be at least 3 characters long." }),
  content: z.string().min(20, { message: "Content must be at least 20 characters long." })
})

const checkCreate = (data) => {
  const validate = createSchema.safeParse({
    title: data.title,
    subtitle: data.subtitle,
    content: data.content
  })
  return validate
}

export { checkCreate }
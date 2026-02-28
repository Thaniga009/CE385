import express from 'express';
import { prisma } from '../lib/prisma';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello from Prisma API!');
});


app.post('/user', async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json(user);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});


app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } 
   catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


app.get('/users/email/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { userId: id },
    });

    res.json(user);
      } 
  catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


app.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(201).json(post);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});


app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { postId: id },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});


app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;

  try {
    const post = await prisma.post.update({
      where: { postId: id },
      data: { title, content, published },
    });

    res.json(post);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.delete({
      where: { postId: id },
    });

    res.json(post);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
import express from 'express'; //อันนี้คือ import express มาใช้ทำ server
import { prisma } from '../lib/prisma'; //แล้วก็ import prisma จากไฟล์ที่เรา set connection กับ database ไว้แล้ว

const app = express(); //สร้างไว้กำหนด router

const port = process.env.PORT || 8080; //กำหนด port

app.use(express.json()); //เอาไว้อ่าน json


app.get('/', (req, res) => {
  res.send('Hello from Prisma API!'); //เข้าแล้วตอบ helloกลับมา
});

app.post('/user', async (req, res) => { //สร้างชื่อใหม่แล้วรับชื่อกับอีเมลมาจากbody
  const { name, email } = req.body; 

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
  } catch (error) { // ถ้าพัง ก็ส่ง 500 กลับไป
    res.status(500).json({ error: 'Failed to create user' });  
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany(); //ใช้findmany เพราะเอามาหลายตัว
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/users/email/:email', async (req, res) => { // ดึง user ตาม email เมลจะถูกส่งมาเป็ฯพารามิเตอร์ในurl
  const { email } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' }); //ถ้าไม่เจอuser ก็จะขึ้นFailed
  }
});

app.delete('/users/:id', async (req, res) => { // ลบ user ตาม id
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { userId: id },
    });

  res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.post('/posts', async (req, res) => { // สร้างpost ใหม่
  const { title, content, authorId } = req.body; // รับ title, content, authorId 

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

   res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.get('/posts', async (req, res) => { // ดึงpost ทั้งหมด
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/posts/:id', async (req, res) => { // ดึงโพสต์ตาม id
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { postId: id },
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});


app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  try {
    const post = await prisma.post.update({ // รับค่าที่อยากแก้จาก body แล้วใช้ update()
      where: { postId: id },
      data: { title, content, published },
    });

   res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/posts/:id', async (req, res) => { // ลบโพสต์ตาม id
  const { id } = req.params;

  try {
    const post = await prisma.post.delete({
      where: { postId: id },
    });

  res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); //ท้ายก็สั่งให้ server รันที่พอร์ตที่กำหนดแล้วปริ้นว่ารันอยู่ที่ไหน
});

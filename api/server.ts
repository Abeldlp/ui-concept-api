import { Express, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import {} from 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4444;
const prisma = new PrismaClient();

app.get('/enquiries', async (req: Request, res: Response) => {
  const users = await prisma.enquiry.findMany();

  res.json(users);
});

app.post('/save-enquiry', async (req: Request, res: Response) => {
  await prisma.enquiry.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      priority: req.body.priority,
      assigned_to: req.body.assigned_to,
      status: req.body.status,
      follow_up: true,
      due_date: '-',
    },
  });
});

app.listen(port, () => {
  console.log('server running');
});

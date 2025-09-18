import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash password for demo users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create demo users
  const user1 = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      password: hashedPassword,
      name: 'John Doe',
    },
  });

  // Create demo invoices for user1
  const invoices = [
    {
      vendorName: 'Acme Corp',
      amount: 1250.00,
      dueDate: new Date('2024-12-15'),
      description: 'Office supplies and equipment',
      paid: false,
      userId: user1.id,
    },
    {
      vendorName: 'Tech Solutions Inc',
      amount: 3500.00,
      dueDate: new Date('2024-11-30'),
      description: 'Software licensing and support',
      paid: true,
      userId: user1.id,
    },
    {
      vendorName: 'Global Services LLC',
      amount: 850.75,
      dueDate: new Date('2024-12-01'),
      description: 'Consulting services',
      paid: false,
      userId: user1.id,
    },
    {
      vendorName: 'Marketing Agency',
      amount: 2200.00,
      dueDate: new Date('2024-11-25'),
      description: 'Digital marketing campaign',
      paid: true,
      userId: user1.id,
    },
    {
      vendorName: 'Office Depot',
      amount: 425.50,
      dueDate: new Date('2024-12-10'),
      description: 'Monthly office supplies',
      paid: false,
      userId: user1.id,
    },
  ];

  // Create demo invoices for user2
  const user2Invoices = [
    {
      vendorName: 'Construction Co',
      amount: 5500.00,
      dueDate: new Date('2024-12-20'),
      description: 'Building maintenance',
      paid: false,
      userId: user2.id,
    },
    {
      vendorName: 'Utility Company',
      amount: 180.25,
      dueDate: new Date('2024-11-28'),
      description: 'Monthly utilities',
      paid: true,
      userId: user2.id,
    },
  ];

  // Insert invoices
  for (const invoice of [...invoices, ...user2Invoices]) {
    await prisma.invoice.upsert({
      where: {
        id: 'dummy-id-' + Math.random().toString(36).substr(2, 9),
      },
      update: {},
      create: invoice,
    });
  }

  console.log('Database seeded successfully!');
  console.log('Demo users created:');
  console.log('- demo@example.com (password: password123)');
  console.log('- john@example.com (password: password123)');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });



# Personal Expense Tracker
## Overview
The Personal Expense Tracker is a user-friendly web application designed to help individuals efficiently track and manage personal expenses within groups. Users can create groups, enter expenses, and split expenses among group members with ease. The system is built using modern web technologies and is deployed on Vercel.

## Features
- Group Creation: Users can create groups with a simple and intuitive interface.
- Expense Entry: Users can quickly and easily enter expenses into the system.
- Expense Split: Expenses can be split among the members of a group, with clear display of group expenses.
- Display: Users can view and manage their groups and associated expenses.
## Technologies Used
- Front-End: Next.js
- Back-End: Next.js
- Database: MongoDB
- ORM: Prisma
- Styling: Tailwind CSS
- Deployment: Vercel
## Installation
Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```
Install Dependencies

```bash
npm install
```
## Set Up Environment Variables

Create a .env file in the root directory and add the necessary environment variables. You can refer to the .env.example file for guidance.

## Run Migrations

```bash

npx prisma migrate dev
```
Start the Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Usage
- Create a Group: Navigate to the group creation page and follow the prompts to create a new group.
- Enter Expenses: Go to the expense entry page to add new expenses.
- Split Expenses: Use the expense split feature to allocate expenses among group members.
- View Groups and Expenses: Access the dashboard to see all your groups and their respective expenses.
## Skills Developed
- Next.js: Developed both front-end and back-end functionalities.
- Prisma: Utilized Prisma ORM for database management.
- Tailwind CSS: Applied Tailwind CSS for styling and responsive design.
## DEPLOYED LINK
- [Expenses Tracker](https://expenses-tracker-ecru.vercel.app/) - you can access website from here


## Contributing
Contributions are welcome! Please submit a pull request with your changes.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



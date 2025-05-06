# Modern Portfolio Website & Admin Dashboard

This is a modern portfolio website built with the latest web technologies, featuring a dynamic frontend to showcase projects and skills, and a secure admin dashboard for easy content management.

## ✨ Features

*   **Dynamic Portfolio:** Display projects, about information, skills, and contact details fetched from a database.
*   **Admin Dashboard:** Secure area (/admin) to manage portfolio content (About, Projects, Contact Info).
*   **CRUD Operations:** Create, Read, Update, and Delete functionality for projects.
*   **Image Uploads:** Integrated with UploadThing for handling project images, thumbnails, and hero images.
*   **Responsive Design:** Adapts seamlessly to various screen sizes using Tailwind CSS and Shadcn UI.
*   **Modern Tech Stack:** Built with Next.js 15 (App Router), React 19, TypeScript, and Drizzle ORM.

## 🚀 Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) 15 (App Router)
*   **UI Library:** [React](https://react.dev/) 19
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/)
*   **Database:** (Assumed PostgreSQL - Specify if different)
*   **Image Uploads:** [UploadThing](https://uploadthing.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Deployment:** [Vercel](https://vercel.com/)

## 🔧 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (Version 18 or later recommended)
*   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
*   A database instance (e.g., PostgreSQL running locally or on a cloud provider like Neon, Supabase, or Vercel Postgres)
*   An [UploadThing](https://uploadthing.com/) account for API keys.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    *   Duplicate the `.env.example` file (if one exists) or create a new file named `.env.local`.
    *   Add the following environment variables:

        ```env
        # Database Connection URL (e.g., PostgreSQL)
        DATABASE_URL="your_database_connection_string"

        # UploadThing API Keys
        UPLOADTHING_SECRET="your_uploadthing_secret"
        UPLOADTHING_APP_ID="your_uploadthing_app_id"

        # Add any other required variables (e.g., authentication secrets if added later)
        ```
    *   Replace the placeholder values with your actual credentials.

4.  **Set up the database schema:**
    *   Ensure your database server is running and accessible via the `DATABASE_URL`.
    *   Run Drizzle migrations to create the necessary tables:
        ```bash
        npx drizzle-kit generate:pg --schema=./src/db/schema.ts # Generate migration files
        npm run db:push # Apply migrations to the database
        ```
        *(Note: Adjust `generate:pg` to your specific database driver if not using PostgreSQL. The `db:push` script might need to be defined in `package.json` if it isn't already)*

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

6.  **Open the application:**
    *   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
    *   Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin) (Note: Authentication might need to be added).

## 📁 Project Structure

```
portfolio/
├── .next/          # Next.js build output
├── db/             # Database schema definitions (used by Drizzle)
├── drizzle/        # Drizzle migration files
├── node_modules/   # Project dependencies
├── public/         # Static assets (images, fonts, etc.)
├── src/
│   ├── app/        # Next.js App Router pages and layouts
│   │   ├── (admin)/ # Admin-specific routes and layout
│   │   ├── (portfolio)/ # Public portfolio routes and layout
│   │   ├── api/      # API routes (e.g., for UploadThing)
│   │   └── ...       # Other pages (layout.tsx, page.tsx, etc.)
│   ├── components/ # Reusable React components
│   │   ├── admin/    # Components specific to the admin dashboard
│   │   ├── layout/   # Layout components (header, footer, etc.)
│   │   ├── sections/ # Components representing page sections (about, projects, contact)
│   │   └── ui/       # UI primitives (often from Shadcn UI)
│   ├── db/         # Drizzle schema definitions (schema.ts, drizzle.ts)
│   ├── lib/        # Utility functions, helpers, actions
│   │   └── actions/  # Server Actions for database interactions
│   ├── styles/     # Global styles (globals.css)
│   └── utils/      # General utility functions (e.g., UploadThing config)
├── .env.local      # Local environment variables (Gitignored)
├── .gitignore      # Files and folders ignored by Git
├── components.json # Shadcn UI configuration
├── drizzle.config.ts # Drizzle Kit configuration
├── next.config.ts  # Next.js configuration
├── package.json    # Project metadata and dependencies
├── README.md       # This file
└── tsconfig.json   # TypeScript configuration
```

## 🔒 Admin Dashboard

The admin dashboard, accessible at `/admin`, allows authenticated users (if authentication is implemented) to manage the content displayed on the portfolio website. Currently, it supports managing:

*   **About Section:** Edit bio, skills, hero content, and experience.
*   **Projects:** Add, edit, and delete project details, including images and descriptions.
*   **Contact Info:** Update email, phone, address, and social media links.

## ☁️ Deployment

The recommended way to deploy this Next.js application is using the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Configure the Environment Variables in the Vercel project settings (same as your `.env.local` file).
4.  Set up the database connection (e.g., using Vercel Postgres or connecting to your external database).
5.  Deploy!

Vercel will automatically handle the build process and deployment. Ensure your Drizzle migrations have been run against the production database.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  **Fork** the repository.
2.  Create a new **branch** for your feature or bug fix (`git checkout -b feature/your-feature-name` or `bugfix/issue-description`).
3.  Make your changes, ensuring code follows the project's style and conventions.
4.  **Commit** your changes (`git commit -m 'Add some feature'`).
5.  **Push** to the branch (`git push origin feature/your-feature-name`).
6.  Open a **Pull Request** against the `main` branch of the original repository.

Please provide a clear description of your changes in the Pull Request.

## 📄 License

```

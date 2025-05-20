#  isAlive - Stay Online, Stay Ahead 

Welcome to `isAlive`! I built this project to provide a robust solution for monitoring critical infrastructure with the power and transparency of blockchain technology.

## 🎯 Purpose & Functionality

`isAlive` is a blockchain-powered uptime monitoring service. Its core purpose is to:

*   **Monitor Critical Infrastructure**: Keep an eye on your important services, APIs, and servers.
*   **Blockchain-Verified Uptime**: Leverage blockchain for transparent and immutable uptime records.
*   **Instant Alerts**: Get notified immediately when an issue is detected.
*   **Detailed Analytics**: Access comprehensive data and performance metrics for your monitored services.
*   **Unmatched Reliability**: Designed for developers and teams who demand high availability and trustworthiness.

**Unique Features**:

*   **Decentralized Verification**: Uptime data is secured and verified on the blockchain, offering a higher level of trust compared to traditional centralized monitoring.
*   **Sleek Dashboard**: A modern, user-friendly interface (as seen in the `hero-section.tsx`) to visualize uptime, response times, and service status.

## 📸 Screenshots

### Landing Page
![Landing page](/assets/screenshots/isAlive-home.png)

### Dashboard Overview
![Dashboard Overview](/assets/screenshots/isAilve-dashboard.png)

## 🛠️ How to Set It Up Locally

This project is a monorepo managed with Turborepo and Bun. It consists of a Next.js frontend and an Express.js API.

**Prerequisites**:

*   [Node.js](https://nodejs.org/) (version >=18 recommended)
*   [Bun](https://bun.sh/) (version 1.2.11 or higher specified in `package.json`)

**Installation Steps**:

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <your-repository-url>
    cd isAlive
    ```

2.  **Install dependencies** from the root directory. This will install dependencies for all workspaces (`apps/*` and `packages/*`):
    ```bash
    bun install
    ```

**Environment Variables**:

*   **API (`apps/api`)**: You'll likely need a `.env` file in the `apps/api` directory. Based on the dependencies (`@clerk/clerk-sdk-node`, `dotenv`), you might need variables for Clerk authentication and database connections. Create an `.env` file in `apps/api/` and add necessary variables:
    ```env
    # Example .env for apps/api
    CLERK_SECRET_KEY=your_clerk_secret_key
    DATABASE_URL=your_database_connection_string
    # Add other necessary variables
    ```
*   **Frontend (`apps/frontend`)**: The frontend uses `@clerk/nextjs`. You'll need to configure Clerk public keys. Typically, these are exposed as `NEXT_PUBLIC_` variables in a `.env.local` file in the `apps/frontend` directory.
    ```env
    # Example .env.local for apps/frontend
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
    # Add other necessary frontend variables
    ```

**Running the Project**:

*   To run all applications (frontend and API) in development mode concurrently:
    ```bash
    bun run dev
    ```
    This command uses Turborepo to manage the development servers for each app.

*   **Frontend (`apps/frontend`)**: Runs on `http://localhost:3000` (Next.js default).
*   **API (`apps/api`)**: The API is an Express app. Check its `index.ts` or startup scripts for the specific port it runs on (commonly 3001 or another port if 3000 is taken by the frontend).

## 🚀 Usage

Once the setup is complete and the development servers are running:

1.  **Access the Frontend**: Open your browser and navigate to `http://localhost:3000`.
2.  **Explore the Dashboard**: The hero section gives a glimpse of the dashboard's capabilities:
    *   View overall uptime percentage.
    *   Check average response times.
    *   See the total number of checks performed.
    *   Monitor the status of individual services (e.g., API Gateway, Database Cluster).
    *   Analyze performance metrics with interactive charts.
3.  **Interact with Features**: (Details would depend on the full application functionality beyond the hero section)
    *   Sign up or log in (likely using Clerk).
    *   Add new services/endpoints to monitor.
    *   Configure alert preferences.

## 💻 Tech Stack

This project leverages a modern, powerful tech stack:

*   **Monorepo Management**: [Turborepo](https://turbo.build/repo)
*   **Package Manager**: [Bun](https://bun.sh/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

*   **Frontend (`apps/frontend`)**:
    *   Framework: [Next.js](https://nextjs.org/) (v15+ with Turbopack)
    *   UI Components: Custom components, [Shadcn UI](https://ui.shadcn.com/) (implied by `tailwind-merge`, `class-variance-authority`, `lucide-react`, `components.json`)
    *   Styling: [Tailwind CSS](https://tailwindcss.com/) (v4)
    *   Animations: [Framer Motion](https://www.framer.com/motion/)
    *   Authentication: [Clerk](https://clerk.com/)
    *   HTTP Client: [Axios](https://axios-http.com/)
    *   Charting: [Recharts](https://recharts.org/)

*   **Backend (`apps/api`)**:
    *   Framework: [Express.js](https://expressjs.com/)
    *   Authentication: [Clerk (SDK Node)](https://clerk.com/docs/references/backend/overview)
    *   Database ORM: [Prisma](https://www.prisma.io/) (inferred from root `package.json` and `packages/db`)
    *   Environment Management: [dotenv](https://www.npmjs.com/package/dotenv)

*   **Shared Packages (`packages/*`)**:
    *   `@repo/ui`: Likely contains shared React components.
    *   `@repo/common`: For shared utilities or types.
    *   `@repo/db`: Prisma schema and database client.
    *   `@repo/eslint-config`: Shared ESLint configurations.
    *   `@repo/typescript-config`: Shared TypeScript configurations.

*   **Development Tools**:
    *   Linting: [ESLint](https://eslint.org/)
    *   Formatting: [Prettier](https://prettier.io/)

## 📁 Folder Structure

Here's a brief overview of the monorepo structure:

```
/Users/anujs101/Developer/WEB3/isAlive/
├── apps/
│   ├── api/                  # Backend Express.js application
│   │   ├── index.ts          # Main entry point for the API
│   │   └── package.json
│   ├── frontend/             # Frontend Next.js application
│   │   ├── app/              # Next.js App Router directory
│   │   ├── components/       # React components (e.g., hero-section.tsx)
│   │   └── package.json
│   ├── hub/                  # Purpose to be defined (potentially for WebSocket or real-time communication)
│   └── validator/            # Purpose to be defined (likely for blockchain interaction/validation logic)
├── packages/
│   ├── common/               # Shared utilities, types, or constants
│   ├── db/                   # Prisma schema, client, and database configurations
│   ├── eslint-config/        # Shared ESLint configurations
│   ├── typescript-config/    # Shared TypeScript configurations
│   └── ui/                   # Shared React UI components
├── .gitignore
├── bun.lockb
├── package.json              # Root package.json for Turborepo workspace configuration
├── README.md                 # This file!
└── turbo.json                # Turborepo configuration
```

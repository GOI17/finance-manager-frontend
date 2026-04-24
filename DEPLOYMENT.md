# Vercel Deployment - Finance Manager

This guide details the steps required to deploy the Finance Manager frontend to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account.
- The source code uploaded to a GitHub repository (or GitLab/Bitbucket).

## Deployment Steps

### 1. Import the Project to Vercel

1. Log in to your Vercel dashboard.
2. Click **"Add New..."** and select **"Project"**.
3. Import your GitHub repository corresponding to `finance-manager-frontend`.

### 2. Framework Configuration

Vercel will automatically detect **Next.js**. If it doesn't, ensure it is selected in "Framework Preset".

### 3. Environment Variables (CRITICAL)

Before clicking "Deploy", you must configure the environment variables.

1. Expand the **"Environment Variables"** section.
2. Add the following variable (refer to the `.env.example` file in the project):

| Key | Value |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Your API URL (e.g., `https://api.yourdomain.com`) |

> **Note:** As this is a frontend-only bootcamp project, if you haven't deployed the backend yet, you can use a mock URL or leave it pending. The application requires it to connect with data.

### 4. Deployment

1. Click **"Deploy"**.
2. Wait a few minutes for the build process to complete.
3. Done! Vercel will provide you with a public URL (e.g., `finance-manager-frontend.vercel.app`).

## Known Issues and Caveats

- **Build Failure on `/demos/caching/revalidate`**: There is a pre-existing issue where the cache demo page attempts to fetch from a backend during static generation. If deployment fails for this reason, ensure the API is accessible or temporarily ignore that route during build.
- **Backend Required**: Since this is a frontend-only bootcamp, remember that without a valid API configured in `NEXT_PUBLIC_API_URL`, some sections will show loading errors.

## Security Considerations

- **Images:** The project is configured in `next.config.ts` to only allow images from secure domains (`res.cloudinary.com`).
- **Protocol:** HTTPS usage is enforced for all external assets.

---

*This is a reproducible guide for the Next.js bootcamp.*

# Streamflix - Full-Stack Streaming Platform

![Streamflix Logo](https://github.com/user-attachments/assets/7600a32e-32c8-4fbf-881e-b9f6cc3ab7e8)

**Live Demo:** [https://streamsflix.online/](https://streamsflix.online/)

## Overview

Streamflix is a feature-rich video streaming platform designed to deliver a seamless viewing experience for movies and TV shows. This project showcases a modern full-stack architecture, combining a robust .NET backend with a dynamic Next.js frontend.

## Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/26030d54-3959-47a3-8c37-5ecbfe8569f4" alt="Screenshot 1" width="700"/>
  <img src="https://github.com/user-attachments/assets/66e0c166-bc08-4183-9de7-b350d286065c" alt="Screenshot 2" width="700"/>
  <img src="https://github.com/user-attachments/assets/12fd7801-9918-4e8b-8bde-2e4f9d4b621a" alt="Screenshot 3" width="700"/>
  <img src="https://github.com/user-attachments/assets/ce25c072-4b28-4511-ad4e-f8d0353c5d8e" alt="Screenshot 4" width="700"/>
  <img src="https://github.com/user-attachments/assets/6d68ae31-383e-47ea-adbf-7b7036d6dedb" alt="Screenshot 5" width="700"/>
  <img src="https://github.com/user-attachments/assets/66191148-fc9f-4efc-ba74-8d3eabcd1fb4" alt="Screenshot 6" width="700"/>
  <img src="https://github.com/user-attachments/assets/c887f936-5908-4360-aeab-c85680948e22" alt="Screenshot 7" width="700"/>
  <img src="https://github.com/user-attachments/assets/39db962e-c756-43ac-be62-645d1c4e6276" alt="Screenshot 8" width="700"/>
  <img src="https://github.com/user-attachments/assets/91d861be-9483-425d-a66b-7b6e4233d94c" alt="Screenshot 9" width="700"/>
  <img src="https://github.com/user-attachments/assets/fd5b1e25-8400-440b-ac64-0053f320b85d" alt="Screenshot 10" width="700"/>
  <img src="https://github.com/user-attachments/assets/0622b5ae-bcf2-475d-83e8-5983ff3c9576" alt="Screenshot 11" width="700"/>
</div>

## Key Features

### User Authentication & Authorization
- Secure sign-up and sign-in functionality
- Role-based access control (User/Admin) using JWT
- Protected routes and middleware

### Content Management (Admin)
- Upload new shows and episodes, including thumbnails and metadata
- Manage existing TV shows and their content
- User management dashboard to view, modify roles, and delete users

### User Experience
- Browse and search for TV shows
- Personalized user profiles
- Subscription management (placeholder for integration with Stripe)
- Video playback with progress tracking
- Add shows to favorites

### Technical Features
- Responsive design optimized for various devices using Tailwind CSS
- SEO friendly implementation with Next.js metadata API, `sitemap.xml`, and `robots.txt`
- PWA ready with `site.webmanifest` for progressive web app capabilities

## Technical Stack

### Frontend (This Repository - Deployed on Netlify)

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, Shadcn/UI components, clsx, tailwind-merge |
| **State Management** | React Query (TanStack Query), React Hooks (`useState`, `useEffect`) |
| **Form Handling** | React Hook Form with Zod validation |
| **API Interaction** | Fetch API for consuming RESTful backend services |
| **Authentication** | Client-side JWT handling, secure cookie storage (`httpOnly`) |
| **Routing** | Next.js App Router with dynamic routes and route protection via Middleware |
| **UI Components** | Custom components, Lucide React icons |
| **Notifications** | React Toastify |
| **Build & Linting** | Next CLI, ESLint |

### Backend (Separate Repository - Deployed on AWS)

| Category | Technologies |
|----------|-------------|
| **Framework** | ASP.NET Core (C#) |
| **Database** | PostgreSQL with Entity Framework Core |
| **API** | RESTful APIs with JWT-based authentication & HTTPS |
| **Cloud Services (AWS)** | EC2 (Compute), S3 (Storage), RDS (Database), VPC, Security Groups, Elastic IP |
| **Infrastructure as Code** | Terraform |
| **Containerization** | Docker & Docker Compose |
| **Third-Party Integrations** | Stripe for payments, Resend for email notifications |
| **Web Server/Proxy** | Nginx as reverse proxy |
| **DevOps & Automation** | Bash scripting, Certbot for SSL |

## Demonstrated Skills

### Full-Stack Development
- **Frontend:** Modern, responsive UIs with Next.js, TypeScript, and Tailwind CSS
- **Backend:** Robust and secure APIs with C# and ASP.NET Core

### Modern Frontend Practices
- Next.js features (Server Components, Client Components, App Router, Middleware)
- Efficient state management (React Query, React Hooks)
- Accessible and reusable UI components
- Type safety with TypeScript

### Cloud & DevOps
- **AWS:** EC2, S3, RDS, VPC, Security Groups, Elastic IP
- **Infrastructure as Code:** Terraform for automated provisioning
- **Containerization:** Docker and Docker Compose
- **CI/CD:** Automated deployment via Netlify and custom scripts

### Database & Security
- PostgreSQL and Entity Framework Core
- JWT-based authentication
- HTTPS implementation
- Secure configurations

### System Architecture
- Decoupled frontend/backend design
- Third-party API integrations
- Scalable architecture using cloud services

## Getting Started (Frontend)

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone [your-frontend-repo-url]
   cd streamflix-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_S3_BUCKET_NAME=your-s3-bucket-name
   # Add other variables as needed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Frontend
- Deployed on Netlify
- Continuous integration and deployment from the `main` branch

### Backend
- Deployed on AWS (EC2, RDS, S3)
- Managed with Terraform and Docker
- Automated SSL certificate management with Certbot

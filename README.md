![image](https://github.com/user-attachments/assets/7600a32e-32c8-4fbf-881e-b9f6cc3ab7e8)# Streamflix - Full-Stack Streaming Platform
Live Demo link: https://streamsflix.online/
Images:
![image](https://github.com/user-attachments/assets/26030d54-3959-47a3-8c37-5ecbfe8569f4)
![image](https://github.com/user-attachments/assets/66e0c166-bc08-4183-9de7-b350d286065c)
![image](https://github.com/user-attachments/assets/12fd7801-9918-4e8b-8bde-2e4f9d4b621a)
![image](https://github.com/user-attachments/assets/ce25c072-4b28-4511-ad4e-f8d0353c5d8e)
![image](https://github.com/user-attachments/assets/6d68ae31-383e-47ea-adbf-7b7036d6dedb)
![image](https://github.com/user-attachments/assets/66191148-fc9f-4efc-ba74-8d3eabcd1fb4)
![image](https://github.com/user-attachments/assets/c887f936-5908-4360-aeab-c85680948e22)
![image](https://github.com/user-attachments/assets/39db962e-c756-43ac-be62-645d1c4e6276)
![image](https://github.com/user-attachments/assets/91d861be-9483-425d-a66b-7b6e4233d94c)
![image](https://github.com/user-attachments/assets/fd5b1e25-8400-440b-ac64-0053f320b85d)
![image](https://github.com/user-attachments/assets/0622b5ae-bcf2-475d-83e8-5983ff3c9576)



Streamflix is a feature-rich video streaming platform designed to deliver a seamless viewing experience for movies and TV shows. This project showcases a modern full-stack architecture, combining a robust .NET backend with a dynamic Next.js frontend.


## Key Features

- **User Authentication & Authorization:** Secure sign-up, sign-in, and role-based access control (User/Admin) using JWT.
- **Content Management (Admin):**
  - Upload new shows and episodes, including thumbnails and metadata.
  - Manage existing TV shows and their content.
  - User management dashboard to view, modify roles, and delete users.
- **User Experience:**
  - Browse and search for TV shows.
  - Personalized user profiles.
  - Subscription management (placeholder for integration with Stripe).
  - Video playback with progress tracking.
  - Add shows to favorites.
- **Responsive Design:** Optimized for various devices using Tailwind CSS.
- **SEO Friendly:** Implemented with Next.js metadata API, `sitemap.xml`, and `robots.txt`.
- **PWA Ready:** Includes a `site.webmanifest` for progressive web app capabilities.

## Technical Stack

### Frontend (This Repository - Deployed on Netlify)

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn/UI (components), clsx, tailwind-merge
- **State Management:** React Query (TanStack Query) for server state, React Hooks (`useState`, `useEffect`) for local state.
- **Form Handling:** React Hook Form with Zod for validation.
- **API Interaction:** Fetch API for consuming RESTful backend services.
- **Authentication:** Client-side JWT handling and secure cookie storage (`httpOnly`).
- **Routing:** Next.js App Router with dynamic routes and route protection via Middleware.
- **UI Components:** Custom components, Lucide React for icons.
- **Notifications:** React Toastify for user feedback.
- **Build & Linting:** Next CLI, ESLint.

### Backend (Separate Repository - Deployed on AWS)

- **Framework:** ASP.NET Core (C#)
- **Database:** PostgreSQL with Entity Framework Core (migrations, complex queries).
- **API:** Secure RESTful APIs with JWT-based authentication & HTTPS.
- **Cloud Services (AWS):**
  - **Compute:** EC2 for hosting the backend application.
  - **Storage:** S3 for media (video thumbnails, episode files).
  - **Database:** RDS for managed PostgreSQL.
  - **Networking:** VPC, Security Groups, Elastic IP.
- **Infrastructure as Code (IaC):** Terraform for automating AWS infrastructure provisioning.
- **Containerization:** Docker & Docker Compose for creating and managing application environments.
- **Third-Party Integrations:**
  - Stripe for payment processing (planned/integrated).
  - Resend for email notifications.
- **Web Server/Proxy:** Nginx as a reverse proxy.
- **DevOps & Automation:**
  - Automated deployment scripting (Bash).
  - Automated SSL certificate management (Certbot).

## My Demonstrated Skills

This project highlights proficiency in:

- **Full-Stack Development:**
  - **Frontend:** Building modern, responsive, and performant user interfaces with Next.js, TypeScript, and Tailwind CSS. Implementing client-side logic, state management, and API integration.
  - **Backend:** Proficient in C# and ASP.NET Core for building robust and secure backend APIs.
- **Modern Frontend Practices:**
  - Leveraging Next.js features like Server Components, Client Components, App Router, and Middleware.
  - Efficient state management with React Query and React Hooks.
  - Building accessible and reusable UI components (Shadcn/UI).
  - Implementing robust form handling and validation.
  - Ensuring type safety with TypeScript.
- **Cloud Infrastructure Management (AWS):** Hands-on experience with EC2, S3, RDS, VPC, Security Groups, and Elastic IP for deploying and managing scalable applications.
- **Infrastructure as Code (IaC):** Automating infrastructure provisioning and management using Terraform.
- **Containerization & Orchestration:** Utilizing Docker for creating portable application environments and Docker Compose for managing multi-container applications.
- **Database Design & Management:** Working with PostgreSQL and Entity Framework Core for data persistence, including migrations and complex queries.
- **Secure API Development & Consumption:** Implementing and consuming JWT-based authentication, ensuring HTTPS, and managing secure configurations on both frontend and backend.
- **Third-Party API Integration:** Integrating frontend applications with external services like Stripe (payments) and Resend (email notifications) via backend proxies or directly.
- **DevOps & Automation:**
  - Automated deployment scripting using Bash.
  - Automated SSL certificate management with Certbot.
  - Frontend deployment via Netlify with CI/CD.
- **Scalable Architecture Design:** Designing systems with considerations for scalability, using services like S3 for media storage and RDS for a managed database, and a decoupled frontend/backend.
- **Networking & Security:** Configuring Nginx as a reverse proxy, setting up firewalls (Security Groups), and implementing SSL/TLS.
- **Problem Solving & System Design:** Designing and implementing a complex system with multiple interconnected components, ensuring smooth data flow and user interaction between the frontend and backend.

## Getting Started (Frontend)

To get a local copy up and running:

1.  **Clone the repository:**

    ```bash
    git clone [your-frontend-repo-url]
    cd streamflix-frontend
    ```

2.  **Install NPM packages:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the necessary environment variables (e.g., `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_S3_BUCKET_NAME`).

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api # Or your deployed backend URL
    NEXT_PUBLIC_S3_BUCKET_NAME=your-s3-bucket-name
    # Add other variables as needed (e.g., JWT_SECRET_KEY if used client-side, though typically server-side)
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

- **Frontend:** Deployed on [Netlify]. The deployment is configured for continuous integration and deployment from the `main` branch.
- **Backend:** Deployed on AWS (EC2, RDS, S3), managed with Terraform and Docker.

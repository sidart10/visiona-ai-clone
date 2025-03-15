# Backend Structure Document

This document outlines the backend architecture, database management, API design, hosting solutions, infrastructure components, and security measures for Visiona, an AI-driven web platform for creating personalized AI clones. The goal is to provide a clear overview of the backend setup in everyday language, ensuring anyone can understand how everything works.

## 1. Backend Architecture

The Visiona backend is built on a modern, serverless approach using Next.js API Routes. Here’s a breakdown of the architecture:

*   **Design Patterns and Frameworks**:

    *   Uses serverless functions provided by Next.js API Routes for handling requests.
    *   Relies on established frameworks and integrations (e.g., Clerk for authentication, Supabase for database and storage).
    *   Business logic is separated into clear endpoints to enforce modularity and easier maintenance.

*   **Key Responsibilities**:

    *   **User Authentication & Management**: Integration with Clerk manages secure signups, logins, and account management.
    *   **Photo Upload & AI Integration**: Allows users to upload photos, which are then securely stored, and triggers AI model training via third-party services (Replicate’s Flux LoRA).
    *   **Image Generation**: Handles user input, calls external AI services (Replicate, GPT-4o/Claude) for generating/optimizing prompts and images.
    *   **Payment Processing**: Manages subscription tiers and payments via Stripe.
    *   **Gallery Management**: Retrieves, sorts, and secures the display of generated images.

*   **Scalability and Maintainability**:

    *   The serverless nature means the system can automatically scale with traffic fluctuations.
    *   Separation of concerns (authentication, image generation, payment, gallery management) ensures that updates in one component do not adversely affect others.
    *   Modern development tools like Next.js and Supabase ensure the system remains performant even as usage grows.

## 2. Database Management

Data management is a crucial part of Visiona. The following are the core details:

*   **Database Technologies Used**:

    *   **SQL Database** via Supabase using PostgreSQL
    *   **Storage** with Supabase Storage, managed with secure policies

*   **Data Structure and Management Practices**:

    *   **Structured Data**: All user accounts, image metadata, payment records, and model details are stored in structured tables in PostgreSQL.
    *   **Access Control**: Supabase’s Row-Level Security (RLS) ensures that users can only access their own data.
    *   **Backups and Retention**: Regular, automated backups with a 30-day retention policy are in place.
    *   **Encryption**: Sensitive data, such as API keys and personal details, are encrypted to protect against unauthorized access.

## 3. Database Schema

Since we are using an SQL database (PostgreSQL) with Supabase, here is a sample schema illustrating how our database is organized:

`-- Table: users CREATE TABLE users ( id SERIAL PRIMARY KEY, clerk_id VARCHAR(255) UNIQUE NOT NULL, -- Identifier from Clerk email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Table: photos CREATE TABLE photos ( id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id) ON DELETE CASCADE, file_url TEXT NOT NULL, uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Table: models CREATE TABLE models ( id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id) ON DELETE CASCADE, trigger_word VARCHAR(50) NOT NULL, status VARCHAR(50) DEFAULT 'Processing', -- statuses: Processing, Ready, Failed parameters JSONB NOT NULL, -- stores both fixed and optionally customizable parameters created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Table: generations CREATE TABLE generations ( id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id) ON DELETE CASCADE, model_id INT REFERENCES models(id) ON DELETE SET NULL, prompt TEXT NOT NULL, enhanced_prompt TEXT, image_url TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Table: payments CREATE TABLE payments ( id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id) ON DELETE CASCADE, stripe_charge_id VARCHAR(255) UNIQUE NOT NULL, amount NUMERIC(10,2) NOT NULL, currency VARCHAR(10) NOT NULL, status VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); -- Table: audit_logs (for security and tracking events) CREATE TABLE audit_logs ( id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id) ON DELETE SET NULL, action VARCHAR(255) NOT NULL, details JSONB, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );`

## 4. API Design and Endpoints

Visiona’s API endpoints have been designed with RESTful principles, ensuring clarity in how data is exchanged between the frontend and backend.

*   **API Style**: RESTful API using Next.js API Routes.

*   **Key Endpoints and Their Functions**:

    *   **Authentication Endpoints**:

        *   `/api/auth/login` and `/api/auth/signup`: Facilitate secure login and registration via Clerk.

    *   **Photo and Model Endpoints**:

        *   `/api/photos/upload`: Handles photo upload operations ensuring files are securely stored.
        *   `/api/models/train`: Initiates training of AI models using the specified photos and trigger word.
        *   `/api/models/status`: Checks and returns the status of ongoing AI model training.

    *   **Image Generation Endpoints**:

        *   `/api/generate`: Accepts text prompts and routes them either directly or enhanced by GPT-4o/Claude to generate images.

    *   **Gallery Endpoints**:

        *   `/api/gallery`: Fetches image details to display in the user’s gallery, sorted chronologically.
        *   `/api/gallery/delete`: Allows users to delete images from their gallery.

    *   **Payment Endpoints**:

        *   `/api/payment/subscribe`: Handles subscription sign-ups and manages tiered access via Stripe.
        *   `/api/payment/webhook`: Listens for events from Stripe to update payment status and enforce user quotas.

## 5. Hosting Solutions

Visiona is hosted on modern cloud solutions ensuring speed, scalability, and reliability:

*   **Cloud Providers and Deployment**:

    *   **Vercel**: The entire application, including frontend and serverless API routes, is deployed on Vercel. The benefits include:

        *   **Reliability**: Proven uptime and global distribution.
        *   **Scalability**: Automatically scales with increased traffic and API requests.
        *   **Cost-Effectiveness**: Optimized pricing for serverless deployments.

## 6. Infrastructure Components

Several key infrastructure components work together to ensure optimal performance and a smooth user experience:

*   **Load Balancers**: Managed via Vercel, ensuring that requests are distributed evenly and performance is maintained during high traffic.

*   **Caching Mechanisms**: Utilizes Vercel’s built-in caching alongside potential additional caching at the API level to reduce load times.

*   **Content Delivery Networks (CDNs)**: Vercel’s integrated CDN delivers static assets and images quickly to a global audience.

*   **Third-Party Integrations**:

    *   **Stripe** for payment processing
    *   **Replicate and GPT-4o/Claude** for AI model training and prompt enhancement

## 7. Security Measures

Security is a top priority for Visiona, and the backend includes several layers of protection:

*   **Authentication & Authorization**:

    *   Uses Clerk for managing user authentication securely.
    *   Enforces role-based access (free vs. premium) directly in the API responses and database via row-level security.

*   **Data Encryption**:

    *   Sensitive data, including API keys and user details, are encrypted both in transit and at rest.

*   **Database Security**:

    *   Supabase’s row-level security (RLS) ensures users only access their data.
    *   Regular automatic backups with a defined retention period (30 days).

*   **Compliance and Auditing**:

    *   The system supports GDPR/CCPA data deletion requests.
    *   Sentry and dedicated audit logs record critical events and potential anomalies.

## 8. Monitoring and Maintenance

To keep the backend reliable and up-to-date, continuous monitoring and proactive maintenance are in place:

*   **Monitoring Tools**:

    *   **Vercel Analytics**: Tracks serverless function performance and uptime.
    *   **Sentry**: Captures errors and logs actions for audit trails.
    *   **Supabase Monitoring**: Utilizes built-in monitoring for database performance and security audits.

*   **Maintenance Practices**:

    *   Regular reviews of serverless endpoints and database performance.
    *   Automatic backup and recovery procedures to minimize downtime in case of issues.
    *   Scheduled updates and security patches to keep the environment secure and efficient.

## 9. Conclusion and Overall Backend Summary

The Visiona backend is designed to support a dynamic, AI-driven web platform with a clear focus on scalability, security, and user experience. Key takeaways include:

*   A serverless architecture using Next.js API Routes that provides scalability and maintainability.
*   A robust PostgreSQL database via Supabase, with a clear schema for managing users, photos, models, generations, and payments.
*   A RESTful API design ensuring clear, role-based communication between the frontend and backend.
*   AWS-level hosting benefits via Vercel, including global distribution with integrated CDNs and caching.
*   Comprehensive security measures such as encrypted data, authentication with Clerk, and Supabase’s RLS that ensure data safety and regulatory compliance.
*   Continuous monitoring and maintenance using Vercel analytics, Sentry, and Supabase’s tools ensure a reliable and responsive user environment.

Overall, this backend structure aligns with Visiona's core goals: enabling creative users to effortlessly generate personalized AI clones while providing a secure and efficient platform that scales with their needs.

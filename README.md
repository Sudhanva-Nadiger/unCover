# Uncover
unCover is a Saas web application designed to streamline the job application process by automating the creation of personalized cover letters. Say goodbye to manual cover letter writing and hello to effortless job applications!

<img src='/public/thumbnail.jpg'>

## Features
- Landing Page: Introduce users to unCover and its features, highlighting its ability to generate cover letters in seconds.
- Clerk Authentication: Secure user authentication system powered by Clerk for seamless login and registration.
- Dashboard: User-friendly dashboard for easy navigation and access to key features.
- Resume Management: Upload and store resumes securely, allowing users to manage their job application documents efficiently.
- Cover Letter Generation: Harness the power of Gemini AI to generate personalized cover letters tailored to job descriptions.
- Cover Letter Management: Easily create, edit, and delete cover letters as needed.
- Resume Management: Effortlessly upload, delete, and replace resumes directly from the dashboard.
- Subscription-Based Features: Premium subscription options for enhanced features such as unlimited resume storage and priority support.

<img src='/public/readme-2.png' />

## Getting Started
To get started with unCover, follow these simple steps:

1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/Sudhanva-Nadiger/unCover.git
    cd uncover
    ```
2. Install dependencies.
    ```bash
    npm install
    ```
2. Configure environment variables for Clerk authentication and Gemini AI integration.
    ```bash
    DATABASE_URL=<Supabase Postgres database url>
    NEXT_PUBLIC_SUPABSE_PROJECT_URL=<Supabase project url>
    NEXT_PUBLIC_SUPABSE_PUBLIC_ANON_KEY=<Supabase database anon key>
    SUPABASE_BUCKET_BASEURL=<Supabase bucket url to store files>

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Clerk publishable key>
    CLERK_SECRET_KEY=<Clerk secret key>

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    GEMINI_API_KEY=<Gemini Api key from google gemini>

    STRIPE_SECRETE_KEY=<Stripe secret key for payment integration>
    STRIPE_WEBHOOK_SECRET=<Stripe webhook secret for local development>
    ```
4. Run the application.
    ```bash
    npm run dev
    ```

5. Access the application through your preferred web browser at http://localhost:3000 .

## Technologies used
- Frontend: Typescript, Nextjs, Reactjs, Tailwind CSS, Shadcn UI
- Backend: Typescript, Nextjs
- Database: Supabase postgres, Drizzle ORM
- Authentication: Clerk
- AI Integration: Gemini AI

## Future Plans
Here are some exciting features planed to implement in future versions:

- Public Resume Profiles: In the next version, users will have the option to make their resumes public. This will allow other users to view their resumes and provide feedback or likes.
- Resume Comments and Likes: With public resume profiles, we'll introduce the ability for users to leave comments and likes on each other's resumes. This will foster a supportive community where users can learn from each other and showcase their talents.
- Ai based resume review: everaging advanced AI algorithms, we plan to introduce a feature for AI-based resume review. This tool will provide users with valuable insights and suggestions for optimizing their resumes to increase their chances of landing interviews.



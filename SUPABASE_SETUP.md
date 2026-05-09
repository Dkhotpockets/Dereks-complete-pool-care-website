# Derek's Complete Pool Care - Supabase Setup Guide

This guide provides step-by-step instructions to set up Supabase for your Derek's Complete Pool Care website contact form.

## Prerequisites

- Supabase account (free at https://supabase.com)
- Your Supabase Project URL and Anon Key

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Enter your project details:
   - **Name**: `dereks-pool-care` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Select closest to your location
5. Click "Create new project" and wait for it to initialize

## Step 2: Execute the SQL Script

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste the entire SQL script below:

```sql
-- SQL Script: Creates the contact_submissions table and sets RLS policies
-- Run this script in your Supabase SQL Editor.

-- 1. Create the table to store contact form data
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    app_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_requested TEXT NOT NULL,
    message TEXT
);

-- 2. Enable Row Level Security (RLS) for the table
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow ANONYMOUS and AUTHENTICATED users to INSERT data
-- This is crucial because a website contact form is typically used by non-logged-in visitors.
CREATE POLICY "Allow all users to insert contact submissions"
ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (
    true -- Allows insertion from anyone (publicly accessible contact form)
);

-- OPTIONAL: You may want a policy for your admin/owner account (authenticated user)
-- to be able to SELECT (read) the submissions.
CREATE POLICY "Enable select for authenticated users"
ON public.contact_submissions FOR SELECT TO authenticated
USING (true);

-- End of script
```

4. Click **Run** button (or press Ctrl+Enter)
5. You should see a success message

## Step 3: Get Your API Keys

1. In your Supabase dashboard, click **Settings** (left sidebar, gear icon)
2. Click **API**
3. Copy these values:
   - **Project URL** (looks like: `https://abcdefg1234.supabase.co`)
   - **Anon Key** (under "Project API keys")

## Step 4: Configure Environment Variables

1. Open your project's root directory
2. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
3. Open `.env.local` and fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 5: Install Supabase Client Library

1. Run this command in your project root:
   ```bash
   npm install @supabase/supabase-js
   ```

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the application in your browser

3. Navigate to the contact form section

4. Fill out the contact form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `(631) 320-8271`
   - Service Requested: `Premium`
   - Message: `Test submission`

5. Click "Send Message"

6. You should see a success message: **"Thank you! Your quote request has been sent successfully."**

## Step 7: Verify Data in Supabase

1. Go back to your Supabase dashboard
2. Click **Table Editor** (left sidebar)
3. Select the **contact_submissions** table
4. You should see your test submission with all the fields populated

## Troubleshooting

### "Supabase credentials are not configured"
- Verify `.env.local` file exists in your project root
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly set
- Restart your development server after updating `.env.local`

### Form submission fails with "Failed to submit form"
- Check browser console (F12) for error messages
- Verify RLS policies are correctly applied in Supabase
- Ensure the `contact_submissions` table exists

### No data appearing in Supabase table
- Verify the table was created successfully
- Check RLS policies allow INSERT access to anonymous users
- Check browser console for JavaScript errors

## Deployment to GitHub Pages

When deploying to GitHub Pages:

1. Add environment variables to your GitHub repository secrets:
   - Go to **Settings > Secrets and variables > Actions**
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Update your deployment workflow to use these variables

3. Rebuild and redeploy using the `npm run build` command

## Security Notes

- The Anon Key is meant to be public (it's prefixed with `NEXT_PUBLIC_`)
- Row Level Security (RLS) policies protect your table from unauthorized access
- All contact submissions are stored securely in Supabase
- Consider adding rate limiting for production use

## Next Steps

- Add email notifications when new contact submissions arrive
- Create an admin dashboard to view and manage submissions
- Add spam protection (reCAPTCHA) to the contact form
- Set up automated email responses to users who submit the form

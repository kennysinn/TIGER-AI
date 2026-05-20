# Tiger AI Product Plan

## Product Positioning

Tiger AI is an AI Company Builder Platform for solopreneurs, freelancers, consultants, trainers, and small agencies.

The product promise for the MVP:

> Build your first AI employee and generate a client-ready demo link in 30 minutes.

Tiger AI should not compete as a generic chatbot builder, automation tool, or AI course. The product should help users turn AI employees into a sellable AI service business.

## MVP Scope

### Must Have

1. User login and account workspace
2. AI company template selection
3. AI employee creation
4. Knowledge base upload and training state
5. Test chat for the AI employee
6. Readiness score
7. Business kit generator
8. Client demo link
9. Basic subscription plan screen

### Not In MVP

1. Full CRM
2. Marketplace
3. Complex workflow builder
4. Client payment collection for users
5. Multi-agent orchestration
6. White-label custom domains
7. Advanced WhatsApp integration

## Product Modules

### 1. AI Company Builder

Users choose a pain-point company template such as Speed-to-Lead AI Company, Document Processing AI Company, Follow-up Engine AI Company, Customer Reactivation AI Company, or Business Reporting AI Company.

Each template includes:

1. Target customer
2. AI employee roles
3. Service package
4. Pricing suggestion
5. Demo script
6. Proposal outline
7. Client onboarding checklist

### 2. AI Employee Studio

Users create and configure AI employees.

MVP fields:

1. Employee name
2. Role
3. Target customer
4. Tone and language
5. Allowed tasks
6. Escalation rule

### 3. Knowledge Base Trainer

Users upload business knowledge and see training readiness.

MVP metrics:

1. Knowledge coverage
2. Answer accuracy estimate
3. Missing information
4. Demo readiness

### 4. Business Kit Generator

After training, Tiger AI generates:

1. Service name
2. Landing page copy
3. Proposal
4. Pricing package
5. WhatsApp sales script
6. Client onboarding form
7. Monthly report template

### 5. Client Demo Link

A shareable page that prospects can open.

MVP content:

1. AI employee test chat
2. Service description
3. Use cases
4. Disclaimer
5. Request proposal button

### 6. Client / MRR Dashboard

MVP can start as a lightweight dashboard.

Initial metrics:

1. Demo links created
2. Leads captured
3. Active clients
4. Monthly recurring revenue
5. Employee readiness score

## Suggested Tech Roadmap

### Phase 1: Static Website and Product Prototype

Goal: Make the brand, positioning, and core app flow feel real.

Recommended stack:

1. Static HTML, CSS, and JavaScript
2. GitHub Pages hosting
3. No backend yet

Output:

1. Public homepage
2. Template selection page
3. AI employee builder page
4. Client demo link page
5. Dashboard, login preview, and subscription pricing page sections

### Phase 2: Real Login and Database

Goal: Turn prototype into a usable MVP.

Recommended stack:

1. Supabase Auth
2. Supabase Postgres
3. Row-level security
4. GitHub Pages frontend

Core tables:

1. profiles
2. company_templates
3. ai_companies
4. ai_employees
5. knowledge_sources
6. training_scores
7. business_kits
8. demo_links
9. subscriptions

### Phase 3: AI Generation Layer

Goal: Generate business kits and test AI employees.

Recommended approach:

1. Serverless API layer
2. OpenAI API for generation and chat
3. Supabase storage for uploaded files
4. RAG later, starting with simple text extraction

Hosting options:

1. Cloudflare Workers
2. Vercel serverless functions
3. Supabase Edge Functions

GitHub Pages can still host the frontend.

### Phase 4: Client Demo Links

Goal: Let users share demos with prospects.

MVP behavior:

1. Public demo route
2. Limited test chat
3. Lead capture form
4. Proposal request button

### Phase 5: Subscription and Malaysia / SEA Playbook

Goal: Commercialize the product.

Recommended integrations:

1. Stripe for international payments
2. Billplz or ToyyibPay for Malaysia
3. WhatsApp-first sales scripts
4. Local SME templates
5. English, Mandarin, and Malay support

## Design Direction

The UI should feel like an operator dashboard for building an AI service company. The visual direction should follow the Tiger AI logo style: dark background, metallic silver surfaces, angular lines, and electric cyan highlights.

Visual principles:

1. First screen shows the product workspace, not a generic hero.
2. Copy should be direct and business-oriented.
3. Use compact dashboards, template cards, score panels, and client demo previews.
4. Keep the tone premium but practical.
5. Avoid looking like an AI course, generic chatbot builder, or speculative finance dashboard.

## First Website Sections

1. Navigation and login entry
2. Product workspace hero
3. AI company templates
4. Build flow
5. Business kit generator preview
6. Client demo link preview
7. MVP roadmap
8. CTA to start building

## Deployment Plan

For the current no-backend version:

1. Initialize git
2. Push to GitHub
3. Enable GitHub Pages
4. Deploy from the `main` branch root

After backend features are added:

1. Keep frontend on GitHub Pages or move to Vercel
2. Add Supabase project
3. Add serverless API for AI calls
4. Keep secrets out of frontend code

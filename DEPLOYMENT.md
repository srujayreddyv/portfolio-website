# Vercel Deployment Guide

Complete guide for deploying the portfolio website to Vercel with GitHub integration, environment configuration, and CI/CD setup.

## 🚀 Quick Deploy

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/srujayreddyv/portfolio-website&project-name=portfolio-website&repository-name=portfolio-website&root-directory=portfolio-website)

### Prerequisites

- **GitHub Account** with repository access
- **Vercel Account** (free tier available)
- **SendGrid Account** (recommended) or **Formspree Account** (alternative)
- **Node.js 18+** for local development

## 📋 Pre-Deployment Checklist

### 1. Environment Setup

**Required Environment Variables:**

```bash
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=your.email@example.com
```

**Optional Environment Variables:**

```bash
FORMSPREE_FORM_ID=your_formspree_form_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. Content Customization

Before deploying, update your personal content:

- **Personal Info**: `content/data/personal.ts`
- **Skills**: `content/data/skills.ts`
- **Experience**: `content/data/experience.ts`
- **Education**: `content/data/education.ts`
- **Projects**: `content/projects/*.mdx`
- **Resume**: `public/YourName_Resume.pdf`
- **Profile Image**: `public/your-profile-pic.png`

### 3. Local Testing

```bash
# Install dependencies
npm install

# Validate environment
npm run validate:env

# Run tests
npm test

# Build and test locally
npm run build
npm run start
```

## 🔧 Email Service Setup

### Option 1: SendGrid (Recommended)

**Why SendGrid?**

- ✅ 100 emails/day free tier
- ✅ Excellent deliverability
- ✅ Professional email templates
- ✅ Detailed analytics

**Setup Steps:**

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up for free account

2. **Create API Key**
   - Navigate to Settings → API Keys
   - Click "Create API Key"
   - Choose "Restricted Access"
   - Enable "Mail Send" permission only
   - Copy the API key (starts with `SG.`)

3. **Verify Sender Email**
   - Go to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Enter your email address (e.g., `noreply@yourdomain.com`)
   - Complete verification process

4. **Test Configuration**

   ```bash
   # Set environment variables
   export SENDGRID_API_KEY="SG.your_api_key_here"
   export SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
   export CONTACT_EMAIL="your.email@example.com"

   # Test locally
   npm run dev
   ```

### Option 2: Formspree (Alternative)

**Why Formspree?**

- ✅ No API key required
- ✅ 50 submissions/month free
- ✅ Simple setup
- ✅ Spam protection included

**Setup Steps:**

1. **Create Formspree Account**
   - Go to [formspree.io](https://formspree.io)
   - Sign up for free account

2. **Create Form**
   - Click "New Form"
   - Enter form name: "Portfolio Contact Form"
   - Copy the form ID (e.g., `xdkogkpw`)

3. **Configure Environment**
   ```bash
   export FORMSPREE_FORM_ID="your_form_id_here"
   export CONTACT_EMAIL="your.email@example.com"
   ```

## 🚀 Vercel Deployment

### Method 1: GitHub Integration (Recommended)

**Step 1: Prepare Repository**

```bash
# Ensure code is pushed to GitHub
git add .
git commit -m "feat: prepare for deployment"
git push origin main
```

**Step 2: Connect to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `portfolio-website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

**Step 3: Environment Variables**
In Vercel Dashboard → Settings → Environment Variables:

```bash
# Required
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=your.email@example.com

# Optional
FORMSPREE_FORM_ID=your_formspree_form_id
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**Step 4: Deploy**

- Click "Deploy"
- Wait for build to complete
- Your site will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

**Step 1: Install Vercel CLI**

```bash
npm install -g vercel@latest
```

**Step 2: Login and Link**

```bash
# Login to Vercel
vercel login

# Link project (run from portfolio-website directory)
cd portfolio-website
vercel link
```

**Step 3: Set Environment Variables**

```bash
# Set production environment variables
vercel env add SENDGRID_API_KEY
vercel env add SENDGRID_FROM_EMAIL
vercel env add CONTACT_EMAIL
```

**Step 4: Deploy**

```bash
# Deploy to production
vercel --prod
```

## 🔄 CI/CD Setup with GitHub Actions

### Step 1: GitHub Secrets

In your GitHub repository → Settings → Secrets and variables → Actions:

```bash
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

**To get these values:**

1. **Vercel Token**:
   - Vercel Dashboard → Settings → Tokens
   - Create token with appropriate scope

2. **Org ID and Project ID**:
   ```bash
   cd portfolio-website
   vercel link
   cat .vercel/project.json
   ```

### Step 2: Workflow Configuration

The GitHub Actions workflow (`.github/workflows/vercel-deployment.yml`) provides:

- ✅ **Automated Testing** on every PR
- ✅ **Preview Deployments** for pull requests
- ✅ **Production Deployments** on main branch
- ✅ **Build Validation** and linting checks
- ✅ **Test Coverage** reporting

### Step 3: Deployment Process

```bash
# Development workflow
git checkout -b feature/new-feature
# Make changes
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create PR → Triggers preview deployment

# Production deployment
git checkout main
git merge feature/new-feature
git push origin main
# Triggers production deployment
```

## 🌐 Custom Domain Setup

### Step 1: Domain Configuration

1. **In Vercel Dashboard**:
   - Go to Project → Settings → Domains
   - Add your custom domain (e.g., `yourdomain.com`)

2. **DNS Configuration**:

   ```bash
   # Add these DNS records at your domain provider:
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### Step 2: SSL Certificate

- Vercel automatically provisions SSL certificates
- HTTPS will be enabled within minutes
- Redirects from HTTP to HTTPS are automatic

### Step 3: Update Environment Variables

```bash
# Update site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📊 Performance Optimization

### Build Optimization

The project includes several performance features:

- **React Compiler**: Automatic optimization
- **Next.js Image**: Optimized image loading
- **Static Generation**: Pre-rendered pages
- **Bundle Analysis**: `npm run build:analyze`

### Vercel Features

- **Edge Network**: Global CDN
- **Automatic Compression**: Gzip/Brotli
- **Image Optimization**: WebP conversion
- **Analytics**: Built-in performance monitoring

## 🔍 Monitoring and Analytics

### Vercel Analytics

1. **Enable Analytics**:
   - Vercel Dashboard → Analytics
   - Enable Web Analytics

2. **Add to Project**:

   ```bash
   npm install @vercel/analytics
   ```

3. **Configure** (already included):

   ```typescript
   // In layout.tsx
   import { Analytics } from '@vercel/analytics/react'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

### Performance Monitoring

- **Core Web Vitals**: Automatic tracking
- **Real User Monitoring**: Performance insights
- **Error Tracking**: Runtime error monitoring

## 🐛 Troubleshooting

### Common Deployment Issues

**1. Build Failures**

```bash
# Check build logs in Vercel dashboard
# Common fixes:
npm run build  # Test locally first
npm run lint   # Fix linting errors
npm test       # Ensure tests pass
```

**2. Environment Variable Issues**

```bash
# Validate environment variables
npm run validate:env

# Check Vercel environment variables
vercel env ls
```

**3. Contact Form Not Working**

```bash
# Check Vercel function logs
# Verify SendGrid API key
# Test email delivery
```

**4. Image Loading Issues**

```bash
# Ensure images are in public/ directory
# Check Next.js Image component usage
# Verify image paths are correct
```

### Debug Commands

```bash
# Local debugging
npm run dev
npm run build
npm run start

# Vercel debugging
vercel logs
vercel env ls
vercel inspect
```

### Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: [Repository Issues](https://github.com/srujayreddyv/portfolio-website/issues)

## 📈 Post-Deployment

### 1. Test Everything

- ✅ **Homepage Loading**: All sections render correctly
- ✅ **Navigation**: Smooth scrolling between sections
- ✅ **Contact Form**: Submit test message
- ✅ **Theme Toggle**: Dark/light mode switching
- ✅ **Responsive Design**: Test on mobile/tablet/desktop
- ✅ **SEO**: Check meta tags and structured data

### 2. Performance Audit

```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse https://yourdomain.com --output html
```

### 3. SEO Optimization

- **Google Search Console**: Add and verify your domain
- **Sitemap Submission**: Submit `/sitemap.xml`
- **Social Media**: Test Open Graph tags
- **Analytics**: Set up Google Analytics (optional)

### 4. Maintenance

- **Regular Updates**: Keep dependencies updated
- **Content Updates**: Add new projects and skills
- **Performance Monitoring**: Check Vercel analytics
- **Security**: Monitor for vulnerabilities

## 💰 Cost Breakdown

### Free Tier Limits

**Vercel Free Tier:**

- ✅ 100GB bandwidth/month
- ✅ Unlimited personal projects
- ✅ Automatic HTTPS
- ✅ Global CDN

**SendGrid Free Tier:**

- ✅ 100 emails/day
- ✅ Email templates
- ✅ Analytics

**Total Monthly Cost: $0** for most portfolio websites!

### Scaling Options

**Vercel Pro ($20/month):**

- 1TB bandwidth
- Advanced analytics
- Password protection
- Custom functions timeout

**SendGrid Essentials ($19.95/month):**

- 50,000 emails/month
- Advanced analytics
- Dedicated IP

## 🎉 Success!

Your portfolio website is now live and ready to showcase your work to the world!

**Next Steps:**

1. Share your portfolio URL with your network
2. Add the link to your resume and LinkedIn profile
3. Monitor analytics and performance
4. Keep content updated with new projects and skills

**Your live portfolio**: `https://yourdomain.com`

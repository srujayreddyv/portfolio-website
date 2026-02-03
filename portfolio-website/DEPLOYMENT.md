# Vercel Deployment Guide

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up SendGrid (Recommended)

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up for free account (100 emails/day free)

2. **Get API Key**
   - Go to Settings > API Keys
   - Create new API key with "Mail Send" permissions
   - Copy the API key

3. **Verify Sender Email**
   - Go to Settings > Sender Authentication
   - Verify your email address (srujayreddyv@icloud.com)

### 3. Deploy to Vercel

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Add Environment Variables**
   In Vercel dashboard > Settings > Environment Variables:

   ```
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   CONTACT_EMAIL=srujayreddyv@icloud.com
   ```

3. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

## Alternative: Formspree Only

If you prefer not to use SendGrid:

1. **Sign up at [Formspree.io](https://formspree.io)**
2. **Create a form** and get your form ID
3. **Update ContactForm.tsx** - replace `xdkogkpw` with your form ID
4. **Deploy to Vercel** (no environment variables needed)

## Testing

### Local Testing

```bash
npm run dev
```

- Visit `http://localhost:3000`
- Test the contact form
- Check console for any errors

### Production Testing

1. Deploy to Vercel
2. Test contact form on live site
3. Check Vercel Functions logs for any issues

## Troubleshooting

### Common Issues

1. **SendGrid "Unauthorized" Error**
   - Check API key is correct
   - Verify sender email is authenticated

2. **Form Not Submitting**
   - Check browser console for errors
   - Verify environment variables in Vercel

3. **Emails Not Received**
   - Check spam folder
   - Verify CONTACT_EMAIL is correct
   - Check SendGrid activity logs

### Vercel Function Logs

- Go to Vercel dashboard > Functions tab
- Click on `/api/contact` to see logs
- Check for any runtime errors

## Features

✅ **Responsive Design** - Works on all devices  
✅ **Form Validation** - Client and server-side validation  
✅ **Error Handling** - Graceful error messages  
✅ **Fallback System** - SendGrid → Formspree fallback  
✅ **Spam Protection** - Basic validation and rate limiting  
✅ **Professional Emails** - HTML formatted with reply-to

## Cost

- **Vercel**: Free tier (100GB bandwidth, unlimited requests)
- **SendGrid**: Free tier (100 emails/day)
- **Formspree**: Free tier (50 submissions/month)

Total cost: **$0/month** for most portfolio websites!

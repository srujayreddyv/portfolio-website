#!/bin/bash

# Vercel Setup Script for Portfolio Website
# This script helps set up Vercel CLI and link the project

set -e

echo "🚀 Portfolio Website - Vercel Setup Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the portfolio-website directory."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
else
    echo "✅ Vercel CLI already installed"
fi

# Login to Vercel
echo ""
echo "🔐 Logging into Vercel..."
echo "Please follow the prompts to authenticate with your Vercel account."
vercel login

# Link the project
echo ""
echo "🔗 Linking project to Vercel..."
echo "When prompted:"
echo "  - Set up and deploy? Y"
echo "  - Which scope? Select your account"
echo "  - Link to existing project? N (for new project) or Y (if project exists)"
echo "  - Project name: portfolio-website (or your preferred name)"
echo "  - Directory: ./ (current directory)"

vercel link

# Check if .vercel directory was created
if [ -d ".vercel" ]; then
    echo ""
    echo "✅ Project linked successfully!"
    echo "📁 .vercel directory created with project configuration"
    
    # Display project info
    if [ -f ".vercel/project.json" ]; then
        echo ""
        echo "📋 Project Information:"
        cat .vercel/project.json | jq '.'
        
        echo ""
        echo "🔑 For GitHub Actions, you'll need these values:"
        echo "VERCEL_ORG_ID=$(cat .vercel/project.json | jq -r '.orgId')"
        echo "VERCEL_PROJECT_ID=$(cat .vercel/project.json | jq -r '.projectId')"
    fi
else
    echo "❌ Project linking may have failed. Please check the output above."
    exit 1
fi

# Test deployment (optional)
echo ""
read -p "🚀 Would you like to deploy now? (y/N): " deploy_now
if [[ $deploy_now =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    echo "✅ Deployment complete!"
else
    echo "⏭️  Skipping deployment. You can deploy later with: vercel --prod"
fi

echo ""
echo "🎉 Vercel setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add environment variables in Vercel dashboard:"
echo "   - SENDGRID_API_KEY"
echo "   - SENDGRID_FROM_EMAIL"
echo "   - CONTACT_EMAIL"
echo "2. Set up custom domain (optional)"
echo "3. Configure GitHub Actions secrets (if using CI/CD)"
echo ""
echo "📚 Documentation:"
echo "- VERCEL_SETUP_GUIDE.md - Complete setup instructions"
echo "- DEPLOYMENT_CHECKLIST.md - Deployment checklist"
echo "- DEPLOYMENT.md - Quick deployment guide"
echo ""
echo "🌐 Your project dashboard: https://vercel.com/dashboard"
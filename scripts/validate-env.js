#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Validates that all required environment variables are set for deployment
 */

// Load environment variables from .env.local if it exists
const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        process.env[key] = valueParts.join('=');
      }
    }
  });
}

const requiredEnvVars = {
  production: [
    'SENDGRID_API_KEY',
    'SENDGRID_FROM_EMAIL',
    'CONTACT_EMAIL'
  ],
  optional: [
    'NEXT_PUBLIC_SITE_URL'
  ]
};

function validateEnvironment() {
  if (process.env.CI === 'true') {
    console.log('⚪ Skipping environment validation in CI');
    return;
  }

  console.log('🔍 Validating environment variables...\n');
  
  let hasErrors = false;
  let hasWarnings = false;

  // Check required variables
  console.log('📋 Required Variables:');
  requiredEnvVars.production.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      console.log(`❌ ${varName}: Missing (REQUIRED)`);
      hasErrors = true;
    } else if (varName === 'SENDGRID_API_KEY' && !value.startsWith('SG.')) {
      console.log(`⚠️  ${varName}: Present but may be invalid (should start with 'SG.')`);
      hasWarnings = true;
    } else if (varName.includes('EMAIL') && !value.includes('@')) {
      console.log(`⚠️  ${varName}: Present but may be invalid (should be an email)`);
      hasWarnings = true;
    } else {
      console.log(`✅ ${varName}: Present`);
    }
  });

  // Check optional variables
  console.log('\n📋 Optional Variables:');
  requiredEnvVars.optional.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      console.log(`⚪ ${varName}: Not set (optional)`);
    } else {
      console.log(`✅ ${varName}: Present`);
    }
  });

  // Summary
  console.log('\n📊 Summary:');
  if (hasErrors) {
    console.log('❌ Environment validation failed! Missing required variables.');
    console.log('\n💡 To fix:');
    console.log('1. Create .env.local file in your project root');
    console.log('2. Add the missing environment variables');
    console.log('3. For Vercel deployment, add them in the dashboard under Settings > Environment Variables');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('⚠️  Environment validation passed with warnings.');
    console.log('Please verify the flagged variables are correct.');
  } else {
    console.log('✅ All environment variables are properly configured!');
  }

  // Additional checks
  console.log('\n🔧 Additional Checks:');
  
  // Check if we're in a Vercel environment
  if (process.env.VERCEL) {
    console.log('✅ Running in Vercel environment');
  } else {
    console.log('⚪ Running in local environment');
  }

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion >= 18) {
    console.log(`✅ Node.js version: ${nodeVersion} (compatible)`);
  } else {
    console.log(`⚠️  Node.js version: ${nodeVersion} (recommend 18+)`);
  }

  console.log('\n🎉 Environment validation complete!');
}

// Run validation
validateEnvironment();

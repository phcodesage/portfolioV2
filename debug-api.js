#!/usr/bin/env node

/**
 * Debug Script for API Configuration
 * This helps diagnose why the API might be returning 400 errors
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 API Configuration Debugger\n');
console.log('='.repeat(50));

// Check if .env file exists
const envPath = join(__dirname, '.env');
const envExamplePath = join(__dirname, '.env.example');

console.log('\n📁 File Checks:');
console.log(`  .env exists: ${existsSync(envPath) ? '✅' : '❌'}`);
console.log(`  .env.example exists: ${existsSync(envExamplePath) ? '✅' : '❌'}`);

if (!existsSync(envPath)) {
    console.log('\n⚠️  WARNING: .env file not found!');
    console.log('   Create a .env file based on .env.example');
    console.log('   Run: cp .env.example .env');
    process.exit(1);
}

// Read .env file (without exposing actual values)
try {
    const envContent = readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));

    console.log('\n🔑 Environment Variables:');

    const requiredVars = ['RESEND_API_KEY', 'CONTACT_EMAIL'];
    const foundVars = {};

    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            foundVars[key.trim()] = value.trim();
        }
    });

    requiredVars.forEach(varName => {
        const value = foundVars[varName];
        const exists = !!value;
        const hasPlaceholder = value && (
            value.includes('your_') ||
            value.includes('your-') ||
            value.includes('re_your') ||
            value === 're_your_api_key_here' ||
            value === 'your-email@gmail.com'
        );

        let status = '❌ Missing';
        if (exists && !hasPlaceholder) {
            status = '✅ Set';
        } else if (exists && hasPlaceholder) {
            status = '⚠️  Placeholder (needs real value)';
        }

        console.log(`  ${varName}: ${status}`);
    });

    // Check for common issues
    console.log('\n🔍 Common Issues Check:');

    const issues = [];

    if (!foundVars.RESEND_API_KEY || foundVars.RESEND_API_KEY.includes('your_')) {
        issues.push('RESEND_API_KEY is not set or using placeholder value');
    }

    if (!foundVars.CONTACT_EMAIL || foundVars.CONTACT_EMAIL.includes('your-')) {
        issues.push('CONTACT_EMAIL is not set or using placeholder value');
    }

    if (foundVars.RESEND_API_KEY && !foundVars.RESEND_API_KEY.startsWith('re_')) {
        issues.push('RESEND_API_KEY should start with "re_"');
    }

    if (foundVars.CONTACT_EMAIL && !foundVars.CONTACT_EMAIL.includes('@')) {
        issues.push('CONTACT_EMAIL should be a valid email address');
    }

    if (issues.length === 0) {
        console.log('  ✅ No configuration issues detected');
    } else {
        issues.forEach(issue => {
            console.log(`  ❌ ${issue}`);
        });
    }

} catch (error) {
    console.error('\n❌ Error reading .env file:', error.message);
    process.exit(1);
}

console.log('\n' + '='.repeat(50));
console.log('\n📚 Next Steps:');
console.log('  1. Fix any issues listed above');
console.log('  2. Get your Resend API key from: https://resend.com/api-keys');
console.log('  3. Update .env with your actual values');
console.log('  4. Restart your dev server');
console.log('  5. Run: node test-simple.js\n');

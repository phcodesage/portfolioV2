#!/usr/bin/env node

/**
 * Simple API Test - Diagnose the 400 error
 */

const API_URL = 'http://localhost:4321/api/send-email';

const testPayload = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'API Test',
    message: 'This is a test message.',
};

console.log('🧪 Testing /api/send-email endpoint\n');
console.log('Payload:', JSON.stringify(testPayload, null, 2));
console.log('\nSending request...\n');

fetch(API_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(testPayload),
})
    .then(async (response) => {
        const data = await response.json();

        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('\n✅ SUCCESS: Email API is working!');
        } else {
            console.log('\n❌ FAILED:', data.message);
            console.log('\nPossible issues:');
            console.log('1. Check .env file has RESEND_API_KEY and CONTACT_EMAIL');
            console.log('2. Verify Resend API key is valid');
            console.log('3. Check server logs for detailed error');
        }
    })
    .catch((error) => {
        console.error('\n❌ ERROR:', error.message);
        console.log('\nMake sure the dev server is running on http://localhost:4321');
    });

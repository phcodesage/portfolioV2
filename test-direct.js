#!/usr/bin/env node

/**
 * Direct API Test with Clear Output
 */

const testPayload = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'API Test',
    message: 'This is a test message.',
};

console.log('Testing /api/send-email endpoint...');
console.log('Payload:', JSON.stringify(testPayload, null, 2));
console.log('');

fetch('http://localhost:4321/api/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(testPayload),
})
    .then(async (response) => {
        const data = await response.json();

        console.log('Status Code:', response.status);
        console.log('Response Body:', JSON.stringify(data, null, 2));
        console.log('');

        if (response.ok) {
            console.log('SUCCESS - Email API is working!');
            process.exit(0);
        } else {
            console.log('FAILED - Error:', data.message);
            process.exit(1);
        }
    })
    .catch((error) => {
        console.log('ERROR:', error.message);
        console.log('Make sure dev server is running on http://localhost:4321');
        process.exit(1);
    });

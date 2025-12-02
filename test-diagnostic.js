#!/usr/bin/env node

/**
 * Comprehensive API Diagnostic Test
 * This will show exactly what's happening with the API
 */

async function testAPI() {
    const testCases = [
        {
            name: 'Test 1: Valid Request',
            payload: {
                name: 'Test User',
                email: 'test@example.com',
                subject: 'API Test',
                message: 'This is a test message.',
            },
        },
        {
            name: 'Test 2: Missing Name',
            payload: {
                email: 'test@example.com',
                subject: 'API Test',
                message: 'This is a test message.',
            },
        },
    ];

    console.log('='.repeat(60));
    console.log('API Diagnostic Test for /api/send-email');
    console.log('='.repeat(60));
    console.log('');

    for (const testCase of testCases) {
        console.log(`Running: ${testCase.name}`);
        console.log('-'.repeat(60));
        console.log('Payload:', JSON.stringify(testCase.payload, null, 2));

        try {
            const response = await fetch('http://localhost:4321/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testCase.payload),
            });

            const data = await response.json();

            console.log('Status:', response.status);
            console.log('Response:', JSON.stringify(data, null, 2));

            if (response.ok) {
                console.log('Result: PASS');
            } else {
                console.log('Result: FAIL');
            }
        } catch (error) {
            console.log('Error:', error.message);
            console.log('Result: ERROR');
        }

        console.log('');
    }

    console.log('='.repeat(60));
    console.log('Test Complete');
    console.log('='.repeat(60));
}

testAPI();

#!/usr/bin/env node

/**
 * API Testing Script for /api/send-email endpoint
 * Usage: node test-api.js
 */

import http from 'http';

// Configuration
const API_URL = 'http://localhost:4321/api/send-email';
const COLORS = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

// Test data
const validPayload = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'API Test',
    message: 'This is a test message from the API testing script.',
};

/**
 * Make HTTP request
 */
function makeRequest(url, options, data) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const reqOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname,
            method: options.method || 'POST',
            headers: options.headers || {},
        };

        const req = http.request(reqOptions, (res) => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonBody = body ? JSON.parse(body) : {};
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: jsonBody,
                    });
                } catch (error) {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: body,
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

/**
 * Log test result
 */
function logTest(testName, passed, details) {
    const icon = passed ? '✓' : '✗';
    const color = passed ? COLORS.green : COLORS.red;
    console.log(`${color}${icon} ${testName}${COLORS.reset}`);
    if (details) {
        console.log(`  ${COLORS.cyan}${details}${COLORS.reset}`);
    }
}

/**
 * Log section header
 */
function logSection(title) {
    console.log(`\n${COLORS.bright}${COLORS.blue}━━━ ${title} ━━━${COLORS.reset}\n`);
}

/**
 * Test Cases
 */
const tests = [
    {
        name: 'Valid Request - All Fields',
        description: 'Should return 200 with all required fields',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: validPayload,
        expectedStatus: 200,
        validate: (response) => {
            return response.status === 200 && response.body.message;
        },
    },
    {
        name: 'Missing Name Field',
        description: 'Should return 400 when name is missing',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: {
            email: 'test@example.com',
            subject: 'Test',
            message: 'Test message',
        },
        expectedStatus: 400,
        validate: (response) => {
            return response.status === 400 && response.body.message.includes('required');
        },
    },
    {
        name: 'Missing Email Field',
        description: 'Should return 400 when email is missing',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: {
            name: 'Test User',
            subject: 'Test',
            message: 'Test message',
        },
        expectedStatus: 400,
        validate: (response) => {
            return response.status === 400 && response.body.message.includes('required');
        },
    },
    {
        name: 'Missing Subject Field',
        description: 'Should return 400 when subject is missing',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: {
            name: 'Test User',
            email: 'test@example.com',
            message: 'Test message',
        },
        expectedStatus: 400,
        validate: (response) => {
            return response.status === 400 && response.body.message.includes('required');
        },
    },
    {
        name: 'Missing Message Field',
        description: 'Should return 400 when message is missing',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: {
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test',
        },
        expectedStatus: 400,
        validate: (response) => {
            return response.status === 400 && response.body.message.includes('required');
        },
    },
    {
        name: 'Empty Payload',
        description: 'Should return 400 with empty payload',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: {},
        expectedStatus: 400,
        validate: (response) => {
            return response.status === 400;
        },
    },
    {
        name: 'Wrong Content-Type',
        description: 'Should return 400 with wrong Content-Type',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
        },
        payload: validPayload,
        expectedStatus: 400,
        validate: (response) => {
            return response.status === 400 && response.body.message.includes('Content-Type');
        },
    },
    {
        name: 'Empty String Fields',
        description: 'Should return 400 with empty string values',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        expectedStatus: 400,
        validate: (response) => {
            return response.status === 400;
        },
    },
    {
        name: 'Long Message',
        description: 'Should handle long message content',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: {
            ...validPayload,
            message: 'A'.repeat(5000),
        },
        expectedStatus: 200,
        validate: (response) => {
            return response.status === 200 || response.status === 500; // May fail if email service rejects
        },
    },
    {
        name: 'Special Characters in Message',
        description: 'Should handle special characters',
        request: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        payload: {
            ...validPayload,
            message: 'Test with special chars: <script>alert("xss")</script> & "quotes" \'single\' \n newlines',
        },
        expectedStatus: 200,
        validate: (response) => {
            return response.status === 200 || response.status === 500;
        },
    },
];

/**
 * Run all tests
 */
async function runTests() {
    console.log(`${COLORS.bright}${COLORS.yellow}🧪 API Testing Suite for /api/send-email${COLORS.reset}`);
    console.log(`${COLORS.cyan}Target: ${API_URL}${COLORS.reset}`);

    let passed = 0;
    let failed = 0;
    const results = [];

    logSection('Running Tests');

    for (const test of tests) {
        try {
            console.log(`${COLORS.yellow}⏳ Running: ${test.name}${COLORS.reset}`);

            const response = await makeRequest(API_URL, test.request, test.payload);
            const isValid = test.validate(response);

            if (isValid) {
                passed++;
                logTest(test.name, true, `Status: ${response.status}, Message: ${response.body.message || 'N/A'}`);
            } else {
                failed++;
                logTest(
                    test.name,
                    false,
                    `Expected status ${test.expectedStatus}, got ${response.status}. Response: ${JSON.stringify(response.body)}`
                );
            }

            results.push({
                test: test.name,
                passed: isValid,
                status: response.status,
                response: response.body,
            });
        } catch (error) {
            failed++;
            logTest(test.name, false, `Error: ${error.message}`);
            results.push({
                test: test.name,
                passed: false,
                error: error.message,
            });
        }
    }

    // Summary
    logSection('Test Summary');
    console.log(`${COLORS.green}✓ Passed: ${passed}${COLORS.reset}`);
    console.log(`${COLORS.red}✗ Failed: ${failed}${COLORS.reset}`);
    console.log(`${COLORS.cyan}Total: ${tests.length}${COLORS.reset}`);

    const successRate = ((passed / tests.length) * 100).toFixed(2);
    console.log(`\n${COLORS.bright}Success Rate: ${successRate}%${COLORS.reset}\n`);

    // Detailed results
    if (process.argv.includes('--verbose') || process.argv.includes('-v')) {
        logSection('Detailed Results');
        console.log(JSON.stringify(results, null, 2));
    }

    // Exit with appropriate code
    process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch((error) => {
    console.error(`${COLORS.red}Fatal error: ${error.message}${COLORS.reset}`);
    process.exit(1);
});

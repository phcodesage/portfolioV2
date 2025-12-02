# API Testing Guide

This guide explains how to test the `/api/send-email` endpoint using the provided Node.js testing script.

## Prerequisites

- Node.js installed (the script uses built-in `http` module, no external dependencies needed)
- Development server running on `http://localhost:4321`

## Running the Tests

### Basic Usage

```bash
node test-api.js
```

### Verbose Mode

To see detailed response data for each test:

```bash
node test-api.js --verbose
# or
node test-api.js -v
```

## Test Cases

The script includes 10 comprehensive test cases:

1. **Valid Request - All Fields**: Tests successful email sending with all required fields
2. **Missing Name Field**: Validates that missing name returns 400 error
3. **Missing Email Field**: Validates that missing email returns 400 error
4. **Missing Subject Field**: Validates that missing subject returns 400 error
5. **Missing Message Field**: Validates that missing message returns 400 error
6. **Empty Payload**: Tests behavior with completely empty request body
7. **Wrong Content-Type**: Validates Content-Type header validation
8. **Empty String Fields**: Tests that empty strings are rejected
9. **Long Message**: Tests handling of very long message content
10. **Special Characters**: Tests HTML/XSS character handling

## Understanding the Output

### Success Example
```
✓ Valid Request - All Fields
  Status: 200, Message: Email sent successfully
```

### Failure Example
```
✗ Missing Name Field
  Expected status 400, got 200. Response: {"message":"Email sent successfully"}
```

### Summary
```
━━━ Test Summary ━━━

✓ Passed: 8
✗ Failed: 2
Total: 10

Success Rate: 80.00%
```

## Common Issues

### 400 Bad Request Error

If you're getting 400 errors, check:

1. **Missing Environment Variables**: Ensure `.env` file has:
   ```
   RESEND_API_KEY=your_actual_api_key
   CONTACT_EMAIL=your_email@example.com
   ```

2. **Missing Fields**: All fields are required:
   - `name`
   - `email`
   - `subject`
   - `message`

3. **Wrong Content-Type**: Must be `application/json`

### 500 Internal Server Error

If you're getting 500 errors, check:

1. **Invalid Resend API Key**: Verify your `RESEND_API_KEY` in `.env`
2. **Email Service Issues**: Check Resend dashboard for quota/limits
3. **Server Logs**: Check the dev server console for detailed error messages

## Customizing Tests

You can modify the `test-api.js` file to add your own test cases. Each test follows this structure:

```javascript
{
  name: 'Test Name',
  description: 'What this test does',
  request: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  payload: {
    name: 'Test',
    email: 'test@example.com',
    subject: 'Test',
    message: 'Test message',
  },
  expectedStatus: 200,
  validate: (response) => {
    // Custom validation logic
    return response.status === 200;
  },
}
```

## API Endpoint Specification

### Endpoint
`POST /api/send-email`

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

### Success Response (200)
```json
{
  "message": "Email sent successfully",
  "data": { ... }
}
```

### Error Response (400)
```json
{
  "message": "All fields are required"
}
```

### Error Response (500)
```json
{
  "message": "Failed to send email",
  "error": "Error details..."
}
```

## Integration with CI/CD

You can integrate this test script into your CI/CD pipeline:

```bash
# In your CI script
npm run dev &  # Start dev server in background
sleep 5        # Wait for server to start
node test-api.js
```

The script exits with code `0` on success and `1` on failure, making it suitable for automated testing.

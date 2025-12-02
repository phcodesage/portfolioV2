# API Testing Suite - Summary

## 🎯 Purpose

This testing suite helps diagnose and test the `/api/send-email` endpoint that's currently returning a 400 Bad Request error.

## 📦 Files Created

### 1. `test-api.js` - Comprehensive Test Suite
A full-featured testing script with 10 test cases covering:
- Valid requests
- Missing field validation
- Content-Type validation
- Edge cases (long messages, special characters, etc.)

**Usage:**
```bash
node test-api.js           # Run all tests
node test-api.js --verbose # Show detailed results
```

### 2. `test-simple.js` - Quick Diagnostic Test
A simple, focused test to quickly check if the API is working.

**Usage:**
```bash
node test-simple.js
```

### 3. `debug-api.js` - Configuration Debugger
Checks your `.env` file configuration and identifies common issues.

**Usage:**
```bash
node debug-api.js
```

### 4. `README-API-TESTING.md` - Complete Documentation
Comprehensive guide covering:
- How to run tests
- Understanding test results
- Troubleshooting common issues
- API specification
- CI/CD integration

## 🔧 Quick Start

### Step 1: Check Configuration
```bash
node debug-api.js
```

This will tell you if your `.env` file is properly configured.

### Step 2: Fix Any Issues

The most common cause of 400 errors:

1. **Missing or invalid `.env` file**
   ```bash
   # Create .env from example
   cp .env.example .env
   ```

2. **Placeholder values in .env**
   ```env
   # ❌ Bad (placeholder values)
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=your-email@gmail.com
   
   # ✅ Good (real values)
   RESEND_API_KEY=re_abc123xyz...
   CONTACT_EMAIL=yourname@example.com
   ```

3. **Get a Resend API key**
   - Visit: https://resend.com/api-keys
   - Create an account (free tier available)
   - Generate an API key
   - Add it to your `.env` file

### Step 3: Restart Dev Server

After updating `.env`, restart your development server:
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Run Tests
```bash
node test-simple.js
```

## 🐛 Troubleshooting the 400 Error

### Error: "Content-Type must be application/json"
**Cause:** Request is not sending proper Content-Type header  
**Solution:** The test scripts already set this correctly. If testing manually, ensure:
```javascript
headers: {
  'Content-Type': 'application/json'
}
```

### Error: "All fields are required"
**Cause:** Missing one or more required fields (name, email, subject, message)  
**Solution:** Ensure all fields are present in the request body:
```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Test",
  "message": "Test message"
}
```

### Error: "Failed to send email"
**Cause:** Invalid Resend API key or email service issue  
**Solution:**
1. Verify `RESEND_API_KEY` in `.env` is valid
2. Check Resend dashboard for quota/limits
3. Look at server console logs for detailed error

## 📊 Test Results Interpretation

### All Tests Pass (10/10)
✅ Your API is working correctly!

### Some Tests Fail
- **3/10 passing**: Configuration issue (likely missing/invalid API key)
- **7/10 passing**: Validation working, but email sending fails
- **0/10 passing**: Server not running or major configuration issue

## 🔍 What the Tests Check

1. **Valid Request** - Can send email with all fields
2. **Missing Name** - Validates name is required
3. **Missing Email** - Validates email is required
4. **Missing Subject** - Validates subject is required
5. **Missing Message** - Validates message is required
6. **Empty Payload** - Rejects completely empty requests
7. **Wrong Content-Type** - Validates Content-Type header
8. **Empty Strings** - Rejects empty string values
9. **Long Message** - Handles large message content
10. **Special Characters** - Handles HTML/special chars safely

## 💡 Tips

- Always run `debug-api.js` first to check configuration
- Check the dev server console for detailed error messages
- The browser console will show the exact error from the API
- Test scripts exit with code 0 (success) or 1 (failure) for CI/CD

## 📝 API Endpoint Reference

**Endpoint:** `POST /api/send-email`

**Required Headers:**
```
Content-Type: application/json
```

**Required Body Fields:**
```json
{
  "name": "string",
  "email": "string (valid email)",
  "subject": "string",
  "message": "string"
}
```

**Success Response (200):**
```json
{
  "message": "Email sent successfully",
  "data": { ... }
}
```

**Error Response (400):**
```json
{
  "message": "Error description"
}
```

## 🚀 Next Steps

1. Run `node debug-api.js` to check your configuration
2. Fix any issues identified
3. Restart your dev server
4. Run `node test-simple.js` to verify it works
5. Run `node test-api.js` for comprehensive testing
6. Check `README-API-TESTING.md` for more details

## 📞 Need Help?

If you're still seeing 400 errors after following these steps:

1. Check the browser console for the exact error message
2. Check the dev server console for backend errors
3. Verify your `.env` file has real values (not placeholders)
4. Make sure the dev server restarted after changing `.env`
5. Verify your Resend account is active and has quota remaining

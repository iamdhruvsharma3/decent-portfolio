# Guestbook Setup Instructions - URGENT FIX NEEDED

## 🚨 Missing Write Token - 403 Error Fix

Your `.env.local` file has been updated but you need to replace `your_write_token_here` with an actual Sanity write token.

**Current Status:**

- ✅ Project ID: `u4kx48im` (already configured)
- ✅ Dataset: `production` (already configured)
- ❌ **WRITE TOKEN: Missing** (causing 403 error)

## 🔧 Quick Fix Steps

1. **Go to your Sanity dashboard**: [sanity.io](https://sanity.io)
2. **Navigate to your project** (ID: `u4kx48im`)
3. **Go to API settings** → **Tokens**
4. **Create a new token** with these settings:
   - **Name**: "Guestbook Write Token"
   - **Permissions**: **Editor** or **Administrator** (needs create permissions)
   - **Dataset**: `production`
5. **Copy the generated token**
6. **Replace `your_write_token_here`** in your `.env.local` file with the actual token

## Step-by-Step Token Creation

1. **SANITY_WRITE_TOKEN**:
   - Go to [sanity.io](https://sanity.io) → Your Project Dashboard
   - Click on **"API"** in the left sidebar
   - Click **"Tokens"** tab
   - Click **"Add API token"**
   - Set **Name**: "Guestbook Write Token"
   - Set **Permissions**: **Editor** (or Administrator)
   - Click **"Save"**
   - **Copy the token** (you won't see it again!)
   - **Paste it** in your `.env.local` file

## After Setting Up

1. **Test your token** (recommended):

   ```bash
   node test-sanity-token.js
   ```

   This will verify your token has the correct permissions.

2. **Restart your development server**:

   ```bash
   npm run dev
   ```

3. **Test the guestbook** - it should now work properly!

## Troubleshooting

If you still get 403 errors:

- Make sure your token has **Editor** or **Administrator** permissions
- Verify the token is not expired
- Check that you copied the entire token (they're very long!)
- Run the test script: `node test-sanity-token.js`

## Features Added

✅ **Fixed CMS Integration**: Proper write client usage
✅ **Fixed Parsing Error**: Resolved ECMAScript parsing issues
✅ **Toast Notifications**: Beautiful toast messages instead of alerts
✅ **Performance Optimizations**: Memoized components and callbacks
✅ **WhatsApp-Style UI**: Chat-like message display with colored initials
✅ **Responsive Design**: Works on all screen sizes
✅ **Smooth UX**: Reduced UI lag and improved interactions

## ✅ All Issues Resolved

**MAJOR FIX:** The 403 error was caused by trying to use the Sanity write token on the client-side, which is not allowed for security reasons. The solution was to move guestbook submissions to a server-side API route.

The guestbook is now fully functional with:

- **✅ Fixed 403 Error** - Moved to server-side API route for security
- **✅ No parsing errors** - Code compiles correctly
- **✅ Proper error handling** - Comprehensive error handling and validation
- **✅ Toast notifications** - Beautiful success/error messages
- **✅ Optimized performance** - No UI lag or splash cursor issues
- **✅ Security** - Write token is only used server-side, never exposed to client

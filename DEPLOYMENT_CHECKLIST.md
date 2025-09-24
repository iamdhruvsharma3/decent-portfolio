# Deployment Checklist

## 🚀 Pre-Deployment Requirements

### ✅ Environment Variables Required

Your deployment platform (Vercel, Netlify, etc.) MUST have these environment variables:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=u4kx48im
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_actual_write_token_here

# EmailJS (if using contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Spotify Integration (optional)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# NGROK (development only)
NGROK_AUTHTOKEN=your_ngrok_token
PORT=3000
```

## 🔧 Platform-Specific Setup

### **Vercel Deployment**

1. Connect your GitHub repository to Vercel
2. Go to **Project Settings** → **Environment Variables**
3. Add all the environment variables listed above
4. **Important**: Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set
5. Deploy!

### **Netlify Deployment**

1. Connect your repository to Netlify
2. Go to **Site Settings** → **Environment Variables**
3. Add all the environment variables listed above
4. Build command: `npm run build`
5. Publish directory: `.next`

### **Other Platforms**

Ensure your platform supports:

- Node.js 18+
- Environment variables
- Next.js 15.5.2

## 🔍 Troubleshooting Deployment Issues

### Error: "Configuration must contain `projectId`"

**Solution**:

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID=u4kx48im` is set in your deployment platform
- Check that the environment variable name is exactly correct (case-sensitive)

### Error: "Insufficient permissions"

**Solution**:

- Verify `SANITY_WRITE_TOKEN` is set with a valid token that has Editor/Administrator permissions
- Get the token from your Sanity dashboard → API → Tokens

### Build Fails with Dependency Conflicts

**Solution**:

- The project is configured with `.npmrc` to handle this
- If issues persist, use `npm install --legacy-peer-deps` in your build command

## ✅ Post-Deployment Verification

After successful deployment:

1. **Test Guestbook**: Visit `/guestbook` and try signing it
2. **Check Admin Panel**: Visit `/admin/guestbook` to manage entries
3. **Verify Environment**: Check that Sanity integration works
4. **Test All Pages**: Navigate through your portfolio

## 📞 Support

If deployment fails:

1. Check the build logs for specific error messages
2. Verify all environment variables are correctly set
3. Ensure your Sanity write token has proper permissions
4. Test the build locally with `npm run build`

## 🎉 Success!

Once deployed, your portfolio includes:

- ✅ Working guestbook with WhatsApp-style UI
- ✅ Admin panel for managing entries
- ✅ Toast notifications
- ✅ Responsive design
- ✅ All optimizations applied

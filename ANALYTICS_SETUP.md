# Google Analytics Setup Guide

## 📊 Complete Setup Instructions

### Step 1: Get Your Google Analytics ID

1. **Create Google Analytics Account**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Sign in and click "Start measuring"
   - Create account: "Rubbie Kelvin Portfolio"
   - Create property: "iam.rubbietheone.com"
   - Add web stream for your domain

2. **Get Measurement ID**
   - You'll receive a Measurement ID like `G-XXXXXXXXXX`
   - Copy this ID for the next step

### Step 2: Configure Environment Variables

Create a `.env` file in your project root:

```bash
# .env
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX  # Replace with your actual ID
```

**Important**: Add `.env` to your `.gitignore` to keep your analytics ID private.

### Step 3: Deploy Configuration

For production deployment, set the environment variable in your hosting platform:

**Vercel:**
```bash
vercel env add GOOGLE_ANALYTICS_ID
```

**Netlify:**
- Go to Site Settings → Environment Variables
- Add `GOOGLE_ANALYTICS_ID` with your measurement ID

**Other platforms:**
- Add `GOOGLE_ANALYTICS_ID` environment variable in your hosting dashboard

### Step 4: Verify Setup

1. **Development**: Analytics is disabled in development mode
2. **Production**: After deployment, check:
   - Browser Developer Tools → Network tab
   - Look for requests to `googletagmanager.com`
   - Google Analytics Real-time reports

## 🎯 Custom Event Tracking

Use the `useGtag` composable in your components:

```vue
<script setup>
const { trackProjectView, trackOutboundLink } = useGtag()

// Track project clicks
const handleProjectClick = (projectName) => {
  trackProjectView(projectName)
}

// Track external links
const handleExternalLink = (url, text) => {
  trackOutboundLink(url, text)
}
</script>
```

## 📈 What Gets Tracked

### Automatic Tracking:
- ✅ Page views on route changes
- ✅ Site navigation
- ✅ Session duration
- ✅ Bounce rate
- ✅ Geographic data (anonymized)

### Custom Events Available:
- `trackProjectView(projectName)` - When users view projects
- `trackBlogRead(postTitle)` - When users read blog posts  
- `trackOutboundLink(url, text)` - When users click external links
- `trackEvent(name, params)` - Custom events

## 🔒 Privacy & GDPR Compliance

Your setup includes:
- ✅ IP anonymization enabled
- ✅ No tracking in development
- ✅ No personally identifiable information collected
- ✅ Respects user privacy settings

## 🛠 Troubleshooting

**Analytics not working?**
1. Check environment variable is set correctly
2. Verify Measurement ID format (starts with G-)
3. Ensure you're testing in production, not development
4. Check browser console for errors

**Real-time data not showing?**
- Wait 24-48 hours for full data processing
- Use Real-time reports in GA4 for immediate verification

## 📊 Key Metrics to Monitor

1. **Traffic Sources**: Where visitors come from
2. **Popular Pages**: Which projects/posts get most views  
3. **User Engagement**: Time on site, pages per session
4. **Geographic Data**: Where your audience is located
5. **Device Types**: Mobile vs desktop usage

This setup gives you professional-grade analytics while maintaining user privacy! 🚀
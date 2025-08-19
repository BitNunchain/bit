# UnifiedNUN Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/unified-nun-blockchain)

### Option 2: Manual Deploy

1. **Fork this repository** to your GitHub account

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your forked repository

3. **Configure deployment**:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your UnifiedNUN blockchain is now live!

## 🌐 Custom Domain Setup

1. **Add domain in Vercel**:
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain

2. **Configure DNS**:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP

3. **SSL Certificate**:
   - Automatically provisioned by Vercel
   - HTTPS enforced by default

## ⚙️ Environment Configuration

UnifiedNUN requires **no environment variables** - it runs entirely client-side!

### Optional Customizations

Create `vercel.json` for advanced configuration:

\`\`\`json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
\`\`\`

## 🔧 Performance Optimization

### 1. Enable Compression
\`\`\`json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
\`\`\`

### 2. Optimize Images
- Use Next.js Image component
- Enable WebP format
- Implement lazy loading

### 3. Code Splitting
- Automatic with Next.js
- Dynamic imports for large components
- Tree shaking enabled

## 📊 Monitoring & Analytics

### Vercel Analytics
\`\`\`bash
npm install @vercel/analytics
\`\`\`

Add to `app/layout.tsx`:
\`\`\`typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\`

### Performance Monitoring
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Error tracking with Sentry

## 🔒 Security Considerations

### Content Security Policy
Add to `next.config.mjs`:
\`\`\`javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ];
  }
};
\`\`\`

### HTTPS Enforcement
- Automatic with Vercel
- HSTS headers enabled
- Secure cookie settings

## 🌍 Global Distribution

### Edge Functions
\`\`\`typescript
// app/api/health/route.ts
export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify({ 
    status: 'healthy',
    timestamp: Date.now(),
    region: process.env.VERCEL_REGION 
  }));
}
\`\`\`

### CDN Configuration
- Automatic edge caching
- Global distribution
- Smart routing

## 🧪 Testing Deployment

### Pre-deployment Checklist
- [ ] Run `npm run build` locally
- [ ] Test all features in production mode
- [ ] Verify P2P connectivity
- [ ] Check mobile responsiveness
- [ ] Validate crypto functions

### Post-deployment Testing
\`\`\`bash
# Test blockchain functionality
curl https://your-domain.com/api/health

# Test mining endpoint
curl https://your-domain.com/api/mine

# Verify P2P connectivity
# Open browser console and run:
window.runUnifiedNUNTests();
\`\`\`

## 🚨 Troubleshooting

### Common Issues

**Build Failures**:
- Check Node.js version (18+)
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

**P2P Connection Issues**:
- Verify WebRTC support
- Check firewall settings
- Test with different relay peers

**Crypto API Errors**:
- Ensure HTTPS deployment
- Check browser compatibility
- Verify secure context

### Debug Mode
Add to `next.config.mjs`:
\`\`\`javascript
const nextConfig = {
  env: {
    UNIFIEDNUN_DEBUG: 'true'
  }
};
\`\`\`

## 📈 Scaling

### Horizontal Scaling
- Multiple Vercel deployments
- Load balancing with DNS
- Regional distribution

### Performance Optimization
- Enable ISR (Incremental Static Regeneration)
- Implement service workers
- Optimize bundle size

## 🔄 Updates & Maintenance

### Automated Updates
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
\`\`\`

### Monitoring
- Set up alerts for downtime
- Monitor performance metrics
- Track user engagement

---

**Your UnifiedNUN blockchain is now ready for the world! 🌍**

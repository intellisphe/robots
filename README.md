# RobotsTXT Guardian

A simple, elegant tool to help web publishers update their robots.txt files to block AI bots while keeping Google Search working perfectly.

## Features

- 🔍 **Audit existing robots.txt** - Paste your website URL or current robots.txt
- ✨ **Generate updated robots.txt** - Get a comprehensive file that blocks 30+ AI bots
- 🛡️ **Google Search Safe** - Explicitly allows all major search engines
- 📚 **Real examples** - See how major publishers protect their content
- 💡 **Educational** - Simple explanations for non-technical users

## How to Deploy

This is a static website that can be deployed to any HTTPS-enabled hosting platform:

### Option 1: GitHub Pages (Free, Easy)

1. Create a new GitHub repository
2. Push these files to the repository
3. Go to Settings > Pages
4. Select your main branch as the source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free, Easy)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this folder
3. Your site is live instantly with HTTPS
4. Get a custom domain if desired

### Option 3: Vercel (Free, Easy)

1. Go to [vercel.com](https://vercel.com)
2. Import the GitHub repository or drag/drop the folder
3. Deploy with one click
4. Automatic HTTPS included

### Option 4: Cloudflare Pages (Free, Fast)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Deploy automatically
4. Benefits from Cloudflare's global CDN

## Files

- `index.html` - Main HTML structure
- `styles.css` - Beautiful CSS styling inspired by getsphere.ai
- `app.js` - JavaScript for auditing and generating robots.txt
- `README.md` - This file

## Technical Details

### AI Bots Blocked

The tool blocks 100+ AI crawlers including:
- GPTBot (OpenAI)
- ClaudeBot (Anthropic)
- Google-Extended (Google AI training)
- CCBot (Common Crawl)
- Bytespider (ByteDance/TikTok)
- Amazonbot (Amazon)
- PerplexityBot (Perplexity)
- And 90+ more...

**Source:** We use the comprehensive, maintained list from [ai-robots-txt](https://github.com/ai-robots-txt/ai.robots.txt)

### Search Engines Allowed

Explicitly allows:
- Googlebot (all variants)
- Bingbot
- Slurp (Yahoo)
- DuckDuckBot
- Baiduspider
- YandexBot

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## CORS Note

The website uses `allorigins.win` as a CORS proxy to fetch robots.txt files from other domains. This is only used for the audit feature. The generation feature works entirely client-side.

## License

Free to use and modify for any purpose.

## Contributing

Feel free to submit issues or pull requests to improve the tool!

## Support

This tool provides guidance only. Always test your robots.txt after deployment by visiting `yourwebsite.com/robots.txt` in a browser.



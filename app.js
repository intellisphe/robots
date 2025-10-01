// Comprehensive list of AI bot user-agents to block
// Source: https://github.com/ai-robots-txt/ai.robots.txt
const AI_BOTS = [
    'AddSearchBot',
    'AI2Bot',
    'Ai2Bot-Dolma',
    'aiHitBot',
    'Amazonbot',
    'Andibot',
    'anthropic-ai',
    'Applebot',
    'Applebot-Extended',
    'Awario',
    'bedrockbot',
    'bigsur.ai',
    'Brightbot 1.0',
    'Bytespider',
    'CCBot',
    'ChatGPT Agent',
    'ChatGPT-User',
    'Claude-SearchBot',
    'Claude-User',
    'Claude-Web',
    'ClaudeBot',
    'CloudVertexBot',
    'cohere-ai',
    'cohere-training-data-crawler',
    'Cotoyogi',
    'Crawlspace',
    'Datenbank Crawler',
    'DeepSeekBot',
    'Devin',
    'Diffbot',
    'DuckAssistBot',
    'Echobot Bot',
    'EchoboxBot',
    'FacebookBot',
    'facebookexternalhit',
    'Factset_spyderbot',
    'FirecrawlAgent',
    'FriendlyCrawler',
    'Gemini-Deep-Research',
    'Google-CloudVertexBot',
    'Google-Extended',
    'Google-Firebase',
    'GoogleAgent-Mariner',
    'GoogleOther',
    'GoogleOther-Image',
    'GoogleOther-Video',
    'GPTBot',
    'iaskspider/2.0',
    'ICC-Crawler',
    'ImagesiftBot',
    'img2dataset',
    'ISSCyberRiskCrawler',
    'Kangaroo Bot',
    'LinerBot',
    'meta-externalagent',
    'Meta-ExternalAgent',
    'meta-externalfetcher',
    'Meta-ExternalFetcher',
    'meta-webindexer',
    'MistralAI-User',
    'MistralAI-User/1.0',
    'MyCentralAIScraperBot',
    'netEstate Imprint Crawler',
    'NovaAct',
    'OAI-SearchBot',
    'omgili',
    'omgilibot',
    'OpenAI',
    'Operator',
    'PanguBot',
    'Panscient',
    'panscient.com',
    'Perplexity-User',
    'PerplexityBot',
    'PetalBot',
    'PhindBot',
    'Poseidon Research Crawler',
    'QualifiedBot',
    'QuillBot',
    'quillbot.com',
    'SBIntuitionsBot',
    'Scrapy',
    'SemrushBot-OCOB',
    'SemrushBot-SWA',
    'ShapBot',
    'Sidetrade indexer bot',
    'TerraCotta',
    'Thinkbot',
    'TikTokSpider',
    'Timpibot',
    'VelenPublicWebCrawler',
    'WARDBot',
    'Webzio-Extended',
    'wpbot',
    'YaK',
    'YandexAdditional',
    'YandexAdditionalBot',
    'YouBot',
];

// Search engines we want to ALLOW
const ALLOWED_SEARCH_ENGINES = [
    'Googlebot',
    'Googlebot-Image',
    'Googlebot-Video',
    'Bingbot',
    'Slurp',              // Yahoo
    'DuckDuckBot',        // DuckDuckGo
    'Baiduspider',        // Baidu
    'YandexBot',          // Yandex
    'facebot',            // Facebook preview (not AI)
    'ia_archiver',        // Alexa
];

// CMS-specific rules
const CMS_RULES = {
    wordpress: `# WordPress-specific rules
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/themes/
Disallow: /trackback/
Disallow: /feed/
Disallow: /comments/
Disallow: /author/
Disallow: /?s=
Disallow: /*?
`,
    woocommerce: `# WordPress + WooCommerce-specific rules
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/themes/
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /?add-to-cart=
Disallow: /trackback/
Disallow: /feed/
Disallow: /comments/
Disallow: /author/
Disallow: /?s=
`,
    joomla: `# Joomla-specific rules
Disallow: /administrator/
Disallow: /bin/
Disallow: /cache/
Disallow: /cli/
Disallow: /components/
Disallow: /includes/
Disallow: /installation/
Disallow: /language/
Disallow: /layouts/
Disallow: /libraries/
Disallow: /logs/
Disallow: /modules/
Disallow: /plugins/
Disallow: /tmp/
`,
    drupal: `# Drupal-specific rules
Disallow: /admin/
Disallow: /comment/reply/
Disallow: /filter/tips
Disallow: /node/add/
Disallow: /search/
Disallow: /user/register
Disallow: /user/password
Disallow: /user/login
Disallow: /user/logout
Disallow: /core/
Disallow: /profiles/
Disallow: /README.txt
Disallow: /web.config
`,
    magento: `# Magento-specific rules
Disallow: /admin/
Disallow: /app/
Disallow: /cron.php
Disallow: /cron.sh
Disallow: /downloader/
Disallow: /errors/
Disallow: /includes/
Disallow: /lib/
Disallow: /pkginfo/
Disallow: /var/
Disallow: /catalog/product_compare/
Disallow: /catalog/category/view/
Disallow: /catalog/product/view/
Disallow: /catalogsearch/
Disallow: /checkout/
Disallow: /customer/
`
};

let currentCMS = null;

// Generate default robots.txt on page load
document.addEventListener('DOMContentLoaded', () => {
    generateAndDisplayDefault();
    setupCMSToggles();
});

function generateAndDisplayDefault() {
    const sitemapInput = document.getElementById('sitemap-input');
    const sitemapUrl = sitemapInput ? sitemapInput.value.trim() : '';
    const defaultRobots = generateRobotsTxt('', null, currentCMS, sitemapUrl);
    document.getElementById('generated-robots-main').textContent = defaultRobots;
}

// Setup CMS dropdown handler
function setupCMSToggles() {
    const dropdown = document.getElementById('cms-select');
    const sitemapInput = document.getElementById('sitemap-input');
    
    dropdown.addEventListener('change', (e) => {
        currentCMS = e.target.value || null;
        generateAndDisplayDefault();
    });
    
    // Add sitemap input handler
    if (sitemapInput) {
        sitemapInput.addEventListener('input', () => {
            generateAndDisplayDefault();
        });
    }
}

// Function to download robots.txt
function downloadRobotsTxt() {
    const code = document.getElementById('generated-robots-main').textContent;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Download button for main robots.txt
document.getElementById('download-btn-main').addEventListener('click', () => {
    downloadRobotsTxt();
    
    // Show feedback
    const btn = document.getElementById('download-btn-main');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    btn.classList.add('downloaded');
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('downloaded');
    }, 2000);
});

// Download link in instructions
document.getElementById('download-link-text').addEventListener('click', (e) => {
    e.preventDefault();
    downloadRobotsTxt();
});

// Copy button for main robots.txt
document.getElementById('copy-btn-main').addEventListener('click', () => {
    const code = document.getElementById('generated-robots-main').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copy-btn-main');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 2000);
    });
});

// Custom generation handler
document.getElementById('generate-btn').addEventListener('click', async () => {
    const input = document.getElementById('smart-input').value.trim();
    
    if (!input) {
        alert('Please enter your website URL or paste your robots.txt');
        return;
    }
    
    const btn = document.getElementById('generate-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.classList.add('loading');
    
    // Detect if input is a URL or pasted robots.txt content
    const isUrl = input.includes('.') && !input.includes('\n') && input.split(/\s+/).length < 5;
    
    let websiteUrl = null;
    
    if (isUrl) {
        // It's a URL - fetch robots.txt
        websiteUrl = input;
        try {
            const robotsUrl = normalizeUrl(input) + '/robots.txt';
            const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(robotsUrl)}`);
            
            if (response.ok) {
                const robotsContent = await response.text();
                analyzeRobotsTxt(robotsContent, websiteUrl);
            } else {
                // No robots.txt found
                analyzeRobotsTxt('', websiteUrl);
            }
        } catch (error) {
            // Fallback: treat as no robots.txt
            analyzeRobotsTxt('', websiteUrl);
        }
    } else {
        // It's pasted content
        analyzeRobotsTxt(input);
    }
    
    btn.textContent = originalText;
    btn.classList.remove('loading');
});

// Enter key support
document.getElementById('smart-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('generate-btn').click();
    }
});

// Copy button for custom robots.txt
document.getElementById('copy-btn-custom').addEventListener('click', () => {
    const code = document.getElementById('generated-robots-custom').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copy-btn-custom');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6L9 17l-5-5" stroke-width="2"/></svg> Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 2000);
    });
});

function normalizeUrl(url) {
    // Add https:// if no protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    // Remove trailing slash
    url = url.replace(/\/$/, '');
    
    // Remove path if present
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch {
        return url;
    }
}

function analyzeRobotsTxt(content, websiteUrl = null) {
    const auditResults = [];
    const lowerContent = content.toLowerCase();
    
    // Check if robots.txt exists
    if (!content || content.trim() === '') {
        auditResults.push({
            type: 'warning',
            icon: '⚠️',
            title: 'No robots.txt found',
            description: 'Your website doesn\'t have a robots.txt file, so AI bots can freely access all your content.',
            details: {
                title: 'What does this mean?',
                explanation: 'A robots.txt file is a simple text file that tells web crawlers (bots) which parts of your website they can and cannot access. Without one, all bots have unrestricted access to your entire site.',
                impact: [
                    'AI companies can scrape all your content for training their models',
                    'Your articles, images, and data may be used without compensation',
                    'No control over which bots access your content'
                ],
                action: 'Create a new robots.txt file using our generator below to start protecting your content.'
            }
        });
    } else {
        auditResults.push({
            type: 'good',
            icon: '✓',
            title: 'robots.txt exists',
            description: 'Your website has a robots.txt file.',
            details: {
                title: 'About your robots.txt',
                explanation: 'Your site has a robots.txt file, which is the standard way to control bot access. However, the rules inside determine how well your content is protected.',
                whatNext: 'Check the other items below to see if your rules are properly configured to block AI bots while keeping search engines working.',
                funFact: 'The robots.txt standard was created in 1994 and is still the primary method for controlling crawler access to websites.'
            }
        });
    }
    
    // Check for AI bot blocking
    let blockedBotsCount = 0;
    const blockedBotsList = [];
    const missedBotsList = [];
    
    AI_BOTS.forEach(bot => {
        if (lowerContent.includes(bot.toLowerCase())) {
            blockedBotsCount++;
            blockedBotsList.push(bot);
        } else {
            missedBotsList.push(bot);
        }
    });
    
    if (blockedBotsCount === 0) {
        auditResults.push({
            type: 'bad',
            icon: '✗',
            title: 'No AI bots blocked',
            description: 'Your robots.txt doesn\'t block any known AI crawlers. Your content may be used for AI training.',
            details: {
                title: 'AI Bot Protection Missing',
                explanation: `Your robots.txt is not blocking any of the ${AI_BOTS.length}+ known AI crawlers. This means AI companies can freely scrape your content to train their language models.`,
                examples: [
                    '<strong>GPTBot</strong> - OpenAI\'s crawler for ChatGPT training',
                    '<strong>ClaudeBot</strong> - Anthropic\'s crawler for Claude training',
                    '<strong>Google-Extended</strong> - Google\'s AI training crawler (separate from search)',
                    '<strong>CCBot</strong> - Common Crawl, used by multiple AI companies',
                    '<strong>Bytespider</strong> - ByteDance/TikTok\'s AI crawler',
                    '<strong>PerplexityBot</strong> - Perplexity AI',
                    '<strong>Amazonbot</strong> - Amazon\'s AI crawler',
                    '<strong>...and 90+ more AI bots</strong>'
                ],
                action: 'Use our generator below to create a comprehensive robots.txt that blocks all known AI bots (maintained list from GitHub).'
            }
        });
    } else if (blockedBotsCount < AI_BOTS.length) {
        // If not ALL bots are blocked, it's still a warning
        auditResults.push({
            type: 'warning',
            icon: '⚠️',
            title: 'Some AI bots blocked',
            description: `You're blocking ${blockedBotsCount} out of ${AI_BOTS.length} known AI bots. ${missedBotsList.length} bots can still access your content.`,
            details: {
                title: 'Partial AI Bot Protection',
                explanation: `You're currently blocking ${blockedBotsCount} AI bots, but ${missedBotsList.length} others can still access your content.`,
                blocked: blockedBotsList.length <= 10 ? blockedBotsList : blockedBotsList.slice(0, 10).concat(['...and ' + (blockedBotsList.length - 10) + ' more']),
                missed: missedBotsList.length <= 10 ? missedBotsList : missedBotsList.slice(0, 10).concat(['...and ' + (missedBotsList.length - 10) + ' more']),
                action: 'Update your robots.txt with our generator to block all known AI crawlers comprehensively.'
            }
        });
    } else {
        // Only mark as "good" if ALL bots are blocked
        auditResults.push({
            type: 'good',
            icon: '✓',
            title: 'All AI bots blocked',
            description: `You're blocking all ${AI_BOTS.length} known AI bots. Excellent!`,
            details: {
                title: 'Complete AI Bot Protection',
                explanation: `Perfect! You're blocking all ${AI_BOTS.length} known AI crawlers. This maximally protects your content from being used for AI training without permission.`,
                blocked: blockedBotsList.length <= 10 ? blockedBotsList : blockedBotsList.slice(0, 10).concat(['...and ' + (blockedBotsList.length - 10) + ' more']),
                keepUpdated: 'New AI bots emerge regularly. Consider checking back periodically to update your robots.txt with the latest bot list.'
            }
        });
    }
    
    // Check if Googlebot is allowed
    const hasGooglebotDisallow = lowerContent.includes('user-agent: googlebot') && 
                                  lowerContent.includes('disallow: /');
    
    if (hasGooglebotDisallow) {
        auditResults.push({
            type: 'bad',
            icon: '✗',
            title: 'Google Search may be blocked!',
            description: 'Your robots.txt appears to block Googlebot, which could hurt your search rankings.',
            details: {
                title: 'Critical: Search Engine Access Issue',
                explanation: 'Your robots.txt appears to block Googlebot, the crawler that powers Google Search. This is usually unintentional and can severely impact your website traffic.',
                consequences: [
                    'Your pages won\'t appear in Google search results',
                    'You\'ll lose organic search traffic',
                    'Your SEO efforts will be wasted',
                    'Users won\'t be able to find your content through Google'
                ],
                solution: 'This is likely a mistake. Use our generator to create a robots.txt that blocks AI bots while explicitly allowing search engines like Google, Bing, and others.',
                important: '<strong>Note:</strong> Google-Extended (AI training) is different from Googlebot (search). You want to allow Googlebot and block Google-Extended.'
            }
        });
    } else {
        auditResults.push({
            type: 'good',
            icon: '✓',
            title: 'Search engines allowed',
            description: 'Google and other search engines can properly index your site.',
            details: {
                title: 'Search Engine Access Confirmed',
                explanation: 'Your robots.txt properly allows search engine crawlers to index your site. This is essential for maintaining your search rankings and organic traffic.',
                whyThisMatters: [
                    'Google, Bing, and other search engines can find and index your content',
                    'Your SEO strategy remains effective',
                    'Users can discover your content through search',
                    'Your search rankings won\'t be negatively affected'
                ],
                keyPoint: 'You can block AI training bots (like GPTBot and Google-Extended) while still allowing search engines (like Googlebot). They are completely separate!',
                searchEngines: 'Our generator ensures Googlebot, Bingbot, DuckDuckBot, and other legitimate search crawlers remain allowed.'
            }
        });
    }
    
    // Display results
    displayStatusSummary(auditResults);
    displayAuditResults(auditResults);
    
    const sitemapInput = document.getElementById('sitemap-input');
    const sitemapUrl = sitemapInput ? sitemapInput.value.trim() : '';
    const customRobots = generateRobotsTxt(content, websiteUrl, currentCMS, sitemapUrl);
    document.getElementById('generated-robots-custom').textContent = customRobots;
    
    // Show results
    document.getElementById('custom-results').classList.remove('hidden');
    
    // Scroll to results
    setTimeout(() => {
        document.getElementById('custom-results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function displayStatusSummary(results) {
    const container = document.getElementById('status-summary');
    
    // Count status types
    const badCount = results.filter(r => r.type === 'bad').length;
    const warningCount = results.filter(r => r.type === 'warning').length;
    const goodCount = results.filter(r => r.type === 'good').length;
    
    // // Only show "already up to date" if ALL checks are good (no bad, no warning)
    // if (badCount === 0 && warningCount === 0 && goodCount === results.length) {
    //     container.className = 'status-badge good';
    //     container.textContent = '✓ Robots.txt already up to date!';
    // } else if (badCount > 0) {
    //     container.className = 'status-badge bad';
    //     container.textContent = '⚠️ Needs updating';
    // } else if (warningCount > 0) {
    //     container.className = 'status-badge warning';
    //     container.textContent = '⚠ Could be improved';
    // } else {
    //     // Fallback
    //     container.className = 'status-badge warning';
    //     container.textContent = '⚠ Needs review';
    // }
}

function displayAuditResults(results) {
    const container = document.getElementById('audit-results');
    
    const html = `
        <div class="audit-results-list">
            ${results.map((result, index) => `
                <div class="audit-item ${result.type}" data-index="${index}">
                    <div class="audit-item-header">
                        <div class="audit-icon">${result.icon}</div>
                        <div class="audit-text">
                            <h3>${result.title}</h3>
                            <p>${result.description}</p>
                        </div>
                        <div class="expand-icon">▼</div>
                    </div>
                    <div class="audit-details">
                        ${generateDetailContent(result)}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = html;
    
    // Add click handlers
    document.querySelectorAll('.audit-item').forEach(item => {
        item.addEventListener('click', function() {
            const wasExpanded = this.classList.contains('expanded');
            
            // Close all other items
            document.querySelectorAll('.audit-item').forEach(i => {
                i.classList.remove('expanded');
            });
            
            // Toggle current item
            if (!wasExpanded) {
                this.classList.add('expanded');
            }
        });
    });
}

function generateDetailContent(result) {
    const details = result.details;
    let html = '<div class="audit-details-content">';
    
    // Title and badge
    if (details.title) {
        html += `<span class="detail-badge ${result.type}">${details.title}</span>`;
    }
    
    // Main explanation
    if (details.explanation) {
        html += `<p>${details.explanation}</p>`;
    }
    
    // Impact list
    if (details.impact) {
        html += '<h4>Impact:</h4><ul>';
        details.impact.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }
    
    // Examples list
    if (details.examples) {
        html += '<h4>Examples of AI Bots:</h4><ul>';
        details.examples.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }
    
    // Blocked bots
    if (details.blocked) {
        html += '<h4>Currently Blocked:</h4><ul>';
        details.blocked.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }
    
    // Missed bots
    if (details.missed) {
        html += '<h4>Not Yet Blocked:</h4><ul>';
        details.missed.slice(0, 8).forEach(item => {
            html += `<li>${item}</li>`;
        });
        if (details.missed.length > 8) {
            html += `<li><em>...and ${details.missed.length - 8} more</em></li>`;
        }
        html += '</ul>';
    }
    
    // Consequences list
    if (details.consequences) {
        html += '<h4>Consequences:</h4><ul>';
        details.consequences.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }
    
    // Why this matters
    if (details.whyThisMatters) {
        html += '<h4>Why This Matters:</h4><ul>';
        details.whyThisMatters.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }
    
    // What next
    if (details.whatNext) {
        html += `<p><strong>What to check next:</strong> ${details.whatNext}</p>`;
    }
    
    // Action
    if (details.action) {
        html += `<p><strong>Action:</strong> ${details.action}</p>`;
    }
    
    // Solution
    if (details.solution) {
        html += `<p><strong>Solution:</strong> ${details.solution}</p>`;
    }
    
    // Keep updated
    if (details.keepUpdated) {
        html += `<p><strong>Tip:</strong> ${details.keepUpdated}</p>`;
    }
    
    // Still missing
    if (details.stillMissing) {
        html += `<p><strong>Note:</strong> ${details.stillMissing}</p>`;
    }
    
    // Key point
    if (details.keyPoint) {
        html += `<p><strong>Key Point:</strong> ${details.keyPoint}</p>`;
    }
    
    // Important note
    if (details.important) {
        html += `<p>${details.important}</p>`;
    }
    
    // Fun fact
    if (details.funFact) {
        html += `<p><em>Fun fact: ${details.funFact}</em></p>`;
    }
    
    // Search engines
    if (details.searchEngines) {
        html += `<p><em>${details.searchEngines}</em></p>`;
    }
    
    html += '</div>';
    return html;
}

function generateRobotsTxt(existingContent = '', websiteUrl = null, cmsType = null, sitemapUrl = '') {
    // Parse existing content to preserve custom rules
    let customRules = '';
    const lines = existingContent.split('\n');
    
    // Extract any custom rules that aren't about AI bots or search engines
    for (let line of lines) {
        const lowerLine = line.toLowerCase().trim();
        
        // Skip AI bot rules
        let isAIBot = false;
        for (let bot of AI_BOTS) {
            if (lowerLine.includes(bot.toLowerCase())) {
                isAIBot = true;
                break;
            }
        }
        
        // Skip search engine rules
        let isSearchEngine = false;
        for (let engine of ALLOWED_SEARCH_ENGINES) {
            if (lowerLine.includes(engine.toLowerCase())) {
                isSearchEngine = true;
                break;
            }
        }
        
        if (!isAIBot && !isSearchEngine && line.trim() !== '') {
            // Keep certain custom directives
            if (lowerLine.startsWith('sitemap:') || 
                lowerLine.startsWith('crawl-delay:') ||
                (lowerLine.startsWith('#') && !lowerLine.includes('ai') && !lowerLine.includes('bot'))) {
                customRules += line + '\n';
            }
        }
    }
    
    // Generate comprehensive robots.txt
    let robotsContent = `# This file blocks AI training bots while allowing search engines
# Bot list source: https://github.com/ai-robots-txt/ai.robots.txt
`;
    
    // Add sitemap first if not present in custom rules
    if (!customRules.toLowerCase().includes('sitemap:')) {
        if (sitemapUrl) {
            robotsContent += `\nSitemap: ${sitemapUrl}\n`;
        } else {
            robotsContent += `\nSitemap: https://yourwebsite.com/sitemap.xml\n`;
        }
    }
    
    // Add AI bots block
    robotsContent += `\n# Block AI training bots (${AI_BOTS.length} bots)\n`;
    
    // Add all AI bots in grouped format
    AI_BOTS.forEach(bot => {
        robotsContent += `User-agent: ${bot}\n`;
    });
    robotsContent += `Disallow: /`;
    
    // Add CMS-specific rules if a CMS is selected (apply to all user agents)
    if (cmsType && CMS_RULES[cmsType]) {
        robotsContent += `\n\n# Apply CMS-specific rules to all crawlers\nUser-agent: *\n${CMS_RULES[cmsType]}`;
    }
    
    // Add custom rules if any
    if (customRules.trim()) {
        robotsContent += `\n\n# Custom rules\n${customRules}`;
    }
    
    return robotsContent;
}

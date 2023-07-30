const helmet = require('helmet');

const configHelmet = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            baseUri: ["'self'"],
            fontSrc: ["'self'", "https:", "data:", "fonts.gstatic.com"],
            formAction: ["'self'"],
            frameAncestors: ["'self'"],
            imgSrc: ["'self'", "data:"],
            objectSrc: ["'none'"],
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, "cdnjs.cloudflare.com", "cdn.jsdelivr.net", "unpkg.com"],
            scriptSrcAttr: ["'none'"],
            styleSrc: ["'self'", "https:", "'unsafe-inline'"],
            upgradeInsecureRequests: [],
        },
    },
    crossOriginEmbedderPolicy: { policy: "require-corp" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    dnsPrefetchControl: false,
    frameguard: { action: "SAMEORIGIN" },
    hsts: { maxAge: 15552000, includeSubDomains: true },
    ieNoOpen: true,
    nosniff: true,
    originAgentCluster: "?1",
    permittedCrossDomainPolicies: "none",
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: false,
})

module.exports = configHelmet;

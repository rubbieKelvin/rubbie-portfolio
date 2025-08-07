export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    // Add security and SEO headers
    const headers = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      // Cache control for better performance
      'Cache-Control': 'public, max-age=31536000, immutable'
    }

    // Apply headers to HTML responses
    if (response.headers['content-type']?.includes('text/html')) {
      Object.entries(headers).forEach(([key, value]) => {
        response.headers[key] = value
      })
    }
  })
})
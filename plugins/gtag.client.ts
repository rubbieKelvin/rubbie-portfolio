export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const router = useRouter()
  
  // Only run on client side and in production
  if (process.server || process.dev) return
  
  const googleAnalyticsId = config.public.googleAnalyticsId as string
  
  // Don't initialize if no GA ID is provided
  if (!googleAnalyticsId || googleAnalyticsId === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics ID not configured')
    return
  }

  // Load Google Analytics script
  useHead({
    script: [
      {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}', {
            anonymize_ip: true,
            send_page_view: false
          });
        `,
        type: 'text/javascript',
      },
    ],
  })

  // Track page views on route change
  router.afterEach((to) => {
    nextTick(() => {
      if (typeof gtag !== 'undefined') {
        gtag('config', googleAnalyticsId, {
          page_path: to.fullPath,
          anonymize_ip: true,
        })
      }
    })
  })

  // Track initial page view
  nextTick(() => {
    if (typeof gtag !== 'undefined') {
      gtag('config', googleAnalyticsId, {
        page_path: router.currentRoute.value.fullPath,
        anonymize_ip: true,
      })
    }
  })
})
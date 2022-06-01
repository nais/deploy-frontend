import amplitude from 'amplitude-js'

export function initAmplitude() {
  if (amplitude) {
    amplitude
      .getInstance()
      .init(
        document.domain === 'deploy.nais.io'
          ? '16d1ee2fd894ca2562eeebb5095dbcf0'
          : '04203d48401492bda4620a74acf85a5b',
        '',
        {
          apiEndpoint: 'amplitude.nav.no/collect',
          saveEvents: false,
          includeUtm: true,
          includeReferrer: true,
          platform: window.location.toString(),
        }
      )
  }
}

function logAmplitudeEvent(eventName, eventData) {
  setTimeout(() => {
    try {
      if (amplitude) {
        amplitude.getInstance().logEvent(eventName, eventData)
      }
    } catch (error) {
      console.error(error)
    }
  })
}

export function logPageView(path) {
  if (process.env.NODE_ENV !== 'production') return
  logAmplitudeEvent('pageview', {
    path: path,
  })
}

const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}

const fetchUrl = async (url, method = HttpMethod.GET) => {
  const response = await fetch(url, { method })

  if (response.ok) {
    const contentLength = response.headers.get('content-length') || '0'
    if (parseInt(contentLength) > 0) {
      return await response.json()
    }
    return ''
  } else {
    const errorMessageBody = await response.text()
    throw `${errorMessageBody} (HTTP ${response.status} ${response.statusText})`
  }
}

export const httpGet = (url) => {
  return fetchUrl(url, HttpMethod.GET)
}

export const httpPost = (url) => {
  return fetchUrl(url, HttpMethod.POST)
}

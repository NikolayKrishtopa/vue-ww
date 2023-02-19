const BASE_GEOCODE_URL = 'https://geocode-maps.yandex.ru/1.x'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

const BASE_WEATHER_ICON_URL = 'http://openweathermap.org/img/wn/'

const GEOCODE_CONFIG = {
  LANG: 'en_US',
  API_KEY: '6f502653-5bdd-40dd-881d-ae7f9fb1368f',
  FORMAT: 'json',
}

const WEATHER_CONFIG = {
  API_KEY: 'bd296729deede8bb1376f5e9ae64d12b',
}

const GENERATE_URL_FOR_GEOCODE = (geocode) =>
  `${BASE_GEOCODE_URL}?geocode=${geocode},&lang=${GEOCODE_CONFIG.LANG}&apikey=${GEOCODE_CONFIG.API_KEY}&format=${GEOCODE_CONFIG.FORMAT}`

const GENERATE_URL_FOR_WEATHER_API = (lat, lon) =>
  `${BASE_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_CONFIG.API_KEY}`

export {
  GENERATE_URL_FOR_GEOCODE,
  GENERATE_URL_FOR_WEATHER_API,
  BASE_WEATHER_ICON_URL,
}

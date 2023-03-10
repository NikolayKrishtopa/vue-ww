<template>
  <div
    class="p-5 flex flex-col justify-center"
    v-if="Object.keys(city).length > 0 && !errorMessage"
  >
    <p class="text-xl">{{ city.name }}, {{ city.sys.country }}</p>
    <div class="flex gap-4 items-center justify-center pr-8">
      <img :src="iconUrl" alt="Icon of the current weather state." />
      <p class="text-4xl align-center h-16">
        {{ Math.floor(city.main.temp) - 273 }}&deg;C
      </p>
    </div>
    <p class="text-l">
      Feels like {{ Math.floor(city.main.feels_like) - 273 }}&deg;C.
      {{ description }}. {{ windType }}
    </p>
    <div class="grid grid-cols-2 gap-y-3 py-4">
      <div class="flex">
        <img class="mr-2" src="../img/wind-icon.png" alt="Wind icon." />
        <p class="text-l">{{ city.wind.speed }}m/s {{ windDirection }}</p>
      </div>
      <div class="flex justify-end">
        <img class="mr-2" src="../img/pressure-icon.png" alt="Pressure icon." />
        <p class="text-l">{{ city.main.pressure }}hPa</p>
      </div>
      <p class="text-l">Humidity: {{ city.main.humidity }}%</p>
      <p class="text-l text-right">
        Visibility: {{ (city.visibility / 1000).toFixed(1) }}km
      </p>
    </div>
  </div>
  <div v-if="errorMessage || isLoading" class="p-5">
    <p class="text-xxl w-[90%]">
      {{ errorMessage ? errorMessage : isLoading ? 'Loading...' : '' }}
    </p>
  </div>
</template>

<script>
import {
  GENERATE_URL_FOR_WEATHER_API,
  BASE_WEATHER_ICON_URL,
  GET_WEATHER_ERROR_MESSAGE,
} from '../utils/utils'
export default {
  props: {
    cityData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      city: {},
      errorMessage: null,
      isLoading: false,
    }
  },
  methods: {
    async getCityData() {
      this.isLoading = true
      try {
        const res = await fetch(
          GENERATE_URL_FOR_WEATHER_API(this.cityData.lat, this.cityData.lon)
        )
        if (res.ok) {
          this.city = await res.json()
          this.errorMessage = null
        } else {
          this.errorMessage = GET_WEATHER_ERROR_MESSAGE
        }
      } catch (err) {
        this.errorMessage = GET_WEATHER_ERROR_MESSAGE
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
  },
  computed: {
    windType() {
      if (this.city.wind.speed < 5.4) {
        return 'Light breeze'
      } else if (this.city.wind.speed < 7.9) {
        return 'Medium wind'
      } else if (this.city.wind.speed < 10.7) {
        return 'Fresh wind'
      } else if (this.city.wind.speed < 13.8) {
        return 'Strong wind'
      } else {
        return 'Storm wind'
      }
    },
    description() {
      return (
        this.city.weather[0].description[0].toUpperCase() +
        this.city.weather[0].description.slice(1)
      )
    },
    windDirection() {
      if (this.city.wind.deg < 11.25) {
        return 'N'
      } else if (this.city.wind.deg < 33.75) {
        return 'NNE'
      } else if (this.city.wind.deg < 56.25) {
        return 'NE'
      } else if (this.city.wind.deg < 78.75) {
        return 'ENE'
      } else if (this.city.wind.deg < 101.25) {
        return 'E'
      } else if (this.city.wind.deg < 123.75) {
        return 'ESE'
      } else if (this.city.wind.deg < 146.25) {
        return 'SE'
      } else if (this.city.wind.deg < 168.75) {
        return 'SSE'
      } else if (this.city.wind.deg < 191.25) {
        return 'S'
      } else if (this.city.wind.deg < 213.75) {
        return 'SSW'
      } else if (this.city.wind.deg < 236.25) {
        return 'SW'
      } else if (this.city.wind.deg < 258.75) {
        return 'WSW'
      } else if (this.city.wind.deg < 281.25) {
        return 'W'
      } else if (this.city.wind.deg < 303.75) {
        return 'WNW'
      } else if (this.city.wind.deg < 326.25) {
        return 'NW'
      } else if (this.city.wind.deg < 348.75) {
        return 'NNW'
      } else {
        return S
      }
    },
    iconUrl() {
      return `${BASE_WEATHER_ICON_URL}${this.city.weather[0].icon}@2x.png`
    },
  },
  mounted() {
    this.getCityData()
  },
}
</script>

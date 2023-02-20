<template>
  <div
    class="w-full h-full flex justify-center align-center bg-transparent overflow-auto"
  >
    <div
      v-if="!settingsMode"
      class="h-full w-80 bg-background relative text-primary text-left flex flex-col gap-4 min-h-min rounded-2xl main"
    >
      <button class="absolute right-4 top-4" @click="toggleSettingsMode">
        <img src="./img/settings.svg" alt="Settings button" />
      </button>
      <CityWeather v-for="city in cities" :key="city.name" :cityData="city" />
      <p v-if="cities.length === 0" class="text-xl p-5">No cities added yet</p>
    </div>
    <div
      v-if="settingsMode"
      class="h-full w-80 bg-background relative text-primary text-left flex flex-col p-5 rounded-2xl main"
    >
      <div class="flex w-full justify-between mb-4">
        <p class="text-xl">Settings</p>
        <button @click="toggleSettingsMode">
          <img src="./img/close-icon.svg" alt="Close button." />
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <CitySettings
          v-for="city in cities"
          :key="city.name"
          :city="city"
          @removeCity="removeCity"
          draggable="true"
          @dragstart="dragStartHandler($event, city)"
          @dragleave="dragLeaveHandler"
          @dragend="dragEndHandler"
          @dragover="dragOverHandler"
          @drop="dropHandler($event, city)"
        />
        <Search v-model="searchValue" />
        <div class="max-h-20 overflow-y-auto snap-none flex flex-col gap-2">
          <p
            v-for="result in searchResults"
            class="cursor-pointer"
            @click="addCity(result)"
          >
            {{ result.GeoObject.name }}, {{ result.GeoObject.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CityWeather from './components/CityWeather.vue'
import CitySettings from './components/CitySettings.vue'
import Search from './components/Search.vue'
import { GENERATE_URL_FOR_GEOCODE } from './utils/utils'
export default {
  components: { CityWeather, CitySettings, Search },
  data() {
    return {
      searchValue: '',
      searchResults: null,
      settingsMode: false,
      queryTimeOut: null,
      cities: localStorage.getItem('weather-widget-cities')
        ? JSON.parse(localStorage.getItem('weather-widget-cities'))
        : [],
      heldCity: null,
    }
  },
  methods: {
    toggleSettingsMode() {
      this.settingsMode = !this.settingsMode
    },
    removeCity(city) {
      this.cities = this.cities.filter((e) => e.name !== city.name)
    },
    addCity(city) {
      this.cities = [
        ...this.cities,
        {
          lon: city.GeoObject.Point.pos.split(' ')[0],
          lat: city.GeoObject.Point.pos.split(' ')[1],
          name: city.GeoObject.name,
          country: city.GeoObject.description,
          position: this.cities.length + 1,
        },
      ]
      this.searchValue = ''
      this.searchResults = null
    },
    async getSearchResults(search) {
      clearTimeout(this.queryTimeOut)
      this.queryTimeOut = setTimeout(async () => {
        try {
          const res = await fetch(GENERATE_URL_FOR_GEOCODE(search))
          const data = await res.json()
          this.searchResults = data.response.GeoObjectCollection.featureMember
          return
        } catch (err) {
          console.log(err)
          this.searchResults = 'error'
        }
      }, 200)
    },
    getUserGeoData() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.cities = [
          ...this.cities,
          {
            lon: position.coords.longitude,
            lat: position.coords.latitude,
            name: 'your current location',
            country: '',
            position: this.cities.length + 1,
          },
        ]
      })
    },
    dragStartHandler(e, city) {
      this.heldCity = city
    },
    dragLeaveHandler(e) {
      e.currentTarget.classList.remove('bg-indigo-400')
      e.currentTarget.classList.add('bg-indigo-600')
    },
    dragEndHandler(e) {},
    dragOverHandler(e) {
      e.preventDefault()
      e.currentTarget.classList.add('bg-indigo-400')
      e.currentTarget.classList.remove('bg-indigo-600')
    },

    dropHandler(e, city) {
      e.preventDefault()
      e.currentTarget.classList.remove('bg-indigo-400')
      e.currentTarget.classList.add('bg-indigo-600')
      if (this.heldCity.position > city.position) {
        this.cities = this.cities.map((c) => {
          return c.position >= city.position &&
            c.position < this.heldCity.position &&
            c.name !== this.heldCity.name
            ? { ...c, position: c.position + 1 }
            : c.name === this.heldCity.name
            ? { ...c, position: city.position }
            : c
        })
      } else if (this.heldCity.position < city.position) {
        this.cities = this.cities.map((c) => {
          return c.position <= city.position &&
            c.position > this.heldCity.position &&
            c.name !== this.heldCity.name
            ? { ...c, position: c.position - 1 }
            : c.name === this.heldCity.name
            ? { ...c, position: city.position }
            : c
        })
      }

      this.cities = this.cities.sort(this.sortCities)
    },
    sortCities(a, b) {
      if (a.position > b.position) {
        return 1
      } else {
        return -1
      }
    },
  },
  watch: {
    searchValue(newValue) {
      if (newValue.length === 0) return
      this.getSearchResults(newValue)
    },
    cities(newValue) {
      localStorage.setItem('weather-widget-cities', JSON.stringify(newValue))
    },
  },
  mounted() {
    if (this.cities.length === 0) {
      this.getUserGeoData()
    }
  },
}
</script>

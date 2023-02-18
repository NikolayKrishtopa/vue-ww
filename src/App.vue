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
        },
      ]
      this.searchValue = ''
      this.searchResults = null
    },
    async getSearchResults(search) {
      clearTimeout(this.queryTimeOut)
      this.queryTimeOut = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://geocode-maps.yandex.ru/1.x?geocode=${search},&lang=en_US&apikey=6f502653-5bdd-40dd-881d-ae7f9fb1368f&format=json`
          )
          const data = await res.json()
          this.searchResults = data.response.GeoObjectCollection.featureMember
          return
        } catch (err) {
          console.log(err)
          this.searchResults = 'error'
        }
      }, 200)
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
}
</script>

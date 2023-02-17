<template>
  <div
    class="w-full h-full flex justify-center align-center bg-blue-100 overflow-auto rounded-2xl"
  >
    <div
      v-if="!settingsMode"
      class="max-w-xs bg-background relative text-primary text-left flex flex-col gap-4 min-h-min rounded-2xl"
    >
      <button class="absolute right-4 top-4" @click="toggleSettingsMode">
        <img src="./img/settings.svg" alt="Settings button" />
      </button>
      <CityWeather v-for="city in cities" :key="city.name" :city="city" />
      <p v-if="cities.length === 0" class="text-xl p-5">No cities added yet</p>
    </div>
    <div
      v-if="settingsMode"
      class="max-w-xs bg-background relative text-primary text-left flex flex-col p-5 w-full rounded-2xl"
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
          @removeCity="removeItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CityWeather from './components/CityWeather.vue'
import CitySettings from './components/CitySettings.vue'
export default {
  components: { CityWeather, CitySettings },
  data() {
    return {
      settingsMode: false,
      cities: [
        {
          coord: {
            lon: 41.63,
            lat: 41.6,
          },
          weather: [
            {
              id: 803,
              main: 'Clouds',
              description: 'broken clouds',
              icon: '04d',
            },
          ],
          base: 'stations',
          main: {
            temp: 276.09,
            feels_like: 270.39,
            temp_min: 276.09,
            temp_max: 276.09,
            pressure: 1024,
            humidity: 93,
          },
          visibility: 7000,
          wind: {
            speed: 8.75,
            deg: 230,
          },
          clouds: {
            all: 75,
          },
          dt: 1676544927,
          sys: {
            type: 1,
            id: 8858,
            country: 'GE',
            sunrise: 1676520504,
            sunset: 1676558822,
          },
          timezone: 14400,
          id: 611612,
          name: 'Batumi',
          cod: 200,
        },
        {
          coord: {
            lon: 153.0211,
            lat: -27.4701,
          },
          weather: [
            {
              id: 801,
              main: 'Clouds',
              description: 'few clouds',
              icon: '02n',
            },
          ],
          base: 'stations',
          main: {
            temp: 290.71,
            feels_like: 290.77,
            temp_min: 288.25,
            temp_max: 292.81,
            pressure: 1017,
            humidity: 86,
          },
          visibility: 10000,
          wind: {
            speed: 3.6,
            deg: 210,
          },
          clouds: {
            all: 20,
          },
          dt: 1676574770,
          sys: {
            type: 2,
            id: 2005393,
            country: 'AU',
            sunrise: 1676575942,
            sunset: 1676622712,
          },
          timezone: 36000,
          id: 2174003,
          name: 'Brisbane',
          cod: 200,
        },
      ],
    }
  },
  methods: {
    toggleSettingsMode() {
      this.settingsMode = !this.settingsMode
    },
    removeItem(item) {
      this.cities = this.cities.filter((e) => e.name !== item.name)
    },
  },
}
</script>

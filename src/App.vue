<template>
  <div
    class="w-full h-full flex justify-center align-center bg-blue-100 overflow-auto rounded-2xl"
  >
    <div
      v-if="!settingsMode"
      class="w-80 bg-background relative text-primary text-left flex flex-col gap-4 min-h-min rounded-2xl"
    >
      <button class="absolute right-4 top-4" @click="toggleSettingsMode">
        <img src="./img/settings.svg" alt="Settings button" />
      </button>
      <CityWeather v-for="city in cities" :key="city.name" :cityData="city" />
      <p v-if="cities.length === 0" class="text-xl p-5">No cities added yet</p>
    </div>
    <div
      v-if="settingsMode"
      class="w-80 bg-background relative text-primary text-left flex flex-col p-5 w-full rounded-2xl"
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
          lon: 41.63,
          lat: 41.6,
          name: 'Batumi',
          country: 'Geo',
        },
        {
          lon: 153.0211,
          lat: -27.4701,
          name: 'Brisbane',
          country: 'Au',
        },
      ],
    }
  },
  methods: {
    toggleSettingsMode() {
      this.settingsMode = !this.settingsMode
    },
    removeCity(city) {
      this.cities = this.cities.filter((e) => e.name !== city.name)
    },
  },
}
</script>

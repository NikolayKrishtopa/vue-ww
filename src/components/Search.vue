<template>
  <p class="text-xl mt-5 mb-2">Add location</p>
  <input
    :value="modelValue"
    @input="updateInput"
    class="w-full p-2 rounded-lg bg-transparent border-yellow-500"
    placeholder="Start typing new location..."
  />
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    },
  },
}
</script>

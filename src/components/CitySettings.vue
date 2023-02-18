<template>
  <div class="p-3 max-h-12 flex justify-between bg-indigo-600 rounded-md">
    <button>
      <img src="../img/Burger-icon.svg" alt="Drag and drop button." />
    </button>
    <p class="text-l overflow-clip max-w-[200px]">
      {{ city.name }}, {{ city.country }}
    </p>
    <button>
      <img
        src="../img/trash-bin-icon.svg"
        alt="Remove city button."
        @click="$emit('removeCity', city)"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
}
</script>

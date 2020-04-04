<template>
  <div class="container">
    <div>
      <h2 class="subtitle">
        AC DIY tracker
      </h2>
      <v-select
        v-model="selected"
        multiple
        label="name"
        :options="craftable"
      ></v-select>
      <button @click="addToGoals">Add to Goals</button>
      <h3>Goals</h3>
      <ul>
        <li v-for="item of goals" :key="item.name">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      craftable: [],
      selected: [],
      goals: []
    }
  },
  async created() {
    this.craftable = await this.$axios.$get('/.netlify/functions/craftable')
  },
  methods: {
    addToGoals() {
      this.goals.push(...this.selected)
      this.selected = []
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

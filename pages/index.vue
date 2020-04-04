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

      <grid>
        <grid-item size="1/2">
          <h3>Goals</h3>
          <ul>
            <li v-for="item of goals" :key="item.name">
              {{ item.name }}
            </li>
          </ul>
        </grid-item>
        <grid-item size="1/2">
          <h3>Materials</h3>
          <ul>
            <li v-for="entry of Object.entries(materials)" :key="entry[0]">
              {{ allItems[entry[0]].name }} - {{ entry[1] }}
            </li>
          </ul>
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      craftable: [],
      allItems: {},
      selected: [],
      goals: [],
      materials: {}
    }
  },
  async created() {
    this.craftable = await this.$axios.$get('/.netlify/functions/craftable')
    this.allItems = await this.$axios.$get('/.netlify/functions/all-items')
  },
  methods: {
    addToGoals() {
      this.goals.push(...this.selected)
      this.selected.forEach((s) => {
        Object.entries(s.materials).forEach((entry) => {
          const id = entry[0]
          const quantity = entry[1]
          this.materials[id] = this.materials[id]
            ? this.materials[id] + quantity
            : quantity
        })
      })
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

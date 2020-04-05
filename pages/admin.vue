<template>
  <div>
    <h2 class="subtitle">
      Add New Item
    </h2>
    <p><input v-model="data.name" placeholder="Name" /></p>
    <p><input v-model="data.type" placeholder="Type" /></p>
    <p>Materials: <button @click="addMaterial">Add Material</button></p>
    <ul>
      <li v-for="(item, i) of materials" :key="i">
        <grid>
          <grid-item size="3/4">
            <v-select
              v-model="item.item"
              label="name"
              :options="Object.values(allItems)"
            />
          </grid-item>
          <grid-item size="1/4">
            <input v-model="item.quantity" type="number" />
          </grid-item>
        </grid>
      </li>
    </ul>
    <button @click="createItem">Submit Item</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allItems: {},
      materials: [],
      data: {
        name: '',
        type: '',
        materials: {}
      }
    }
  },
  async created() {
    this.allItems = await this.$axios.$get('/.netlify/functions/all-items')
  },
  methods: {
    addMaterial() {
      this.materials.push({
        item: '',
        quantity: 0
      })
    },
    createItem() {
      this.materials.forEach((mat) => {
        this.data.materials[mat.item.ref] = parseInt(mat.quantity, 10)
      })
    }
  }
}
</script>

<style>
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>

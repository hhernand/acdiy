<template>
  <div>
    <notifications position="top center" />
    <h2 class="subtitle">
      Add New Item
    </h2>
    <p><input v-model="data.name" placeholder="Name" /></p>
    <p><v-select v-model="data.type" placeholder="Type" :options="types" /></p>
    <p>
      <label
        ><input v-model="data.seasonal" class="checkbox" type="checkbox" />
        Seasonal?</label
      >
    </p>
    <p>
      <grid horizontal="between">
        <grid-item>
          Materials:
        </grid-item>
        <grid-item>
          <button class="button" @click="addMaterial">Add Material</button>
        </grid-item>
      </grid>
    </p>
    <ul>
      <li v-for="(item, i) of materials" :key="i">
        <grid>
          <grid-item size="3/4">
            <v-select
              v-model="item.item"
              label="name"
              :options="allItemsOrdered"
            />
          </grid-item>
          <grid-item size="1/4">
            <input v-model="item.quantity" type="number" min="1" />
          </grid-item>
        </grid>
      </li>
    </ul>
    <button class="button" @click="createItem">Submit Item</button>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (to.query.key === undefined || to.query.key !== process.env.ADMIN_KEY) {
      next('/')
    } else {
      next()
    }
  },
  data() {
    return {
      types: [
        'Tools',
        'Equipment',
        'Housewares',
        'Misc',
        'Other',
        'Seasonal',
        'Wall-Mounted',
        'Wall-Floor-Rug'
      ],
      allItemsOrdered: [],
      materials: [],
      data: {
        name: '',
        type: '',
        seasonal: false,
        materials: {}
      }
    }
  },
  async created() {
    const result = await this.$axios.$get('/.netlify/functions/all-items')
    this.allItemsOrdered = result.ordered
  },
  methods: {
    addMaterial() {
      this.materials.push({
        item: '',
        quantity: 1
      })
    },
    async createItem() {
      this.materials.forEach((mat) => {
        this.data.materials[mat.item.ref] = parseInt(mat.quantity, 10)
      })

      const response = await this.$axios.$post(
        '/.netlify/functions/create-item',
        this.data
      )

      if (response.data.name === this.data.name) {
        this.$notify({
          text: `${this.data.name} created!`
        })
      }
      this.clearData()
    },
    clearData() {
      this.data = {
        name: '',
        type: '',
        materials: {}
      }
      this.materials = []
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

p {
  padding: 0.4rem;
}

li {
  margin: 0.4rem 0;
}

input {
  width: 100%;
  background: #e5dec1;
  border: 1px solid #bab59f;
  padding: 0.5rem;
  border-radius: 5px;
}

.checkbox {
  width: auto;
}
</style>

<template>
  <div class="container">
    <img class="banner" :src="require('@/assets/images/banner.png')" />
    <grid class="padding" wrap="wrap" horizontal="between">
      <grid-item size="3/4" :rwd="{ compact: '1/1' }">
        <v-select
          v-model="selected"
          multiple
          label="name"
          :options="craftable"
        ></v-select>
      </grid-item>
      <grid-item size="1/4" :rwd="{ compact: '1/1' }">
        <button class="button" @click="addToGoals">Add to Goals</button>
      </grid-item>
    </grid>

    <div class="box">
      <grid>
        <grid-item size="1/2">
          <h3>Goals</h3>
          <ul>
            <li v-for="(item, i) of goals" :key="i">
              <div class="goal">
                <img
                  v-if="icons.includes(item.type.toLowerCase())"
                  class="icon"
                  :src="
                    require(`@/assets/images/${item.type.toLowerCase()}.png`)
                  "
                /><span>{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </grid-item>
        <grid-item size="1/2">
          <h3>Materials</h3>
          <ul>
            <li v-for="(entry, i) of Object.entries(materials)" :key="i">
              <div class="item" :class="i % 2 ? 'row-light' : 'row-dark'">
                <span>{{ allItems[entry[0]].name }}</span
                ><span>{{ entry[1] }}</span>
              </div>
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
      icons: [
        'tools',
        'equipment',
        'housewares',
        'misc',
        'other',
        'seasonal',
        'wall-mounted',
        'wall-floor-rug'
      ],
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
.banner {
  width: 100%;
}

.padding.vfg-grid {
  padding: 0.8rem 0;
}

.container {
  width: 100%;
}

.box {
  border-radius: 25px;
  border: 10px solid #eee5c8;
  background: #e5dec1;
  color: #86521d;
  padding: 0.8em;
}

.goal {
  display: flex;
  align-items: center;
}

.icon {
  width: 1.2rem;
  margin-right: 0.4rem;
}

.item {
  padding: 0.4em;
  display: flex;
  justify-content: space-between;
}

li:first-child .item {
  border-radius: 0.8em 0.8em 0 0;
}

li:last-child .item {
  border-radius: 0 0 0.8em 0.8em;
}

li:only-child .item {
  border-radius: 0.8em;
}

.row-light {
  background: #e1d9b5;
}

.row-dark {
  background: #ded5ac;
}

.links {
  padding-top: 15px;
}
</style>

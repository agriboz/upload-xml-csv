<template>
  <div class="columns is-multiline is-centered section">
    <div class="column is-full">
      <h1>Your Products</h1>
    </div>
    <div
      v-if="products.products.length"
      class="is-flex is-flex-direction-column column"
    >
      <b-table
        class="is-flex-grow-1"
        :data="isEmpty ? [] : products.products"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
      >
        <b-table-column v-slot="props" label="Document Name">
          {{ props.row.details.name }}
        </b-table-column>

        <b-table-column v-slot="props" field="createdAt" label="Created At">
          {{ new Date(props.row.createdAt).toLocaleDateString() }}
        </b-table-column>

        <b-table-column v-slot="props" field="createdBy" label="Created By">
          {{ props.row.createdBy }}
        </b-table-column>
        <b-table-column v-slot="props" label="Actions">
          <b-button type="is-primary" @click="navigateDetail(props.row._id)"
            >Detail</b-button
          >
        </b-table-column>
      </b-table>

      <div v-if="alert.message" :class="`notification ${alert.type} mt-2`">
        {{ alert.message }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',
  data: () => ({
    isEmpty: false,
    isBordered: false,
    isStriped: true,
    isNarrowed: false,
    isHoverable: true,
  }),
  computed: {
    ...mapState(['alert', 'products']),
  },
  beforeMount() {
    this.clearAlerts()
    this.getProducts()
  },
  methods: {
    navigateDetail(id) {
      this.$router.push(`/products/${id}`)
    },
    ...mapActions({
      getProducts: 'products/getProducts',
      clearAlerts: 'alert/clear',
    }),
  },
}
</script>

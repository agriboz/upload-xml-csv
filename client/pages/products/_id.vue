<template>
  <div class="columns is-multiline is-centered section">
    <div class="column is-full">
      <h1>You are viewing {{ products.productDetails.details.name }}</h1>
    </div>
    <div
      v-if="products.productDetails.data.length"
      class="is-flex is-flex-direction-column column"
    >
      <b-table
        class="is-flex-grow-1"
        :data="isEmpty ? [] : products.productDetails.data"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
      >
        <b-table-column v-slot="props" field="handle" label="Handle">
          {{ props.row.handle }}
        </b-table-column>

        <b-table-column v-slot="props" field="location" label="Location">
          {{ props.row.location }}
        </b-table-column>

        <b-table-column v-slot="props" field="amount" label="Amount">
          {{ props.row.amount }}
        </b-table-column>
        <b-table-column v-slot="props" field="amount" label="Amount">
          <b-button
            type="is-primary"
            @click="
              isComponentModalActive = true
              formProps = props.row
            "
            >Edit</b-button
          >
          <b-button type="is-danger" @click="navigateDetail(props.row._id)"
            >Delete</b-button
          >
        </b-table-column>
      </b-table>
      <div v-if="alert.message" :class="`notification ${alert.type} mt-2`">
        {{ alert.message }}
      </div>
    </div>
    <b-modal
      v-if="formProps"
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Product Detail"
      aria-modal
    >
      <form action="">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit</p>
            <button
              type="button"
              class="delete"
              @click="isComponentModalActive = false"
            />
          </header>
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input :value="formProps.handle" placeholder="Handle" required>
              </b-input>
            </b-field>

            <b-field label="Location">
              <b-input
                :value="formProps.location"
                placeholder="Location"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Amount">
              <b-input :value="formProps.amount" placeholder="Amount" required>
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="isComponentModalActive = false" />
            <b-button label="Update" type="is-primary" />
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',
  data: () => ({
    isComponentModalActive: false,
    formProps: null,
    isEmpty: false,
    isBordered: false,
    isStriped: true,
    isNarrowed: false,
    isHoverable: true,
    document: null,
  }),
  computed: {
    ...mapState(['alert', 'products']),
  },
  beforeMount() {
    this.getProductDetails(this.$route.params.id)
    this.clearAlerts()
  },
  methods: {
    ...mapActions({
      getProductDetails: 'products/getProductDetails',
      clearAlerts: 'alert/clear',
    }),
  },
}
</script>

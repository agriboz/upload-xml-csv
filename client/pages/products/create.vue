<template>
  <div class="columns is-multiline is-centered section">
    <div class="column is-full">
      <div class="file is-centered is-boxed is-success has-name">
        <label class="file-label">
          <input ref="file" class="file-input" type="file" @change="readFile" />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Choose file… </span>
          </span>
          <span class="file-name">
            {{ document && document.details && document.details.name }}
          </span>
        </label>
      </div>
    </div>
    <div
      v-if="document && document.data.length"
      class="is-flex is-flex-direction-column column"
    >
      <b-table
        class="is-flex-grow-1"
        :data="isEmpty ? [] : document.data"
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
      </b-table>

      <b-button
        class="mt-2 is-align-self-flex-end"
        type="is-success"
        @click="saveProduct(document)"
        >Save</b-button
      >
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
    document: null,
  }),
  computed: {
    ...mapState(['alert']),
  },
  beforeMount() {
    this.clearAlerts()
  },
  methods: {
    ...mapActions({
      saveProduct: 'products/saveProduct',
      clearAlerts: 'alert/clear',
    }),

    onComplete(results, file) {
      this.document = {
        data: results.data,
        details: {
          name: file.name,
          type: file.type,
        },
      }
    },
    readFile() {
      const file = event.target.files[0]
      this.$papa.parse(file, {
        header: true,
        complete: this.onComplete, // your vue methods
      })
    },
  },
}
</script>

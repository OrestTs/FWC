<template>
  <div
    v-if="options"
    class="Dropdown"
  >
    <!-- Dropdown Input -->
    <div
      class="Dropdown__input-wrapper"
      :class="{'Dropdown__input-wrapper--opened': optionsShown}"
    >
      <input
        v-model="searchFilter"
        class="Dropdown__input"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        @focus="showOptions()"
        @blur="hideOptions()"
        @keyup="keyMonitor"
      >
      <i class="Dropdown__icon" />
    </div>
    <!-- Dropdown Menu -->
    <div
      v-show="optionsShown"
      class="Dropdown__content"
    >
      <div
        v-for="(option, index) in filteredOptions"
        :key="index"
        class="Dropdown__item"
        @mousedown="selectOption(option)"
      >
        {{ option.name || option.id || '-' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    name: {
      type: String,
      required: false,
      default: 'Dropdown',
      note: 'Input name'
    },

    options: {
      type: Array,
      required: true,
      default: () => ([]),
      note: 'Options of dropdown. An array of options with id and name'
    },

    placeholder: {
      type: String,
      required: false,
      default: 'Please select an option',
      note: 'Placeholder of dropdown'
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Disable the dropdown'
    },

    maxItem: {
      type: Number,
      required: false,
      default: 6,
      note: 'Max items showing'
    }
  },

  data () {
    return {
      selected: {},
      optionsShown: false,
      searchFilter: ''
    }
  },

  computed: {
    filteredOptions () {
      const filtered = []
      const regOption = new RegExp(this.searchFilter, 'ig')
      for (const option of this.options) {
        if (this.searchFilter.length < 1 || option.name.match(regOption)) {
          if (filtered.length < this.maxItem) {
            filtered.push(option)
          }
        }
      }
      return filtered
    }
  },

  watch: {
    searchFilter () {
      if (this.filteredOptions.length === 0) {
        this.selected = {}
      } else {
        this.selected = this.filteredOptions[0]
      }

      // A filter has been applied by typing in the input field is returned to parent and can be catch with v-on
      this.$emit('filter', this.searchFilter)
    }
  },

  created () {
    // An option is selected by click in the dropdown is returned to parent and can be catch with v-on
    this.$emit('selected', this.selected)
  },

  methods: {
    selectOption (option) {
      this.selected = option
      this.optionsShown = false
      this.searchFilter = this.selected.name
      this.$emit('selected', this.selected)
    },

    showOptions () {
      if (!this.disabled) {
        this.searchFilter = ''
        this.optionsShown = true
      }
    },

    hideOptions () {
      if (!this.selected.id) {
        this.selected = {}
        this.searchFilter = ''
      } else {
        this.searchFilter = this.selected.name
      }
      this.$emit('selected', this.selected)
      this.optionsShown = false
    },

    // Selecting when pressing Enter
    keyMonitor (event) {
      if (event.key === 'Enter' && this.filteredOptions[0]) {
        this.selectOption(this.filteredOptions[0])
      }
    }
  }
}
</script>

<!-- Using Scoped styles and the BEM convention for this component -->
<style lang="sass" scoped>
  @import './styles/dropdown--desktop'
  @import './styles/dropdown--tablet'
  @import './styles/dropdown--mobile'
</style>

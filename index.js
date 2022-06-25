(function (panel) {
  const extendOptions = ['singleLanguage', 'hideOptions', 'hideSettings', 'hideStatus']

  function extendView (component) {
    return {
      extends: component,
      mounted () {
        this.setExtendOptions()
      },
      watch: {
        // watch for blueprint change
        '$props.blueprint' () {
          this.setExtendOptions()
        }
      },
      methods: {
        setExtendOptions () {
          const options = this.$options.propsData.permissions

          if (options) {
            extendOptions.forEach(extendOption => {
              if (options[extendOption] === true) {
                this.$el.classList.add(extendOption)
              } else {
                this.$el.classList.remove(extendOption)
              }
            })
          }
        }
      }
    }
  }

  function extendComponent (component) {
    return {
      extends: component,
      props: {
        blueprintOptions: Object
      },
      mounted () {
        if (this.blueprintOptions) {
          this.$nextTick(() => {
            if (this.blueprintOptions.hideOptions === true || this.blueprintOptions.hideSettings === true) this.$el.classList.add('hideSettings')
            if (this.blueprintOptions.hideOptions === true || this.blueprintOptions.hideStatus === true) this.$el.classList.add('hideStatus')
          })
        }
      }
    }
  }

  function extendTableComponent (component) {
    return {
      extends: component,
      watch: {
        rows () {
          for (const key in this.rows) {
            const row = this.rows[key]

            if (!row.blueprintOptions) continue

            if (row.blueprintOptions.hideOptions === true || row.blueprintOptions.hideSettings === true) {
              this.rows[key].options = {}
            }

            if (row.blueprintOptions.hideOptions === true || row.blueprintOptions.hideStatus === true) {
              if ('flag' in this.rows[key]) delete this.rows[key].flag
            }
          }

          this.values = this.rows
        }
      }
    }
  }

  /**
   * Extend item / table to hide settings & status in sections
   * Extend site / page / user view to hide settings / status and language dropdown
   */
  panel.plugin('mullema/k3-panel-view-extended', {
    components: {
      'k-item': extendComponent('k-item'),
      'k-table': extendTableComponent('k-table'),
      'k-site-view': extendView('k-site-view'),
      'k-page-view': extendView('k-page-view'),
      'k-user-view': extendView('k-user-view')
    }
  })

}(panel))

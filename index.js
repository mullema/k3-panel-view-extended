(function (panel) {
    const views = {
        'PageView': {
            name: 'Page',
            watch: 'page',
            callbacks: [
                pagesToClasses(),
                addClass('singleLanguage'),
                addClass('hideSettings'),
                addClass('hideDraftOption'),
                addClass('hideStatus'),
                addClass('hideOptions')
            ]
        },
        'SiteView': {
            name: 'Site',
            watch: 'site',
            callbacks: [
                addClass('singleLanguage')
            ]
        },
        'UserView': {
            name: 'User',
            watch: 'user',
            callbacks: [
                addClass('singleLanguage')
            ]
        },
    };

    function pagesToClasses() {
        let panel_classes = null;
        return function (element, data) {
            if (!panel_classes) {
                panel_classes = [...element.classList]; // copy
            }
            else {
                element.className = ""; // remove all
                for (let name of panel_classes) {
                    element.classList.add(name);
                }
            }

            element.classList.add('level_' + data.parents.length);
            element.classList.add(data.slug);

            for (let parent of data.parents) {
                element.classList.add(parent.slug);
            }
        }
    }

    function addClass(name) {
        return function (element, data) {
            if (data.blueprint.options[name] === true) {
                element.classList.add(name);
            }
        }
    }

    function extension(component) {
        return {
            extends: component,
            props: {
                blueprint: Object
            },
            mounted: function () {
                if (this.blueprint) {
                    this.$nextTick(() => {
                        if (this.blueprint.hideOptions === true || this.blueprint.hideSettings === true) this.$el.classList.add('hideSettings');
                        if (this.blueprint.hideOptions === true || this.blueprint.hideStatus === true) this.$el.classList.add('hideStatus');
                    })
                }
            }
        }
    }

    const topbar = {
        extends: 'k-topbar',
        mounted: function () {
            Object.values(views).forEach(view => {
                this.$router.options.routes.find(route => route.name === view.name).component.watch[view.watch] = function () {
                    this.$nextTick(() => {
                        view.callbacks.forEach((callback) => {
                            callback(this.$el, this[view.watch]);
                        });
                    });
                }
            });
        }
    };

    /**
     * Add classes when k-topbar mounted
     * extend card and list to hide settings & status in sections
     */
    panel.plugin('mullema/k3-panel-view-extended', {
        components: {
            'k-topbar': topbar,
            'k-list-item': extension('k-list-item'),
            'k-card': extension('k-card'),
        }
    });

}(panel));
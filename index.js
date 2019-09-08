(function (panel) {
    const views = {
        'Page': {
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
        'Site': {
            name: 'Site',
            watch: 'site',
            callbacks: [
                addClass('singleLanguage')
            ]
        },
        'User': {
            name: 'User',
            watch: 'user',
            callbacks: [
                addClass('singleLanguage')
            ]
        }
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

    function addUser(app) {
        if (app.$store.state.user.current) {
            let name = app.$store.state.user.current.name || "";
            let role = app.$store.state.user.current.role.name || "";
            app.$el.classList.add(name, role);
        }
    }

    function extendView(name, app) {
        if (views[name]) {
            let view = views[name];

            app.$router.options.routes.find(route => route.name === view.name).component.options.watch[view.watch] = function (value) {
                if(!value.blueprint) return false;

                this.$nextTick(() => {
                    view.callbacks.forEach((callback) => {
                        callback(this.$el, value);
                    });
                });
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


    /**
     * Add classes when plugin created
     * extend card and list to hide settings & status in sections
     */
    panel.plugin('mullema/k3-panel-view-extended', {
        components: {
            'k-list-item': extension('k-list-item'),
            'k-card': extension('k-card'),
        },
        created(app) {
            app.$router.afterEach((to, from) => {
                addUser(app);
                extendView(to.name, app);
            });
        }
    });

}(panel));

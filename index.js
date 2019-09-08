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
            } else {
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

    function extendView(name, app) {
        if (views[name]) {
            let view = views[name];

            app.$router.options.routes.find(route => route.name === view.name).component.options.watch[view.watch] = function (value) {
                if (!value.blueprint) return false;

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

    function watchLanguage(app) {
        app.$store.watch(
            state => {
                if (state.languages.current) {
                    return state.languages.current;
                }
            },
            (newLanguage, oldLanguage) => {
                if (oldLanguage) app.$el.classList.remove(oldLanguage.code);
                app.$el.classList.add(newLanguage.code);
            }
        )
    }

    function watchUser(app) {
        app.$store.watch(
            state => {
                if (state.user.current) {
                    return state.user.current;
                }
            },
            (newUser, oldUser) => {
                if (oldUser) app.$el.classList.remove(oldUser.name, oldUser.role.name);
                // check to prevent logout exception
                if (newUser) app.$el.classList.add(newUser.name, newUser.role.name);
            }
        );

        // fix #1957
        app.$events.$on("user.changeName", () => {
            app.$store.dispatch("user/load");
        });

        app.$events.$on("user.changeRole", () => {
            app.$store.dispatch("user/load");
        });
    }

    /**
     * Extend card and list to hide settings & status in sections
     * Add classes after each route change
     * Watch store for change in user and selected language
     */
    panel.plugin('mullema/k3-panel-view-extended', {
        components: {
            'k-list-item': extension('k-list-item'),
            'k-card': extension('k-card'),
        },
        created(app) {
            app.$router.afterEach((to, from) => {
                extendView(to.name, app);
            });

            watchLanguage(app);
            watchUser(app);
        }
    });

}(panel));

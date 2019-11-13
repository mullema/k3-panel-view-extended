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

    const languageSelector = {
        extends: 'k-languages-dropdown',
        mounted() {
            if (this.$store.state.languages.all.length > 0) {
                this.$nextTick(() => {
                    this.$el.classList.add("languageSelector")
                })
            }
        }
    };

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
                if (oldUser) {
                    app.$el.classList.remove(
                        ...cleanSplitUsername(oldUser.name.toLowerCase()),
                        oldUser.role.name.toLowerCase()
                    );
                }
                // check to prevent logout exception
                // new users don't have a name in k3.3
                if (newUser && newUser.name !== "") {
                    app.$el.classList.add(
                        ...cleanSplitUsername(newUser.name.toLowerCase()),
                        newUser.role.name.toLowerCase()
                    );
                }
            }
        )
    }

    /**
     * Clean non-word characters from username and split into single words
     * @param username
     * @returns {string[]}
     */
    function cleanSplitUsername(username) {
        let cleaned_name = username.replace(/[^\w\s-]/gi, '');
        return cleaned_name.split(" ");
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
            'k-languages-dropdown': languageSelector
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

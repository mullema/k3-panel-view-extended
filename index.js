(function () {
    try {
        window.appReady = window.appReady || new class {
            constructor() {
                this.observers = [];
                this.wasBroadcasted = false;
                this.whenDefined(window.panel, 'app', 'broadcast');
            }

            subscribe(callback) {
                if (this.wasBroadcasted) callback(window.panel.app);    // if appReady was already broadcasted, callback directly
                this.observers.push(callback);
            }

            unsubscribe(callback) {
                this.observers = this.observers.filter((subscriber) => subscriber !== callback);
            }

            broadcast(data) {
                this.observers.forEach((subscriber) => subscriber(data));
                this.wasBroadcasted = true;
            }

            // https://fokkezb.nl/2016/04/14/how-to-wait-for-a-javascript-variable-to-be-defined/
            whenDefined(context, variable, callback) {
                if (context[variable]) {
                    this[callback](context[variable]);
                } else {
                    let self = this;
                    Object.defineProperty(context, variable, {
                        configurable: true,
                        enumerable: true,
                        writeable: true,
                        get: function () {
                            return this['_' + variable];
                        },
                        set: function (value) {
                            this['_' + variable] = value;
                            self[callback](context[variable]);
                        }
                    });
                }
            }
        };

        function viewExtensions(views) {
             // Resets the element to panel classes then adds Slug, all parent Slugs and the page level (starting at 0)
            let panel_classes = null;
            const pagesToClasses = function (classList, data) {
                if (!panel_classes) panel_classes = [...classList]; // copy

                for (let name of classList) {
                    if (!panel_classes.includes(name)) classList.remove(name);
                }

                classList.add('level_' + data.parents.length);
                classList.add(data.slug);

                for (let parent of data.parents) {
                    classList.add(parent.slug);
                }
            };

            views['PageView.page'].watchers.push({callback: pagesToClasses});


             // Single Language
            const singleLanguage = function (classList, data) {
                if (data.blueprint.options.singleLanguage === true) {
                    classList.add('singleLanguage');
                }
            };

            views['PageView.page'].watchers.push({callback: singleLanguage});
            views['SiteView.site'].watchers.push({callback: singleLanguage});
            views['UserView.user'].watchers.push({callback: singleLanguage});


            // Hide Settings
            const hideSettings = function (classList, data) {
                if (data.blueprint.options.hideSettings === true) {
                    classList.add('hideSettings');
                }
            };

            views['PageView.page'].watchers.push({callback: hideSettings});

            // Hide DraftOption
            const hideDraftOption = function (classList, data) {
                if (data.slug === "home" || data.slug === "error") {
                    classList.add('hideDraftOption');
                } else if (data.blueprint.options.hideDraftOption === true) {
                    classList.add('hideDraftOption');
                }
            };

            views['PageView.page'].watchers.push({callback: hideDraftOption});
        }


        window.appReady.subscribe((app) => {
            const views = {
                'PageView.page': {name: 'Page', watch: 'page', watchers: []},
                'SiteView.site': {name: 'Site', watch: 'site', watchers: []},
                'UserView.user': {name: 'User', watch: 'user', watchers: []},
            };

            viewExtensions(views);

            // Extend the panel views
            Object.values(views).forEach(view => {
                app.$router.options.routes.find(route => route.name === view.name).component.watch[view.watch] = function () {
                    this.$nextTick(() => {
                        view.watchers.forEach((watcher) => {
                            watcher.callback(this.$el.classList, this[view.watch]);
                        });
                    });
                }
            });
        });

    } catch (e) {
        console.error('Error in Plugin k3-panel-view-extended:', e);
    }
})();
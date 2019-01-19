# Kirby 3: Panel View Extended
This plugin adds css classes and features to the panel to quick fix some missing features and to make it much easyer to use own css rules.

To have these features in the core would be desirable.

Tested with *Kirby 3.0*

## Install
Download zip file and copy the folder into the ```site/plugins``` folder

## Features
### additional classes to k-page-view
The plugin automatically adds the *page slug*, all *parent pages slugs* and the current *pages tree depth* as classes to the `k-page-view` element. This allows the use of css selectors for specific pages.

panel/pages/projects
```html
<div class="k-view k-page-view projects level_0">
```

panel/pages/projects+usa
```html
<div class="k-view k-page-view projects usa level_1">
```

panel/pages/projects+usa+new-york
```html
<div class="k-view k-page-view projects usa new-york level_2">
```

### singleLanguage
(multilanguage setup) This blueprint option hides the language selector and forces all updates to be saved in the default language (see hook)

Available in `site`, `pages` and `user` blueprints.
```yaml
options:
  singleLanguage: true
```

### hideSettings
This blueprint option hides the settings dropdown. Can be desired e.g. if all options are disabled.

Available in `pages` blueprints.
```yaml
options:
  hideSettings: true
```

### hideDraftOption
This feature removes draft from the options in the status change list for pages with the slug `home` and `error`

The blueprint option does the same for the respective page. Available in `pages` blueprints. 
```yaml
options:
  hideDraftOption: true
```

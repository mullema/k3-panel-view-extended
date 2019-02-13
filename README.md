# Kirby 3: Panel View Extended
This plugin adds css classes and features to the panel views.

Always:
- Add more specific css classes to k-page-view

Blueprint options:
- Set a site/page/user to single language in a multi language setup and hide language drop down
- Hide the settings dropdown for pages in options top bar and in pages sections
- Hide the status button in options top bar for pages and in pages sections
- Hide the whole options top bar for pages and in pages sections
- Hide draft option in status change dialog

Tested with *Kirby 3.0.1*

## Installation
### Download

Download and copy this repository to `/site/plugins/k3-panel-view-extended`

### Git submodule

```
git submodule add https://github.com/mullema/k3-panel-view-extended.git site/plugins/k3-panel-view-extended
```

### Composer

```
composer require mullema/k3-panel-view-extended
```

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

Only updates from the Panel are intercepted. Pages created or updated via own backend code are not affected.

Available in `site`, `pages` and `user` blueprints.
```yaml
options:
  singleLanguage: true
```

### hideSettings
This blueprint option hides the settings dropdown in the top bar menu and in pages sections for the specific page. Can be desired e.g. if all options are disabled.

Available in `pages` blueprints.
```yaml
options:
  hideSettings: true
```

### hideStatus
This blueprint option hides the status flag in the top bar menu and in pages sections for the specific page.

Available in `pages` blueprints.
```yaml
options:
  hideStatus: true
```

### hideOptions
This blueprint option hides the whole options top bar for pages. 
It **includes all features** from singleLanguage, hideSettings and hideStatus.

Available in `pages` blueprints.
```yaml
options:
  hideOptions: true
```

### hideDraftOption
The blueprint option removes draft from the options in the status change dialog for the respective page. 

Available in `pages` blueprints. 
```yaml
options:
  hideDraftOption: true
```

## License
MIT

## Credits
- [Matthias Müller](https://github.com/mullema/)

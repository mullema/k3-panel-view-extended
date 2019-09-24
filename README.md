# Kirby 3: Panel View Extended
This plugin adds css classes and features to the panel views.

Always:
- Add more specific css classes to k-page-view
- Add username and role as css classes to k-panel
- In a multi language setup: Add current language code to k-panel

Blueprint options:
- In a multi language setup: Set a site/page/user to single language and hide the language drop down
- Hide the settings dropdown for pages in the options top bar and in pages sections
- Hide the status button in the options top bar for pages and in pages sections
- Hide the whole options top bar for pages and in pages sections
- Hide the draft option the in status change dialog


From Kirby 3.2.5 use v2.2.x
For Kirby 3.2.x use v2.1.x
For Kirby 3.0 - 3.1.x use [version 1.0.4](https://github.com/mullema/k3-panel-view-extended/releases/tag/v1.0.4)

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

### add username and role to k-panel
Username and role are added to the `k-panel` element. This allows custom panel design per username or role.
- Characters except `[A-Za-z0-9-_]` will be removed from the username
- Username and role are transformed to lowercase

```html
<div class="k-panel mullema admin" data-topbar="true">
```
Usernames like `Kirby Kirbyname` will be split in two classes:
```html
<div class="k-panel kirby kirbyname admin" data-topbar="true">
```

### add current language code to k-panel
The language code is added to the `k-panel` element. This allows custom panel design per language.
```html
<div class="k-panel de" data-topbar="true">
```
```html
<div class="k-panel en" data-topbar="true">
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

# Kirby 3: Panel View Extended
With Kirby 3.6 a lot of new CSS selectors were added to the Panel views. Therefore, the add css classes feature was removed from this plugin.
See the official Kirby website for [available css selectors](https://getkirby.com/docs/reference/panel/styling).

Features with Blueprint options:
- In a multi language setup: Set a site/page/user to single language and hide the language drop down
- Hide the settings dropdown for pages in the options top bar and in pages sections
- Hide the status button in the options top bar for pages and in pages sections
- Hide the whole options top bar for pages and in pages sections
~~- Hide the draft option the in status change dialog~~

This plugin is compatible with [rasteiner/k3-pagesdisplay-sections](https://github.com/rasteiner/k3-pagesdisplay-section)

From Kirby 3.6 use v4.0\
From Kirby 3.5 use v3.0\
From Kirby 3.2.5 use v2.2.x\
For Kirby 3.2.x use v2.1.x\
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
### ~~additional classes to k-page-view~~
No longer available

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

### ~~hideDraftOption~~
No longer available

## License
MIT

<?php

use Kirby\Cms\Section;

Kirby::plugin('mullema/k3-panel-view-extended', [
    'hooks' => [
        /**
         * Redirect changes to the default language
         */
        'route:before' => function ($route, $path, $method) {
            if ($method === 'PATCH' && $this->multilang() === true) {

                // api slug can be changed in config.php
                $api_slug = $this->option('api')['slug'] ?? 'api';
                $context = null;

                // Site
                if (strpos($path, $api_slug . '/site') !== false) {
                    $context = $this->site();
                }
                // Page
                else if (preg_match('/pages\/([^\/]*)/', $path, $matches) === 1) {
                    // api/pages/projects+usa+new-york/title => projects/usa/new-york
                    $page_path = str_replace("+", "/", $matches[1]);
                    $context = $this->site()->page($page_path);                   // is it a page
                    if (!$context) $context = $this->site()->draft($page_path);   // or a draft?
                }
                // User
                else if (preg_match('/users\/([^\/]*)/', $path, $matches) === 1) {
                    $context = $this->users()->find($matches[1]);
                }

                if ($context) {
                    $singleLanguage = $context->blueprint()->options()['singleLanguage'] ?? false;
                    $hideOptions = $context->blueprint()->options()['hideOptions'] ?? false;
                    if ($singleLanguage === true || $hideOptions === true) {
                        $_SERVER['HTTP_X_LANGUAGE'] = $this->languages()->default()->code();
                    }
                }
            }
        },

        /**
         * Extend rasteiner/k3-pagesdisplay-section if it was loaded
         */
        'system.loadPlugins:after' => function () {
            if(isset(Section::$types['pagesdisplay'])) {
                $pagesdisplaySection = require __DIR__ . '/src/pagesDisplaySection.php';

                kirby()->extend([
                    'sections' => [
                        'pagesdisplay' => $pagesdisplaySection
                    ],
                ], kirby()->plugin('mullema/k3-panel-view-extended'));
            }
        },
    ],
    'sections' => [
        'pages' => include(__DIR__ . '/src/pagesSection.php')
    ],
]);
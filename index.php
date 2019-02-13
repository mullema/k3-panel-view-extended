<?php
Kirby::plugin('mullema/k3-panel-view-extended', [
    'hooks' => [

        /**
         * Redirect changes to the default language
         */
        'route:before' => function ($route, $path, $method) {
            if ($method === 'PATCH') {

                // api slug can be changed in config.php
                $api_slug = $this->option('api')['slug'] ?? 'api';

                $context = null;

                // Site
                if (strpos($path, $api_slug . '/site') !== false) {
                    $context = $this->site();
                }
                // Page
                else if (strpos($path, $api_slug . '/pages') !== false) {
                    // api/pages/projects+usa+new-york => projects/usa/new-york
                    $page_path = str_replace($api_slug . '/pages/', '', str_replace('+', '/', $path));

                    $context = $this->site()->page($page_path);                   // is it a page
                    if (!$context) $context = $this->site()->draft($page_path);   // or a draft?
                }
                // User
                else if (strpos($path, $api_slug . '/user') !== false) {
                    $context = $this->user();
                }

                if ($context) {
                    $singleLanguage = $context->blueprint()->options()['singleLanguage'] ?? false;
                    $hideOptions = $context->blueprint()->options()['hideOptions'] ?? false;
                    if ($singleLanguage === true || $hideOptions === true) {
                        $_SERVER['HTTP_X_LANGUAGE'] = $this->languages()->default()->code();
                    }
                }
            }
        }
    ],

    'sections' => [
        'pages' => include(__DIR__ . '/sections/page.php')
    ]
]);
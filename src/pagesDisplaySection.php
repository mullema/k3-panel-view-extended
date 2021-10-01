<?php

use Kirby\Cms\Section;

$extension = require __DIR__ . '/extension.php';

$pagesDisplaySection = Section::$types['pagesdisplay'];

if (is_string($pagesDisplaySection)) {
    $pagesDisplaySection = include $pagesDisplaySection;
}

$pagesDisplaySection['computed']['data'] = $extension['computed']['data'];

return $pagesDisplaySection;
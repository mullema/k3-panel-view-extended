<?php

use Kirby\Cms\Section;

$extension = require __DIR__ . '/extension.php';

$pagesSection = Section::$types['pages'];

if (is_string($pagesSection)) {
    $pagesSection = include $pagesSection;
}

$pagesSection['computed']['data'] = $extension['computed']['data'];

return $pagesSection;
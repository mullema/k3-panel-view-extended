<?php

use Kirby\Cms\Section;

$extension = require __DIR__ . '/extension.php';

$pagesSection = Section::$types['pages'];
$pagesSection['computed']['data'] = $extension['computed']['data'];

return $pagesSection;
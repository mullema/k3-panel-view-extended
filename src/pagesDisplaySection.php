<?php

use Kirby\Cms\Section;

$extension = require __DIR__ . '/extension.php';

$pagesDisplaySection = Section::$types['pagesdisplay'];
$pagesDisplaySection['computed']['data'] = $extension['computed']['data'];

return $pagesDisplaySection;
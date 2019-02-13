<?php

use Kirby\Cms\Section;

$options = Section::$types['pages'];

/** Extend pages section **/
$options['computed']['data'] = function () {
    $data = [];
    if ($this->layout === 'list') {
        $thumb = [
            'width'  => 100,
            'height' => 100
        ];
    } else {
        $thumb = [
            'width'  => 400,
            'height' => 400
        ];
    }
    foreach ($this->pages as $item) {
        $permissions = $item->permissions();
        $blueprint   = $item->blueprint();
        $image       = $item->panelImage($this->image, $thumb);
        $data[] = [
            'id'          => $item->id(),
            'dragText'    => $item->dragText($this->dragTextType),
            'text'        => $item->toString($this->text),
            'info'        => $item->toString($this->info ?? false),
            'parent'      => $item->parentId(),
            'icon'        => $item->panelIcon($image),
            'image'       => $image,
            'link'        => $item->panelUrl(true),
            'status'      => $item->status(),
            'permissions' => [
                'sort'         => $permissions->can('sort'),
                'changeStatus' => $permissions->can('changeStatus')
            ],
            'blueprint'   => $blueprint->options()
        ];
    }
    return $data;
};

return $options;
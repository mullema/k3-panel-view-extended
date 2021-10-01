<?php

use Kirby\Toolkit\Escape;

return [
  'computed' => [
      // https://github.com/getkirby/kirby/blob/master/config/sections/pages.php
      'data' => function () {

          $data = [];

          foreach ($this->pages as $item) {
              $blueprint   = $item->blueprint(); // panel-view-extended
              $permissions = $item->permissions();
              $image       = $item->panelImage($this->image);

              // escape the default text
              // TODO: no longer needed in 3.6
              $text = $item->toString($this->text);
              if ($this->text === '{{ page.title }}') {
                  $text = Escape::html($text);
              }

              $data[] = [
                  'id'          => $item->id(),
                  'dragText'    => $item->dragText(),
                  'text'        => $text,
                  'info'        => $item->toString($this->info ?? false),
                  'parent'      => $item->parentId(),
                  'icon'        => $item->panelIcon($image),
                  'image'       => $image,
                  'link'        => $item->panelUrl(true),
                  'status'      => $item->status(),
                  'permissions' => [
                      'sort'         => $permissions->can('sort'),
                      'changeSlug'   => $permissions->can('changeSlug'),
                      'changeStatus' => $permissions->can('changeStatus'),
                      'changeTitle'  => $permissions->can('changeTitle')
                  ],
                  'blueprintOptions'   => $blueprint->options() // panel-view-extended
              ];
          }
          return $data;
      }
  ]
];
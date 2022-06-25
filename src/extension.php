<?php

use Kirby\Toolkit\Escape;

return [
  'computed' => [
      // https://github.com/getkirby/kirby/blob/master/config/sections/pages.php
      'data' => function () {
          $data = [];

          foreach ($this->pages as $page) {
              $blueprint   = $page->blueprint(); // panel-view-extended
              $panel       = $page->panel();
              $permissions = $page->permissions();

              $item = [
                  'dragText'    => $panel->dragText(),
                  'id'          => $page->id(),
                  'image'       => $panel->image(
                      $this->image,
                      $this->layout === 'table' ? 'list' : $this->layout
                  ),
                  'info'        => $page->toSafeString($this->info ?? false),
                  'link'        => $panel->url(true),
                  'parent'      => $page->parentId(),
                  'permissions' => [
                      'sort'         => $permissions->can('sort'),
                      'changeSlug'   => $permissions->can('changeSlug'),
                      'changeStatus' => $permissions->can('changeStatus'),
                      'changeTitle'  => $permissions->can('changeTitle'),
                  ],
                  'status'      => $page->status(),
                  'template'    => $page->intendedTemplate()->name(),
                  'text'        => $page->toSafeString($this->text),
                  'blueprintOptions'   => $blueprint->options() // panel-view-extended
              ];

              if ($this->layout === 'table') {
                  $item = $this->columnsValues($item, $page);
              }

              $data[] = $item;
          }

          return $data;


      }
  ]
];
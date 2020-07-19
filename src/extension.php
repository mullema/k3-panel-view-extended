<?php

return [
  'computed' => [
      'data' => function () {
          $data = [];
          foreach ($this->pages as $item) {
              $permissions = $item->permissions();
              $blueprint   = $item->blueprint();
              $image       = $item->panelImage($this->image);
              $data[] = [
                  'id'          => $item->id(),
                  'dragText'    => $item->dragText(),
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
      }
  ]
];
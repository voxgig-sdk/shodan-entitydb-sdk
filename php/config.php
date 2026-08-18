<?php
declare(strict_types=1);

// ShodanEntitydb SDK configuration

class ShodanEntitydbConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ShodanEntitydb",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://entitydb.shodan.io",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "entity" => [],
                    "entity_full_info" => [],
                    "health_check" => [],
                    "last_update" => [],
                ],
            ],
            "entity" => [
        'entity' => [
          'fields' => [
            [
              'name' => 'cik',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'entity',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'entity_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'executives',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 2,
                'count' => 3,
                'depth' => 3,
              ],
            ],
            [
              'name' => 'finance_data',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 2,
                'count' => 13,
                'depth' => 3,
              ],
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'tickers',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'entity',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/entities',
                  'parts' => [
                    'api',
                    'entities',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.entities`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 3,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/entities/{id}',
                  'parts' => [
                    'api',
                    'entities',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.entity`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'entity_full_info' => [
          'fields' => [
            [
              'name' => 'entity',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'executives',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 2,
                'count' => 3,
                'depth' => 3,
              ],
            ],
            [
              'name' => 'finance_data',
              'req' => true,
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 2,
                'count' => 13,
                'depth' => 3,
              ],
            ],
          ],
          'name' => 'entity_full_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'GOOGL',
                        'kind' => 'param',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/entities/symbol/{symbol}',
                  'parts' => [
                    'api',
                    'entities',
                    'symbol',
                    '{symbol}',
                  ],
                  'select' => [
                    'exist' => [
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'symbol',
              ],
            ],
          ],
        ],
        'health_check' => [
          'fields' => [],
          'name' => 'health_check',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/health_check',
                  'parts' => [
                    'health_check',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'last_update' => [
          'fields' => [
            [
              'name' => 'last_updated',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'last_update',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/last_updated',
                  'parts' => [
                    'api',
                    'last_updated',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ShodanEntitydbFeatures::make_feature($name);
    }
}

<?php
declare(strict_types=1);

// ShodanEntitydb SDK utility: feature_hook

class ShodanEntitydbFeatureHook
{
    public static function call(ShodanEntitydbContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}

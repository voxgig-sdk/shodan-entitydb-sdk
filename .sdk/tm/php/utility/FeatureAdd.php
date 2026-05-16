<?php
declare(strict_types=1);

// ShodanEntitydb SDK utility: feature_add

class ShodanEntitydbFeatureAdd
{
    public static function call(ShodanEntitydbContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

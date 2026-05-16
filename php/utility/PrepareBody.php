<?php
declare(strict_types=1);

// ShodanEntitydb SDK utility: prepare_body

class ShodanEntitydbPrepareBody
{
    public static function call(ShodanEntitydbContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

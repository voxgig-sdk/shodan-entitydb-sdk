<?php
declare(strict_types=1);

// ShodanEntitydb SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ShodanEntitydbMakeContext
{
    public static function call(array $ctxmap, ?ShodanEntitydbContext $basectx): ShodanEntitydbContext
    {
        return new ShodanEntitydbContext($ctxmap, $basectx);
    }
}

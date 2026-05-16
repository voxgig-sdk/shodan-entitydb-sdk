<?php
declare(strict_types=1);

// ShodanEntitydb SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ShodanEntitydbFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ShodanEntitydbBaseFeature();
            case "test":
                return new ShodanEntitydbTestFeature();
            default:
                return new ShodanEntitydbBaseFeature();
        }
    }
}

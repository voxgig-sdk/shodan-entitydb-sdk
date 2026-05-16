<?php
declare(strict_types=1);

// ShodanEntitydb SDK exists test

require_once __DIR__ . '/../shodanentitydb_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ShodanEntitydbSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}

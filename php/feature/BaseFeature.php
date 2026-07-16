<?php
declare(strict_types=1);

// ShodanEntitydb SDK base feature

class ShodanEntitydbBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ShodanEntitydbContext $ctx, array $options): void {}
    public function PostConstruct(ShodanEntitydbContext $ctx): void {}
    public function PostConstructEntity(ShodanEntitydbContext $ctx): void {}
    public function SetData(ShodanEntitydbContext $ctx): void {}
    public function GetData(ShodanEntitydbContext $ctx): void {}
    public function GetMatch(ShodanEntitydbContext $ctx): void {}
    public function SetMatch(ShodanEntitydbContext $ctx): void {}
    public function PrePoint(ShodanEntitydbContext $ctx): void {}
    public function PreSpec(ShodanEntitydbContext $ctx): void {}
    public function PreRequest(ShodanEntitydbContext $ctx): void {}
    public function PreResponse(ShodanEntitydbContext $ctx): void {}
    public function PreResult(ShodanEntitydbContext $ctx): void {}
    public function PreDone(ShodanEntitydbContext $ctx): void {}
    public function PreUnexpected(ShodanEntitydbContext $ctx): void {}
}

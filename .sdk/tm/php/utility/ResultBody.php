<?php
declare(strict_types=1);

// ShodanEntitydb SDK utility: result_body

class ShodanEntitydbResultBody
{
    public static function call(ShodanEntitydbContext $ctx): ?ShodanEntitydbResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

<?php
declare(strict_types=1);

// ShodanEntitydb SDK utility: result_headers

class ShodanEntitydbResultHeaders
{
    public static function call(ShodanEntitydbContext $ctx): ?ShodanEntitydbResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

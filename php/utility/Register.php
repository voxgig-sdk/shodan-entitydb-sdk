<?php
declare(strict_types=1);

// ShodanEntitydb SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ShodanEntitydbUtility::setRegistrar(function (ShodanEntitydbUtility $u): void {
    $u->clean = [ShodanEntitydbClean::class, 'call'];
    $u->done = [ShodanEntitydbDone::class, 'call'];
    $u->make_error = [ShodanEntitydbMakeError::class, 'call'];
    $u->feature_add = [ShodanEntitydbFeatureAdd::class, 'call'];
    $u->feature_hook = [ShodanEntitydbFeatureHook::class, 'call'];
    $u->feature_init = [ShodanEntitydbFeatureInit::class, 'call'];
    $u->fetcher = [ShodanEntitydbFetcher::class, 'call'];
    $u->make_fetch_def = [ShodanEntitydbMakeFetchDef::class, 'call'];
    $u->make_context = [ShodanEntitydbMakeContext::class, 'call'];
    $u->make_options = [ShodanEntitydbMakeOptions::class, 'call'];
    $u->make_request = [ShodanEntitydbMakeRequest::class, 'call'];
    $u->make_response = [ShodanEntitydbMakeResponse::class, 'call'];
    $u->make_result = [ShodanEntitydbMakeResult::class, 'call'];
    $u->make_point = [ShodanEntitydbMakePoint::class, 'call'];
    $u->make_spec = [ShodanEntitydbMakeSpec::class, 'call'];
    $u->make_url = [ShodanEntitydbMakeUrl::class, 'call'];
    $u->param = [ShodanEntitydbParam::class, 'call'];
    $u->prepare_auth = [ShodanEntitydbPrepareAuth::class, 'call'];
    $u->prepare_body = [ShodanEntitydbPrepareBody::class, 'call'];
    $u->prepare_headers = [ShodanEntitydbPrepareHeaders::class, 'call'];
    $u->prepare_method = [ShodanEntitydbPrepareMethod::class, 'call'];
    $u->prepare_params = [ShodanEntitydbPrepareParams::class, 'call'];
    $u->prepare_path = [ShodanEntitydbPreparePath::class, 'call'];
    $u->prepare_query = [ShodanEntitydbPrepareQuery::class, 'call'];
    $u->result_basic = [ShodanEntitydbResultBasic::class, 'call'];
    $u->result_body = [ShodanEntitydbResultBody::class, 'call'];
    $u->result_headers = [ShodanEntitydbResultHeaders::class, 'call'];
    $u->transform_request = [ShodanEntitydbTransformRequest::class, 'call'];
    $u->transform_response = [ShodanEntitydbTransformResponse::class, 'call'];
});

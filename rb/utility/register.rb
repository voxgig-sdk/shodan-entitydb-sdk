# ShodanEntitydb SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ShodanEntitydbUtility.registrar = ->(u) {
  u.clean = ShodanEntitydbUtilities::Clean
  u.done = ShodanEntitydbUtilities::Done
  u.make_error = ShodanEntitydbUtilities::MakeError
  u.feature_add = ShodanEntitydbUtilities::FeatureAdd
  u.feature_hook = ShodanEntitydbUtilities::FeatureHook
  u.feature_init = ShodanEntitydbUtilities::FeatureInit
  u.fetcher = ShodanEntitydbUtilities::Fetcher
  u.make_fetch_def = ShodanEntitydbUtilities::MakeFetchDef
  u.make_context = ShodanEntitydbUtilities::MakeContext
  u.make_options = ShodanEntitydbUtilities::MakeOptions
  u.make_request = ShodanEntitydbUtilities::MakeRequest
  u.make_response = ShodanEntitydbUtilities::MakeResponse
  u.make_result = ShodanEntitydbUtilities::MakeResult
  u.make_point = ShodanEntitydbUtilities::MakePoint
  u.make_spec = ShodanEntitydbUtilities::MakeSpec
  u.make_url = ShodanEntitydbUtilities::MakeUrl
  u.param = ShodanEntitydbUtilities::Param
  u.prepare_auth = ShodanEntitydbUtilities::PrepareAuth
  u.prepare_body = ShodanEntitydbUtilities::PrepareBody
  u.prepare_headers = ShodanEntitydbUtilities::PrepareHeaders
  u.prepare_method = ShodanEntitydbUtilities::PrepareMethod
  u.prepare_params = ShodanEntitydbUtilities::PrepareParams
  u.prepare_path = ShodanEntitydbUtilities::PreparePath
  u.prepare_query = ShodanEntitydbUtilities::PrepareQuery
  u.result_basic = ShodanEntitydbUtilities::ResultBasic
  u.result_body = ShodanEntitydbUtilities::ResultBody
  u.result_headers = ShodanEntitydbUtilities::ResultHeaders
  u.transform_request = ShodanEntitydbUtilities::TransformRequest
  u.transform_response = ShodanEntitydbUtilities::TransformResponse
}

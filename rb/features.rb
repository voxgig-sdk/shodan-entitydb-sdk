# ShodanEntitydb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ShodanEntitydbFeatures
  def self.make_feature(name)
    case name
    when "base"
      ShodanEntitydbBaseFeature.new
    when "ratelimit"
      ShodanEntitydbRatelimitFeature.new
    when "retry"
      ShodanEntitydbRetryFeature.new
    when "test"
      ShodanEntitydbTestFeature.new
    when "timeout"
      ShodanEntitydbTimeoutFeature.new
    else
      ShodanEntitydbBaseFeature.new
    end
  end
end

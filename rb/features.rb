# ShodanEntitydb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ShodanEntitydbFeatures
  def self.make_feature(name)
    case name
    when "base"
      ShodanEntitydbBaseFeature.new
    when "test"
      ShodanEntitydbTestFeature.new
    else
      ShodanEntitydbBaseFeature.new
    end
  end
end

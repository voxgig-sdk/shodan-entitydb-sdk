# ShodanEntitydb SDK exists test

require "minitest/autorun"
require_relative "../ShodanEntitydb_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ShodanEntitydbSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end

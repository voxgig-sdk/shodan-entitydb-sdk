# ShodanEntitydb SDK utility: make_context
require_relative '../core/context'
module ShodanEntitydbUtilities
  MakeContext = ->(ctxmap, basectx) {
    ShodanEntitydbContext.new(ctxmap, basectx)
  }
end

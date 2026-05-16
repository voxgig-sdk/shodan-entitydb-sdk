-- ShodanEntitydb SDK error

local ShodanEntitydbError = {}
ShodanEntitydbError.__index = ShodanEntitydbError


function ShodanEntitydbError.new(code, msg, ctx)
  local self = setmetatable({}, ShodanEntitydbError)
  self.is_sdk_error = true
  self.sdk = "ShodanEntitydb"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ShodanEntitydbError:error()
  return self.msg
end


function ShodanEntitydbError:__tostring()
  return self.msg
end


return ShodanEntitydbError

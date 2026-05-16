package = "voxgig-sdk-shodan-entitydb"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/shodan-entitydb-sdk.git"
}
description = {
  summary = "ShodanEntitydb SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["shodan-entitydb_sdk"] = "shodan-entitydb_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}

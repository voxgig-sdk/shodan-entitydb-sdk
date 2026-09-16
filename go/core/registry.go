package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewEntityEntityFunc func(client *ShodanEntitydbSDK, entopts map[string]any) ShodanEntitydbEntity

var NewEntityFullInfoEntityFunc func(client *ShodanEntitydbSDK, entopts map[string]any) ShodanEntitydbEntity

var NewHealthCheckEntityFunc func(client *ShodanEntitydbSDK, entopts map[string]any) ShodanEntitydbEntity

var NewLastUpdateEntityFunc func(client *ShodanEntitydbSDK, entopts map[string]any) ShodanEntitydbEntity


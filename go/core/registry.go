package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEntityEntityFunc func(client *ShodanEntitydbSDK, entopts map[string]any) ShodanEntitydbEntity

var NewEntityFullInfoEntityFunc func(client *ShodanEntitydbSDK, entopts map[string]any) ShodanEntitydbEntity

var NewHealthCheckEntityFunc func(client *ShodanEntitydbSDK, entopts map[string]any) ShodanEntitydbEntity

var NewLastUpdateEntityFunc func(client *ShodanEntitydbSDK, entopts map[string]any) ShodanEntitydbEntity


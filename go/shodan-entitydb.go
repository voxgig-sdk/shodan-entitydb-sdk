package voxgigshodanentitydbsdk

import (
	"github.com/voxgig-sdk/shodan-entitydb-sdk/go/core"
	"github.com/voxgig-sdk/shodan-entitydb-sdk/go/entity"
	"github.com/voxgig-sdk/shodan-entitydb-sdk/go/feature"
	_ "github.com/voxgig-sdk/shodan-entitydb-sdk/go/utility"
)

// Type aliases preserve external API.
type ShodanEntitydbSDK = core.ShodanEntitydbSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ShodanEntitydbEntity = core.ShodanEntitydbEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ShodanEntitydbError = core.ShodanEntitydbError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEntityEntityFunc = func(client *core.ShodanEntitydbSDK, entopts map[string]any) core.ShodanEntitydbEntity {
		return entity.NewEntityEntity(client, entopts)
	}
	core.NewEntityFullInfoEntityFunc = func(client *core.ShodanEntitydbSDK, entopts map[string]any) core.ShodanEntitydbEntity {
		return entity.NewEntityFullInfoEntity(client, entopts)
	}
	core.NewHealthCheckEntityFunc = func(client *core.ShodanEntitydbSDK, entopts map[string]any) core.ShodanEntitydbEntity {
		return entity.NewHealthCheckEntity(client, entopts)
	}
	core.NewLastUpdateEntityFunc = func(client *core.ShodanEntitydbSDK, entopts map[string]any) core.ShodanEntitydbEntity {
		return entity.NewLastUpdateEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewShodanEntitydbSDK = core.NewShodanEntitydbSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature

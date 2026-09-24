

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ShodanEntitydbSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('LightEntityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SHODAN_ENTITYDB_TEST_LIVE=TRUE.
  afterEach(liveDelay('SHODAN_ENTITYDB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ShodanEntitydbSDK.test()
    const ent = testsdk.LightEntity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SHODAN_ENTITYDB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'light_entity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cik":{"a":true,"h":"Cik","n":"cik","r":true,"t":"`$INTEGER`","key$":"cik","index$":0},"entity_name":{"a":true,"h":"Entity Name","n":"entity_name","r":true,"t":"`$STRING`","key$":"entity_name","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":2},"tickers":{"a":true,"h":"Tickers","n":"tickers","r":true,"t":"`$ARRAY`","key$":"tickers","index$":3}},"id":{"field":"id","name":"id"},"name":"light_entity","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/entities","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/entities","q":{},"r":{},"s":[{"lit":"api"},{"lit":"entities"}],"t":{"req":"`reqdata`","res":"`body.entities`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"light_entity","name__orig":"light_entity","Name":"LightEntity","name_":"light_entity","name-":"light-entity","NAME":"LIGHT_ENTITY","index$":4}, {"active":true,"entity":"light_entity","key$":"BasicLightEntityFlow","kind":"basic","name":"BasicLightEntityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"light_entity_ref01"}}],"index$":0}]}, 'LightEntity', {"GET /api/entities":{"protocol":"http","operationId":"get_all_entities_api_entities_get","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"properties":{"entities":{"items":{"properties":{"cik":{"title":"Cik","type":"integer","key$":"cik"},"entity_name":{"title":"Entity Name","type":"string","key$":"entity_name"},"id":{"title":"Id","type":"integer","key$":"id"},"tickers":{"items":{"type":"string"},"title":"Tickers","type":"array","key$":"tickers"}},"required":["id","cik","tickers","entity_name"],"title":"LightEntity","type":"object","x-ref":"#/components/schemas/LightEntity","index$":0},"key$":"entities","title":"Entities","type":"array"}},"type":"object","required":["entities"],"title":"EntitiesResponse","x-ref":"#/components/schemas/EntitiesResponse"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let light_entity_ref01_data = Object.values(setup.data.existing.light_entity)[0] as any

    // LIST
    const light_entity_ref01_ent = client.LightEntity()
    const light_entity_ref01_match: any = {}

    const light_entity_ref01_list = (await light_entity_ref01_ent.list(light_entity_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/light_entity/LightEntityTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ShodanEntitydbSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['light_entity01','light_entity02','light_entity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SHODAN_ENTITYDB_TEST_LIGHT_ENTITY_ENTID': idmap,
    'SHODAN_ENTITYDB_TEST_LIVE': 'FALSE',
    'SHODAN_ENTITYDB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SHODAN_ENTITYDB_TEST_LIGHT_ENTITY_ENTID']

  const live = 'TRUE' === env.SHODAN_ENTITYDB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SHODAN_ENTITYDB_TEST_LIGHT_ENTITY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ShodanEntitydbSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SHODAN_ENTITYDB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  

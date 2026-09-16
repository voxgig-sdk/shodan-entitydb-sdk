

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('LastUpdateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SHODAN_ENTITYDB_TEST_LIVE=TRUE.
  afterEach(liveDelay('SHODAN_ENTITYDB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ShodanEntitydbSDK.test()
    const ent = testsdk.LastUpdate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SHODAN_ENTITYDB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'last_update.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"last_updated","req":true,"type":"`$STRING`","index$":0}],"name":"last_update","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/last_updated","json":"{\"operationId\":\"get_latest_database_built_api_last_updated_get\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"last_updated\":{\"title\":\"Last Updated\",\"type\":\"string\"}},\"required\":[\"last_updated\"],\"title\":\"LastUpdateResponse\",\"type\":\"object\"}}},\"description\":\"Successful Response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/last_updated","segments":[{"lit":"api"},{"lit":"last_updated"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"last_update","name__orig":"last_update","Name":"LastUpdate","name_":"last_update","name-":"last-update","NAME":"LAST_UPDATE","index$":3}, {"active":true,"entity":"last_update","key$":"BasicLastUpdateFlow","kind":"basic","name":"BasicLastUpdateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"last_update_ref01","srcdatavar":"last_update_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-last_update_ref01"}}],"index$":0}]}, 'LastUpdate')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let last_update_ref01_data = Object.values(setup.data.existing.last_update)[0] as any

    // LOAD
    const last_update_ref01_ent = client.LastUpdate()
    const last_update_ref01_match_dt0: any = {}
    const last_update_ref01_data_dt0 = (await last_update_ref01_ent.load(last_update_ref01_match_dt0)).data()
    assert(null != last_update_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/last_update/LastUpdateTestData.json')

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
    ['last_update01','last_update02','last_update03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SHODAN_ENTITYDB_TEST_LAST_UPDATE_ENTID': idmap,
    'SHODAN_ENTITYDB_TEST_LIVE': 'FALSE',
    'SHODAN_ENTITYDB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SHODAN_ENTITYDB_TEST_LAST_UPDATE_ENTID']

  const live = 'TRUE' === env.SHODAN_ENTITYDB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SHODAN_ENTITYDB_TEST_LAST_UPDATE_ENTID']
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
  

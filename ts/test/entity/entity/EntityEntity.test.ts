

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


describe('EntityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SHODAN_ENTITYDB_TEST_LIVE=TRUE.
  afterEach(liveDelay('SHODAN_ENTITYDB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ShodanEntitydbSDK.test()
    const ent = testsdk.Entity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SHODAN_ENTITYDB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'entity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"entity":{"a":true,"h":"Entity","n":"entity","r":true,"t":"`$OBJECT`","key$":"entity","index$":0},"executives":{"a":true,"h":"Executives","n":"executives","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":3,"depth":3},"key$":"executives","index$":1},"finance_data":{"a":true,"h":"Finance Data","n":"finance_data","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":13,"depth":3},"key$":"finance_data","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3}},"id":{"field":"id","name":"id"},"name":"entity","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/entities/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/entities/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"entities"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.entity`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"entity","name__orig":"entity","Name":"Entity","name_":"entity","name-":"entity","NAME":"ENTITY","index$":0}, {"active":true,"entity":"entity","key$":"BasicEntityFlow","kind":"basic","name":"BasicEntityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"entity_ref01","srcdatavar":"entity_ref01_data","suffix":"_dt0"},"m":{"id":"entity01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-entity_ref01"}}],"index$":0}]}, 'Entity', {"GET /api/entities/{id}":{"protocol":"http","operationId":"Get_entity_information_in_JSON_format_api_entities__id__get","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"properties":{"finance_data":{"items":{"properties":{"report_year":{"type":"integer","title":"Report Year"},"report_at":{"type":"string","format":"date","title":"Report At"},"revenue":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Revenue"},"cost_of_sale":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Cost Of Sale"},"gross_profit":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Gross Profit"},"net_income":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Net Income"},"long_term_debt_current":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Long Term Debt Current"},"long_term_debt_non_current":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Long Term Debt Non Current"},"depletion_and_amortization":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Depletion And Amortization"},"operation_income_loss":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Operation Income Loss"},"ebitda":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Ebitda"},"earning_per_share":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Earning Per Share"},"earning_per_share_diluted":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Earning Per Share Diluted"},"share_outstanding":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Share Outstanding"},"basic_share_outstanding":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Basic Share Outstanding"},"filing_url":{"type":"string","title":"Filing Url"}},"type":"object","required":["report_year","report_at","filing_url"],"title":"Finance","x-ref":"#/components/schemas/Finance"},"type":"array","title":"Finance Data","key$":"finance_data"},"entity":{"properties":{"id":{"type":"integer","title":"Id"},"cik":{"type":"integer","title":"Cik"},"tickers":{"items":{"type":"string"},"type":"array","title":"Tickers"},"entity_name":{"type":"string","title":"Entity Name"},"hostname":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Hostname"},"entity_type":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Entity Type"},"sic":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Sic"},"sic_description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Sic Description"},"exchanges":{"items":{"type":"string"},"type":"array","title":"Exchanges"},"ein":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Ein"},"fiscal_year_end":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Fiscal Year End"},"mail_address":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Mail Address"},"business_address":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Business Address"},"phone":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Phone"},"updated_at":{"type":"string","title":"Updated At"},"asn_list":{"items":{"type":"integer"},"type":"array","title":"Asn List","default":[]},"asns":{"items":{"properties":{"asn":{"type":"integer","title":"Asn"},"as_name":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"As Name"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Description"},"status":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Status"},"organization":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Organization"},"maintained_by":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Maintained By"},"notify":{"items":{"type":"string"},"type":"array","title":"Notify","default":[]},"country":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Country"},"source":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Source"},"route_views":{"items":{"properties":{"asn":{"type":"integer","title":"Asn"},"prefix":{"type":"string","title":"Prefix"},"as_set":{"items":{"type":"integer"},"type":"array","title":"As Set","default":[]}},"type":"object","required":["asn","prefix"],"title":"RouteView","x-ref":"#/components/schemas/RouteView"},"type":"array","title":"Route Views","default":[]}},"type":"object","required":["asn"],"title":"ASN","x-ref":"#/components/schemas/ASN"},"type":"array","title":"Asns","default":[]},"extra_info":{"allOf":[{"properties":{"alias":{"items":{"type":"string"},"type":"array","title":"Alias","default":[]},"domain":{"items":{"type":"string"},"type":"array","title":"Domain","default":[]}},"type":"object","title":"ExtraInfo","x-ref":"#/components/schemas/ExtraInfo"}],"default":{"alias":[],"domain":[]}}},"type":"object","required":["id","cik","tickers","entity_name","exchanges","updated_at"],"title":"Entity","x-ref":"#/components/schemas/Entity","key$":"entity"},"executives":{"items":{"properties":{"cik":{"type":"integer","title":"Cik"},"name":{"type":"string","title":"Name"},"role":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Role"},"year":{"type":"integer","title":"Year"},"salary":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Salary"},"stock_awards":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Stock Awards"},"total":{"anyOf":[{"type":"number"},{"type":"string"},{"type":"null"}],"title":"Total"},"additional_data":{"type":"object","title":"Additional Data","default":{}}},"type":"object","required":["cik","name","year"],"title":"Executive","x-ref":"#/components/schemas/Executive"},"type":"array","title":"Executives","key$":"executives"}},"type":"object","required":["finance_data","entity","executives"],"title":"EntityFullInfoResponse","x-ref":"#/components/schemas/EntityFullInfoResponse","index$":0}}}},"404":{"content":{"application/json":{"schema":{"properties":{"detail":{"type":"string","title":"Detail"}},"type":"object","required":["detail"],"title":"HTTPError","x-ref":"#/components/schemas/HTTPError"}}},"description":"Not Found"},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"properties":{"detail":{"items":{"properties":{"loc":{"items":{"anyOf":[{"type":"string"},{"type":"integer"}]},"type":"array","title":"Location"},"msg":{"type":"string","title":"Message"},"type":{"type":"string","title":"Error Type"}},"type":"object","required":["loc","msg","type"],"title":"ValidationError","x-ref":"#/components/schemas/ValidationError"},"type":"array","title":"Detail"}},"type":"object","title":"HTTPValidationError","x-ref":"#/components/schemas/HTTPValidationError"}}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","title":"Id"},"example":3,"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let entity_ref01_data = Object.values(setup.data.existing.entity)[0] as any

    // LOAD
    const entity_ref01_ent = client.Entity()
    const entity_ref01_match_dt0: any = {}
    entity_ref01_match_dt0.id = entity_ref01_data.id
    const entity_ref01_data_dt0 = (await entity_ref01_ent.load(entity_ref01_match_dt0)).data()
    assert(entity_ref01_data_dt0.id === entity_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/entity/EntityTestData.json')

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
    ['entity01','entity02','entity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SHODAN_ENTITYDB_TEST_ENTITY_ENTID': idmap,
    'SHODAN_ENTITYDB_TEST_LIVE': 'FALSE',
    'SHODAN_ENTITYDB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SHODAN_ENTITYDB_TEST_ENTITY_ENTID']

  const live = 'TRUE' === env.SHODAN_ENTITYDB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SHODAN_ENTITYDB_TEST_ENTITY_ENTID']
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
  

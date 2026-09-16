"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EntityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SHODAN_ENTITYDB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SHODAN_ENTITYDB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ShodanEntitydbSDK.test();
        const ent = testsdk.Entity();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SHODAN_ENTITYDB_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'entity.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "cik", "req": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "entity", "req": true, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "entity_name", "req": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "executives", "req": true, "type": "`$ARRAY`", "union": { "branches": 2, "count": 3, "depth": 3 }, "index$": 3 }, { "active": true, "name": "finance_data", "req": true, "type": "`$ARRAY`", "union": { "branches": 2, "count": 13, "depth": 3 }, "index$": 4 }, { "active": true, "name": "id", "req": true, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "tickers", "req": true, "type": "`$ARRAY`", "index$": 6 }], "id": { "field": "id", "name": "id" }, "name": "entity", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /api/entities", "json": "{\"operationId\":\"get_all_entities_api_entities_get\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"entities\":{\"items\":{\"properties\":{\"cik\":{\"title\":\"Cik\",\"type\":\"integer\"},\"entity_name\":{\"title\":\"Entity Name\",\"type\":\"string\"},\"id\":{\"title\":\"Id\",\"type\":\"integer\"},\"tickers\":{\"items\":{\"type\":\"string\"},\"title\":\"Tickers\",\"type\":\"array\"}},\"required\":[\"id\",\"cik\",\"tickers\",\"entity_name\"],\"title\":\"LightEntity\",\"type\":\"object\"},\"title\":\"Entities\",\"type\":\"array\"}},\"required\":[\"entities\"],\"title\":\"EntitiesResponse\",\"type\":\"object\"}}},\"description\":\"Successful Response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/entities", "segments": [{ "lit": "api" }, { "lit": "entities" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.entities`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 3, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /api/entities/{id}", "json": "{\"operationId\":\"Get_entity_information_in_JSON_format_api_entities__id__get\",\"parameters\":[{\"example\":3,\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"title\":\"Id\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"entity\":{\"properties\":{\"asn_list\":{\"default\":[],\"items\":{\"type\":\"integer\"},\"title\":\"Asn List\",\"type\":\"array\"},\"asns\":{\"default\":[],\"items\":{\"properties\":{\"as_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"As Name\"},\"asn\":{\"title\":\"Asn\",\"type\":\"integer\"},\"country\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Country\"},\"description\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Description\"},\"maintained_by\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Maintained By\"},\"notify\":{\"default\":[],\"items\":{\"type\":\"string\"},\"title\":\"Notify\",\"type\":\"array\"},\"organization\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Organization\"},\"route_views\":{\"default\":[],\"items\":{\"properties\":{\"as_set\":{\"default\":[],\"items\":{\"type\":\"integer\"},\"title\":\"As Set\",\"type\":\"array\"},\"asn\":{\"title\":\"Asn\",\"type\":\"integer\"},\"prefix\":{\"title\":\"Prefix\",\"type\":\"string\"}},\"required\":[\"asn\",\"prefix\"],\"title\":\"RouteView\",\"type\":\"object\"},\"title\":\"Route Views\",\"type\":\"array\"},\"source\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Source\"},\"status\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Status\"}},\"required\":[\"asn\"],\"title\":\"ASN\",\"type\":\"object\"},\"title\":\"Asns\",\"type\":\"array\"},\"business_address\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Business Address\"},\"cik\":{\"title\":\"Cik\",\"type\":\"integer\"},\"ein\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Ein\"},\"entity_name\":{\"title\":\"Entity Name\",\"type\":\"string\"},\"entity_type\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Entity Type\"},\"exchanges\":{\"items\":{\"type\":\"string\"},\"title\":\"Exchanges\",\"type\":\"array\"},\"extra_info\":{\"allOf\":[{\"properties\":{\"alias\":{\"default\":[],\"items\":{\"type\":\"string\"},\"title\":\"Alias\",\"type\":\"array\"},\"domain\":{\"default\":[],\"items\":{\"type\":\"string\"},\"title\":\"Domain\",\"type\":\"array\"}},\"title\":\"ExtraInfo\",\"type\":\"object\"}],\"default\":{\"alias\":[],\"domain\":[]}},\"fiscal_year_end\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Fiscal Year End\"},\"hostname\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Hostname\"},\"id\":{\"title\":\"Id\",\"type\":\"integer\"},\"mail_address\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Mail Address\"},\"phone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Phone\"},\"sic\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Sic\"},\"sic_description\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Sic Description\"},\"tickers\":{\"items\":{\"type\":\"string\"},\"title\":\"Tickers\",\"type\":\"array\"},\"updated_at\":{\"title\":\"Updated At\",\"type\":\"string\"}},\"required\":[\"id\",\"cik\",\"tickers\",\"entity_name\",\"exchanges\",\"updated_at\"],\"title\":\"Entity\",\"type\":\"object\"},\"executives\":{\"items\":{\"properties\":{\"additional_data\":{\"default\":{},\"title\":\"Additional Data\",\"type\":\"object\"},\"cik\":{\"title\":\"Cik\",\"type\":\"integer\"},\"name\":{\"title\":\"Name\",\"type\":\"string\"},\"role\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Role\"},\"salary\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Salary\"},\"stock_awards\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Stock Awards\"},\"total\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Total\"},\"year\":{\"title\":\"Year\",\"type\":\"integer\"}},\"required\":[\"cik\",\"name\",\"year\"],\"title\":\"Executive\",\"type\":\"object\"},\"title\":\"Executives\",\"type\":\"array\"},\"finance_data\":{\"items\":{\"properties\":{\"basic_share_outstanding\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Basic Share Outstanding\"},\"cost_of_sale\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Cost Of Sale\"},\"depletion_and_amortization\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Depletion And Amortization\"},\"earning_per_share\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Earning Per Share\"},\"earning_per_share_diluted\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Earning Per Share Diluted\"},\"ebitda\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Ebitda\"},\"filing_url\":{\"title\":\"Filing Url\",\"type\":\"string\"},\"gross_profit\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Gross Profit\"},\"long_term_debt_current\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Long Term Debt Current\"},\"long_term_debt_non_current\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Long Term Debt Non Current\"},\"net_income\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Net Income\"},\"operation_income_loss\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Operation Income Loss\"},\"report_at\":{\"format\":\"date\",\"title\":\"Report At\",\"type\":\"string\"},\"report_year\":{\"title\":\"Report Year\",\"type\":\"integer\"},\"revenue\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Revenue\"},\"share_outstanding\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Share Outstanding\"}},\"required\":[\"report_year\",\"report_at\",\"filing_url\"],\"title\":\"Finance\",\"type\":\"object\"},\"title\":\"Finance Data\",\"type\":\"array\"}},\"required\":[\"finance_data\",\"entity\",\"executives\"],\"title\":\"EntityFullInfoResponse\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"title\":\"Detail\",\"type\":\"string\"}},\"required\":[\"detail\"],\"title\":\"HTTPError\",\"type\":\"object\"}}},\"description\":\"Not Found\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/entities/{id}", "segments": [{ "lit": "api" }, { "lit": "entities" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.entity`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "entity", "name__orig": "entity", "Name": "Entity", "name_": "entity", "name-": "entity", "NAME": "ENTITY", "index$": 0 }, { "active": true, "entity": "entity", "key$": "BasicEntityFlow", "kind": "basic", "name": "BasicEntityFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "entity_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "entity_ref01", "srcdatavar": "entity_ref01_data", "suffix": "_dt0" }, "match": { "id": "entity01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-entity_ref01" } }], "index$": 1 }] }, 'Entity');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let entity_ref01_data = Object.values(setup.data.existing.entity)[0];
        // LIST
        const entity_ref01_ent = client.Entity();
        const entity_ref01_match = {};
        const entity_ref01_list = (await entity_ref01_ent.list(entity_ref01_match)).map((e) => e.data());
        // LOAD
        const entity_ref01_match_dt0 = {};
        entity_ref01_match_dt0.id = entity_ref01_data.id;
        const entity_ref01_data_dt0 = (await entity_ref01_ent.load(entity_ref01_match_dt0)).data();
        (0, node_assert_1.default)(entity_ref01_data_dt0.id === entity_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/entity/EntityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ShodanEntitydbSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['entity01', 'entity02', 'entity03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SHODAN_ENTITYDB_TEST_ENTITY_ENTID': idmap,
        'SHODAN_ENTITYDB_TEST_LIVE': 'FALSE',
        'SHODAN_ENTITYDB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SHODAN_ENTITYDB_TEST_ENTITY_ENTID'];
    const live = 'TRUE' === env.SHODAN_ENTITYDB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SHODAN_ENTITYDB_TEST_ENTITY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ShodanEntitydbSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=EntityEntity.test.js.map
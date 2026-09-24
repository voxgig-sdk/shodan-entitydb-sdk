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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LightEntityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SHODAN_ENTITYDB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SHODAN_ENTITYDB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ShodanEntitydbSDK.test();
        const ent = testsdk.LightEntity();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SHODAN_ENTITYDB_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'light_entity.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cik": { "a": true, "h": "Cik", "n": "cik", "r": true, "t": "`$INTEGER`", "key$": "cik", "index$": 0 }, "entity_name": { "a": true, "h": "Entity Name", "n": "entity_name", "r": true, "t": "`$STRING`", "key$": "entity_name", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "tickers": { "a": true, "h": "Tickers", "n": "tickers", "r": true, "t": "`$ARRAY`", "key$": "tickers", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "light_entity", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/entities", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/entities", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "entities" }], "t": { "req": "`reqdata`", "res": "`body.entities`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "light_entity", "name__orig": "light_entity", "Name": "LightEntity", "name_": "light_entity", "name-": "light-entity", "NAME": "LIGHT_ENTITY", "index$": 4 }, { "active": true, "entity": "light_entity", "key$": "BasicLightEntityFlow", "kind": "basic", "name": "BasicLightEntityFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "light_entity_ref01" } }], "index$": 0 }] }, 'LightEntity', { "GET /api/entities": { "protocol": "http", "operationId": "get_all_entities_api_entities_get", "responses": { "200": { "description": "Successful Response", "content": { "application/json": { "schema": { "properties": { "entities": { "items": { "properties": { "cik": { "title": "Cik", "type": "integer", "key$": "cik" }, "entity_name": { "title": "Entity Name", "type": "string", "key$": "entity_name" }, "id": { "title": "Id", "type": "integer", "key$": "id" }, "tickers": { "items": { "type": "string" }, "title": "Tickers", "type": "array", "key$": "tickers" } }, "required": ["id", "cik", "tickers", "entity_name"], "title": "LightEntity", "type": "object", "x-ref": "#/components/schemas/LightEntity", "index$": 0 }, "key$": "entities", "title": "Entities", "type": "array" } }, "type": "object", "required": ["entities"], "title": "EntitiesResponse", "x-ref": "#/components/schemas/EntitiesResponse" } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let light_entity_ref01_data = Object.values(setup.data.existing.light_entity)[0];
        // LIST
        const light_entity_ref01_ent = client.LightEntity();
        const light_entity_ref01_match = {};
        const light_entity_ref01_list = (await light_entity_ref01_ent.list(light_entity_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/light_entity/LightEntityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ShodanEntitydbSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['light_entity01', 'light_entity02', 'light_entity03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SHODAN_ENTITYDB_TEST_LIGHT_ENTITY_ENTID': idmap,
        'SHODAN_ENTITYDB_TEST_LIVE': 'FALSE',
        'SHODAN_ENTITYDB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SHODAN_ENTITYDB_TEST_LIGHT_ENTITY_ENTID'];
    const live = 'TRUE' === env.SHODAN_ENTITYDB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SHODAN_ENTITYDB_TEST_LIGHT_ENTITY_ENTID'];
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
//# sourceMappingURL=LightEntityEntity.test.js.map
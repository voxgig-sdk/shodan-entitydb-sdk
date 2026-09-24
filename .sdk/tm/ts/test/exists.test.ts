
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ShodanEntitydbSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ShodanEntitydbSDK.test()
    equal(testsdk instanceof ShodanEntitydbSDK, true,
      'ShodanEntitydbSDK.test() must return a client synchronously')
  })

})

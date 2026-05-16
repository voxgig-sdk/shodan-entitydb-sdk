
import { Context } from './Context'


class ShodanEntitydbError extends Error {

  isShodanEntitydbError = true

  sdk = 'ShodanEntitydb'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ShodanEntitydbError
}


import { expect, test } from 'vitest'
import { publicClient } from '../../../_test/utils'
import { base } from '../../../chains/base'
import { getOutputForL2Block } from './getOutputForL2Block'

test('retrieves correctly', async () => {
  const result = await getOutputForL2Block(publicClient, {
    l2BlockNumber: 2725977n,
    l2Chain: base,
  })
  expect(result.proposal).toBeDefined()
  expect(result.outputIndex).toBeDefined()
})
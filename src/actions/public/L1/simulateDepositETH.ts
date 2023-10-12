import type { Chain, PublicClient, SimulateContractReturnType, Transport } from 'viem'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { ABI, CONTRACT, type DepositETHParameters, FUNCTION } from '../../../types/depositETH.js'
import type { L1SimulateActionBaseType } from '../../../types/l1Actions.js'
import { simulateOpStackL1, type SimulateOpStackL1Parameters } from './simulateOpStackL1.js'

export type SimulateDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: DepositETHParameters; optimismPortal: RawOrContractAddress<_chainId> }
  & L1SimulateActionBaseType<TChain, TChainOverride, typeof ABI, typeof CONTRACT, typeof FUNCTION>

export type SimulateDepositETHReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<typeof ABI, typeof FUNCTION, TChain, TChainOverride>

/**
 * Simulates a deposit of ETH to L2
 * @param parameters - {@link SimulateDepositETHParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateDepositETH<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { to, gasLimit, data = '0x' },
    optimismPortal,
    value,
    ...rest
  }: SimulateDepositETHParameters<TChain, TChainOverride>,
): Promise<SimulateDepositETHReturnType<TChain, TChainOverride>> {
  return simulateOpStackL1(client, {
    address: resolveAddress(optimismPortal),
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [to, value, gasLimit, false, data],
    value,
    ...rest,
  } as unknown as SimulateOpStackL1Parameters<TChain, TChainOverride, typeof ABI, typeof FUNCTION>)
}

import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Blockchain } from './blockchain'

export class MiningEngine {
  private blockchain: Blockchain
  private minedFingerprints: Set<string> = new Set()

  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain
  }

  async mineOnVisit() {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    const visitorId = result.visitorId

    if (this.minedFingerprints.has(visitorId)) return

    const wallet = localStorage.getItem('nun-wallet')
    if (!wallet) return

    const block = this.blockchain.addBlock(wallet)
    this.minedFingerprints.add(visitorId)
    console.log('Mined block:', block)
  }
}

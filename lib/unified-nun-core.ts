import Gun from 'gun/gun'
import 'gun/sea'
import 'gun/lib/open'
import { Blockchain } from './blockchain'
import { WalletManager } from './wallet-manager'
import { MiningEngine } from './mining-engine'

export interface UnifiedNUNOptions {
  enableP2P?: boolean
  enableAutoMining?: boolean
  relayPeers?: string[]
}

export class UnifiedNUNCore {
  private gun: Gun | null = null
  private blockchain: Blockchain
  private walletManager: WalletManager
  private miningEngine: MiningEngine
  private options: UnifiedNUNOptions

  constructor(options: UnifiedNUNOptions = {}) {
    this.options = options
    this.blockchain = new Blockchain()
    this.walletManager = new WalletManager(this.blockchain)
    this.miningEngine = new MiningEngine(this.blockchain)
  }

  async initialize() {
    if (this.options.enableP2P) {
      this.gun = Gun({
        peers: this.options.relayPeers || ['https://gunjs-relay.glitch.me/gun']
      })
      this.blockchain.enableSync(this.gun)
    }

    await this.blockchain.loadGenesis()

    if (this.options.enableAutoMining) {
      this.miningEngine.mineOnVisit()
    }
  }

  getComponents() {
    return {
      blockchain: this.blockchain,
      walletManager: this.walletManager,
      miningEngine: this.miningEngine
    }
  }
}

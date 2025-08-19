import Gun from 'gun/gun'
import { v4 as uuidv4 } from 'uuid'

export interface Block {
  id: string
  timestamp: number
  miner: string
  previousHash: string
  hash: string
  reward: number
}

export class Blockchain {
  private chain: Block[] = []
  private gun: Gun | null = null

  async loadGenesis() {
    if (this.chain.length === 0) {
      const genesis: Block = {
        id: uuidv4(),
        timestamp: Date.now(),
        miner: 'GENESIS',
        previousHash: '0',
        hash: this.hashBlock('GENESIS' + Date.now()),
        reward: 1_000_000
      }
      this.chain.push(genesis)
    }
  }

  enableSync(gun: Gun) {
    this.gun = gun
    const blocks = gun.get('unifiednun-chain')
    blocks.map().on((data: Block) => {
      if (!this.chain.find(b => b.id === data.id)) {
        this.chain.push(data)
      }
    })
  }

  addBlock(miner: string): Block {
    const previous = this.chain[this.chain.length - 1]
    const block: Block = {
      id: uuidv4(),
      timestamp: Date.now(),
      miner,
      previousHash: previous.hash,
      hash: this.hashBlock(miner + Date.now()),
      reward: 1
    }
    this.chain.push(block)
    if (this.gun) {
      this.gun.get('unifiednun-chain').get(block.id).put(block)
    }
    return block
  }

  getBalance(address: string): number {
    return this.chain.filter(b => b.miner === address).reduce((sum, b) => sum + b.reward, 0)
  }

  getChain(): Block[] {
    return [...this.chain]
  }

  private hashBlock(data: string): string {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(data)).then(buf => {
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
    })
  }
}

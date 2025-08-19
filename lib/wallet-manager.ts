export class WalletManager {
  private wallet: string | null = null

  async createWallet(): Promise<string> {
    const keyPair = await crypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' },
      true,
      ['sign', 'verify']
    )
    const pubKey = await crypto.subtle.exportKey('spki', keyPair.publicKey)
    const address = Array.from(new Uint8Array(pubKey)).map(b => b.toString(16).padStart(2, '0')).join('')
    this.wallet = address
    localStorage.setItem('nun-wallet', address)
    return address
  }

  getWallet(): string | null {
    return this.wallet || localStorage.getItem('nun-wallet')
  }

  isWalletReady(): boolean {
    return !!this.getWallet()
  }
}

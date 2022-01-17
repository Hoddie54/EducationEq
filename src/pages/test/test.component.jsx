import { useEffect } from "react"
import { useState } from "react"
import { mintTokens } from "../../utils/solana"

function Test() {
  const [provider, setProvider] = useState(false)

  useEffect(() => {
    const isPhantomInstalled = window.solana && window.solana.isPhantom
    if (isPhantomInstalled) {
      setProvider(window.solana)
    }
  })

  async function getProvider() {
    const resp = await window.solana.connect()
    setProvider(window.solana)
    console.log(window.solana)
  }

  return (
    <>
      <button onClick={getProvider}>Get provider</button>
      <br />
      <button
        onClick={() => {
          mintTokens(window.solana.publicKey)
        }}
      >
        Mint new tokens
      </button>
    </>
  )
}

export default Test

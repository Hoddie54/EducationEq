import { useEffect } from "react"
import { useState } from "react"
import {
  sendTokensTransaction,
  mintTokens,
  airdropSolana,
} from "../../utils/solana"
const web3 = require("@solana/web3.js")
const splToken = require("@solana/spl-token")

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
        onClick={async () => {
          await mintTokens(window.solana.publicKey)
        }}
      >
        Mint new tokens
      </button>
      <br />
      <button
        onClick={async () => {
          const connection = new web3.Connection(
            web3.clusterApiUrl("devnet"),
            "confirmed"
          )

          const transaction = await sendTokensTransaction(
            window.solana,
            window.solana.publicKey,
            "4uRcocbiZE4cF87K9ZxXUyjxYLPN2KgrGt9cbARPEFHS"
          )

          transaction.recentBlockhash = (
            await connection.getRecentBlockhash("finalized")
          ).blockhash

          transaction.feePayer = provider.publicKey

          const { signature } = await provider.signAndSendTransaction(
            transaction
          )

          await connection.confirmTransaction(signature)
        }}
      >
        Send tokens back
      </button>
      <button
        onClick={async () => {
          const connection = new web3.Connection(
            web3.clusterApiUrl("devnet"),
            "confirmed"
          )
          await airdropSolana(connection, provider.publicKey)
        }}
      >
        Airdrop SOl
      </button>
    </>
  )
}

export default Test

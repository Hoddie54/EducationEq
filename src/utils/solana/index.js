const web3 = require("@solana/web3.js")
const splToken = require("@solana/spl-token")

const secret_key = [
  200, 74, 27, 107, 236, 99, 14, 79, 21, 31, 138, 203, 143, 2, 97, 70, 200, 30,
  65, 23, 173, 215, 132, 68, 32, 40, 107, 47, 13, 155, 62, 165, 58, 1, 25, 4,
  152, 137, 245, 234, 71, 205, 30, 194, 227, 97, 168, 234, 244, 50, 179, 144,
  128, 60, 26, 233, 207, 197, 23, 25, 113, 83, 154, 89,
]

const token_id = "Auoqv9PfrD8YiFTh7kyUth5KWrmM2uEiELh9MmY48TDo"

export function mintTokens(toWalletPublicKey) {
  const uint8array = new Uint8Array(secret_key)
  const mintWallet = web3.Keypair.fromSecretKey(uint8array)
  console.log(mintWallet.publicKey.toString())

  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  )

  return new Promise(async (resolve, reject) => {
    const mint = await splToken.Token.createMint(
      connection,
      mintWallet,
      mintWallet.publicKey,
      token_id,
      9,
      splToken.TOKEN_PROGRAM_ID
    )

    const mintTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
      mintWallet.publicKey
    )

    const toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
      toWalletPublicKey
    )

    await mint.mintTo(
      mintTokenAccount.address,
      mintWallet.publicKey,
      [],
      1000000000
    )

    const transaction = new web3.Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        mintTokenAccount.address,
        toTokenAccount.address,
        mintWallet.publicKey,
        [],
        10000
      )
    )

    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [mintWallet],
      { commitment: "confirmed" }
    )
    console.log("SIGNATURE", signature)

    resolve()
  })
}

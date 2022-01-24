const web3 = require("@solana/web3.js")
const splToken = require("@solana/spl-token")

const secret_key = [
  200, 74, 27, 107, 236, 99, 14, 79, 21, 31, 138, 203, 143, 2, 97, 70, 200, 30,
  65, 23, 173, 215, 132, 68, 32, 40, 107, 47, 13, 155, 62, 165, 58, 1, 25, 4,
  152, 137, 245, 234, 71, 205, 30, 194, 227, 97, 168, 234, 244, 50, 179, 144,
  128, 60, 26, 233, 207, 197, 23, 25, 113, 83, 154, 89,
]

const token_publickey = "Auoqv9PfrD8YiFTh7kyUth5KWrmM2uEiELh9MmY48TDo"
const token = new web3.PublicKey(token_publickey)

const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
)

const uint8array = new Uint8Array(secret_key)
const mintWallet = web3.Keypair.fromSecretKey(uint8array)

export async function mintTokens(toWalletPublicKey) {
  console.log(mintWallet.publicKey.toString(), token.toString())

  // const mint = await splToken.Token.createMint(
  //   connection,
  //   mintWallet,
  //   mintWallet.publicKey,
  //   null,
  //   9,
  //   splToken.TOKEN_PROGRAM_ID
  // )

  const mint = new splToken.Token(
    connection,
    token,
    splToken.TOKEN_PROGRAM_ID,
    mintWallet
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
      10000000000
    )
  )

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [mintWallet],
    { commitment: "confirmed" }
  )
  console.log("SIGNATURE", signature)
}

export async function sendTokensTransaction(
  fromWallet,
  fromWalletPublicKey,
  toWalletPublicKey
) {
  const mint = new splToken.Token(
    connection,
    token,
    splToken.TOKEN_PROGRAM_ID,
    fromWallet
  )

  const fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWalletPublicKey
  )

  const toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    new web3.PublicKey(toWalletPublicKey)
  )

  console.log(fromTokenAccount.address, toTokenAccount, fromWalletPublicKey)

  const transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWalletPublicKey,
      [],
      1000000000
    )
  )

  //   const signature = await web3.sendAndConfirmTransaction(
  //     connection,
  //     transaction,
  //     [fromWallet],
  //     { commitment: "confirmed" }
  //   )

  return transaction
}

export async function airdropSolana(connection, publicKey) {
  const confirm = await connection.requestAirdrop(publicKey, 10000000)
  await connection.confirmTransaction(confirm, "confirmed")
}

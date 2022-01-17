import { Buffer } from "buffer"
import assert from "assert"
import BN from "bn.js"
import * as BufferLayout from "@solana/buffer-layout"
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js"
import {
  Connection,
  Commitment,
  Signer,
  TransactionSignature,
} from "@solana/web3.js"

import { sendAndConfirmTransaction } from "./util/send-and-confirm-transaction"

import { Token } from "@solana/spl-token"

export const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
)

export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
)

export async function createMint(
  connection,
  payer,
  mintAuthority,
  freezeAuthority,
  decimals,
  programId
) {
  const mintAccount = Keypair.generate()
  const token = new Token(connection, mintAccount.publicKey, programId, payer)

  // Allocate memory for the account
  const balanceNeeded = await Token.getMinBalanceRentForExemptMint(connection)

  const transaction = new Transaction()
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintAccount.publicKey,
      lamports: balanceNeeded,
      space: MintLayout.span,
      programId,
    })
  )

  transaction.add(
    Token.createInitMintInstruction(
      programId,
      mintAccount.publicKey,
      decimals,
      mintAuthority,
      freezeAuthority
    )
  )

  // Send the two instructions
  await sendAndConfirmTransaction(
    "createAccount and InitializeMint",
    connection,
    transaction,
    payer,
    mintAccount
  )

  return token
}

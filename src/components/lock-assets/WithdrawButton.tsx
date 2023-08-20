import { TxConfirmData } from "@/pages/api/transaction/confirm";
import { TxSendData } from "@/pages/api/transaction/send";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import React from "react";
import toast from "react-hot-toast";
import { Button, ButtonState } from "../Button";
import { fetcher } from "@/utils/useDataFetch";
import { CLUSTER } from "@/utils/constants/endpoints";
import { TxCreateData } from "@/pages/api/assets/withdraw";
import { useSelectedAssetState } from "@/store";

export interface WithdrawButtonProps {}

export function WithdrawButton({}: WithdrawButtonProps) {
	const { publicKey, signTransaction, connected } = useWallet();
	const selectedAsset = useSelectedAssetState((state) => state.selectedAsset);

	const [txState, setTxState] = React.useState<ButtonState>(
		ButtonState.Initial
	);

	const lock = async () => {
		if (
			!connected ||
			!publicKey ||
			!signTransaction ||
			txState === ButtonState.Loading
		) {
			return;
		}
		setTxState(ButtonState.Loading);
		const buttonToastId = toast.loading("Preparing the transaction", {
			id: `buttonToast${"createTransaction"}`,
		});

		try {
			let { tx: txCreateResponse, shouldReceiveReward } =
				await fetcher<TxCreateData>("/api/assets/withdraw", {
					method: "POST",
					body: JSON.stringify({
						walletAddress: publicKey.toBase58(),
						asset: selectedAsset,
					}),
					headers: { "Content-type": "application/json; charset=UTF-8" },
				});

			const tx = Transaction.from(Buffer.from(txCreateResponse, "base64"));

			// Request signature from wallet
			const signedTx = await signTransaction(tx);
			const signedTxBase64 = signedTx
				.serialize({ requireAllSignatures: true, verifySignatures: true })
				.toString("base64");

			// Send signed transaction
			let { txSignature } = await fetcher<TxSendData>("/api/transaction/send", {
				method: "POST",
				body: JSON.stringify({
					signedTx: signedTxBase64,
					payer: publicKey.toBase58(),
					sendType: "withdraw",
					shouldReceiveReward,
					asset: selectedAsset,
				}),
				headers: { "Content-type": "application/json; charset=UTF-8" },
			});

			setTxState(ButtonState.Success);
			toast.success(
				(t) => (
					<a
						href={`https://solscan.io/tx/${txSignature}?cluster=devnet`}
						target="_blank"
						rel="noreferrer"
					>
						Transaction Sent
					</a>
				),
				{ id: buttonToastId, duration: 10000 }
			);

			const confirmationToastId = toast.loading("Just confirming...");

			const confirmationResponse = await fetcher<TxConfirmData>(
				"/api/transaction/confirm",
				{
					method: "POST",
					body: JSON.stringify({ txSignature }),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);

			if (confirmationResponse.confirmed) {
				toast.success("Transaction Confirmed", {
					id: confirmationToastId,
				});
			} else {
				toast.success("Uh-oh, something went wrong!", {
					id: confirmationToastId,
				});
			}
		} catch (error) {
			setTxState(ButtonState.Error);
			// console.log(error);
			toast.error("Uh-oh, something went wrong!", {
				id: buttonToastId,
			});
		}
	};

	return (
		<>
			{connected && publicKey && (
				<>
					<Button
						state={txState}
						onClick={async () => {
							await lock();
						}}
						className="px-3 py-2 mr-2 text-gray-700 rounded hover:bg-gray-200 hover:text-gray-800 btn-secondary"
					>
						Withdraw
					</Button>
				</>
			)}
		</>
	);
}

import mongoose, { Schema, Model } from "mongoose";
import { NftCollection } from "./enums/NftCollection";
import { NftTypes } from "./enums/NftTypes";
import { mongooseObjectId } from "./utils/types";

export interface Attribute {
	trait_type: string;
	value?: string;
}

interface File {
	uri: string;
	type: string;
}

interface Creator {
	address: string;
	share: number;
}

interface Properties {
	files?: File[];
	category?: string;
}

export interface IMemento {
	_id?: mongooseObjectId;
	nftCollection: NftCollection;
	assetLocked: string;
	quantityLocked: number;
	valueLockedInUSD: number;
	durationLockedInSeconds: number;
	typeOfNft: NftTypes;
	mintAddress?: string;
	ownerSolanaWalletAddress?: string;
	name: string;
	number?: number;
	symbol: string;
	description: string;
	image: string;
	metadataUri: string;
	blurhash?: string;
	attributes: Attribute[];
	properties?: Properties;
	transactionId?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
	mintedAt?: Date;
}

const attributeSchema = new Schema<Attribute>({
	trait_type: {
		type: String,
		required: true,
	},
	value: {
		type: String,
	},
});

const fileSchema = new Schema<File>({
	uri: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});

const propertiesSchema = new Schema<Properties>({
	files: [fileSchema],
	category: String,
});

const mementoSchema = new Schema<IMemento, Model<IMemento>, IMemento>(
	{
		nftCollection: {
			type: String,
			enum: Object.values(NftCollection),
			required: true,
		},
		typeOfNft: {
			type: String,
			enum: Object.values(NftTypes),
			required: true,
		},
		mintAddress: {
			type: String,
		},
		assetLocked: {
			type: String,
			required: true,
		},
		quantityLocked: {
			type: Number,
			required: true,
		},
		valueLockedInUSD: {
			type: Number,
			required: true,
		},
		durationLockedInSeconds: {
			type: Number,
			required: true,
		},
		ownerSolanaWalletAddress: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		number: {
			type: Number,
		},
		symbol: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		metadataUri: {
			type: String,
			required: true,
		},
		blurhash: String,
		attributes: {
			type: [attributeSchema],
			required: true,
		},
		properties: {
			type: propertiesSchema,
		},
		transactionId: String,
		mintedAt: Date,
	},
	{
		read: "primary",
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
	}
);

const Memento: Model<IMemento> =
	mongoose?.models?.Memento ||
	mongoose?.model<IMemento>("Memento", mementoSchema);

export { Memento };

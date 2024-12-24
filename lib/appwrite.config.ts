import * as sdk from "node-appwrite";

export const PROJECT_ID = "675feaf100148017bb12";
export const API_KEY =
  "standard_f75120e6cb733166a23a9987f1d2cdb1c65d1af5ec413d74d6a98b2a834b2ab0521459367a709cbad41ca20405d153834cfcc26bf203f5292d96efad28a96e1b7767ab8ceac4d9a8d9c48f5d4738f5ede76551d81cadfc48cfc7a8d7b8e864d06d12041f5bcc7883d08efb3412f070b9a39a8684d0df771729b286082613395d";
export const DATABASE_ID = "675febe900343f0bf015";
export const PATIENT_COLLECTION_ID = "675fec21002eceebb628";
export const DOCTOR_COLLECTION_ID = "675fec61002828e22ecd";
export const APPOINTEMENT_COLLECTION_ID = "675feca2000d3fee8f59";
export const BUCKET_ID = "675fed170028303ff32b";
export const ENDPOINT = "https://cloud.appwrite.io/v1";

// export const {
//   PROJECT_ID,
//   API_KEY,
//   DATABASE_ID,
//   PATIENT_COLLECTION_ID,
//   DOCTOR_COLLECTION_ID,
//   APPOINTEMENT_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//   NEXT_PUBLIC_ENDPOINT: ENDPOINT,
// } = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);

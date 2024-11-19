import { Account, Avatars, Client, ID, Databases, Query } from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora.mustazico',
    projectId: '673667a6001107bc4f08',
    databaseId: '673669bb0017194f996b',
    userCollectionId: '673669e000311402a6e8',
    videoCollectionId: '67366a0b0026ecc3471c',
    storageId: '67366bae003b7d3bbb42'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
    try {
           await account.deleteSessions('current');
        // method given by appwrite to create an email session
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;
  
    return currentUser.documents[0];

  } catch (error) {
    console.log(error);
  }
}

export const getAllPosts = async() => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
    
  }
}

export const getLatestPosts = async() => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
    
  }
}
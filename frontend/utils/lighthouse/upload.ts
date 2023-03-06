import { ethers, providers } from 'ethers';
import lighthouse, { IpfsFileResponse } from '@lighthouse-web3/sdk';

interface Window {
    ethereum: providers.ExternalProvider;
}

declare let window: Window;

const LIGHTHOUSE_API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || "";

const encryptionSignature = async () =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return({
      signedMessage: signedMessage,
      publicKey: address
    });
  }

const progressCallback = (progressData: any) => {
    let percentageDone =
      100 - Number((progressData?.total / progressData?.uploaded)?.toFixed(2));
    console.log(percentageDone);
};

type DeployEncryptedResponse = {
    data: IpfsFileResponse;
}

/* Deploy file along with encryption */
export const deployEncrypted = async(e: any) =>{
    /*
        uploadEncrypted(e, publicKey, accessToken, uploadProgressCallback)
        - e: js event
        - publicKey: wallets public key
        - accessToken: your api key
        - signedMessage: message signed by the owner of publicKey
        - uploadProgressCallback: function to get progress (optional)
    */
    const sig = await encryptionSignature();
    const response: DeployEncryptedResponse = await lighthouse.uploadEncrypted(
        e,
        sig.publicKey,
        LIGHTHOUSE_API_KEY,
        sig.signedMessage,
        progressCallback
    );

    console.log('lighthouse response', response);

    const SongUrl = "https://files.lighthouse.storage/viewFile/" + response.data.Hash;
    const Size = Number(response.data.Size) / 1000;
    const Name = response.data.Name;

    return { SongUrl, Size, Name };
    /*
        output:
        {
            Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
            Size: "318557", / 1000 KB
            Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3" + append "https://files.lighthouse.storage/viewFile"
        }
        Note: Hash in response is CID.
    */
}
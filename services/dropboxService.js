import { Dropbox } from 'dropbox';
import fetch from 'cross-fetch'; // Use cross-fetch instead of node-fetch

const dbx = new Dropbox({ 
  accessToken: "sl.u.AFlEKjCiS9DXW2WtBRc66uNclkiybLx55z-X4B37OYh8OnVb7XxzjlOBmO-bAuQLNCKjVWXGtLR6sjj8X9gNhUDT0AI3ye1gs0tSeRotkwQAzCbzgfEaPHFD_G8iRtDoAalgnikMIy6CcBkFBuSJDtEIrcHjjB5yQz0itUdxUczKUu3vHdo7wIx-RbM5HAiMt8wd4zjvdXhwyp8M8g2tul9wAz4aAO0ZQLopFUXF57nJ-KGwcTckjUdxH6M3wsigOgciWsoHm9G0S116Aj5c_vIv3Ua3pfBxsjZkWkCHoIW1IxlA6ebCfpODnzRHzK4S-SSrIEP7Kjan9DpuHH8W2diiEqtssSZ0JkWQeah4u7phy6mopEodDHsQu_C6OG8SRieuBUuVEHwrH6a5-opKIPuqK29AEpPmZaaUn8dmtLfO3EryB7yFFbl3nF_xijnc4YtpR2XP-av-esb4Rns0ZuQkiim9oq9_Lhf4J9ApClQlM9cL5awRr4nSWN3ikBO87BX3x3IZlEyV7xmvOr_Kt1Pld6gBDxCSgJcTzE_odBLFJwjj1D6oIdWgb88uSVTnzWxd5yah3bW869TY1nrQ2B4HL4Pmgz74Sd4i2YiALBHMfu96x8QX1jr_00N_LInNCEynm_0ulRmYaL70vBlflIzuUw6bo1HULEJuhtfY3iAwiUCzyRFKU5hWJl5RkYeegHJtSNxHy_0WzPXW63j0s7FR3zZ9dr0Yb9Z_4o9nIYuegjebcsF5eTTpIRiUOA4Z4sDEU-EBAnY8_UdmQ83w0yteZaWvsi3u7dGuOitiaM6smePCZF6RxoiUHb1uSgay6kuAP5HKO2TmJTyQNVj1uqrEViX56_UH5_RVScE5RZg40LVE3fYXgT7Iax3M6p96kgRBAJRlBb9e05JCBzr_mry5sXB_KpI1G68b5beKNZtrca-KEQsbGIy79Xn4iN_cOGyULmqSDBMOgmNKtItxdb0a0EO7Q-F8pPayIj1KGUQhCI8fb1mW_zPdYd8qyMq0YtWXjOdGVdEWHqs-SmrAS-R-8HFHz-OicWm9KcOpOtdKK47JzVO28G61gGUKpgCjKlBTvSTjhXDIsbuIDo6i96ujKdYGDermFr_kIgvolcG0oQbvj23iAhgDnQ7bniiuKH0jNoEw77eX9071-hB_efQyhMGaVBxcLTkgtfDmiq6nbZuXEcOmh2xivWg8dOBu0xUGlTNRxZGICKWkdIbumVjX77_Ee0Cy4yrYvBdnwPhCIv2rXk36Yo5GsGZiL1KdstrAxQvxsjTE4iD81vMEdRQ7cWHYcnf8LNtv8qVC5zS_U4W8MIfWr0eP5VpweFzykEtUcrOqI71OFzpkqMzRPWdir7Sr76a4Gsnq09H04E6Np4tEMZ92ZMPfcxRidZYt0DYRVhAT7egA0jmXviyZAiEhFkOumLmwKth7gClZRqozs3stNLNVtqfcKi8vM4VbJTE",
  fetch: fetch // Explicitly pass the fetch implementation
});

export const uploadToDropbox = async (file, filename) => {
  try {
    // Convert file to buffer if needed
    let fileBuffer;
    if (file instanceof Buffer) {
      fileBuffer = file;
    } else {
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    }

    // Upload file to Dropbox
    const uploadResponse = await dbx.filesUpload({
      path: `/products/${filename}`,
      contents: fileBuffer,
      mode: 'overwrite'
    });

    // Create a shared link
    const shareResponse = await dbx.sharingCreateSharedLink({
      path: uploadResponse.result.path_display
    });

    // Convert to direct download link
    let directLink = shareResponse.result.url;
    if (directLink.includes('www.dropbox.com')) {
      directLink = directLink.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      if (!directLink.endsWith('?dl=1')) {
        directLink += '?dl=1';
      }
    }

    return directLink;
  } catch (error) {
    console.error('Dropbox upload error:', error);
    throw error;
  }
};

const testDropboxConnection = async () => {
  try {
    const response = await dbx.usersGetCurrentAccount();
    console.log('Dropbox connection successful:', response.result.email);
    return true;
  } catch (error) {
    console.error('Dropbox connection test failed:', error);
    return false;
  }
};

// Test connection on service initialization
testDropboxConnection().then(isConnected => {
  if (!isConnected) {
    console.error('Warning: Dropbox service is not properly configured');
  }
}); 
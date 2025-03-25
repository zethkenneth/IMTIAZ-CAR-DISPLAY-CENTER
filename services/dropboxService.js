import { Dropbox } from 'dropbox';
import fetch from 'cross-fetch';

// Initial access token (your current working token)
let currentAccessToken = 'sl.u.AFlQJHVT-Zv7i-Av4lEwSxUYGaaqaZdY3NPcBchHnVnuVIJcyGcgbvguOINRtgoLYQugva8bwdKs6XsWgVh_ARPfjZJkLMtLYgKMBrokqxQyosM7nclcGA6WsM2XhaHxeb4YVVG7Y2P5-sQhIvnDk_YMk42hhR76Llj2vrk3MkfcYeukSxJnhOcxf_yLP5VHY7lEyHaK0zN9KGGNMXwBGFwFDnFkDK0LZlzUy2UiaWbXCKCdF8ZkMq13mrUkTlswty5macF9FJHIYDGdl3jgNlivhHD_DYunh3ErKlPdfXr1FErEsT75HHbpR1CPMjojqcekFeNzDLMtQ6OweFhCtHwTMafPSuwSlziBVkk5GVBxbieL89oeEOWO-GOB5FjwRE-IJrtyewkeJnf6qCNOD23Pr430JViR1w0PTKTIgfctjf1tLzI9gej5F75FSBkHSO2Hqk5GsPAdyFUa6TaezWzEzZapoAtc9Spba5ptMlWd8I0Z0zQ7E3661Fba4qASnQhRGzsTh2E-mOdb3c9jKG50von2_A3lguhae8SrmSAKRemlQ90cvF_LYKITPCuhadbsk8DJ90g4oWIwuiRqlrvXmSs0nDPXJdJJ3hEetlmGopf7aqx80y-xulJNw4XAeRTM8W2FD3yoPPrwtt0VtbqTFFHt9NRYVLQY1H4kyk67gRMXVZvpmSrQ5R51gjrUGIHOz0KaiOGr6sdJBXjpKdT4F9qee79AFzQBnHH0nWBmL0YQUXmjdEYcKTHL1SyeI33KBov5y1Dfe26QxjWltrekMtB2jScseywv-12bprGqMVIuMv7tn4m_hGQCrCyAyXSP9HwP6dWVMoZcapx7oCOE4rfMjPOWvyrgiobj88MeN9kqDzT0F-vPb6QMbAZegY2b_Ugf5Y56DdDeg7--QqCn6lR-0EOhBEm19tgt-ToLqpAW2bBys1Ks25or3yJqOzkyYImEHKOZedXVKyYOz2liMkNw195mE_OV5TQxrVMDNmjWeIAesV_11wavL-T6YIQNZjoPQNRydhc4dhI6Mk3eT_AijZbd_P1SMSfjBAhaQh6SsczTdU6mfAKaxVjnLAtPi70oyZg3TOqELM9pNIoXGhlNsRkNrdg_S0B2VHI5cRKlW7ip_hR2B_LTfqPdEIhfO-gbj8Vp_M0qVMHnTHsRq8a1ynV_grMNZ-wrMVo9icJpDvRxC-jl5X9h0syHvZN3dwnqO0NVEhKjUYf44y2kvQ4du5h2bXP5nwb_2by-3c2ume2KIfh1OzSmAcwcAj8-bmF9eaBoC9xBtQtCLEmgBa2fF090mYjJvmobSV42Uq9ICE-wxtbbxCHCqOTJM1l45uWtfZRRk1Uv8PGwg54Bu1s8PZtJyosn-90XoIdIXzcqHf-lp4-PyeHwSMNaeB7Hv5lW85HLRyFd9QPkBAujDBpJzCEDOS0oHe0q8oO5SqNNobXepIYuHz_N8d2ji6M';
let tokenExpirationTime = null;

// Your app credentials (get these from Dropbox App Console once)
const CLIENT_ID = 'oawons1on6kvvrc';
const CLIENT_SECRET = 'ouo2y6ksm53s28l';
const REFRESH_TOKEN = 'sl.u.AFlQJHVT-Zv7i-Av4lEwSxUYGaaqaZdY3NPcBchHnVnuVIJcyGcgbvguOINRtgoLYQugva8bwdKs6XsWgVh_ARPfjZJkLMtLYgKMBrokqxQyosM7nclcGA6WsM2XhaHxeb4YVVG7Y2P5-sQhIvnDk_YMk42hhR76Llj2vrk3MkfcYeukSxJnhOcxf_yLP5VHY7lEyHaK0zN9KGGNMXwBGFwFDnFkDK0LZlzUy2UiaWbXCKCdF8ZkMq13mrUkTlswty5macF9FJHIYDGdl3jgNlivhHD_DYunh3ErKlPdfXr1FErEsT75HHbpR1CPMjojqcekFeNzDLMtQ6OweFhCtHwTMafPSuwSlziBVkk5GVBxbieL89oeEOWO-GOB5FjwRE-IJrtyewkeJnf6qCNOD23Pr430JViR1w0PTKTIgfctjf1tLzI9gej5F75FSBkHSO2Hqk5GsPAdyFUa6TaezWzEzZapoAtc9Spba5ptMlWd8I0Z0zQ7E3661Fba4qASnQhRGzsTh2E-mOdb3c9jKG50von2_A3lguhae8SrmSAKRemlQ90cvF_LYKITPCuhadbsk8DJ90g4oWIwuiRqlrvXmSs0nDPXJdJJ3hEetlmGopf7aqx80y-xulJNw4XAeRTM8W2FD3yoPPrwtt0VtbqTFFHt9NRYVLQY1H4kyk67gRMXVZvpmSrQ5R51gjrUGIHOz0KaiOGr6sdJBXjpKdT4F9qee79AFzQBnHH0nWBmL0YQUXmjdEYcKTHL1SyeI33KBov5y1Dfe26QxjWltrekMtB2jScseywv-12bprGqMVIuMv7tn4m_hGQCrCyAyXSP9HwP6dWVMoZcapx7oCOE4rfMjPOWvyrgiobj88MeN9kqDzT0F-vPb6QMbAZegY2b_Ugf5Y56DdDeg7--QqCn6lR-0EOhBEm19tgt-ToLqpAW2bBys1Ks25or3yJqOzkyYImEHKOZedXVKyYOz2liMkNw195mE_OV5TQxrVMDNmjWeIAesV_11wavL-T6YIQNZjoPQNRydhc4dhI6Mk3eT_AijZbd_P1SMSfjBAhaQh6SsczTdU6mfAKaxVjnLAtPi70oyZg3TOqELM9pNIoXGhlNsRkNrdg_S0B2VHI5cRKlW7ip_hR2B_LTfqPdEIhfO-gbj8Vp_M0qVMHnTHsRq8a1ynV_grMNZ-wrMVo9icJpDvRxC-jl5X9h0syHvZN3dwnqO0NVEhKjUYf44y2kvQ4du5h2bXP5nwb_2by-3c2ume2KIfh1OzSmAcwcAj8-bmF9eaBoC9xBtQtCLEmgBa2fF090mYjJvmobSV42Uq9ICE-wxtbbxCHCqOTJM1l45uWtfZRRk1Uv8PGwg54Bu1s8PZtJyosn-90XoIdIXzcqHf-lp4-PyeHwSMNaeB7Hv5lW85HLRyFd9QPkBAujDBpJzCEDOS0oHe0q8oO5SqNNobXepIYuHz_N8d2ji6M';

const refreshAccessToken = async () => {
  try {
    console.log('Refreshing Dropbox access token...');
    const response = await fetch('https://api.dropbox.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Token refresh failed: ${data.error_description || data.error || response.statusText}`);
    }

    currentAccessToken = data.access_token;
    // Set expiration time (typically 4 hours from now)
    tokenExpirationTime = Date.now() + (data.expires_in * 1000);
    console.log('Token refreshed successfully');
    
    return currentAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // If refresh fails, continue with current token
    return currentAccessToken;
  }
};

const getDropboxClient = async () => {
  try {
    // Check if token is expired or will expire in next 5 minutes
    const isExpiringSoon = !tokenExpirationTime || 
      Date.now() > (tokenExpirationTime - 300000); // 5 minutes buffer

    if (isExpiringSoon) {
      await refreshAccessToken();
    }

    return new Dropbox({ 
      accessToken: currentAccessToken,
      fetch
    });
  } catch (error) {
    console.error('Error getting Dropbox client:', error);
    // Fallback to current token if refresh fails
    return new Dropbox({ 
      accessToken: currentAccessToken,
      fetch
    });
  }
};

export const uploadToDropbox = async (file, filename) => {
  try {
    const dbx = await getDropboxClient();
    
    let fileBuffer;
    if (file instanceof Buffer) {
      fileBuffer = file;
    } else {
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    }

    // Try upload
    try {
      const uploadResponse = await dbx.filesUpload({
        path: `/products/${filename}`,
        contents: fileBuffer,
        mode: 'overwrite'
      });

      const shareResponse = await dbx.sharingCreateSharedLink({
        path: uploadResponse.result.path_display
      });

      let directLink = shareResponse.result.url;
      if (directLink.includes('www.dropbox.com')) {
        directLink = directLink.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
        if (!directLink.endsWith('?dl=1')) {
          directLink += '?dl=1';
        }
      }

      return directLink;
    } catch (uploadError) {
      // If error is due to expired token, refresh and retry once
      if (uploadError.status === 401) {
        console.log('Token expired during upload, refreshing and retrying...');
        await refreshAccessToken();
        const newDbx = await getDropboxClient();
        
        // Retry upload with new token
        const uploadResponse = await newDbx.filesUpload({
          path: `/products/${filename}`,
          contents: fileBuffer,
          mode: 'overwrite'
        });

        const shareResponse = await newDbx.sharingCreateSharedLink({
          path: uploadResponse.result.path_display
        });

        let directLink = shareResponse.result.url;
        if (directLink.includes('www.dropbox.com')) {
          directLink = directLink.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
          if (!directLink.endsWith('?dl=1')) {
            directLink += '?dl=1';
          }
        }

        return directLink;
      }
      throw uploadError;
    }
  } catch (error) {
    console.error('Dropbox upload error:', error);
    throw error;
  }
};

// Test connection and initial token refresh
const testConnection = async () => {
  try {
    const dbx = await getDropboxClient();
    const response = await dbx.usersGetCurrentAccount();
    console.log('Dropbox connection successful:', response.result.email);
    return true;
  } catch (error) {
    console.error('Dropbox connection test failed:', error);
    return false;
  }
};

// Run initial test
testConnection(); 
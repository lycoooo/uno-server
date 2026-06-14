const express = require('express');
const cors = require('cors');
// Node.js 18+ has built-in fetch

const app = express();
const PORT = 3000;

// Store authentication tokens
let authTokens = {
    'cachekey-app1': '',
    'chyjrtgn-app1': '',
    'uid': ''
};

app.use(cors());
app.use(express.json());

app.post('/api/send-code', async (req, res) => {
    const { mobileNumber } = req.body;

    const payload = {
        memberAccount: mobileNumber,
        mobileNumber: mobileNumber,
        countryDataPkCode: "104gWJiOamfNjEt3xG92501"
    };

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'API': 'v',
        'platform': '',
        'client-version': '1.0',
        'content-type': 'application/json',
        'cur-code': '701VHcfdkh76FwQmHFh4239',
        'device-channel': 'WEB',
        'device-id': '1781431269436936793',
        'device-type': 'H5',
        'platform-code': '1019A5DD0B94185AF2C',
        'referer': 'https://www.fbmplay.com/login',
        'sec-ch-ua': '"Google Chrome";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'system-lang': 'en-US',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36'
    };

    try {
        console.log('Sending request to API...');
        console.log('Payload:', payload);

        const response = await fetch('https://www.fbmplay.com/api/member/pages/sms/send-mobile-register', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { mobileNumber, mobileVerifyCode, timestamp } = req.body;

    const payload = {
        verifyCode: "",
        timestamp: timestamp || "1781431724y3wrMxVXf3cwRIoo",
        node: "NBH5",
        countryDataPkCode: "104gWJiOamfNjEt3xG92501",
        mobileNumber: mobileNumber,
        mobileVerifyCode: mobileVerifyCode
    };

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'API': 'v',
        'platform': '',
        'client-version': '1.0',
        'content-type': 'application/json',
        'cur-code': '701VHcfdkh76FwQmHFh4239',
        'device-channel': 'WEB',
        'device-id': '1781431269436936793',
        'device-type': 'H5',
        'platform-code': '1019A5DD0B94185AF2C',
        'referer': 'https://www.fbmplay.com/login',
        'sec-ch-ua': '"Google Chrome";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'system-lang': 'en-US',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36'
    };

    try {
        console.log('Sending login request...');
        console.log('Payload:', payload);

        const response = await fetch('https://www.fbmplay.com/api/member/pages/login/mobile-opt', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        // Store auth tokens from login response
        if (data.success && data.rsData && data.rsData.memberLoginResponseMap) {
            const loginData = data.rsData.memberLoginResponseMap;
            authTokens['cachekey-app1'] = loginData['cachekey-app1'] || '';
            authTokens['chyjrtgn-app1'] = loginData['chyjrtgn-app1'] || '';
            authTokens['uid'] = loginData['uid'] || '';
            console.log('Auth tokens stored:', authTokens);
        }

        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/get-assets', async (req, res) => {
    const payload = {};

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'api': 'platform',
        'cachekey-app1': authTokens['cachekey-app1'],
        'chyjrtgn-app1': authTokens['chyjrtgn-app1'],
        'client-version': '1.0',
        'content-type': 'application/json',
        'cur-code': '701VHcfdkh76FwQmHFh4239',
        'device-channel': 'WEB',
        'device-id': '1781431269436936793',
        'device-type': 'H5',
        'platform-code': '1019A5DD0B94185AF2C',
        'referer': 'https://www.fbmplay.com/?app=1',
        'sec-ch-ua': '"Google Chrome";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'system-lang': 'en-US',
        'uid': authTokens['uid'],
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36'
    };

    try {
        console.log('Sending get-assets request...');
        console.log('Auth tokens:', authTokens);

        const response = await fetch('https://www.fbmplay.com/api/financial/pages/assets/mgmt/query/get-assets', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/send-reset-code', async (req, res) => {
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'api': 'platform',
        'cachekey-app1': authTokens['cachekey-app1'],
        'chyjrtgn-app1': authTokens['chyjrtgn-app1'],
        'client-version': '1.0',
        'content-type': 'application/json',
        'cur-code': '701VHcfdkh76FwQmHFh4239',
        'device-channel': 'Android H5',
        'device-id': '1781431269436936793',
        'device-type': 'H5',
        'platform-code': '1019A5DD0B94185AF2C',
        'referer': 'https://www.fbmplay.com/Password/',
        'sec-ch-ua': '"Google Chrome";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'system-lang': 'en-US',
        'uid': authTokens['uid'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36'
    };

    try {
        console.log('Sending password reset code...');

        const response = await fetch('https://www.fbmplay.com/api/member/pages/sms/send-mobile', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({})
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/reset-password', async (req, res) => {
    const { code, password } = req.body;

    const payload = {
        verificationCode: code,
        password: password
    };

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'api': 'platform',
        'cachekey-app1': authTokens['cachekey-app1'],
        'chyjrtgn-app1': authTokens['chyjrtgn-app1'],
        'client-version': '1.0',
        'content-type': 'application/json',
        'cur-code': '701VHcfdkh76FwQmHFh4239',
        'device-channel': 'Android H5',
        'device-id': '1781431269436936793',
        'device-type': 'H5',
        'platform-code': '1019A5DD0B94185AF2C',
        'referer': 'https://www.fbmplay.com/Password/',
        'sec-ch-ua': '"Google Chrome";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'system-lang': 'en-US',
        'uid': authTokens['uid'],
        'user-agent': 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36'
    };

    try {
        console.log('Resetting password...');
        console.log('Payload:', payload);

        const endpoint = 'https://www.fbmplay.com/api/member/pages/forget//update/password-by-mobile-login';

        console.log('Resetting password with endpoint:', endpoint);
        console.log('Payload:', payload);

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Response:', data);

        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
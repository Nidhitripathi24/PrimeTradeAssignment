const http = require('http');

const testLogin = () => {
    const data = JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    console.log('Testing Login Endpoint...');
    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);

        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            console.log('Response:', body);

            if (res.statusCode === 200) {
                const parsed = JSON.parse(body);
                console.log('\n✓ Login successful!');
                console.log('User:', parsed.name);
                console.log('Token:', parsed.token ? 'Generated' : 'Missing');
            } else {
                console.log('\n✗ Login failed');
            }
        });
    });

    req.on('error', (error) => {
        console.error('Request failed:', error);
    });

    req.write(data);
    req.end();
};

testLogin();

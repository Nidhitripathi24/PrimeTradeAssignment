const http = require('http');

const testSignup = () => {
    const data = JSON.stringify({
        name: 'Test User',
        email: 'test' + Date.now() + '@example.com',
        password: 'password123'
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/auth/signup',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    console.log('Testing Signup Endpoint...');
    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);

        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            console.log('Response:', body);

            // Now test login if signup succeeded
            if (res.statusCode === 201) {
                const parsed = JSON.parse(body);
                console.log('\n✓ Signup successful!');
                console.log('User:', parsed.name);
                console.log('Token:', parsed.token ? 'Generated' : 'Missing');
            } else {
                console.log('\n✗ Signup failed');
            }
        });
    });

    req.on('error', (error) => {
        console.error('Request failed:', error);
    });

    req.write(data);
    req.end();
};

testSignup();

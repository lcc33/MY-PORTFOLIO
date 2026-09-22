await fetch("https://next-api.useplunk.com/v1/send", {
    method: "POST",
    headers: {
        Authorization: "Bearer sk_420e4f9a7223c6ab0002b03e08b31449d245085ff550a9ec9c06a160cbde5e8d",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "to": "bryanedwarding@gmail.com",
        "subject": "Hello from Plunk",
        "body": "<p>Your first email is live.</p>",
        "from": "noreply@muhammadishaq.xyz"
    }),

}).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
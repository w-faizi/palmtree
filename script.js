async function downloadVideo() {
    const url = document.getElementById('tweetUrl').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Fetching...";

    if (!url) {
        resultDiv.innerHTML = "❌ Please enter a tweet URL.";
        return;
    }

    try {
        const apiUrl = `https://twitsave.com/info?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        const text = await res.text();

        // Extract video link from response
        const match = text.match(/href="(https:\/\/video.twimg.com\/[^"]+)"/);
        if (match && match[1]) {
            resultDiv.innerHTML = `<a href="${match[1]}" download target="_blank">⬇ Download Video</a>`;
        } else {
            resultDiv.innerHTML = "❌ Could not find a video in this tweet.";
        }
    } catch (err) {
        resultDiv.innerHTML = "⚠️ Error fetching video.";
    }
}

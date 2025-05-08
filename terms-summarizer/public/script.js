async function summarize() {
    const text = document.getElementById('terms').value;
    const summaryDiv = document.getElementById('summary');
    const loading = document.getElementById('loading');
  
    summaryDiv.textContent = '';
    loading.style.display = 'block';
  
    try {
      const res = await fetch('/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
  
      const data = await res.json();
      summaryDiv.textContent = data.summary || "No summary returned.";
    } catch (err) {
      summaryDiv.textContent = "An error occurred while summarizing.";
    } finally {
      loading.style.display = 'none';
    }
  }
  
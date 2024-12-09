import { useState } from 'react';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [analysisData, setAnalysisData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://youtube-comment-analysis.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl })
      });
      const data = await response.json();
      console.log('Analysis result:', data);
      setAnalysisData(data);
    } catch (error) {
      console.error('Error during analysis:', error);
    }
  };

  return (
    <div className="App" style={{ margin: '20px' }}>
      <h1>Sentiment & Sarcasm Analysis</h1>
      <p>Enter a YouTube video URL and click "Analyze" to see the sentiment and sarcasm analysis.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button type="submit">Analyze</button>
      </form>

      {analysisData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Analysis Results</h2>
          <pre>{JSON.stringify(analysisData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;


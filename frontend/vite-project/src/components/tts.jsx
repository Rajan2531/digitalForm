import { useState } from "react";

function Tts() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("alloy");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSpeech = async () => {
    if (!text.trim()) {
      alert("Please enter text");
      return;
    }

    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch("https://2wwpqd0t-3000.inc1.devtunnels.ms/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice }),
      });

      if (!response.ok) {
        alert("Error generating speech");
        setLoading(false);
        return;
      }

      const audioData = await response.arrayBuffer();
      const blob = new Blob([audioData], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Text to Speech Prototype
        </h1>

        <label className="block mb-2 text-gray-700 font-medium">Enter Text</label>
        <textarea
          className="w-full p-4 h-40 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        ></textarea>

        <label className="block mt-4 mb-2 text-gray-700 font-medium">Choose Voice</label>
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="alloy">Alloy (Default)</option>
          <option value="verse">Verse</option>
          <option value="nova">Nova</option>
          <option value="amber">Amber</option>
        </select>

        <button
          onClick={generateSpeech}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Speech"}
        </button>

        {loading && (
          <div className="text-center mt-4">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}

        {audioUrl && (
          <audio controls className="w-full mt-6">
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
        )}

      </div>
    </div>
  );
}

export default Tts;

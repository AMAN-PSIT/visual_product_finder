import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");   // NEW state for URL input
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let i = 1;
    const stop = 2;
    const interval = setInterval(() => {
      if (i > stop) i = 1;
      const el = document.getElementById(`len${i}`);
      if (el) {
        el.classList.add("bounce");
        setTimeout(() => el.classList.remove("bounce"), 1000);
      }
      i++;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleUpload = async () => {
    if (!file && !imageUrl) return;
    setLoading(true);

    let formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else if (imageUrl) {
      formData.append("image_url", imageUrl);
    }

    try {
      const res = await fetch("https://visualproductfinder-production.up.railway.app/search/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setProducts(data.results || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-inner">
          <ul className="nav-links">
            <li>
              <Link id="len1" className="hoverable" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link id="len2" className="hoverable" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-home">
        <h1>
          <span className="gradient-text">Visual Project</span> Matcher
        </h1>
        <p>Find similar projects by uploading an image or pasting a URL</p>
      </header>

      {/* Upload Section */}
      <section className="upload-box">
        {/* File Upload */}
        <label className="file-upload">
          <input
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              setImageUrl(""); // reset URL if file is chosen
              if (selectedFile) {
                setPreview(URL.createObjectURL(selectedFile));
              }
            }}
          />
          <span>📂 Select an Image</span>
        </label>

        {/* OR URL Input */}
        <input
          type="text"
          placeholder="Or paste an image URL"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setFile(null); // reset file if URL is typed
            setPreview(e.target.value); // show preview from URL
          }}
          className="url-input"
        />

        <button onClick={handleUpload} className="upload-btn">
          {loading ? "Searching..." : "Search"}
        </button>
      </section>

      {/* Preview Uploaded / URL Image */}
      {preview && (
        <div className="preview-box">
          <h3>Selected Image</h3>
          <img src={preview} alt="Uploaded preview" className="preview-img" />
        </div>
      )}

      {/* Loader */}
      {loading && <div className="loader"></div>}

      {/* Results Grid */}
      <div className="card-grid">
        {products.map((p, index) => (
          <div key={index} className="card">
            <figure>
              <img src={p.image_url} alt={p.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <p>{p.category}</p>
              <p className="similarity">
                Similarity: {(p.similarity * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

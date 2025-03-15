import { useRef, useState } from "react";
import { Download, Upload, Palette, ImageIcon, Type } from "lucide-react";
import domtoimage from "dom-to-image-more";
import githubIcon from "../assets/icons/github.svg";
import xIcon from "../assets/icons/twitter.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import { DEFAULT_AVATAR, NOISY_TEXTURE } from "../constants";
const THEMES = {
  classic: {
    name: "Classic Parchment",
    paper: "#e6d36b",
    ink: "#111111",
    textureInk: "#e6d36b",
  },
  sepiaArchive: {
    name: "Sepia Archive",
    paper: "#d8c4a0",
    ink: "#3b2f2f",
    textureInk: "#c9b18a",
  },
  kraftInk: {
    name: "Ink on Kraft",
    paper: "#c2a574",
    ink: "#1c1c1c",
    textureInk: "#b08f5c",
  },
  creamElegance: {
    name: "Cream Elegance",
    paper: "#f5f0e8",
    ink: "#2c2416",
    textureInk: "#ede5d8",
  },
  vintageBlue: {
    name: "Vintage Blue",
    paper: "#b8c5d6",
    ink: "#1a1f2e",
    textureInk: "#9faec0",
  },
};

export default function VintageCardEditor() {
  const cardRef = useRef(null);
  const [paper, setPaper] = useState(THEMES.classic.paper);
  const [ink, setInk] = useState(THEMES.classic.ink);
  const [textureInk, setTextureInk] = useState(THEMES.classic.textureInk);
  const [image, setImage] = useState(DEFAULT_AVATAR);

  const [title, setTitle] = useState("OffCod8");
  const [body, setBody] = useState("I turn curiosity into clickable things.");

  const [socials, setSocials] = useState({
    github: "shashwa7-dev",
    x: "offcod8",
    linkedin: "",
  });

  const [activeTab, setActiveTab] = useState("content");

  const applyTheme = (theme) => {
    setPaper(theme.paper);
    setInk(theme.ink);
    setTextureInk(theme.textureInk);
  };

  const resetTheme = () => applyTheme(THEMES.classic);

  const updateSocial = (key, value) => {
    setSocials((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    await document.fonts.ready;

    const node = cardRef.current;
    const scale = 3;

    const dataUrl = await domtoimage.toPng(node, {
      width: node.offsetWidth * scale,
      height: node.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      },
      cacheBust: true,
      quality: 1,
    });

    const link = document.createElement("a");
    link.download = "vintage-card.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>{"Paper*Noise"}</h1>
        <p>Design cards that feel discovered, not designed.</p>
        <a className="credits" href="https://www.shashwa7.in/" target="_blank">
          {"[Crafted by"}
          <span style={{ color: "#f0f0ff", textDecoration: "underline" }}>
            {" offcod8 Labs"}
          </span>
          {"]"}
        </a>
      </div>
      <div className="editor-layout">
        {/* CARD PREVIEW */}
        <div className="preview-section">
          <div
            ref={cardRef}
            className="card"
            style={{
              "--card-paper": paper,
              "--card-ink": ink,
              "--card-texture-ink": textureInk,
              "--card-texture": `url(${NOISY_TEXTURE})`,
            }}
          >
            <div className="card-content">
              <span className="icon">
                <img src={image} alt="Card visual" />
              </span>

              <div className="content-body">
                <h3 className="title">{title}</h3>
                <p className="description">{body}</p>

                {Object.values(socials).some(Boolean) && (
                  <div className="socials">
                    {Object.entries(socials).map(
                      ([key, value]) =>
                        value && (
                          <div key={key} className="social">
                            <img
                              src={
                                key === "github"
                                  ? githubIcon
                                  : key === "x"
                                  ? xIcon
                                  : linkedinIcon
                              }
                              alt={key}
                            />
                            <p>{`@${value}`}</p>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* CONTROLS */}
        <div className="controls">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "content" ? "active" : ""}`}
              onClick={() => setActiveTab("content")}
            >
              <Type size={18} />
              Content
            </button>
            <button
              className={`tab ${activeTab === "style" ? "active" : ""}`}
              onClick={() => setActiveTab("style")}
            >
              <Palette size={18} />
              Style
            </button>
            <button
              className={`tab ${activeTab === "image" ? "active" : ""}`}
              onClick={() => setActiveTab("image")}
            >
              <ImageIcon size={18} />
              Image
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "content" && (
              <>
                <div className="control-group">
                  <label className="control-label">Title</label>
                  <input
                    className="control-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter card title..."
                  />
                </div>

                <div className="control-group">
                  <label className="control-label">Body Text</label>
                  <textarea
                    className="control-textarea"
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter card description..."
                  />
                </div>

                <div className="control-group">
                  <label className="control-label">Social Links</label>
                  <input
                    className="control-input"
                    placeholder="GitHub username"
                    value={socials.github}
                    onChange={(e) => updateSocial("github", e.target.value)}
                  />
                  <input
                    className="control-input"
                    placeholder="X (Twitter) username"
                    value={socials.x}
                    onChange={(e) => updateSocial("x", e.target.value)}
                  />
                  <input
                    className="control-input"
                    placeholder="LinkedIn username"
                    value={socials.linkedin}
                    onChange={(e) => updateSocial("linkedin", e.target.value)}
                  />
                </div>
              </>
            )}

            {activeTab === "style" && (
              <>
                <div className="control-group">
                  <label className="control-label">Theme Presets</label>
                  <div className="theme-grid">
                    {Object.values(THEMES).map((theme) => (
                      <button
                        key={theme.name}
                        className="theme-btn"
                        onClick={() => applyTheme(theme)}
                      >
                        {theme.name}
                      </button>
                    ))}
                    <button className="theme-btn" onClick={resetTheme}>
                      Reset
                    </button>
                  </div>
                </div>

                <div className="control-group">
                  <label className="control-label">Paper Color</label>
                  <input
                    type="color"
                    className="color-input"
                    value={paper}
                    onChange={(e) => setPaper(e.target.value)}
                  />
                </div>

                <div className="control-group">
                  <label className="control-label">Ink Color</label>
                  <input
                    type="color"
                    className="color-input"
                    value={ink}
                    onChange={(e) => setInk(e.target.value)}
                  />
                </div>

                <div className="control-group">
                  <label className="control-label">Texture Tint</label>
                  <input
                    type="color"
                    className="color-input"
                    value={textureInk}
                    onChange={(e) => setTextureInk(e.target.value)}
                  />
                </div>
              </>
            )}

            {activeTab === "image" && (
              <>
                <div className="control-group">
                  <label className="control-label">Upload Image</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      className="file-input"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <div className="file-input-label">
                      <Upload size={20} />
                      Choose Image
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={downloadCard}
                  style={{ width: "100%" }}
                >
                  <Download size={18} />
                  Download Card
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import VintageCardEditor from "./component/VintageCardEditor";

function App() {
  return (
    <>
      <div className="prod_hunt">
        <a
          href="https://www.producthunt.com/products/papernoise?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-papernoise"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="PaperNoise - Design cards that feel discovered, not designed. | Product Hunt"
            width="150"
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1055230&amp;theme=neutral&amp;t=1766895689630"
          />
        </a>
      </div>
      <VintageCardEditor />
      <p className="brand-overlay">offcod8</p>
    </>
  );
}

export default App;

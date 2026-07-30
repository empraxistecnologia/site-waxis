export function LegalDocument({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) return <h3 key={index}>{block.slice(4)}</h3>;
        if (block.startsWith("## ")) return <section key={index}><h2>{block.slice(3)}</h2></section>;
        if (/^[-*] /m.test(block)) {
          return <ul key={index}>{block.split("\n").map((line) => <li key={line}>{line.replace(/^[-*] /, "")}</li>)}</ul>;
        }
        return <p key={index}>{block.replace(/^#\s+/, "")}</p>;
      })}
    </>
  );
}

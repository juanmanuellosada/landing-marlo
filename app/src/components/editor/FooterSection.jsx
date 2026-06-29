const FooterSection = ({ content, onArrayChange }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Footer / Contacto</h2>
      {content.footer.links.map((link, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-50 rounded">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Texto</label>
              <input
                type="text"
                value={link.text}
                onChange={(e) => onArrayChange('footer.links', index, 'text', e.target.value)}
                className="w-full px-4 py-2 border rounded text-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">URL</label>
              <input
                type="text"
                value={link.url}
                onChange={(e) => onArrayChange('footer.links', index, 'url', e.target.value)}
                className="w-full px-4 py-2 border rounded text-black"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FooterSection;

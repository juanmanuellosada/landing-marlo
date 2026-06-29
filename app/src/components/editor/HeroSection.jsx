const SOCIAL_NETWORKS = ['instagram', 'facebook', 'tiktok', 'pinterest'];

const HeroSection = ({ content, onChange, onArrayChange }) => {
  const { hero } = content;

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Hero / Portada</h2>
      <div className="space-y-6">

        {/* Headline segments */}
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Titular (headline — segmentos)</h3>
          <p className="text-xs text-gray-500 mb-2">Cada segmento tiene texto y un flag de énfasis (fondo naranja). No cambiar el orden sin actualizar el código.</p>
          {hero.headline.map((segment, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <input
                type="text"
                value={segment.text}
                onChange={(e) => onArrayChange('hero.headline', index, 'text', e.target.value)}
                placeholder="Texto"
                className="flex-1 px-4 py-2 border rounded text-black"
              />
              <label className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={segment.emphasis}
                  onChange={(e) => onArrayChange('hero.headline', index, 'emphasis', e.target.checked)}
                />
                Énfasis
              </label>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Subtítulo</label>
          <textarea
            value={hero.subtitle}
            onChange={(e) => onChange('hero.subtitle', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
            rows="2"
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Tagline</label>
          <input
            type="text"
            value={hero.tagline}
            onChange={(e) => onChange('hero.tagline', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>

        {/* Nav links */}
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Links de navegación</h3>
          {hero.nav.map((link, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                value={link.name}
                onChange={(e) => onArrayChange('hero.nav', index, 'name', e.target.value)}
                placeholder="Nombre"
                className="px-4 py-2 border rounded text-black"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => onArrayChange('hero.nav', index, 'href', e.target.value)}
                placeholder="URL"
                className="px-4 py-2 border rounded text-black"
              />
            </div>
          ))}
        </div>

        {/* Products */}
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Productos (grilla hero)</h3>
          {hero.products.map((product, index) => (
            <div key={index} className="border rounded p-3 mb-3 space-y-2 bg-gray-50">
              <p className="text-xs text-gray-500 font-bold">Producto {index + 1}</p>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Título</label>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => onArrayChange('hero.products', index, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 border rounded text-black text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Badge (dejar vacío para sin badge)</label>
                <input
                  type="text"
                  value={product.badge}
                  onChange={(e) => onArrayChange('hero.products', index, 'badge', e.target.value)}
                  className="w-full px-3 py-1.5 border rounded text-black text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Ruta de imagen</label>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) => onArrayChange('hero.products', index, 'image', e.target.value)}
                  className="w-full px-3 py-1.5 border rounded text-black text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">URL (tienda)</label>
                <input
                  type="text"
                  value={product.href}
                  onChange={(e) => onArrayChange('hero.products', index, 'href', e.target.value)}
                  className="w-full px-3 py-1.5 border rounded text-black text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Social media */}
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Redes Sociales</h3>
          <div className="space-y-2">
            {SOCIAL_NETWORKS.map((network) => (
              <div key={network}>
                <label className="block text-gray-600 mb-1 capitalize">{network}</label>
                <input
                  type="text"
                  value={hero.socialMedia[network]}
                  onChange={(e) => onChange(`hero.socialMedia.${network}`, e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

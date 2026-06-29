const CuponSection = ({ content, onChange }) => {
  const { cupon } = content;

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Cupón / Oferta</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="cupon-enabled"
            checked={cupon.enabled}
            onChange={(e) => onChange('cupon.enabled', e.target.checked)}
            className="w-5 h-5"
          />
          <label htmlFor="cupon-enabled" className="text-gray-700 font-bold">
            Mostrar cupón
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Cinta diagonal (ribbon)</label>
          <input
            type="text"
            value={cupon.ribbon}
            onChange={(e) => onChange('cupon.ribbon', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Título</label>
          <input
            type="text"
            value={cupon.title}
            onChange={(e) => onChange('cupon.title', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Línea del cupón</label>
          <input
            type="text"
            value={cupon.couponLine}
            onChange={(e) => onChange('cupon.couponLine', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Subtítulo</label>
          <input
            type="text"
            value={cupon.subtitle}
            onChange={(e) => onChange('cupon.subtitle', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Descuento (badge)</label>
            <input
              type="text"
              value={cupon.badgeDiscount}
              onChange={(e) => onChange('cupon.badgeDiscount', e.target.value)}
              className="w-full px-4 py-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Texto del badge</label>
            <input
              type="text"
              value={cupon.badgeText}
              onChange={(e) => onChange('cupon.badgeText', e.target.value)}
              className="w-full px-4 py-2 border rounded text-black"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">URL destino (href)</label>
          <input
            type="text"
            value={cupon.href}
            onChange={(e) => onChange('cupon.href', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Imagen de fondo (ruta)</label>
          <input
            type="text"
            value={cupon.bgImage}
            onChange={(e) => onChange('cupon.bgImage', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-bold text-gray-700 mb-3">Popup automático</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="popup-enabled"
                checked={cupon.popup.enabled}
                onChange={(e) => onChange('cupon.popup.enabled', e.target.checked)}
                className="w-5 h-5"
              />
              <label htmlFor="popup-enabled" className="text-gray-700">
                Mostrar popup automático
              </label>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Demora antes de abrir (ms)</label>
              <input
                type="number"
                value={cupon.popup.delayMs}
                onChange={(e) =>
                  onChange('cupon.popup.delayMs', parseInt(e.target.value, 10) || 0)
                }
                className="w-full px-4 py-2 border rounded text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuponSection;

// Lets an admin build the small "highlight checklist" shown inside the
// pricing card at the top of a project's detail page — either by ticking
// preset points (6-8, category-specific) or by typing their own custom
// points. Both selections merge into a single `highlights` array of
// { label, icon } stored in the project's `details` JSON.
//
// `value` / `onChange` follow the same controlled-array pattern as the
// whyInvest / FAQ editors elsewhere in these forms.

function IconPreview({ iconType, icon }) {
  if (!icon) return null;
  return iconType === "fa" ? (
    <i className={`${icon} text-[#1a6b32] w-4 text-center`} />
  ) : (
    <span className="material-symbols-outlined text-[#1a6b32] text-[16px]">{icon}</span>
  );
}

export default function HighlightsEditor({ presets, value, onChange }) {
  const { iconType, defaultCustomIcon, options } = presets;

  const isPresetSelected = (label) => value.some((h) => h.label === label && !h.isCustom);

  const togglePreset = (preset) => {
    if (isPresetSelected(preset.label)) {
      onChange(value.filter((h) => h.label !== preset.label));
    } else {
      onChange([...value, { ...preset, isCustom: false }]);
    }
  };

  const customItems = value.filter((h) => h.isCustom);

  const updateCustom = (index, text) => {
    const customIndexes = value.reduce((acc, h, i) => (h.isCustom ? [...acc, i] : acc), []);
    const targetIndex = customIndexes[index];
    const next = [...value];
    next[targetIndex] = { ...next[targetIndex], label: text };
    onChange(next);
  };

  const addCustom = () => {
    onChange([...value, { label: "", icon: defaultCustomIcon, isCustom: true }]);
  };

  const removeCustom = (index) => {
    const customIndexes = value.reduce((acc, h, i) => (h.isCustom ? [...acc, i] : acc), []);
    const targetIndex = customIndexes[index];
    onChange(value.filter((_, i) => i !== targetIndex));
  };

  return (
    <div>
      <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Highlight Checklist</label>
      <p className="text-[10px] text-[#75777f] mb-3">
        Powers the small checklist inside the pricing card at the top of the project's detail page. Pick any of the
        presets below and/or add your own custom points.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {options.map((preset) => (
          <label
            key={preset.label}
            className="flex items-center gap-2 border border-[#c5c6cf] rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-[#f0f3ff] transition-colors"
          >
            <input
              type="checkbox"
              checked={isPresetSelected(preset.label)}
              onChange={() => togglePreset(preset)}
              className="rounded border-[#c5c6cf] text-[#1a6b32] focus:ring-[#1a6b32]"
            />
            <IconPreview iconType={iconType} icon={preset.icon} />
            <span className="text-[#151c27]">{preset.label}</span>
          </label>
        ))}
      </div>

      <div className="space-y-2">
        {customItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="flex-1 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
              value={item.label}
              onChange={(e) => updateCustom(index, e.target.value)}
              placeholder="e.g. Close to Metro Station"
            />
            <button
              type="button"
              onClick={() => removeCustom(index)}
              className="text-[#ba1a1a] text-xs font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addCustom}
        className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
      >
        + Add Custom Point
      </button>
    </div>
  );
}
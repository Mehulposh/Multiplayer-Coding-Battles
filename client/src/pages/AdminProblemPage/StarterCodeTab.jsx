import {
  LANGUAGES,
} from './problemConstants.js';

import FormTextarea
  from './FormTextarea.jsx';

export default function StarterCodeTab({
  form,
  updateField,
}) {
  const updateCode = (
    lang,
    value
  ) => {
    updateField(
      'starterCode',
      {
        ...form.starterCode,
        [lang]: value,
      }
    );
  };

  return (
    <div className="space-y-4 ">
    
      {LANGUAGES.map(
        (lang) => (
          <div
            key={lang}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white capitalize">
                {lang}
              </h3>

              <span className="text-xs text-battle-muted uppercase">
                Starter Code
              </span>
            </div>

            <FormTextarea
              rows={10}
              value={
                form
                  .starterCode?.[
                  lang
                ] || ''
              }
              onChange={(e) =>
                updateCode(
                  lang,
                  e.target
                    .value
                )
              }
              placeholder={`Write ${lang} starter code...`}
            />
          </div>
        )
      )}
    </div>
  );
}
export function getTextBoxHtml(option) {
  return `
    <label class="po-label" for="po_text_box${option._id}" id="po_label${option._id}">${option.label}</label>
    <div class="po-option--container">
      <input class="po-option--type-text" type="text" name="po_text_box${option._id}" id="po_text_box${option._id}">
    </div>
  `;
}

export function getNumberFieldHtml(option) {
  return `
    <label class="po-label" for="po_number_field${option._id}" id="po_label${option._id}">${option.label}</label>
    <div class="po-option--container">
      <input class="po-option--type-number" type="number" name="po_number_field${option._id}" id="po_number_field${option._id}">
    </div>
  `;
}

export function getDropdownMenuHtml(option) {
  return `
    <label class="po-label" for="po_dropdown_menu${option._id}" id="po_label${option._id}">${option.label}</label>
    <div class="po-option--container">
      <select class="po-option--type-dropdown-menu" name="po_dropdown_menu${option._id}" id="po_dropdown_menu${option._id}">
        <option>Please select value</option>
        ${option.dropdownMenu.map((element, index) => {
          return `<option value="${element.optionValue}" name="po_dropdown${option._id}" id="po_dropdown${index}">${element.optionValue}</option>`
        }).join("")}
      </select>
      <svg aria-hidden="true" focusable="false" class="icon icon-caret" viewBox="0 0 10 6">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor">
        </path>
      </svg>
    </div>
  `;
}

export function getCheckboxHtml(option) {
  return `
    <label class="po-label" id="po_label${option._id}">${option.label}</label>
    <div class="po-option--container__inline po-option--checkbox-container">
      ${option.checkbox.map((element, index) => {
        return `
          <div class="po-option--checkbox-wrapper" id="po_checkbox${index}">
            <div class="po-option--type-checkbox">
              <label class="po-label"><input type="checkbox" name="po_checkbox${option._id}" value="${element.optionValue}" id="po_checkbox${index}">${element.optionValue}</label>
            </div>
          </div>
        `
      }).join("")}
    </div>
  `;
}

export function getRadioButtonHtml(option) {
  return `
    <label class="po-label" id="po_label${option._id}">${option.label}</label>
    <div class="po-option--container__inline po-option--radio-container">
      ${option.radioButton.map((element, index) => {
        return `
          <div class="po-option--radioButton-wrapper" id="po_radio_button${index}">
            <div class="po-option--type-radiobutton">
              <label class="po-label"><input type="radio" name="po_radio_button${option._id}" value="${element.optionValue}" id="po_radio_button${index}">${element.optionValue}</label>
            </div>
          </div>
        `
      }).join("")}
    </div>
  `;
}


function getSwatchDisplay(swatch) {
  let swatchHtml = "";
  if (swatch.swatchType === 0 && swatch.colorValue) {
    swatchHtml += `<div class="po-option__color-value" style="background-color: #${swatch.colorValue}; display: block"></div>`
  } else if (swatch.swatchType === 1) {
    swatchHtml += `<div class="po-option__image-value" style="background-image: url(${swatch.imageValue}); display: block"></div>`
  } else {
    swatchHtml += `<div class="po-option__color-value" style="background-color: #ffffff; display: block"></div>`
  }
  return swatchHtml;
}


export function getSwatchHtml(option) {
  return `
    <label class="po-label" id="po_label${option._id}">${option.label}</label>
    <div class="po-option--type-swatch__inline po-option--swatch-container">
      ${option.swatch.map((element, index) => {
        return `
          <div class="po-option--swatch-wrapper" id="po_swatch${index}">
            <label class="po-option__value">
              <input type="radio" name="po_swatch${option._id}" value="${element.optionValue}" id="po_swatch${index}">
              <div class="po-option__swatch-media">
                ${getSwatchDisplay(element)}
              </div>
            </label>
          </div>
        `
      }).join("")}
    </div>
  `
}

export function getButtonHtml(option) {
  return `
    <label class="po-label" id="po_label${option._id}">${option.label}</label>
    <div class="po-option--type-button__inline po-option--button-container">
      ${option.button.map((element, index) => {
        return `
          <div class="po-option--button-wrapper" id="po_button${index}">
            <label class="po-option__value">
              <input type="radio" name="po_button${option._id}" value="${element.optionValue}" id="po_button${index}">
              <div class="po-option__button-media">
                <div class="po-option__button-value">${element.optionValue}</div>
              </div>
            </label>
          </div>
        `
      }).join("")}
    </div>
  `;
}
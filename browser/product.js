import { getTextBoxHtml, getNumberFieldHtml, getDropdownMenuHtml, getCheckboxHtml, getRadioButtonHtml, getSwatchHtml, getButtonHtml } from "./template";
import { addMoneyWithCurrencyFormat } from "./currency";

function getOptionSelector(optionType, optionId) {
  const typeMap = {
    0: "po_text_box",
    1: "po_number_field",
    2: "po_dropdown_menu",
    3: "po_checkbox",
    4: "po_radio_button",
    5: "po_swatch",
    6: "po_button"
  }
  
  return [0, 1, 2].includes(optionType) ? `#${typeMap[optionType]}${optionId}` : `input[name="${typeMap[optionType]}${optionId}"]`;
}

function displayPriceAddOns(option, element, label) {
  if (option.type === 0) {
    const extraPrice = option.textBox.priceAddOn;
    if (label.querySelector(".po-extra-price")) {
      label.querySelector(".po-extra-price").parentNode.removeChild(label.querySelector(".po-extra-price"));
    }
    console.log('extraPrice', addMoneyWithCurrencyFormat("0", extraPrice))
    // let r = `<span class="po-extra-price">(+${addMoneyWithCurrencyFormat("0", extraPrice)})</span>`
  }

}

function addEventToOption(option, element, label, selector) {
  console.log('test', option, label, selector);
  if (option.type === 0) {
    displayPriceAddOns(option, element, label);
  } else if (option.type === 1) {

  } else if (option.type === 2) {
    
  } else if (option.type === 3) {
    
  } else if (option.type === 4) {
    
  } else if (option.type === 5) {
    
  } else if (option.type === 6) {
    
  }
}

function addMetaDataToOptionSet(optionSet) {
  optionSet.options.forEach(option => {
    const optionSelector = getOptionSelector(option.type, option._id);
    const label = document.querySelector(`#po_label${option._id}`);
    if (option.type === 0) {
      const element = document.querySelector(optionSelector);
      addEventToOption(option, element, label, optionSelector);
    } else if (option.type === 1) {
      // const test = document.querySelector(optionSelector);
      // console.log('test1', test)
    } else if (option.type === 2) {
      // const test = document.querySelector(optionSelector);
      // console.log('test2', test)
    } else if (option.type === 3) {
      // const test = document.querySelector(optionSelector);
      // console.log('test3', test)
    } else if (option.type === 4) {
      // const test = document.querySelector(optionSelector);
      // console.log('test4', test)
    } else if (option.type === 5) {
      // const test = document.querySelector(optionSelector);
      // console.log('test5', test)
    } else if (option.type === 6) {
      // const test = document.querySelector(optionSelector);
      // console.log('test6', test)
    }
  })
}

function checkAppliedOptionSet(optionSet, customer, productId, collections, tags) {
  const { applyToCustomer, customerIds, customerTags, applyToProduct, productIds, productCollections, productTags} = optionSet;
  if (applyToCustomer === 1 && !customer.id) {
    return;
  } else if (applyToCustomer === 2 && customer.id) {
    return;
  } else if (applyToCustomer === 3 && (!customer.id || !customerIds.indexOf(customer.id))) {
    return;
  } else if (applyToCustomer === 4 && (!customer.tags || !customerTags.filter(tag => customer.tags.includes(tag)).length)) {
    return;
  }

  if (applyToProduct === 0) {
    return true;
  } else if (applyToProduct === 1 && productIds.indexOf(productId)) {
    return true;
  } else if (applyToProduct === 2 && productCollections.filter(collection => collections.includes(collection)).length) {
    return true;
  } else if (applyToProduct === 3 && productTags.filter(tag => tags.includes(tag)).length) {
    return true;
  }
  return false;
}

function getAppliedOptionSet(storeData) {
  const { product: { id, tags }, collections, customer } = storeData;
  const optionSets = HOA_PO.optionSets;
  for (let i = 0; i < optionSets.length; i++) {
    if (checkAppliedOptionSet(optionSets[i], customer, id, collections, tags)) return optionSets[i];
  }
}

function getOptionHtml(optionSet) {
  const options = optionSet.options.sort((first, second) => { return first.order - second.order });
  let optionHtml = `<div class="hoa-po-product-page">`
  options.forEach(option => {
    optionHtml += `<div class="po-stack po-stack--vertical" id="po_stack${option._id}">`
    if (option.type === 0) {
      optionHtml += getTextBoxHtml(option);
    } else if (option.type === 1) {
      optionHtml += getNumberFieldHtml(option);
    } else if (option.type === 2) {
      optionHtml += getDropdownMenuHtml(option);
    } else if (option.type === 3) {
      optionHtml += getCheckboxHtml(option);
    } else if (option.type === 4) {
      optionHtml += getRadioButtonHtml(option);
    } else if (option.type === 5) {
      optionHtml += getSwatchHtml(option);
    } else {
      optionHtml += getButtonHtml(option);
    }
    optionHtml += `</div>`
  });
  optionHtml += "</div>";
  return optionHtml;
}

export function generateOptionSet(storeData) {
  const optionSet = getAppliedOptionSet(storeData);
  const optionHtml = getOptionHtml(optionSet);
  document.querySelector('form[action*="/cart/add"]').insertAdjacentHTML("afterbegin", optionHtml);
  addMetaDataToOptionSet(optionSet);
}
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

function displayPriceAddOns(option, element, label, priceAddOn, priceAddOns) {
  if (label.querySelector(".po-extra-price")) {
    label.querySelector(".po-extra-price").parentNode.removeChild(label.querySelector(".po-extra-price"));
  }

  if ([0, 1].includes(option.type)) {
    if (element.value.length > 0 && priceAddOn) {
      const priceHtml = `<span class="po-extra-price">( +${addMoneyWithCurrencyFormat("0", priceAddOn)} )</span>`;
      label.insertAdjacentHTML("beforeend", priceHtml);
    }
  } else if (option.type === 2) {
    const optionValues = option.dropdownMenu.map(item => item.optionValue);
    const index = optionValues.indexOf(element.value);

    if (index !== -1 && priceAddOns[index]) {
      const priceHtml = `<span class="po-extra-price">( +${addMoneyWithCurrencyFormat("0", priceAddOns[index])} )</span>`;
      label.insertAdjacentHTML("beforeend", priceHtml);
    }
  } else {
    let totalPrice = 0;
    element.forEach((el, index) => {
      if (el.checked) {
        totalPrice += priceAddOns[index];
      }
    });

    if (totalPrice) {
      const priceHtml = `<span class="po-extra-price">( +${addMoneyWithCurrencyFormat("0", totalPrice)} )</span>`;
      label.insertAdjacentHTML("beforeend", priceHtml);
    }
  }
}

function displayChosenValues(option, checkedSelectors) {
  const stack = document.querySelectorAll(`#po_stack${option._id}`)[0];
  if (stack.querySelector(".po-selected")) {
    stack.querySelector(".po-selected").parentNode.removeChild(stack.querySelector(".po-selected"));
  }

  let values = [];
  const checkedElements = document.querySelectorAll(checkedSelectors);
  checkedElements.forEach(element => {
    values.push(element.value);
  })
  
  const valueHtml = `<div class="po-selected"><span>${values.join(", ")}</span></div>`;
  stack.querySelector(".po-label").insertAdjacentHTML("afterend", valueHtml);
}

function addEventToOption(option, element, label, selector) {
  let priceAddOn, priceAddOns;

  switch(option.type) {
    case 0:
      priceAddOn = option.textBox.priceAddOn;
      break;
    case 1: 
      priceAddOn = option.numberField.priceAddOn;
      break;
    case 2:
      priceAddOns = option.dropdownMenu.map(item => item.priceAddOn);
      break;
    case 3:
      priceAddOns = option.checkbox.map(item => item.priceAddOn);
      break;
    case 4:
      priceAddOns = option.radioButton.map(item => item.priceAddOn);
      break;
    case 5:
      priceAddOns = option.swatch.map(item => item.priceAddOn);
      break;
    case 6:
      priceAddOns = option.button.map(item => item.priceAddOn);
      break;
  }

  if ([0, 1].includes(option.type)) {
    element.addEventListener("input", () => {
      if (HOA_PO.priceAddOns) displayPriceAddOns(option, element, label, priceAddOn, null);
    });
  } else if (option.type === 2) {
    element.addEventListener("input", () => {
      if (HOA_PO.priceAddOns) displayPriceAddOns(option, element, label, null, priceAddOns);
    });
  } else {
    const valueSelector = `${selector}:checked`;
    element.forEach((el) => {
      el.addEventListener("click", () => {
        if (option.type === 5) displayChosenValues(option, valueSelector);
        if (HOA_PO.priceAddOns) displayPriceAddOns(option, element, label, null, priceAddOns);
      });
    });
  }
}

function addMetaDataToOptionSet(optionSet) {
  optionSet.options.forEach(option => {
    const optionSelector = getOptionSelector(option.type, option._id);
    const label = document.querySelector(`#po_label${option._id}`);
    
    if ([0, 1, 2].includes(option.type)) {
      const element = document.querySelector(optionSelector);
      addEventToOption(option, element, label, optionSelector);
    } else {
      const elements = document.querySelectorAll(optionSelector);
      addEventToOption(option, elements, label, optionSelector);
    }
  })
}

function checkAppliedOptionSet(optionSet, customer, productId, collections, tags) {
  const { applyToCustomer, customerIds, customerTags, applyToProduct, productIds, productCollections, productTags} = optionSet;

  if (applyToCustomer === 1 && !customer.id) {
    return;
  } else if (applyToCustomer === 2 && customer.id) {
    return;
  } else if (applyToCustomer === 3 && (!customer.id || customerIds.indexOf(customer.id) === -1)) {
    return;
  } else if (applyToCustomer === 4 && (!customer.tags || !customerTags.filter(tag => customer.tags.includes(tag)).length)) {
    return;
  }

  if (applyToProduct === 0) {
    return true;
  } else if (applyToProduct === 1 && productIds.indexOf(productId) !== -1) {
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

function handleAddToCart(optionSet, product) {
  const addToCartButton = document.querySelector('form[action*="/cart/add"] button[type="submit"]');
  addToCartButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let selectedOptions = new Map();
    let totalPrice = 0;

    optionSet.options.forEach(option => {
      const optionSelector = getOptionSelector(option.type, option._id);
      if (option.type === 0) {
        const element = document.querySelector(optionSelector);
        const textBoxValue = element.value;

        if (textBoxValue.length > 0 && textBoxValue.trim()) {
          totalPrice += option.textBox.priceAddOn;
          selectedOptions.set(option.label, textBoxValue);
        }
      } else if (option.type === 1) {
        const element = document.querySelector(optionSelector);
        const numberFieldValue = element.value;

        if (numberFieldValue.length > 0 && !isNaN(numberFieldValue)) {
          totalPrice += option.numberField.priceAddOn;
          selectedOptions.set(option.label, numberFieldValue);
        }
      } else if (option.type === 2) {
        const element = document.querySelector(optionSelector);
        const dropdownMenuValue = element.value;
        const priceAddOns = option.dropdownMenu.map(item => item.priceAddOn);
        const optionValues = option.dropdownMenu.map(item => item.optionValue);
        const index = optionValues.indexOf(dropdownMenuValue);

        if (index !== -1) {
          totalPrice += priceAddOns[index];
          selectedOptions.set(option.label, dropdownMenuValue);
        }
      } else {
        let priceAddOns;
        if (option.type === 3) {
          priceAddOns = option.checkbox.map(item => item.priceAddOn);
        } else if (option.type === 4) {
          priceAddOns = option.radioButton.map(item => item.priceAddOn);
        } else if (option.type === 5) {
          priceAddOns = option.swatch.map(item => item.priceAddOn);
        } else {
          priceAddOns = option.button.map(item => item.priceAddOn);
        }


        let values = [];
        const elements = document.querySelectorAll(optionSelector);

        elements.forEach((element, index) => {
          if (element.checked) {
            totalPrice += priceAddOns[index];
            values.push(element.value);
          }
        });

        if (values.length) {
          selectedOptions.set(option.label, values.join(", "));
        }
      }
    });

    let variantId;
    if (product.variants.length > 1) {
      let variants = [];
      const variantSelects = document.querySelectorAll('variant-selects select');
      variantSelects.forEach(variant => {
        variants.push(variant.value);
      });
  
      const variantTitle = variants.join(" / ");
      variantId = product.variants.find(variant => variant.title === variantTitle).id;
    } else {
      variantId = product.variants[0].id;
    }

    const properties = Object.fromEntries(selectedOptions);
    const quantitySelect = document.querySelector(".product-form__input.product-form__quantity .quantity__input");
    const quantity = parseInt(quantitySelect.value);

    const data = {
      items: [{
        id: variantId,
        quantity: quantity,
        properties: properties
      }]
    }

    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      window.location.pathname = "/cart";
    });
  });
}

export function generateOptionSet(storeData) {
  const optionSet = getAppliedOptionSet(storeData);
  const optionHtml = getOptionHtml(optionSet);
  document.querySelector('form[action*="/cart/add"]').insertAdjacentHTML("afterbegin", optionHtml);
  addMetaDataToOptionSet(optionSet);
  handleAddToCart(optionSet, storeData.product);
}
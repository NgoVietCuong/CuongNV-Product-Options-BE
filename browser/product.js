import { getTextBoxHtml, getNumberFieldHtml, getDropdownMenuHtml, getCheckboxHtml, getRadioButtonHtml, getSwatchHtml, getButtonHtml } from "./template";

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

function getOptionHtml(storeData) {
  const optionSet = getAppliedOptionSet(storeData);
  const options = optionSet.options.sort((first, second) => { return first.order - second.order });
  let optionHtml = `<div class="hoa-po-product-page">`
  options.forEach(option => {
    optionHtml += `<div class="po-stack po-stack--vertical" id="po_stack${option._id}>`
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
  const optionHtml = getOptionHtml(storeData);
  console.log("optionHtml", optionHtml);
  document.querySelector('form[action*="/cart/add"]').insertAdjacentHTML("afterbegin", optionHtml);
}
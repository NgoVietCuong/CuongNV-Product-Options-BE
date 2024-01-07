import { isProductPage } from "./common";
import { generateOptionSet } from "./product";

(function() {
  if (typeof HOA_PO === "undefined") {
    var HOA_PO = {};
  }
  
  if (document.querySelector("#hoa-po-store-data")) {
    const storeData = JSON.parse(document.querySelector("#hoa-po-store-data").innerHTML);
    storeData.shop.money_format.replace(/<\/?[^>]+>/gi, "");

    setTimeout(() => {
      if (isProductPage) {
        generateOptionSet(storeData);
      }
    }, 500);
  }
})();
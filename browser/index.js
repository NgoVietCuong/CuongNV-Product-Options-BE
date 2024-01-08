import { isProductPage } from "./common";
import { generateOptionSet } from "./product";

(function() {
  if (document.querySelector("#hoa-po-store-data")) {
    const storeData = JSON.parse(document.querySelector("#hoa-po-store-data").innerHTML);
    HOA_PO.shop={}
    HOA_PO.shop.money_format = storeData.shop.money_format.replace(/<\/?[^>]+>/gi, "");
    console.log("check", HOA_PO);

    setTimeout(() => {
      if (isProductPage && HOA_PO.appStatus) {
        generateOptionSet(storeData);
      }
    }, 500);
  }
})();
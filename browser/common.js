export function getPage() {
  return window.location.href.split("/");
}

export function isProductPage() {
  let page = BSS_PO.page.getPage();
  return page.includes("products");
}

export function isCartPage() {
  let page = BSS_PO.page.getPage();
  return page.includes("cart");
}
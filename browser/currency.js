export function addMoneyWithCurrencyFormat(o, n) {
  let i = "";
  let r = /\{\{\s*(\w+)\s*\}\}/;
  let a = HOA_PO.shop.money_format;

  console.log('r', r)

  function c(e, t) {
    return 0 === e ? t : e
  }

  function formatMoney(e, t, o, n, i) {
    if (o = c(o, 2),
        n = c(n, ","),
        i = c(i, "."),
        isNaN(e) || null == e || isNaN(t) || null == t)
        return 0;
    let r = (e = (Number(e) + Number(t))
            .toFixed(o))
        .split(".");
    return r[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + n) + (r[1] ? i + r[1] : "")
  }

  switch (a.match(r)[1]) {
    case "amount":
        "INR" == Shopify.currency.active && ("string" == typeof o && 0 == o.indexOf(".") && (o = o.replace(".", "")),
        "string" == typeof n && 0 == n.indexOf(".") && (n = n.replace(".", "")));
        i = formatMoney(o, n, 2);
        break;
    case "amount_no_decimals":
        i = formatMoney(o, n, 0);
        break;
    case "amount_with_comma_separator":
        "string" == typeof o && o.includes(",") && (o = o.replace(/\./g, "")
            .replace(",", ".")),
        "string" == typeof n && (n = n.replace(/\./g, "")
            .replace(",", "."));
        i = formatMoney(o, n, 2, ".", ",");
        break;
    case "amount_no_decimals_with_comma_separator":
        "string" == typeof o && (o = o.replace(/\./g, "")),
        "string" == typeof n && (n = n.replace(/\./g, ""));
        i = formatMoney(o, n, 0, ".", ",");
        break;
    case "amount_with_apostrophe_separator":
        "string" == typeof o && (o = o.replace(/\'/g, "")),
            "string" == typeof n && (n = n.replace(/\'/g, "")),
        i = formatMoney(o, n, 2, "'", ".");
    }

    return a.replace(r, i);
}
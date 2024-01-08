export function addMoneyWithCurrencyFormat(value, ) {
  let i = "",
  r = /\{\{\s*(\w+)\s*\}\}/,
  a = HOA_PO.shop.money_format;

  function c(e, t) {
    return void 0 === e ? t : e
  }

  function l(e, t, o, n, i) {
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
        if ("function" == typeof bssFixSupportFormatMoneyAmount) {
            let t = bssFixSupportFormatMoneyAmount(e, o, n);
            o = t[0],
                n = t[1]
        } else
            "INR" == Shopify.currency.active && ("string" == typeof o && 0 == o.indexOf(".") && (o = o.replace(".", "")),
                "string" == typeof n && 0 == n.indexOf(".") && (n = n.replace(".", "")));
        i = l(o, n, 2);
        break;
    case "amount_no_decimals":
        i = l(o, n, 0);
        break;
    case "amount_with_comma_separator":
        if ("function" == typeof bssFixSupportFormatMoneyAmountWithCommaSeparator) {
            let t = bssFixSupportFormatMoneyAmountWithCommaSeparator(e, o, n);
            o = t[0],
                n = t[1]
        } else
            "string" == typeof o && o.includes(",") && (o = o.replace(/\./g, "")
                .replace(",", ".")),
            "string" == typeof n && (n = n.replace(/\./g, "")
                .replace(",", "."));
        i = l(o, n, 2, ".", ",");
        break;
    case "amount_no_decimals_with_comma_separator":
        if ("function" == typeof bssFixSupportFormatMoneyAmountNoDecimalsWithCommaSeparator) {
            let t = bssFixSupportFormatMoneyAmountNoDecimalsWithCommaSeparator(e, o, n);
            o = t[0],
                n = t[1]
        } else
            "string" == typeof o && (o = o.replace(/\./g, "")),
            "string" == typeof n && (n = n.replace(/\./g, ""));
        i = l(o, n, 0, ".", ",");
        break;
    case "amount_with_apostrophe_separator":
        "string" == typeof o && (o = o.replace(/\'/g, "")),
            "string" == typeof n && (n = n.replace(/\'/g, "")),
            i = l(o, n, 2, "'", ".")
  }
}
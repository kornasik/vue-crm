export function getNested(obj, ...args) {
  return args.reduce((obj, level) => obj && obj[level], obj);
}

export function isExist(obj, ...args) {
  return Boolean(args.reduce((obj, level) => obj && obj[level], obj));
}

export function getPropFromArrayByParentPropertyAndValue(array, parentProp, parentPropValue, requiredField) {
  var o;
  array.some(function iter(a) {
    if (parseInt(a[parentProp]) === parseInt(parentPropValue)) {
      o = a;
      return true;
    }
    return Array.isArray(a[requiredField]) && a[requiredField].some(iter);
  });
  return o;
}

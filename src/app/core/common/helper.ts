export class Util {
  static CompareArray(array1, array2): boolean {

    // Get the value type
    var type = Object.prototype.toString.call(array1);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(array2)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? array1.length : Object.keys(array1).length;
    var otherLen = type === '[object Array]' ? array2.length : Object.keys(array2).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1, item2) {

      // Get the object type
      var itemType = Object.prototype.toString.call(item1);

      // If an object or array, compare recursively
      if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
        if (!Util.CompareArray(item1, item2)) return false;
      }

      // Otherwise, do a simple comparison
      else {

        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) return false;

        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (itemType === '[object Function]') {
          if (item1.toString() !== item2.toString()) return false;
        } else {
          if (item1 !== item2) return false;
        }

      }
    };

    // Compare properties
    if (type === '[object Array]') {
      for (var i = 0; i < valueLen; i++) {
        if (compare(array1[i], array2[i]) === false) return false;
      }
    } else {
      for (var key in array1) {
        if (array1.hasOwnProperty(key)) {
          if (compare(array1[key], array2[key]) === false) return false;
        }
      }
    }

    // If nothing failed, return true
    return true;
  };

  static guid(): string {
    return this.guidS4() + this.guidS4() + '-' +
      this.guidS4() + '-' + this.guidS4() + '-' +
      this.guidS4() + '-' + this.guidS4() + this.guidS4() + this.guidS4();
  }

  static cloneData(data: any): any {
    return Object.assign({}, data);
  }

  private static guidS4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
class Calculator {
  constructor() {
    this.value = "";
    this.lastValues = [];
    this.element = document.getElementById("res");
    this.ops = ["div", "mod", "*", "-", "+"];
    this.errorMsg = false;
  }

  concat(num) {
    if (this.value.endsWith(num) && !num.match(/\d/)) return;

    if (this.value[0] == "0" && this.value.length == 1 && num == "0") return;

    if (this.value[0] == "0" && this.value.length == 1 && num.match(/\d/))
      this.value = "";

    this.lastValues.push(this.value);
    this.value += num;
    this.update();
  }

  isCorrectNum(value) {
    try {
      eval(value);
    } catch (err) {
      return false;
    }
    return true;
  }

  renumber(value) {
    if (value.startsWith("0")) value = value.replace(/^0+/, "");
    return value;
  }

  calculate() {
    for (const op of this.ops) {
      if (this.value.endsWith(op)) {
        return this.error();
      }
    }
    let value = this.value;
    const toReplace = { div: "/", mod: "%" };
    for (const op of ["div", "mod"]) {
      while (value.indexOf(op) != -1) {
        let error = false;
        value = value.replace(
          new RegExp("([0-9\\.]+)" + "\\" + op + "([0-9\\.]+)"),
          (v, a, b) => {
            a = this.renumber(a);
            b = this.renumber(b);
            if (this.isCorrectNum(a) && this.isCorrectNum(b))
              return String(Math.floor(eval(a + toReplace[op] + b)));
            else error = true;
          }
        );
        if (error) return this.error();
      }
    }
    for (const op of ["*", "/", "+", "-"]) {
      while (value.indexOf(op) != -1) {
        let error = false;
        value = value.replace(
          new RegExp("([0-9\\.]+)" + "\\" + op + "([0-9\\.]+)"),
          (v, a, b) => {
            a = this.renumber(a);
            b = this.renumber(b);
            if (this.isCorrectNum(a) && this.isCorrectNum(b))
              return String(eval(a + op + b));
            else error = true;
          }
        );
        if (error) return this.error();
      }
    }
    this.value = value;
    this.update();
  }

  update() {
    if (this.value == "") {
      this.element.value = "0";
      return;
    }
    if (this.errorMsg) {
      this.element.value = "Syntax error";
      return;
    }
    let res = this.value;
    const ops = [/div/gi, /mod/gi, /\*/gi, /\-/gi, /\+/gi];
    for (const op of ops) {
      res = res.replace(op, (a) => " " + a + " ");
    }
    this.element.value = res;
  }

  error() {
    this.errorMsg = true;
    this.update();
  }

  clear() {
    this.errorMsg = false;
    this.value = "";
    this.lastValues = [];
    this.update();
  }

  back() {
    if (this.lastValues.length != 0) {
      const last = this.lastValues.pop();
      this.value = last;
      this.errorMsg = false;
      this.update();
    }
  }
}

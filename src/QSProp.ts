class QSProp {
  private __name: string;
  private __eq: string = '';
  private __ne: string = '';
  private __in: (string | number)[] = [];
  private __nin: (string | number)[] = [];
  private __gt: string = '';
  private __gte: string = '';
  private __lt: string = '';
  private __lte: string = '';
  private __regex: string = '';

  constructor(name: string) {
    this.__name = name;
  }
  eq(...value: (string | number)[]): QSProp {
    this.__eq = `${value}`.trim();
    return this;
  }
  ne(...value: (string | number)[]): QSProp {
    this.__ne = `${value}`.trim();
    return this;
  }
  in(...value: (string | number)[]): QSProp {
    this.__in = value;
    return this;
  }
  nin(...value: (string | number)[]): QSProp {
    this.__nin = value;
    return this;
  }
  gt(...value: (string | number)[]): QSProp {
    this.__gt = `${value}`.trim();
    return this;
  }
  gte(...value: (string | number)[]): QSProp {
    this.__gte = `${value}`.trim();
    return this;
  }
  lt(...value: (string | number)[]): QSProp {
    this.__lt = `${value}`.trim();
    return this;
  }
  lte(...value: (string | number)[]): QSProp {
    this.__lte = `${value}`.trim();
    return this;
  }
  regex(value: string | RegExp): QSProp {
    this.__regex = `${value}`.trim();
    return this;
  }

  toString() {
    const parts: string[] = [];
    if (this.__eq.length) {
      parts.push(`eq:${this.__eq}`);
    }
    if (this.__ne.length) {
      parts.push(`ne:${this.__ne}`);
    }
    if (this.__in.length) {
      parts.push(`in:${this.__in}`);
    }
    if (this.__nin.length) {
      parts.push(`nin:${this.__nin}`);
    }
    if (this.__gt.length) {
      parts.push(`gt:${this.__gt}`);
    }
    if (this.__gte.length) {
      parts.push(`gte:${this.__gte}`);
    }
    if (this.__lt.length) {
      parts.push(`lt:${this.__lt}`);
    }
    if (this.__lte.length) {
      parts.push(`lte:${this.__lte}`);
    }
    if (this.__regex.length) {
      parts.push(`regex:${this.__regex}`);
    }

    if (parts.length) {
      return `${this.__name}=${parts.join(',')}`;
    } else {
      return '';
    }
  }
}

export default QSProp;

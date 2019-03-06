class QSProp {
  private __name: string;
  private __eq: string[] = [];
  private __ne: string[] = [];
  private __in: string[] = [];
  private __nin: string[] = [];
  private __gt: string[] = [];
  private __gte: string[] = [];
  private __lt: string[] = [];
  private __lte: string[] = [];
  private __regex: string = '';

  constructor(name: string) {
    this.__name = name;
  }
  eq(...value: (string | number)[]): QSProp {
    this.__eq.push(`${value}`.trim());
    return this;
  }
  ne(...value: (string | number)[]): QSProp {
    this.__ne.push(`${value}`.trim());
    return this;
  }
  in(...value: (string | number)[]): QSProp {
    this.__in.push(`${value}`.trim());
    return this;
  }
  nin(...value: (string | number)[]): QSProp {
    this.__nin.push(`${value}`.trim());
    return this;
  }
  gt(...value: (string | number)[]): QSProp {
    this.__gt.push(`${value}`.trim());
    return this;
  }
  gte(...value: (string | number)[]): QSProp {
    this.__gte.push(`${value}`.trim());
    return this;
  }
  lt(...value: (string | number)[]): QSProp {
    this.__lt.push(`${value}`.trim());
    return this;
  }
  lte(...value: (string | number)[]): QSProp {
    this.__lte.push(`${value}`.trim());
    return this;
  }
  regex(value: string | RegExp): QSProp {
    this.__regex = `${value}`.trim();
    return this;
  }

  toString() {
    const parts: string[] = [];
    if (this.__eq.length) {
      parts.push(`${this.__name}=eq:${this.__eq.join(',')}`);
    }
    if (this.__ne.length) {
      parts.push(`${this.__name}=ne:${this.__ne.join(',')}`);
    }
    if (this.__in.length) {
      parts.push(`${this.__name}=in:${this.__in.join(',')}`);
    }
    if (this.__nin.length) {
      parts.push(`${this.__name}=nin:${this.__nin.join(',')}`);
    }
    if (this.__gt.length) {
      parts.push(`${this.__name}=gt:${this.__gt.join(',')}`);
    }
    if (this.__gte.length) {
      parts.push(`${this.__name}=gte:${this.__gte.join(',')}`);
    }
    if (this.__lt.length) {
      parts.push(`${this.__name}=lt:${this.__lt.join(',')}`);
    }
    if (this.__lte.length) {
      parts.push(`${this.__name}=lte:${this.__lte.join(',')}`);
    }
    if (this.__regex.length) {
      parts.push(`${this.__name}=regex:${this.__regex}`);
    }

    if (parts.length) {
      return parts.join('&');
    } else {
      return '';
    }
  }
}

export default QSProp;

import encodeurl from 'encodeurl';
import QSProp from './QSProp';

class QSBuilder {
  __prop: { [prop: string]: QSProp } = {};
  __limit: number = 0;
  __skip: number = 0;
  __sort: string[] = [];
  __search: string = '';

  prop(name: string) {
    if (this.__prop[name]) {
      return this.__prop[name];
    }
    {
      const prop = new QSProp(name);
      this.__prop[name] = prop;
      return prop;
    }
  }

  limit(value: number): QSBuilder {
    this.__limit = value;
    return this;
  }

  skip(value: number): QSBuilder {
    this.__skip = value;
    return this;
  }

  sort(prop: string, direction: -1 | 1): QSBuilder {
    this.__sort.push(`${direction === -1 ? 'desc' : 'asc'}:${prop}`);
    return this;
  }

  search(text: string): QSBuilder {
    this.__search = text;
    return this;
  }

  toString(): string {
    const parts = [];
    if (this.__limit > 0) {
      parts.push(`limit=${this.__limit}`);
    }
    if (this.__skip > 0) {
      parts.push(`skip=${this.__skip}`);
    }
    if (this.__sort.length) {
      parts.push(`sort=${this.__sort.join(',')}`);
    }
    if (this.__search) {
      parts.push(`search=${this.search}`);
    }
    for (let k in this.__prop) {
      const prop = this.__prop[k];
      const part = prop.toString();
      if (part) {
        parts.push(part);
      }
    }
    return encodeurl(parts.join('&'));
  }
}

export { QSBuilder };

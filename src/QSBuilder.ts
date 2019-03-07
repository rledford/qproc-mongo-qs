import encodeurl from 'encodeurl';
import { QSProp } from './QSProp';

class QSBuilder {
  __prop: { [prop: string]: QSProp } = {};
  __limit: number = 0;
  __skip: number = 0;
  __sort: string[] = [];
  __search: string = '';
  __limitKey: string = 'limit';
  __skipKey: string = 'skip';
  __sortKey: string = 'sort';
  __searchKey: string = 'search';

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
  limitKey(key: string): QSBuilder {
    this.__limitKey = key || this.__limitKey;
    return this;
  }

  skip(value: number): QSBuilder {
    this.__skip = value;
    return this;
  }
  skipKey(key: string): QSBuilder {
    this.__skipKey = key || this.__skipKey;
    return this;
  }

  sort(prop: string, direction: -1 | 1): QSBuilder {
    this.__sort.push(`${direction === -1 ? 'desc' : 'asc'}:${prop}`);
    return this;
  }
  sortKey(key: string): QSBuilder {
    this.__sortKey = key || this.__sortKey;
    return this;
  }

  search(searchTerm: string | number): QSBuilder {
    this.__search = `${searchTerm}`;
    return this;
  }
  searchKey(key: string): QSBuilder {
    this.__searchKey = key || this.__searchKey;
    return this;
  }

  toString(): string {
    const parts = [];
    if (this.__limit > 0) {
      parts.push(`${this.__limitKey}=${this.__limit}`);
    }
    if (this.__skip > 0) {
      parts.push(`${this.__skipKey}=${this.__skip}`);
    }
    if (this.__sort.length) {
      parts.push(`${this.__sortKey}=${this.__sort.join(',')}`);
    }
    if (this.__search) {
      parts.push(`${this.__searchKey}=${this.search}`);
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

import encodeurl from 'encodeurl';
import { QSParam } from './QSParam';

class QSBuilder {
  __param: { [prop: string]: QSParam } = {};
  __limit: number = 0;
  __skip: number = 0;
  __sort: string[] = [];
  __search: string = '';
  __limitKey: string = 'limit';
  __skipKey: string = 'skip';
  __sortKey: string = 'sort';
  __searchKey: string = 'search';

  param(name: string) {
    if (this.__param[name]) {
      return this.__param[name];
    }
    {
      const param = new QSParam(name);
      this.__param[name] = param;
      return param;
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

  sort(param: string, direction: -1 | 1): QSBuilder {
    this.__sort.push(`${direction === -1 ? 'desc' : 'asc'}:${param}`);
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
    for (let k in this.__param) {
      const param = this.__param[k];
      const part = param.toString();
      if (part) {
        parts.push(part);
      }
    }
    return encodeurl(parts.join('&'));
  }
}

export { QSBuilder };

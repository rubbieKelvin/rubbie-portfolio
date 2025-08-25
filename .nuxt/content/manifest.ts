export const checksums = {
  "blog": "v3.3.0--vHJ6qT1DnX",
  "books": "v3.3.0--TTkuiUOUBU"
}
export const checksumsStructure = {
  "blog": "VgzffKAiBP",
  "books": "TTkuiUOUBU"
}

export const tables = {
  "blog": "_content_blog",
  "books": "_content_books",
  "info": "_content_info"
}

export default {
  "blog": {
    "type": "page",
    "fields": {
      "id": "string",
      "stem": "string",
      "extension": "string",
      "meta": "json",
      "path": "string",
      "title": "string",
      "description": "string",
      "seo": "json",
      "body": "json",
      "navigation": "json",
      "tags": "json",
      "date": "string"
    }
  },
  "books": {
    "type": "page",
    "fields": {
      "id": "string",
      "stem": "string",
      "extension": "string",
      "meta": "json",
      "path": "string",
      "title": "string",
      "description": "string",
      "seo": "json",
      "body": "json",
      "navigation": "json"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}
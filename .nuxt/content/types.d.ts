import type { PageCollectionItemBase, DataCollectionItemBase } from '@nuxt/content'

declare module '@nuxt/content' {
  interface BlogCollectionItem extends PageCollectionItemBase {
    title: string;
    tags?: string[] | undefined;
    description: string;
    date: string;
  }
  interface BooksCollectionItem extends PageCollectionItemBase {
    title: string;
  }

  interface PageCollections {
    blog: BlogCollectionItem
    books: BooksCollectionItem
  }

  interface Collections {
    blog: BlogCollectionItem
    books: BooksCollectionItem
  }
}

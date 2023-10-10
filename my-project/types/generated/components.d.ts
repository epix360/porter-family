import type { Schema, Attribute } from '@strapi/strapi';

export interface AuthorByline extends Schema.Component {
  collectionName: 'components_author_bylines';
  info: {
    displayName: 'Byline';
  };
  attributes: {
    Name: Attribute.String;
    Photo: Attribute.Media & Attribute.Required;
    Tagline: Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'author.byline': AuthorByline;
    }
  }
}

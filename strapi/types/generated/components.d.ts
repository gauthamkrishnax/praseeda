import type { Schema, Struct } from '@strapi/strapi';

export interface HomeLinks extends Struct.ComponentSchema {
  collectionName: 'components_home_links';
  info: {
    displayName: 'link';
    icon: 'bulletList';
  };
  attributes: {
    googleDrive: Schema.Attribute.Boolean;
    googleDriveID: Schema.Attribute.String;
    LinkTitle: Schema.Attribute.String;
    linkUrl: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.links': HomeLinks;
    }
  }
}

import React from 'react';

export interface MenuItem {
  label: string;
  key: string;
  path: string;
  filepath: string;
  redirect?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  routes?: MenuItem[];
  name?: string;
  // element?: { element: () => Promise<{ [key: string]: any }> };
}

export interface CommonObject {
  [key: string]: any;
}

export declare namespace ModesApi {
  type ParamsType = Record<string, any>;

  type SitesItem = ParamsType & {
    id: number;
    siteKey: string;
    name: string;
    address: string;
    domainName: string;
    ico: string;
    description: string;
    isDelete: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
  };

  type pageItemType = ParamsType & {
    pageSize: number | undefined;
    current: number | undefined;
    keyword: string | undefined;
  };
}

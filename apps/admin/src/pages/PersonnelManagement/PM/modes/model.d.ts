export declare namespace ModesApi {
  type ParamsType = Record<string, any>;

  type SitesItem = ParamsType & {
    id: number;
  };

  type pageItemType = ParamsType & {
    pageSize: number | undefined;
    current: number | undefined;
    keyword: string | undefined;
  };
}

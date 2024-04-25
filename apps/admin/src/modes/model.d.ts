export declare namespace ModesApi {
  type ParamsType = Record<string, any>;

  type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels?: {
      name: string;
      color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
  };

  type SitesItem = ParamsType & {
    id: number;
    name: string;
    ico: string | React.ReactNode;
    orderNum: string | number;
    roleKey: string | number;
    component: string;
    path: string;
    isDelete: string | number;
  };

  type pageItemType = ParamsType & {
    pageSize: number | undefined;
    current: number | undefined;
    keyword: string | undefined;
  };

  type DictTypeVO = ParamsType & {
    dictType: string
    label: string
    colorType: string
    value: number
    cssClass: string
  };
}

export interface ISSRService {
  VueSSR(params: { title: string; url: string }): Promise<any>;
}

export interface ILink{
  shortUrl: string,
  originalUrl: string,
}

export type ILinkWithOutShortUrl = Omit<ILink, "shortUrl">
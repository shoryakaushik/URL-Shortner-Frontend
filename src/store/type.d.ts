interface IUrl {
    id?: string;
    originalUrl: string;
    shortUrl?: string;
    createdBy?: string;
    createdTime?: Date;
    expirationTime: Date;
    accessedBy?: String[];
}

type UrlState = {
    urls: IUrl[]
}

type UrlAction = {
    type: string
    payload: Iurl
}

type DispatchType = (args: UrlAction) => UrlAction;
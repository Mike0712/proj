export interface Currency {
    id: number,
    isoNum: number,
    isoCode: string,
    fractNum: number | null,
    translations: string[],
    newTranslations: string[],
    currentLocale: string,
    defaultLocale: string,
    __initializer__?: null | string,
    __cloner__?: null | string,
    __isInitialized__?: boolean
}

export interface AccountDebt {
    id: number,
    docName: string,
    docDate: string | null,
    amount: number,
    currency: Currency,
    deadline: string,
    deletedAt: string | null,
    createdAt: string,
    updatedAt: string,
    deleted: boolean
}

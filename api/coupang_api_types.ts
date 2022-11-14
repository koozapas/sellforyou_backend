export interface ICOutboudShippingPlaceResponse {
    content: ICOutboudShippingPlaceContent[]
    pagination: ICPagination
}

export interface ICOutboudShippingPlaceContent {
    outboundShippingPlaceCode: number
    shippingPlaceName: string
    createDate: string
    placeAddresses: ICOutboudShippingPlacePlaceAddress[]
    remoteInfos: ICOutboudShippingPlaceRemoteInfo[]
    usable: boolean
}

export interface ICOutboudShippingPlacePlaceAddress {
    addressType: string
    countryCode: string
    companyContactNumber: string
    phoneNumber2: string
    returnZipCode: string
    returnAddress: string
    returnAddressDetail: string
}

export interface ICOutboudShippingPlaceRemoteInfo {
    remoteInfoId: number
    deliveryCode: string
    jeju: number
    notJeju: number
    usable: boolean
}




export interface ICReturnShippingCentersResponse {
    code: number
    message: string
    data: ICReturnShippingCentersData
}

export interface ICReturnShippingCentersData {
    content: ICReturnShippingCentersContent[]
    pagination: ICPagination
}

export interface ICReturnShippingCentersContent {
    vendorId: string
    returnCenterCode: string
    shippingPlaceName: string
    deliverCode: string
    deliverName: string
    goodsflowStatus: string
    errorMessage: string
    /**
     * 생성일, new Date() 안에 바로 넣으면 됨
     */
    createdAt: number
    vendorCreditFee02kg: number
    vendorCreditFee05kg: number
    vendorCreditFee10kg: number
    vendorCreditFee20kg: number
    vendorCashFee02kg: number
    vendorCashFee05kg: number
    vendorCashFee10kg: number
    vendorCashFee20kg: number
    consumerCashFee02kg: number
    consumerCashFee05kg: number
    consumerCashFee10kg: number
    consumerCashFee20kg: number
    returnFee02kg: number
    returnFee05kg: number
    returnFee10kg: number
    returnFee20kg: number
    usable: boolean
    placeAddresses: ICReturnShippingCentersPlaceAddress[]
}

export interface ICReturnShippingCentersPlaceAddress {
    addressType: string
    countryCode: string
    companyContactNumber: string
    phoneNumber2: string
    returnZipCode: string
    returnAddress: string
    returnAddressDetail: string
}










export interface ICPagination {
    currentPage: number
    countPerPage: number
    totalPages: number
    totalElements: number
}

export interface ICErrorResponse {
    code: string
    message: string
    transactionId: string
}



export interface ICProductRegisterErrorResponse {
    code: "ERROR"
    message: string[]
    data: null
}
export interface ICProductRegisterSuccessResponse {
    code: "SUCCESS"
    message: string
    data: number
}

export type ICProductRegisterResponse = ICProductRegisterErrorResponse | ICProductRegisterSuccessResponse;

export const calculatePrice: any = (cnyPrice: string | number, marginRate: number, marginUnitType: string, cnyRate: number, shippingFee: number ,calculateWonType : number ) => {
    if (marginUnitType === "WON") {
        return Math.round((Math.floor(parseFloat(cnyPrice.toString()) * cnyRate) + shippingFee + marginRate) / calculateWonType) * calculateWonType;
    } else {
        return Math.round((Math.floor(parseFloat(cnyPrice.toString()) * cnyRate) + shippingFee) * (100 + marginRate) / (100*calculateWonType)) * calculateWonType;
    }
}
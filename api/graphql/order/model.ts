import {  inputObjectType,objectType } from "nexus";

export const t_order = objectType({
    name: "order",
    definition(t) {
        t.model.id();//인덱스 AI,PK
        t.model.userId();//유저정보 FK   
        t.model.productId(); 
        t.model.marketCode();//쇼핑몰구분
        t.model.orderNo();//주문번호       (쇼핑몰구분+주문번호) =UQ
        t.model.taobaoOrderNo();//소싱처주문번호
        t.model.productName();//상품명
        t.model.orderQuantity();//주문수량
        t.model.productOptionContents();//옵션정보
        t.model.sellerProductManagementCode();//판매자관리코드
        t.model.orderMemberName();//주문자
        t.model.orderMemberTelNo();//주문자전화번호
        t.model.productPayAmt();//결제금액
        t.model.deliveryFeeAmt();//배송비
        t.model.individualCustomUniqueCode();//개인통관고유부호
        t.model.receiverName();//수령자
        t.model.receiverTelNo1();//수령자전화번호
        t.model.receiverIntegratedAddress();//배송지
        t.model.receiverZipCode();//우편번호
        t.model.productOrderMemo();//배송메시지
        t.model.state();//주문상태 FK
        t.model.orderStateEnum();
        // t.model.productId();
        // t.model.order();
        // t.model.name();
        // t.model.isNameTranslated();
        // t.model.taobaoPid();
        // t.model.product();
        // t.model.isActive();
        // t.model.productOptionValue({
        //     filtering: true,
        //     ordering: true,
        //     pagination: true,
        //     resolve: async (src, args, ctx, info, ori) => {
        //         try {
        //             args.orderBy = [{ number: "asc" }, ...(args.orderBy ?? [])]
        //             return ori(src, args, ctx, info);
        //         } catch (e) {
        //             return throwError(e, ctx);
        //         }
        //     }
        // });
    }
});



export const t_orderStateEnum = objectType({
    name: "orderStateEnum",
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.description();
    }
});


export const t_InputNewOrder = inputObjectType({
    name : "newOrderInput",
    definition(t){
        t.nonNull.string("marketCode");
        t.nonNull.string("orderNo");
        t.nonNull.int("orderQuantity");
        t.string("taobaoOrderNo");
        t.nonNull.string("productName");
        t.string("productOptionContents");
        t.string("sellerProductManagementCode");
        t.nonNull.string("orderMemberName");
        t.nonNull.string("orderMemberTelNo");
        t.nonNull.int("productPayAmt");
        t.nonNull.int("deliveryFeeAmt");
        t.string("individualCustomUniqueCode");
        t.nonNull.string("receiverName");
        t.nonNull.string("receiverTelNo1");
        t.nonNull.string("receiverIntegratedAddress");
        t.nonNull.string("receiverZipCode");
        t.string("productOrderMemo");
    }
})
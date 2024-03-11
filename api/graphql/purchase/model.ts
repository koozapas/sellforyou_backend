import { inputObjectType, objectType } from 'nexus';

export interface PurchaseLogPlanInfoType {
	id: number;
	planLevel: number | null;
	name: string;
	month: number;
	price: number;
	externalFeatureVariableId: string | null;
}

export const t_PlanInfo = objectType({
	name: 'PlanInfo',
	definition(t) {
		t.model.id();
		t.model.planLevel();
		t.model.name();
		t.model.description();
		t.model.month();
		t.model.price();
		t.model.externalFeatureVariableId();
		t.model.isActive();
	},
});

export const t_PurchaseLog = objectType({
	name: 'PurchaseLog',
	definition(t) {
		t.model.id();
		t.model.userId();
		t.model.payAmount();
		t.model.payId();
		t.model.state();
		t.model.planInfo();
		t.model.type();
		t.model.purchasedAt();
		t.model.expiredAt();
		t.model.user();
	},
});

export const t_purchaseInputs = inputObjectType({
	name: 'purchaseInputs',
	definition(t) {
		t.nonNull.int('userId');
		t.nonNull.int('planInfoId');
		t.nonNull.date('expiredAt');
	},
});

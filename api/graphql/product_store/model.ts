import { objectType } from 'nexus';

export const t_ProductStore = objectType({
	name: 'ProductStore',
	definition(t) {
		t.model.id();
		t.model.productId();
		t.model.userId();
		t.model.user();
		t.model.siteCode();
		t.model.state();
		t.model.productStoreState();
		t.model.storeProductId();
		t.model.product();
		t.model.productStoreLog({
			filtering: true,
			ordering: true,
			pagination: true,
		});
		t.model.etcVendorItemId();
		t.model.storeUrl();
		t.model.connectedAt();
		t.model.cnt();
		t.model.inflow();
	},
});

export const t_ProductStoreState = objectType({
	name: 'ProductStoreState',
	definition(t) {
		t.model.id();
		t.model.name();
		t.model.description();
	},
});
export const t_ProductStoreLog = objectType({
	name: 'ProductStoreLog',
	definition(t) {
		t.model.id();
		t.model.productStoreId();
		t.model.jobId();
		t.model.destState();
		t.model.uploadState();
		t.model.errorMessage();
		t.model.createdAt();
		t.model.modifiedAt();
		t.model.productStoreState();
		t.model.productstore();
		t.model.productStoreLogEnum();
	},
});

export const productStoreLogEnum = objectType({
	name: 'productStoreLogEnum',
	definition(t) {
		t.model.id();
		t.model.state();
	},
});

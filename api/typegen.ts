import { FileUpload } from "./types"

import { Context } from "./types"
import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AdminOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdToken?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    loginId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    password?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    token?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  AdminWhereInput: { // input type
    AND?: NexusGenInputs['AdminWhereInput'][] | null; // [AdminWhereInput!]
    NOT?: NexusGenInputs['AdminWhereInput'][] | null; // [AdminWhereInput!]
    OR?: NexusGenInputs['AdminWhereInput'][] | null; // [AdminWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    createdToken?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    loginId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    password?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
    state?: NexusGenInputs['EnumAdminStateFilter'] | null; // EnumAdminStateFilter
    token?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
  }
  BoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  BoolNullableFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolNullableFilter'] | null; // NestedBoolNullableFilter
  }
  CategoryInfoA001OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoA001WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoA001WhereInput'][] | null; // [CategoryInfoA001WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoA001WhereInput'][] | null; // [CategoryInfoA001WhereInput!]
    OR?: NexusGenInputs['CategoryInfoA001WhereInput'][] | null; // [CategoryInfoA001WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoA006OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoA006WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoA006WhereInput'][] | null; // [CategoryInfoA006WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoA006WhereInput'][] | null; // [CategoryInfoA006WhereInput!]
    OR?: NexusGenInputs['CategoryInfoA006WhereInput'][] | null; // [CategoryInfoA006WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoA027OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoA027WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoA027WhereInput'][] | null; // [CategoryInfoA027WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoA027WhereInput'][] | null; // [CategoryInfoA027WhereInput!]
    OR?: NexusGenInputs['CategoryInfoA027WhereInput'][] | null; // [CategoryInfoA027WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoA077ListRelationFilter: { // input type
    every?: NexusGenInputs['CategoryInfoA077WhereInput'] | null; // CategoryInfoA077WhereInput
    none?: NexusGenInputs['CategoryInfoA077WhereInput'] | null; // CategoryInfoA077WhereInput
    some?: NexusGenInputs['CategoryInfoA077WhereInput'] | null; // CategoryInfoA077WhereInput
  }
  CategoryInfoA077OrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  CategoryInfoA077OrderByWithRelationInput: { // input type
    categoryInfoA001?: NexusGenInputs['CategoryInfoA001OrderByWithRelationInput'] | null; // CategoryInfoA001OrderByWithRelationInput
    categoryInfoA006?: NexusGenInputs['CategoryInfoA006OrderByWithRelationInput'] | null; // CategoryInfoA006OrderByWithRelationInput
    categoryInfoA027?: NexusGenInputs['CategoryInfoA027OrderByWithRelationInput'] | null; // CategoryInfoA027OrderByWithRelationInput
    categoryInfoA112?: NexusGenInputs['CategoryInfoA112OrderByWithRelationInput'] | null; // CategoryInfoA112OrderByWithRelationInput
    categoryInfoA113?: NexusGenInputs['CategoryInfoA113OrderByWithRelationInput'] | null; // CategoryInfoA113OrderByWithRelationInput
    categoryInfoA524?: NexusGenInputs['CategoryInfoA524OrderByWithRelationInput'] | null; // CategoryInfoA524OrderByWithRelationInput
    categoryInfoA525?: NexusGenInputs['CategoryInfoA525OrderByWithRelationInput'] | null; // CategoryInfoA525OrderByWithRelationInput
    categoryInfoB378?: NexusGenInputs['CategoryInfoB378OrderByWithRelationInput'] | null; // CategoryInfoB378OrderByWithRelationInput
    categoryInfoB719?: NexusGenInputs['CategoryInfoB719OrderByWithRelationInput'] | null; // CategoryInfoB719OrderByWithRelationInput
    categoryInfoB956?: NexusGenInputs['CategoryInfoB956OrderByWithRelationInput'] | null; // CategoryInfoB956OrderByWithRelationInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeA001?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeA006?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeA027?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeA112?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeA113?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeA524?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeA525?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeB378?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeB719?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeB956?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoA077WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoA077WhereInput'][] | null; // [CategoryInfoA077WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoA077WhereInput'][] | null; // [CategoryInfoA077WhereInput!]
    OR?: NexusGenInputs['CategoryInfoA077WhereInput'][] | null; // [CategoryInfoA077WhereInput!]
    categoryInfoA001?: NexusGenInputs['CategoryInfoA001WhereInput'] | null; // CategoryInfoA001WhereInput
    categoryInfoA006?: NexusGenInputs['CategoryInfoA006WhereInput'] | null; // CategoryInfoA006WhereInput
    categoryInfoA027?: NexusGenInputs['CategoryInfoA027WhereInput'] | null; // CategoryInfoA027WhereInput
    categoryInfoA112?: NexusGenInputs['CategoryInfoA112WhereInput'] | null; // CategoryInfoA112WhereInput
    categoryInfoA113?: NexusGenInputs['CategoryInfoA113WhereInput'] | null; // CategoryInfoA113WhereInput
    categoryInfoA524?: NexusGenInputs['CategoryInfoA524WhereInput'] | null; // CategoryInfoA524WhereInput
    categoryInfoA525?: NexusGenInputs['CategoryInfoA525WhereInput'] | null; // CategoryInfoA525WhereInput
    categoryInfoB378?: NexusGenInputs['CategoryInfoB378WhereInput'] | null; // CategoryInfoB378WhereInput
    categoryInfoB719?: NexusGenInputs['CategoryInfoB719WhereInput'] | null; // CategoryInfoB719WhereInput
    categoryInfoB956?: NexusGenInputs['CategoryInfoB956WhereInput'] | null; // CategoryInfoB956WhereInput
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeA001?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeA006?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeA027?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeA112?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeA113?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeA524?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeA525?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeB378?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeB719?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeB956?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoA112OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoA112WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoA112WhereInput'][] | null; // [CategoryInfoA112WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoA112WhereInput'][] | null; // [CategoryInfoA112WhereInput!]
    OR?: NexusGenInputs['CategoryInfoA112WhereInput'][] | null; // [CategoryInfoA112WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoA113OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoA113WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoA113WhereInput'][] | null; // [CategoryInfoA113WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoA113WhereInput'][] | null; // [CategoryInfoA113WhereInput!]
    OR?: NexusGenInputs['CategoryInfoA113WhereInput'][] | null; // [CategoryInfoA113WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoA524OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoA524WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoA524WhereInput'][] | null; // [CategoryInfoA524WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoA524WhereInput'][] | null; // [CategoryInfoA524WhereInput!]
    OR?: NexusGenInputs['CategoryInfoA524WhereInput'][] | null; // [CategoryInfoA524WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoA525OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoA525WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoA525WhereInput'][] | null; // [CategoryInfoA525WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoA525WhereInput'][] | null; // [CategoryInfoA525WhereInput!]
    OR?: NexusGenInputs['CategoryInfoA525WhereInput'][] | null; // [CategoryInfoA525WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoB378OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    codeA077?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoB378WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoB378WhereInput'][] | null; // [CategoryInfoB378WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoB378WhereInput'][] | null; // [CategoryInfoB378WhereInput!]
    OR?: NexusGenInputs['CategoryInfoB378WhereInput'][] | null; // [CategoryInfoB378WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    codeA077?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoB719OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoB719WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoB719WhereInput'][] | null; // [CategoryInfoB719WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoB719WhereInput'][] | null; // [CategoryInfoB719WhereInput!]
    OR?: NexusGenInputs['CategoryInfoB719WhereInput'][] | null; // [CategoryInfoB719WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  CategoryInfoB956OrderByWithRelationInput: { // input type
    category_info_a077?: NexusGenInputs['CategoryInfoA077OrderByRelationAggregateInput'] | null; // CategoryInfoA077OrderByRelationAggregateInput
    code?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth5?: NexusGenEnums['SortOrder'] | null; // SortOrder
    depth6?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
  }
  CategoryInfoB956WhereInput: { // input type
    AND?: NexusGenInputs['CategoryInfoB956WhereInput'][] | null; // [CategoryInfoB956WhereInput!]
    NOT?: NexusGenInputs['CategoryInfoB956WhereInput'][] | null; // [CategoryInfoB956WhereInput!]
    OR?: NexusGenInputs['CategoryInfoB956WhereInput'][] | null; // [CategoryInfoB956WhereInput!]
    category_info_a077?: NexusGenInputs['CategoryInfoA077ListRelationFilter'] | null; // CategoryInfoA077ListRelationFilter
    code?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth5?: NexusGenInputs['StringFilter'] | null; // StringFilter
    depth6?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
  }
  DateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  DateTimeNullableFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeNullableFilter'] | null; // NestedDateTimeNullableFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  EnumAdminStateFilter: { // input type
    equals?: NexusGenEnums['AdminState'] | null; // AdminState
    in?: NexusGenEnums['AdminState'][] | null; // [AdminState!]
    not?: NexusGenInputs['NestedEnumAdminStateFilter'] | null; // NestedEnumAdminStateFilter
    notIn?: NexusGenEnums['AdminState'][] | null; // [AdminState!]
  }
  EnumPurchaseLogStateFilter: { // input type
    equals?: NexusGenEnums['PurchaseLogState'] | null; // PurchaseLogState
    in?: NexusGenEnums['PurchaseLogState'][] | null; // [PurchaseLogState!]
    not?: NexusGenInputs['NestedEnumPurchaseLogStateFilter'] | null; // NestedEnumPurchaseLogStateFilter
    notIn?: NexusGenEnums['PurchaseLogState'][] | null; // [PurchaseLogState!]
  }
  EnumPurchaseLogTypeFilter: { // input type
    equals?: NexusGenEnums['PurchaseLogType'] | null; // PurchaseLogType
    in?: NexusGenEnums['PurchaseLogType'][] | null; // [PurchaseLogType!]
    not?: NexusGenInputs['NestedEnumPurchaseLogTypeFilter'] | null; // NestedEnumPurchaseLogTypeFilter
    notIn?: NexusGenEnums['PurchaseLogType'][] | null; // [PurchaseLogType!]
  }
  EnumUserStateFilter: { // input type
    equals?: NexusGenEnums['UserState'] | null; // UserState
    in?: NexusGenEnums['UserState'][] | null; // [UserState!]
    not?: NexusGenInputs['NestedEnumUserStateFilter'] | null; // NestedEnumUserStateFilter
    notIn?: NexusGenEnums['UserState'][] | null; // [UserState!]
  }
  FloatFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatFilter'] | null; // NestedFloatFilter
    notIn?: number[] | null; // [Float!]
  }
  FloatNullableFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatNullableFilter'] | null; // NestedFloatNullableFilter
    notIn?: number[] | null; // [Float!]
  }
  IntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntFilter'] | null; // NestedIntFilter
    notIn?: number[] | null; // [Int!]
  }
  IntNullableFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntNullableFilter'] | null; // NestedIntNullableFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedBoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  NestedBoolNullableFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolNullableFilter'] | null; // NestedBoolNullableFilter
  }
  NestedDateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedDateTimeNullableFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeNullableFilter'] | null; // NestedDateTimeNullableFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedEnumAdminStateFilter: { // input type
    equals?: NexusGenEnums['AdminState'] | null; // AdminState
    in?: NexusGenEnums['AdminState'][] | null; // [AdminState!]
    not?: NexusGenInputs['NestedEnumAdminStateFilter'] | null; // NestedEnumAdminStateFilter
    notIn?: NexusGenEnums['AdminState'][] | null; // [AdminState!]
  }
  NestedEnumPurchaseLogStateFilter: { // input type
    equals?: NexusGenEnums['PurchaseLogState'] | null; // PurchaseLogState
    in?: NexusGenEnums['PurchaseLogState'][] | null; // [PurchaseLogState!]
    not?: NexusGenInputs['NestedEnumPurchaseLogStateFilter'] | null; // NestedEnumPurchaseLogStateFilter
    notIn?: NexusGenEnums['PurchaseLogState'][] | null; // [PurchaseLogState!]
  }
  NestedEnumPurchaseLogTypeFilter: { // input type
    equals?: NexusGenEnums['PurchaseLogType'] | null; // PurchaseLogType
    in?: NexusGenEnums['PurchaseLogType'][] | null; // [PurchaseLogType!]
    not?: NexusGenInputs['NestedEnumPurchaseLogTypeFilter'] | null; // NestedEnumPurchaseLogTypeFilter
    notIn?: NexusGenEnums['PurchaseLogType'][] | null; // [PurchaseLogType!]
  }
  NestedEnumUserStateFilter: { // input type
    equals?: NexusGenEnums['UserState'] | null; // UserState
    in?: NexusGenEnums['UserState'][] | null; // [UserState!]
    not?: NexusGenInputs['NestedEnumUserStateFilter'] | null; // NestedEnumUserStateFilter
    notIn?: NexusGenEnums['UserState'][] | null; // [UserState!]
  }
  NestedFloatFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatFilter'] | null; // NestedFloatFilter
    notIn?: number[] | null; // [Float!]
  }
  NestedFloatNullableFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatNullableFilter'] | null; // NestedFloatNullableFilter
    notIn?: number[] | null; // [Float!]
  }
  NestedIntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntFilter'] | null; // NestedIntFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedIntNullableFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntNullableFilter'] | null; // NestedIntNullableFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedStringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  NestedStringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  NoticeOrderByWithRelationInput: { // input type
    attachmentFile?: NexusGenEnums['SortOrder'] | null; // SortOrder
    content?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isVisible?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    viewCount?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  NoticeWhereInput: { // input type
    AND?: NexusGenInputs['NoticeWhereInput'][] | null; // [NoticeWhereInput!]
    NOT?: NexusGenInputs['NoticeWhereInput'][] | null; // [NoticeWhereInput!]
    OR?: NexusGenInputs['NoticeWhereInput'][] | null; // [NoticeWhereInput!]
    attachmentFile?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    content?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isVisible?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    viewCount?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  NoticeWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  OrderListRelationFilter: { // input type
    every?: NexusGenInputs['orderWhereInput'] | null; // orderWhereInput
    none?: NexusGenInputs['orderWhereInput'] | null; // orderWhereInput
    some?: NexusGenInputs['orderWhereInput'] | null; // orderWhereInput
  }
  PlanInfoOrderByWithRelationInput: { // input type
    description?: NexusGenEnums['SortOrder'] | null; // SortOrder
    externalFeatureVariableId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    month?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    planLevel?: NexusGenEnums['SortOrder'] | null; // SortOrder
    price?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  PlanInfoWhereInput: { // input type
    AND?: NexusGenInputs['PlanInfoWhereInput'][] | null; // [PlanInfoWhereInput!]
    NOT?: NexusGenInputs['PlanInfoWhereInput'][] | null; // [PlanInfoWhereInput!]
    OR?: NexusGenInputs['PlanInfoWhereInput'][] | null; // [PlanInfoWhereInput!]
    description?: NexusGenInputs['StringFilter'] | null; // StringFilter
    externalFeatureVariableId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    month?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    planLevel?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    price?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  PlanInfoWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductListRelationFilter: { // input type
    every?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    none?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    some?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
  }
  ProductNewThumbnailImageUpdateInput: { // input type
    index: number; // Int!
    uploadImageBase64?: string | null; // String
  }
  ProductOptionInput: { // input type
    defaultShippingFee?: number | null; // Int
    isActive?: boolean | null; // Boolean
    price?: number | null; // Int
    productOptionId: number; // Int!
    stock?: number | null; // Int
  }
  ProductOptionListRelationFilter: { // input type
    every?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    none?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    some?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
  }
  ProductOptionNameInput: { // input type
    name?: string | null; // String
    productIds: number; // Int!
  }
  ProductOptionNameListRelationFilter: { // input type
    every?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
    none?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
    some?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
  }
  ProductOptionNameOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionNameOrderByWithRelationInput: { // input type
    hasImage?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isNameTranslated?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    order?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByWithRelationInput'] | null; // ProductOrderByWithRelationInput
    productId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOptionValue?: NexusGenInputs['ProductOptionValueOrderByRelationAggregateInput'] | null; // ProductOptionValueOrderByRelationAggregateInput
    taobaoPid?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionNameUpdateInput: { // input type
    id: number; // Int!
    name: string; // String!
  }
  ProductOptionNameWhereInput: { // input type
    AND?: NexusGenInputs['ProductOptionNameWhereInput'][] | null; // [ProductOptionNameWhereInput!]
    NOT?: NexusGenInputs['ProductOptionNameWhereInput'][] | null; // [ProductOptionNameWhereInput!]
    OR?: NexusGenInputs['ProductOptionNameWhereInput'][] | null; // [ProductOptionNameWhereInput!]
    hasImage?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolNullableFilter'] | null; // BoolNullableFilter
    isNameTranslated?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    order?: NexusGenInputs['IntFilter'] | null; // IntFilter
    product?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    productId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productOptionValue?: NexusGenInputs['ProductOptionValueListRelationFilter'] | null; // ProductOptionValueListRelationFilter
    taobaoPid?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  ProductOptionNameWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductOptionOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionOrderByWithRelationInput: { // input type
    defaultShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionString?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue1Id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue2Id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue3Id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue4Id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue5Id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    price?: NexusGenEnums['SortOrder'] | null; // SortOrder
    priceCny?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByWithRelationInput'] | null; // ProductOrderByWithRelationInput
    productId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOption1?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'] | null; // ProductOptionValueOrderByWithRelationInput
    productOption2?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'] | null; // ProductOptionValueOrderByWithRelationInput
    productOption3?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'] | null; // ProductOptionValueOrderByWithRelationInput
    productOption4?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'] | null; // ProductOptionValueOrderByWithRelationInput
    productOption5?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'] | null; // ProductOptionValueOrderByWithRelationInput
    stock?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoSkuId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionUQ_product_id_sku_idCompoundUniqueInput: { // input type
    productId: number; // Int!
    taobaoSkuId: string; // String!
  }
  ProductOptionUQ_product_optionCompoundUniqueInput: { // input type
    optionValue1Id: number; // Int!
    optionValue2Id: number; // Int!
    optionValue3Id: number; // Int!
    optionValue4Id: number; // Int!
    optionValue5Id: number; // Int!
  }
  ProductOptionUpdateInput: { // input type
    id: number; // Int!
    isActive: boolean; // Boolean!
    price: number; // Int!
    stock: number; // Int!
  }
  ProductOptionValueBySomeOne: { // input type
    newImage: NexusGenScalars['Upload']; // Upload!
  }
  ProductOptionValueImageUpdateInput: { // input type
    id: number; // Int!
    image?: string | null; // String
    newImageBase64?: string | null; // String
  }
  ProductOptionValueInput: { // input type
    name?: string | null; // String
    productOptionValueId: number; // Int!
  }
  ProductOptionValueListRelationFilter: { // input type
    every?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    none?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    some?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
  }
  ProductOptionValueOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionValueOrderByWithRelationInput: { // input type
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    image?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isNameTranslated?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    number?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionNameOrder?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionValue1?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    optionValue2?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    optionValue3?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    optionValue4?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    optionValue5?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    originalName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOptionName?: NexusGenInputs['ProductOptionNameOrderByWithRelationInput'] | null; // ProductOptionNameOrderByWithRelationInput
    productOptionNameId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoVid?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOptionValueUpdateInput: { // input type
    id: number; // Int!
    image?: string | null; // String
    isActive?: boolean | null; // Boolean
    name: string; // String!
    newImage?: NexusGenScalars['Upload'] | null; // Upload
    newImageBase64?: string | null; // String
  }
  ProductOptionValueWhereInput: { // input type
    AND?: NexusGenInputs['ProductOptionValueWhereInput'][] | null; // [ProductOptionValueWhereInput!]
    NOT?: NexusGenInputs['ProductOptionValueWhereInput'][] | null; // [ProductOptionValueWhereInput!]
    OR?: NexusGenInputs['ProductOptionValueWhereInput'][] | null; // [ProductOptionValueWhereInput!]
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    image?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    isActive?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    isNameTranslated?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    number?: NexusGenInputs['IntFilter'] | null; // IntFilter
    optionNameOrder?: NexusGenInputs['IntFilter'] | null; // IntFilter
    optionValue1?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    optionValue2?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    optionValue3?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    optionValue4?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    optionValue5?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    originalName?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    productOptionName?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
    productOptionNameId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    taobaoVid?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  ProductOptionValueWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductOptionWhereInput: { // input type
    AND?: NexusGenInputs['ProductOptionWhereInput'][] | null; // [ProductOptionWhereInput!]
    NOT?: NexusGenInputs['ProductOptionWhereInput'][] | null; // [ProductOptionWhereInput!]
    OR?: NexusGenInputs['ProductOptionWhereInput'][] | null; // [ProductOptionWhereInput!]
    defaultShippingFee?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    optionString?: NexusGenInputs['StringFilter'] | null; // StringFilter
    optionValue1Id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    optionValue2Id?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    optionValue3Id?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    optionValue4Id?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    optionValue5Id?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    price?: NexusGenInputs['IntFilter'] | null; // IntFilter
    priceCny?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    product?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    productId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productOption1?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    productOption2?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    productOption3?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    productOption4?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    productOption5?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    stock?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    taobaoSkuId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  ProductOptionWhereUniqueInput: { // input type
    UQ_product_id_sku_id?: NexusGenInputs['ProductOptionUQ_product_id_sku_idCompoundUniqueInput'] | null; // ProductOptionUQ_product_id_sku_idCompoundUniqueInput
    UQ_product_option?: NexusGenInputs['ProductOptionUQ_product_optionCompoundUniqueInput'] | null; // ProductOptionUQ_product_optionCompoundUniqueInput
    id?: number | null; // Int
  }
  ProductOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductOrderByWithRelationInput: { // input type
    admin?: NexusGenInputs['AdminOrderByWithRelationInput'] | null; // AdminOrderByWithRelationInput
    adminId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    attribute?: NexusGenEnums['SortOrder'] | null; // SortOrder
    auctionFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    brandName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryA001?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryA006?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryA027?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryA077?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryA112?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryA113?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryA524?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryA525?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryB378?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryB719?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryB956?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryEsm?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryInfoA001?: NexusGenInputs['CategoryInfoA001OrderByWithRelationInput'] | null; // CategoryInfoA001OrderByWithRelationInput
    categoryInfoA006?: NexusGenInputs['CategoryInfoA006OrderByWithRelationInput'] | null; // CategoryInfoA006OrderByWithRelationInput
    categoryInfoA027?: NexusGenInputs['CategoryInfoA027OrderByWithRelationInput'] | null; // CategoryInfoA027OrderByWithRelationInput
    categoryInfoA077?: NexusGenInputs['CategoryInfoA077OrderByWithRelationInput'] | null; // CategoryInfoA077OrderByWithRelationInput
    categoryInfoA112?: NexusGenInputs['CategoryInfoA112OrderByWithRelationInput'] | null; // CategoryInfoA112OrderByWithRelationInput
    categoryInfoA113?: NexusGenInputs['CategoryInfoA113OrderByWithRelationInput'] | null; // CategoryInfoA113OrderByWithRelationInput
    categoryInfoA524?: NexusGenInputs['CategoryInfoA524OrderByWithRelationInput'] | null; // CategoryInfoA524OrderByWithRelationInput
    categoryInfoA525?: NexusGenInputs['CategoryInfoA525OrderByWithRelationInput'] | null; // CategoryInfoA525OrderByWithRelationInput
    categoryInfoB378?: NexusGenInputs['CategoryInfoB378OrderByWithRelationInput'] | null; // CategoryInfoB378OrderByWithRelationInput
    categoryInfoB719?: NexusGenInputs['CategoryInfoB719OrderByWithRelationInput'] | null; // CategoryInfoB719OrderByWithRelationInput
    categoryInfoB956?: NexusGenInputs['CategoryInfoB956OrderByWithRelationInput'] | null; // CategoryInfoB956OrderByWithRelationInput
    cnyRate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    description?: NexusGenEnums['SortOrder'] | null; // SortOrder
    gmarketFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    imageThumbnailData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    immSearchTags?: NexusGenEnums['SortOrder'] | null; // SortOrder
    interparkFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isImageTranslated?: NexusGenEnums['SortOrder'] | null; // SortOrder
    localShippingCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    localShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonNormalFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    manuFacturer?: NexusGenEnums['SortOrder'] | null; // SortOrder
    marginRate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    marginUnitType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modelName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    price?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOption?: NexusGenInputs['ProductOptionOrderByRelationAggregateInput'] | null; // ProductOptionOrderByRelationAggregateInput
    productOptionName?: NexusGenInputs['ProductOptionNameOrderByRelationAggregateInput'] | null; // ProductOptionNameOrderByRelationAggregateInput
    productStateEnum?: NexusGenInputs['productStateEnumOrderByWithRelationInput'] | null; // productStateEnumOrderByWithRelationInput
    productStore?: NexusGenInputs['ProductStoreOrderByRelationAggregateInput'] | null; // ProductStoreOrderByRelationAggregateInput
    searchTags?: NexusGenEnums['SortOrder'] | null; // SortOrder
    shippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siilCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    siilData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    stockUpdatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoProduct?: NexusGenInputs['TaobaoProductOrderByWithRelationInput'] | null; // TaobaoProductOrderByWithRelationInput
    taobaoProductId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    tmonFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    wemakepriceFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreListRelationFilter: { // input type
    every?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
    none?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
    some?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
  }
  ProductStoreLogListRelationFilter: { // input type
    every?: NexusGenInputs['ProductStoreLogWhereInput'] | null; // ProductStoreLogWhereInput
    none?: NexusGenInputs['ProductStoreLogWhereInput'] | null; // ProductStoreLogWhereInput
    some?: NexusGenInputs['ProductStoreLogWhereInput'] | null; // ProductStoreLogWhereInput
  }
  ProductStoreLogOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreLogOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    destState?: NexusGenEnums['SortOrder'] | null; // SortOrder
    errorMessage?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    jobId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStoreId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStoreLogEnum?: NexusGenInputs['productStoreLogEnumOrderByWithRelationInput'] | null; // productStoreLogEnumOrderByWithRelationInput
    productStoreState?: NexusGenInputs['ProductStoreStateOrderByWithRelationInput'] | null; // ProductStoreStateOrderByWithRelationInput
    productstore?: NexusGenInputs['ProductStoreOrderByWithRelationInput'] | null; // ProductStoreOrderByWithRelationInput
    uploadState?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreLogWhereInput: { // input type
    AND?: NexusGenInputs['ProductStoreLogWhereInput'][] | null; // [ProductStoreLogWhereInput!]
    NOT?: NexusGenInputs['ProductStoreLogWhereInput'][] | null; // [ProductStoreLogWhereInput!]
    OR?: NexusGenInputs['ProductStoreLogWhereInput'][] | null; // [ProductStoreLogWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    destState?: NexusGenInputs['IntFilter'] | null; // IntFilter
    errorMessage?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    jobId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    modifiedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    productStoreId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productStoreLogEnum?: NexusGenInputs['productStoreLogEnumWhereInput'] | null; // productStoreLogEnumWhereInput
    productStoreState?: NexusGenInputs['ProductStoreStateWhereInput'] | null; // ProductStoreStateWhereInput
    productstore?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
    uploadState?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  ProductStoreLogWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductStoreOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreOrderByWithRelationInput: { // input type
    connectedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    etcVendorItemId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByWithRelationInput'] | null; // ProductOrderByWithRelationInput
    productId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStoreLog?: NexusGenInputs['ProductStoreLogOrderByRelationAggregateInput'] | null; // ProductStoreLogOrderByRelationAggregateInput
    productStoreState?: NexusGenInputs['ProductStoreStateOrderByWithRelationInput'] | null; // ProductStoreStateOrderByWithRelationInput
    siteCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    storeProductId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    storeUrl?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ProductStoreStateOrderByWithRelationInput: { // input type
    description?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStore?: NexusGenInputs['ProductStoreOrderByRelationAggregateInput'] | null; // ProductStoreOrderByRelationAggregateInput
    productStoreLog?: NexusGenInputs['ProductStoreLogOrderByRelationAggregateInput'] | null; // ProductStoreLogOrderByRelationAggregateInput
  }
  ProductStoreStateWhereInput: { // input type
    AND?: NexusGenInputs['ProductStoreStateWhereInput'][] | null; // [ProductStoreStateWhereInput!]
    NOT?: NexusGenInputs['ProductStoreStateWhereInput'][] | null; // [ProductStoreStateWhereInput!]
    OR?: NexusGenInputs['ProductStoreStateWhereInput'][] | null; // [ProductStoreStateWhereInput!]
    description?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    productStore?: NexusGenInputs['ProductStoreListRelationFilter'] | null; // ProductStoreListRelationFilter
    productStoreLog?: NexusGenInputs['ProductStoreLogListRelationFilter'] | null; // ProductStoreLogListRelationFilter
  }
  ProductStoreWhereInput: { // input type
    AND?: NexusGenInputs['ProductStoreWhereInput'][] | null; // [ProductStoreWhereInput!]
    NOT?: NexusGenInputs['ProductStoreWhereInput'][] | null; // [ProductStoreWhereInput!]
    OR?: NexusGenInputs['ProductStoreWhereInput'][] | null; // [ProductStoreWhereInput!]
    connectedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    etcVendorItemId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    product?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    productId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productStoreLog?: NexusGenInputs['ProductStoreLogListRelationFilter'] | null; // ProductStoreLogListRelationFilter
    productStoreState?: NexusGenInputs['ProductStoreStateWhereInput'] | null; // ProductStoreStateWhereInput
    siteCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
    state?: NexusGenInputs['IntFilter'] | null; // IntFilter
    storeProductId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    storeUrl?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  ProductStoreWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ProductThumbnailImageUpdateInput: { // input type
    defaultImage: string; // String!
    uploadImageBase64?: string | null; // String
  }
  ProductThumbnailUpdateInput: { // input type
    defaultImage: string; // String!
    uploadImage?: NexusGenScalars['Upload'] | null; // Upload
  }
  ProductUQ_user_id_taobao_product_idCompoundUniqueInput: { // input type
    taobaoProductId: number; // Int!
    userId: number; // Int!
  }
  ProductWhereInput: { // input type
    AND?: NexusGenInputs['ProductWhereInput'][] | null; // [ProductWhereInput!]
    NOT?: NexusGenInputs['ProductWhereInput'][] | null; // [ProductWhereInput!]
    OR?: NexusGenInputs['ProductWhereInput'][] | null; // [ProductWhereInput!]
    admin?: NexusGenInputs['AdminWhereInput'] | null; // AdminWhereInput
    adminId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    attribute?: NexusGenInputs['StringFilter'] | null; // StringFilter
    auctionFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    brandName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    categoryA001?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryA006?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryA027?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryA077?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryA112?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryA113?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryA524?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryA525?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryB378?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryB719?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryB956?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryEsm?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    categoryInfoA001?: NexusGenInputs['CategoryInfoA001WhereInput'] | null; // CategoryInfoA001WhereInput
    categoryInfoA006?: NexusGenInputs['CategoryInfoA006WhereInput'] | null; // CategoryInfoA006WhereInput
    categoryInfoA027?: NexusGenInputs['CategoryInfoA027WhereInput'] | null; // CategoryInfoA027WhereInput
    categoryInfoA077?: NexusGenInputs['CategoryInfoA077WhereInput'] | null; // CategoryInfoA077WhereInput
    categoryInfoA112?: NexusGenInputs['CategoryInfoA112WhereInput'] | null; // CategoryInfoA112WhereInput
    categoryInfoA113?: NexusGenInputs['CategoryInfoA113WhereInput'] | null; // CategoryInfoA113WhereInput
    categoryInfoA524?: NexusGenInputs['CategoryInfoA524WhereInput'] | null; // CategoryInfoA524WhereInput
    categoryInfoA525?: NexusGenInputs['CategoryInfoA525WhereInput'] | null; // CategoryInfoA525WhereInput
    categoryInfoB378?: NexusGenInputs['CategoryInfoB378WhereInput'] | null; // CategoryInfoB378WhereInput
    categoryInfoB719?: NexusGenInputs['CategoryInfoB719WhereInput'] | null; // CategoryInfoB719WhereInput
    categoryInfoB956?: NexusGenInputs['CategoryInfoB956WhereInput'] | null; // CategoryInfoB956WhereInput
    cnyRate?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    coupangFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    description?: NexusGenInputs['StringFilter'] | null; // StringFilter
    gmarketFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    imageThumbnailData?: NexusGenInputs['StringFilter'] | null; // StringFilter
    immSearchTags?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    interparkFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    isImageTranslated?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    localShippingCode?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    localShippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    lotteonFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    lotteonNormalFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    manuFacturer?: NexusGenInputs['StringFilter'] | null; // StringFilter
    marginRate?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    marginUnitType?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    modelName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    modifiedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    naverFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    price?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
    productOption?: NexusGenInputs['ProductOptionListRelationFilter'] | null; // ProductOptionListRelationFilter
    productOptionName?: NexusGenInputs['ProductOptionNameListRelationFilter'] | null; // ProductOptionNameListRelationFilter
    productStateEnum?: NexusGenInputs['productStateEnumWhereInput'] | null; // productStateEnumWhereInput
    productStore?: NexusGenInputs['ProductStoreListRelationFilter'] | null; // ProductStoreListRelationFilter
    searchTags?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    shippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    siilCode?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    siilData?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    state?: NexusGenInputs['IntFilter'] | null; // IntFilter
    stockUpdatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    streetFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    streetNormalFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    taobaoProduct?: NexusGenInputs['TaobaoProductWhereInput'] | null; // TaobaoProductWhereInput
    taobaoProductId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    tmonFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    wemakepriceFee?: NexusGenInputs['FloatNullableFilter'] | null; // FloatNullableFilter
  }
  ProductWhereUniqueInput: { // input type
    UQ_user_id_taobao_product_id?: NexusGenInputs['ProductUQ_user_id_taobao_product_idCompoundUniqueInput'] | null; // ProductUQ_user_id_taobao_product_idCompoundUniqueInput
    id?: number | null; // Int
  }
  PurchaseLogListRelationFilter: { // input type
    every?: NexusGenInputs['PurchaseLogWhereInput'] | null; // PurchaseLogWhereInput
    none?: NexusGenInputs['PurchaseLogWhereInput'] | null; // PurchaseLogWhereInput
    some?: NexusGenInputs['PurchaseLogWhereInput'] | null; // PurchaseLogWhereInput
  }
  PurchaseLogOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  PurchaseLogWhereInput: { // input type
    AND?: NexusGenInputs['PurchaseLogWhereInput'][] | null; // [PurchaseLogWhereInput!]
    NOT?: NexusGenInputs['PurchaseLogWhereInput'][] | null; // [PurchaseLogWhereInput!]
    OR?: NexusGenInputs['PurchaseLogWhereInput'][] | null; // [PurchaseLogWhereInput!]
    expiredAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    payAmount?: NexusGenInputs['IntFilter'] | null; // IntFilter
    payId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    planInfo?: NexusGenInputs['StringFilter'] | null; // StringFilter
    purchasedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    state?: NexusGenInputs['EnumPurchaseLogStateFilter'] | null; // EnumPurchaseLogStateFilter
    type?: NexusGenInputs['EnumPurchaseLogTypeFilter'] | null; // EnumPurchaseLogTypeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  SiilInput: { // input type
    code: string; // String!
    value: string; // String!
  }
  StringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  StringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  TaobaoProductOrderByWithRelationInput: { // input type
    brand?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    imageThumbnail?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    originalData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    price?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
    shopName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoBrandId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoCategoryId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoNumIid?: NexusGenEnums['SortOrder'] | null; // SortOrder
    translateData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    url?: NexusGenEnums['SortOrder'] | null; // SortOrder
    videoUrl?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  TaobaoProductWhereInput: { // input type
    AND?: NexusGenInputs['TaobaoProductWhereInput'][] | null; // [TaobaoProductWhereInput!]
    NOT?: NexusGenInputs['TaobaoProductWhereInput'][] | null; // [TaobaoProductWhereInput!]
    OR?: NexusGenInputs['TaobaoProductWhereInput'][] | null; // [TaobaoProductWhereInput!]
    brand?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    imageThumbnail?: NexusGenInputs['StringFilter'] | null; // StringFilter
    modifiedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    originalData?: NexusGenInputs['StringFilter'] | null; // StringFilter
    price?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
    shopName?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    taobaoBrandId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    taobaoCategoryId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    taobaoNumIid?: NexusGenInputs['StringFilter'] | null; // StringFilter
    translateData?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    url?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    videoUrl?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
  }
  TaobaoProductWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserInfoOrderByWithRelationInput: { // input type
    additionalShippingFeeJeju?: NexusGenEnums['SortOrder'] | null; // SortOrder
    asInformation?: NexusGenEnums['SortOrder'] | null; // SortOrder
    asTel?: NexusGenEnums['SortOrder'] | null; // SortOrder
    auctionFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    auctionUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    autoPrice?: NexusGenEnums['SortOrder'] | null; // SortOrder
    calculateWonType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    cnyRate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    cnyRateDollar?: NexusGenEnums['SortOrder'] | null; // SortOrder
    cnyRateEuro?: NexusGenEnums['SortOrder'] | null; // SortOrder
    cnyRateYen?: NexusGenEnums['SortOrder'] | null; // SortOrder
    collectStock?: NexusGenEnums['SortOrder'] | null; // SortOrder
    collectTimeout?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangAccessKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangDefaultInbound?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangDefaultOutbound?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangImageOpt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangLoginId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangMaximumBuyForPerson?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangOutboundShippingTimeDay?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangSecretKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangUnionDeliveryType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coupangVendorId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    defaultPrice?: NexusGenEnums['SortOrder'] | null; // SortOrder
    defaultShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    descriptionShowTitle?: NexusGenEnums['SortOrder'] | null; // SortOrder
    discountAmount?: NexusGenEnums['SortOrder'] | null; // SortOrder
    discountUnitType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    esmplusAuctionId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    esmplusGmarketId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    esmplusMasterId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    exchangeShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    extraShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    fixImageBottom?: NexusGenEnums['SortOrder'] | null; // SortOrder
    fixImageSubBottom?: NexusGenEnums['SortOrder'] | null; // SortOrder
    fixImageSubTop?: NexusGenEnums['SortOrder'] | null; // SortOrder
    fixImageTop?: NexusGenEnums['SortOrder'] | null; // SortOrder
    gmarketFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    gmarketUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    interparkCertKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    interparkEditCertKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    interparkEditSecretKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    interparkFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    interparkSecretKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    interparkUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonApiKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonNormalFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonNormalUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonSellerType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    lotteonVendorId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    marginRate?: NexusGenEnums['SortOrder'] | null; // SortOrder
    marginUnitType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    maxProductLimit?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverAutoSearchTag?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverOrigin?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverOriginCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverStoreOnly?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverStoreUrl?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionAlignTop?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionIndexType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    optionTwoWays?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderToDeliveryName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    phone?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productCollectCount?: NexusGenEnums['SortOrder'] | null; // SortOrder
    refundShippingFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetApiKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetApiKey2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetApiKey3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetApiKey4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetApiMemo?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetApiMemo2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetApiMemo3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetApiMemo4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetDefaultInbound?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetDefaultOutbound?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalApiKey?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalApiKey2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalApiKey3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalApiKey4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalApiMemo?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalApiMemo2?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalApiMemo3?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalApiMemo4?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalInbound?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalOutbound?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalUseKeyType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetNormalUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetUseKeyType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    streetUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    tmonFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    tmonId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    tmonUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    useDetailInformation?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    wemakepriceFee?: NexusGenEnums['SortOrder'] | null; // SortOrder
    wemakepriceId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    wemakepriceUseType?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserInfoWhereInput: { // input type
    AND?: NexusGenInputs['UserInfoWhereInput'][] | null; // [UserInfoWhereInput!]
    NOT?: NexusGenInputs['UserInfoWhereInput'][] | null; // [UserInfoWhereInput!]
    OR?: NexusGenInputs['UserInfoWhereInput'][] | null; // [UserInfoWhereInput!]
    additionalShippingFeeJeju?: NexusGenInputs['IntFilter'] | null; // IntFilter
    asInformation?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    asTel?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    auctionFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    auctionUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    autoPrice?: NexusGenInputs['StringFilter'] | null; // StringFilter
    calculateWonType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    cnyRate?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    cnyRateDollar?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    cnyRateEuro?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    cnyRateYen?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    collectStock?: NexusGenInputs['IntFilter'] | null; // IntFilter
    collectTimeout?: NexusGenInputs['IntFilter'] | null; // IntFilter
    coupangAccessKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    coupangDefaultInbound?: NexusGenInputs['StringFilter'] | null; // StringFilter
    coupangDefaultOutbound?: NexusGenInputs['StringFilter'] | null; // StringFilter
    coupangFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    coupangImageOpt?: NexusGenInputs['StringFilter'] | null; // StringFilter
    coupangLoginId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    coupangMaximumBuyForPerson?: NexusGenInputs['IntFilter'] | null; // IntFilter
    coupangOutboundShippingTimeDay?: NexusGenInputs['IntFilter'] | null; // IntFilter
    coupangSecretKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    coupangUnionDeliveryType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    coupangUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    coupangVendorId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    defaultPrice?: NexusGenInputs['StringFilter'] | null; // StringFilter
    defaultShippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    descriptionShowTitle?: NexusGenInputs['StringFilter'] | null; // StringFilter
    discountAmount?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    discountUnitType?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    esmplusAuctionId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    esmplusGmarketId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    esmplusMasterId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    exchangeShippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    extraShippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    fixImageBottom?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    fixImageSubBottom?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    fixImageSubTop?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    fixImageTop?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    gmarketFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    gmarketUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    interparkCertKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    interparkEditCertKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    interparkEditSecretKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    interparkFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    interparkSecretKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    interparkUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    lotteonApiKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    lotteonFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    lotteonNormalFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    lotteonNormalUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    lotteonSellerType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    lotteonUseType?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    lotteonVendorId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    marginRate?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    marginUnitType?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    maxProductLimit?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    naverAutoSearchTag?: NexusGenInputs['StringFilter'] | null; // StringFilter
    naverFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    naverOrigin?: NexusGenInputs['StringFilter'] | null; // StringFilter
    naverOriginCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
    naverStoreOnly?: NexusGenInputs['StringFilter'] | null; // StringFilter
    naverStoreUrl?: NexusGenInputs['StringFilter'] | null; // StringFilter
    naverUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    optionAlignTop?: NexusGenInputs['StringFilter'] | null; // StringFilter
    optionIndexType?: NexusGenInputs['IntFilter'] | null; // IntFilter
    optionTwoWays?: NexusGenInputs['StringFilter'] | null; // StringFilter
    orderToDeliveryName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    phone?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    productCollectCount?: NexusGenInputs['IntFilter'] | null; // IntFilter
    refundShippingFee?: NexusGenInputs['IntFilter'] | null; // IntFilter
    streetApiKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetApiKey2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetApiKey3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetApiKey4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetApiMemo?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetApiMemo2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetApiMemo3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetApiMemo4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetDefaultInbound?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetDefaultOutbound?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    streetNormalApiKey?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalApiKey2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalApiKey3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalApiKey4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalApiMemo?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalApiMemo2?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalApiMemo3?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalApiMemo4?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    streetNormalInbound?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    streetNormalOutbound?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    streetNormalUseKeyType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetNormalUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetUseKeyType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    streetUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    tmonFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    tmonId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    tmonUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    useDetailInformation?: NexusGenInputs['StringFilter'] | null; // StringFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
    wemakepriceFee?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
    wemakepriceId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    wemakepriceUseType?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  UserLogListRelationFilter: { // input type
    every?: NexusGenInputs['UserLogWhereInput'] | null; // UserLogWhereInput
    none?: NexusGenInputs['UserLogWhereInput'] | null; // UserLogWhereInput
    some?: NexusGenInputs['UserLogWhereInput'] | null; // UserLogWhereInput
  }
  UserLogOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserLogOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isRead?: NexusGenEnums['SortOrder'] | null; // SortOrder
    payloadData?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserLogWhereInput: { // input type
    AND?: NexusGenInputs['UserLogWhereInput'][] | null; // [UserLogWhereInput!]
    NOT?: NexusGenInputs['UserLogWhereInput'][] | null; // [UserLogWhereInput!]
    OR?: NexusGenInputs['UserLogWhereInput'][] | null; // [UserLogWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isRead?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    payloadData?: NexusGenInputs['StringFilter'] | null; // StringFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  UserLogWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdToken?: NexusGenEnums['SortOrder'] | null; // SortOrder
    credit?: NexusGenEnums['SortOrder'] | null; // SortOrder
    email?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    kakaoId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    master?: NexusGenEnums['SortOrder'] | null; // SortOrder
    masterUserId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    naverId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    order?: NexusGenInputs['orderOrderByRelationAggregateInput'] | null; // orderOrderByRelationAggregateInput
    password?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
    productStore?: NexusGenInputs['ProductStoreOrderByRelationAggregateInput'] | null; // ProductStoreOrderByRelationAggregateInput
    purchaseLog?: NexusGenInputs['PurchaseLogOrderByRelationAggregateInput'] | null; // PurchaseLogOrderByRelationAggregateInput
    refAvailable?: NexusGenEnums['SortOrder'] | null; // SortOrder
    refCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    token?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userInfo?: NexusGenInputs['UserInfoOrderByWithRelationInput'] | null; // UserInfoOrderByWithRelationInput
    userLog?: NexusGenInputs['UserLogOrderByRelationAggregateInput'] | null; // UserLogOrderByRelationAggregateInput
    userQuestion?: NexusGenInputs['UserQuestionOrderByRelationAggregateInput'] | null; // UserQuestionOrderByRelationAggregateInput
    verificationNumber?: NexusGenEnums['SortOrder'] | null; // SortOrder
    wordTable?: NexusGenInputs['WordTableOrderByRelationAggregateInput'] | null; // WordTableOrderByRelationAggregateInput
  }
  UserQuestionListRelationFilter: { // input type
    every?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
    none?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
    some?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
  }
  UserQuestionOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserQuestionOrderByWithRelationInput: { // input type
    answer?: NexusGenEnums['SortOrder'] | null; // SortOrder
    answeredAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    attachmentFile?: NexusGenEnums['SortOrder'] | null; // SortOrder
    content?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isActive?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserQuestionWhereInput: { // input type
    AND?: NexusGenInputs['UserQuestionWhereInput'][] | null; // [UserQuestionWhereInput!]
    NOT?: NexusGenInputs['UserQuestionWhereInput'][] | null; // [UserQuestionWhereInput!]
    OR?: NexusGenInputs['UserQuestionWhereInput'][] | null; // [UserQuestionWhereInput!]
    answer?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    answeredAt?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    attachmentFile?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    content?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    isActive?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  UserQuestionWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    NOT?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    OR?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    createdToken?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    credit?: NexusGenInputs['IntFilter'] | null; // IntFilter
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    kakaoId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    master?: NexusGenInputs['IntFilter'] | null; // IntFilter
    masterUserId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    naverId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    order?: NexusGenInputs['OrderListRelationFilter'] | null; // OrderListRelationFilter
    password?: NexusGenInputs['StringFilter'] | null; // StringFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
    productStore?: NexusGenInputs['ProductStoreListRelationFilter'] | null; // ProductStoreListRelationFilter
    purchaseLog?: NexusGenInputs['PurchaseLogListRelationFilter'] | null; // PurchaseLogListRelationFilter
    refAvailable?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    refCode?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    state?: NexusGenInputs['EnumUserStateFilter'] | null; // EnumUserStateFilter
    token?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    userInfo?: NexusGenInputs['UserInfoWhereInput'] | null; // UserInfoWhereInput
    userLog?: NexusGenInputs['UserLogListRelationFilter'] | null; // UserLogListRelationFilter
    userQuestion?: NexusGenInputs['UserQuestionListRelationFilter'] | null; // UserQuestionListRelationFilter
    verificationNumber?: NexusGenInputs['StringFilter'] | null; // StringFilter
    wordTable?: NexusGenInputs['WordTableListRelationFilter'] | null; // WordTableListRelationFilter
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
    kakaoId?: string | null; // String
    naverId?: string | null; // String
    token?: string | null; // String
  }
  WordTableListRelationFilter: { // input type
    every?: NexusGenInputs['WordTableWhereInput'] | null; // WordTableWhereInput
    none?: NexusGenInputs['WordTableWhereInput'] | null; // WordTableWhereInput
    some?: NexusGenInputs['WordTableWhereInput'] | null; // WordTableWhereInput
  }
  WordTableOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  WordTableOrderByWithRelationInput: { // input type
    findWord?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    replaceWord?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  WordTableUQ_word_table_wordCompoundUniqueInput: { // input type
    findWord: string; // String!
    userId: number; // Int!
  }
  WordTableWhereInput: { // input type
    AND?: NexusGenInputs['WordTableWhereInput'][] | null; // [WordTableWhereInput!]
    NOT?: NexusGenInputs['WordTableWhereInput'][] | null; // [WordTableWhereInput!]
    OR?: NexusGenInputs['WordTableWhereInput'][] | null; // [WordTableWhereInput!]
    findWord?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    replaceWord?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  WordTableWhereUniqueInput: { // input type
    UQ_word_table_word?: NexusGenInputs['WordTableUQ_word_table_wordCompoundUniqueInput'] | null; // WordTableUQ_word_table_wordCompoundUniqueInput
    id?: number | null; // Int
  }
  newOrderInput: { // input type
    deliveryFeeAmt: number; // Int!
    individualCustomUniqueCode?: string | null; // String
    marketCode: string; // String!
    orderMemberName: string; // String!
    orderMemberTelNo: string; // String!
    orderNo: string; // String!
    orderQuantity: number; // Int!
    productName: string; // String!
    productOptionContents?: string | null; // String
    productOrderMemo?: string | null; // String
    productPayAmt: number; // Int!
    receiverIntegratedAddress: string; // String!
    receiverName: string; // String!
    receiverTelNo1: string; // String!
    receiverZipCode: string; // String!
    sellerProductManagementCode?: string | null; // String
    taobaoOrderNo?: string | null; // String
  }
  orderMarketCode_UNIQUECompoundUniqueInput: { // input type
    marketCode: string; // String!
    orderNo: string; // String!
  }
  orderOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
    count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  orderOrderByWithRelationInput: { // input type
    deliveryFeeAmt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    individualCustomUniqueCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    marketCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderMemberName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderMemberTelNo?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderNo?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderQuantity?: NexusGenEnums['SortOrder'] | null; // SortOrder
    orderStateEnum?: NexusGenInputs['orderStateEnumOrderByWithRelationInput'] | null; // orderStateEnumOrderByWithRelationInput
    productId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOptionContents?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productOrderMemo?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productPayAmt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    receiverIntegratedAddress?: NexusGenEnums['SortOrder'] | null; // SortOrder
    receiverName?: NexusGenEnums['SortOrder'] | null; // SortOrder
    receiverTelNo1?: NexusGenEnums['SortOrder'] | null; // SortOrder
    receiverZipCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    sellerProductManagementCode?: NexusGenEnums['SortOrder'] | null; // SortOrder
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
    taobaoOrderNo?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  orderStateEnumOrderByWithRelationInput: { // input type
    description?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    order?: NexusGenInputs['orderOrderByRelationAggregateInput'] | null; // orderOrderByRelationAggregateInput
  }
  orderStateEnumWhereInput: { // input type
    AND?: NexusGenInputs['orderStateEnumWhereInput'][] | null; // [orderStateEnumWhereInput!]
    NOT?: NexusGenInputs['orderStateEnumWhereInput'][] | null; // [orderStateEnumWhereInput!]
    OR?: NexusGenInputs['orderStateEnumWhereInput'][] | null; // [orderStateEnumWhereInput!]
    description?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    order?: NexusGenInputs['OrderListRelationFilter'] | null; // OrderListRelationFilter
  }
  orderWhereInput: { // input type
    AND?: NexusGenInputs['orderWhereInput'][] | null; // [orderWhereInput!]
    NOT?: NexusGenInputs['orderWhereInput'][] | null; // [orderWhereInput!]
    OR?: NexusGenInputs['orderWhereInput'][] | null; // [orderWhereInput!]
    deliveryFeeAmt?: NexusGenInputs['IntFilter'] | null; // IntFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    individualCustomUniqueCode?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    marketCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
    orderMemberName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    orderMemberTelNo?: NexusGenInputs['StringFilter'] | null; // StringFilter
    orderNo?: NexusGenInputs['StringFilter'] | null; // StringFilter
    orderQuantity?: NexusGenInputs['IntFilter'] | null; // IntFilter
    orderStateEnum?: NexusGenInputs['orderStateEnumWhereInput'] | null; // orderStateEnumWhereInput
    productId?: NexusGenInputs['IntNullableFilter'] | null; // IntNullableFilter
    productName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    productOptionContents?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    productOrderMemo?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    productPayAmt?: NexusGenInputs['IntFilter'] | null; // IntFilter
    receiverIntegratedAddress?: NexusGenInputs['StringFilter'] | null; // StringFilter
    receiverName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    receiverTelNo1?: NexusGenInputs['StringFilter'] | null; // StringFilter
    receiverZipCode?: NexusGenInputs['StringFilter'] | null; // StringFilter
    sellerProductManagementCode?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    state?: NexusGenInputs['IntFilter'] | null; // IntFilter
    taobaoOrderNo?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  orderWhereUniqueInput: { // input type
    id?: number | null; // Int
    marketCode_UNIQUE?: NexusGenInputs['orderMarketCode_UNIQUECompoundUniqueInput'] | null; // orderMarketCode_UNIQUECompoundUniqueInput
  }
  productStateEnumOrderByWithRelationInput: { // input type
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    product?: NexusGenInputs['ProductOrderByRelationAggregateInput'] | null; // ProductOrderByRelationAggregateInput
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  productStateEnumWhereInput: { // input type
    AND?: NexusGenInputs['productStateEnumWhereInput'][] | null; // [productStateEnumWhereInput!]
    NOT?: NexusGenInputs['productStateEnumWhereInput'][] | null; // [productStateEnumWhereInput!]
    OR?: NexusGenInputs['productStateEnumWhereInput'][] | null; // [productStateEnumWhereInput!]
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    product?: NexusGenInputs['ProductListRelationFilter'] | null; // ProductListRelationFilter
    state?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
  }
  productStoreLogEnumOrderByWithRelationInput: { // input type
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    productStoreLog?: NexusGenInputs['ProductStoreLogOrderByRelationAggregateInput'] | null; // ProductStoreLogOrderByRelationAggregateInput
    state?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  productStoreLogEnumWhereInput: { // input type
    AND?: NexusGenInputs['productStoreLogEnumWhereInput'][] | null; // [productStoreLogEnumWhereInput!]
    NOT?: NexusGenInputs['productStoreLogEnumWhereInput'][] | null; // [productStoreLogEnumWhereInput!]
    OR?: NexusGenInputs['productStoreLogEnumWhereInput'][] | null; // [productStoreLogEnumWhereInput!]
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    productStoreLog?: NexusGenInputs['ProductStoreLogListRelationFilter'] | null; // ProductStoreLogListRelationFilter
    state?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
  }
  purchaseInputs: { // input type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    planInfoId: number; // Int!
    userId: number; // Int!
  }
  setProductOption: { // input type
    defaultShippingFee: number; // Int!
    isActive: boolean; // Boolean!
    name: string; // String!
    optionString: string; // String!
    optionValue1Id: number; // Int!
    optionValue2Id?: number | null; // Int
    optionValue3Id?: number | null; // Int
    optionValue4Id?: number | null; // Int
    optionValue5Id?: number | null; // Int
    price: number; // Int!
    priceCny: number; // Float!
    productId: number; // Int!
    stock?: number | null; // Int
    taobaoSkuId: string; // String!
  }
}

export interface NexusGenEnums {
  AdminState: "ACTIVE" | "DELETED"
  ExcelSampleEnum: "COLLECT_PRODUCT" | "DENY_WORD" | "REPLACE_WORD"
  PurchaseLogState: "ACTIVE" | "ENDED" | "REFUNDED" | "WAIT_DEPOSIT" | "WAIT_PAYMENT"
  PurchaseLogType: "IMAGE_TRANSLATE" | "PLAN" | "STOCK"
  SiilItemTypeEnum: "INPUT" | "SELECT" | "YESNO"
  SortOrder: "asc" | "desc"
  TaobaoItemOrderBy: "_credit" | "_sale"
  TranslateEngineEnumType: "baidu" | "google" | "papago"
  TranslateTargetEnumType: "PRODUCT_ALL" | "PRODUCT_NAME" | "PRODUCT_OPTION_ALL" | "PRODUCT_OPTION_NAME" | "PRODUCT_OPTION_VALUE"
  UserLoginType: "ADMIN" | "EMAIL" | "KAKAO" | "NAVER"
  UserPurchaseAdditionalInfoEnumType: "IMAGE_TRANSLATE" | "STOCK"
  UserSocialType: "EMAIL" | "KAKAO" | "NAVER"
  UserState: "ACTIVE" | "DELETED"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: Date
  Upload: FileUpload
}

export interface NexusGenObjects {
  AccountInfo: { // root type
    accountHolder: string; // String!
    accountNumber: string; // String!
    bankName: string; // String!
  }
  Admin: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    loginId: string; // String!
    state: NexusGenEnums['AdminState']; // AdminState!
  }
  CategoryInfoA001: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoA001Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA006: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoA006Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA027: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoA027Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA077: { // root type
    code: string; // String!
    codeA001: string; // String!
    codeA006: string; // String!
    codeA027: string; // String!
    codeA112: string; // String!
    codeA113: string; // String!
    codeA524: string; // String!
    codeA525: string; // String!
    codeB378: string; // String!
    codeB719: string; // String!
    codeB956: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoA077Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA112: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoA112Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA113: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoA113Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA524: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoA524Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA525: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoA525Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoB378: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoB378Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoB719: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoB719Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoB956: { // root type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  CategoryInfoB956Type: { // root type
    code: string; // String!
    name: string; // String!
  }
  CategoryInformationType: { // root type
    categoryInfoA001?: NexusGenRootTypes['CategoryInfoA001Type'] | null; // CategoryInfoA001Type
    categoryInfoA006?: NexusGenRootTypes['CategoryInfoA006Type'] | null; // CategoryInfoA006Type
    categoryInfoA027?: NexusGenRootTypes['CategoryInfoA027Type'] | null; // CategoryInfoA027Type
    categoryInfoA112?: NexusGenRootTypes['CategoryInfoA112Type'] | null; // CategoryInfoA112Type
    categoryInfoA113?: NexusGenRootTypes['CategoryInfoA113Type'] | null; // CategoryInfoA113Type
    categoryInfoA524?: NexusGenRootTypes['CategoryInfoA524Type'] | null; // CategoryInfoA524Type
    categoryInfoA525?: NexusGenRootTypes['CategoryInfoA525Type'] | null; // CategoryInfoA525Type
    categoryInfoB378?: NexusGenRootTypes['CategoryInfoB378Type'] | null; // CategoryInfoB378Type
    categoryInfoB719?: NexusGenRootTypes['CategoryInfoB719Type'] | null; // CategoryInfoB719Type
    categoryInfoB956?: NexusGenRootTypes['CategoryInfoB956Type'] | null; // CategoryInfoB956Type
    code: string; // String!
    code_a001?: string | null; // String
    code_a006?: string | null; // String
    code_a027?: string | null; // String
    code_a077?: string | null; // String
    code_a112?: string | null; // String
    code_a113?: string | null; // String
    code_a524?: string | null; // String
    code_a525?: string | null; // String
    code_b378?: string | null; // String
    code_b719?: string | null; // String
    code_b956?: string | null; // String
    depth1?: string | null; // String
    depth2?: string | null; // String
    depth3?: string | null; // String
    depth4?: string | null; // String
    depth5?: string | null; // String
    depth6?: string | null; // String
    id?: string | null; // String
    name: string; // String!
  }
  CategorySelectType: { // root type
    code: string; // String!
    name: string; // String!
  }
  Mutation: {};
  Notice: { // root type
    attachmentFile?: string | null; // String
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isVisible: boolean; // Boolean!
    title: string; // String!
    viewCount: number; // Int!
  }
  PhoneVerification: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    tel: string; // String!
    used?: number | null; // Int
    verificationNumber: string; // String!
  }
  PlanInfo: { // root type
    description: string; // String!
    externalFeatureVariableId?: string | null; // String
    id: number; // Int!
    isActive: boolean; // Boolean!
    month: number; // Int!
    name: string; // String!
    planLevel?: number | null; // Int
    price: number; // Int!
  }
  Product: { // root type
    adminId?: number | null; // Int
    attribute: string; // String!
    auctionFee?: number | null; // Float
    brandName: string; // String!
    cnyRate: number; // Float!
    coupangFee?: number | null; // Float
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    gmarketFee?: number | null; // Float
    id: number; // Int!
    imageThumbnailData: string; // String!
    immSearchTags?: string | null; // String
    interparkFee?: number | null; // Float
    isImageTranslated: boolean; // Boolean!
    localShippingCode?: number | null; // Int
    localShippingFee: number; // Int!
    lotteonFee?: number | null; // Float
    lotteonNormalFee?: number | null; // Float
    manuFacturer: string; // String!
    marginRate: number; // Float!
    marginUnitType?: string | null; // String
    modelName: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    name: string; // String!
    naverFee?: number | null; // Float
    price: number; // Int!
    productCode: string; // String!
    searchTags?: string | null; // String
    shippingFee: number; // Int!
    siilCode?: string | null; // String
    siilData?: string | null; // String
    state: number; // Int!
    stockUpdatedAt: NexusGenScalars['DateTime']; // DateTime!
    streetFee?: number | null; // Float
    streetNormalFee?: number | null; // Float
    taobaoProductId: number; // Int!
    tmonFee?: number | null; // Float
    userId?: number | null; // Int
    wemakepriceFee?: number | null; // Float
  }
  ProductOption: { // root type
    defaultShippingFee?: number | null; // Int
    id: number; // Int!
    isActive: boolean; // Boolean!
    optionString: string; // String!
    optionValue1Id: number; // Int!
    optionValue2Id?: number | null; // Int
    optionValue3Id?: number | null; // Int
    optionValue4Id?: number | null; // Int
    optionValue5Id?: number | null; // Int
    price: number; // Int!
    priceCny: number; // Float!
    productId: number; // Int!
    stock?: number | null; // Int
    taobaoSkuId: string; // String!
  }
  ProductOptionName: { // root type
    id: number; // Int!
    isActive?: boolean | null; // Boolean
    isNameTranslated: boolean; // Boolean!
    name: string; // String!
    order: number; // Int!
    productId: number; // Int!
    taobaoPid: string; // String!
  }
  ProductOptionValue: { // root type
    id: number; // Int!
    image?: string | null; // String
    isActive: boolean; // Boolean!
    isNameTranslated: boolean; // Boolean!
    name: string; // String!
    number: number; // Int!
    optionNameOrder: number; // Int!
    originalName?: string | null; // String
    productOptionNameId: number; // Int!
    taobaoVid: string; // String!
  }
  ProductStore: { // root type
    connectedAt: NexusGenScalars['DateTime']; // DateTime!
    etcVendorItemId?: string | null; // String
    id: number; // Int!
    productId: number; // Int!
    siteCode: string; // String!
    state: number; // Int!
    storeProductId?: string | null; // String
    storeUrl?: string | null; // String
    userId: number; // Int!
  }
  ProductStoreLog: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    destState: number; // Int!
    errorMessage: string; // String!
    id: number; // Int!
    jobId: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    productStoreId: number; // Int!
    uploadState: number; // Int!
  }
  ProductStoreState: { // root type
    description: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  PurchaseLog: { // root type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    payAmount: number; // Int!
    payId?: string | null; // String
    planInfo: string; // String!
    purchasedAt: NexusGenScalars['DateTime']; // DateTime!
    state: NexusGenEnums['PurchaseLogState']; // PurchaseLogState!
    type: NexusGenEnums['PurchaseLogType']; // PurchaseLogType!
    userId: number; // Int!
  }
  Query: {};
  SignInType: { // root type
    accessToken: string; // String!
    refreshToken: string; // String!
  }
  SiilItem: { // root type
    code: string; // String!
    inputType: NexusGenEnums['SiilItemTypeEnum']; // SiilItemTypeEnum!
    name: string; // String!
    options?: string[] | null; // [String!]
  }
  SiilItems: { // root type
    data: NexusGenRootTypes['SiilItem'][]; // [SiilItem!]!
    description: string; // String!
  }
  SiilSavedData: { // root type
    code: string; // String!
    data: NexusGenRootTypes['SiilSavedItem'][]; // [SiilSavedItem!]!
  }
  SiilSavedItem: { // root type
    code: string; // String!
    value: string; // String!
  }
  Subscription: {};
  TaobaoProduct: { // root type
    brand: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    imageThumbnail: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    name: string; // String!
    originalData: string; // String!
    price: number; // Float!
    shopName?: string | null; // String
    taobaoBrandId?: string | null; // String
    taobaoCategoryId: string; // String!
    taobaoNumIid: string; // String!
    url?: string | null; // String
    videoUrl?: string | null; // String
  }
  TaobaoProductOption: { // root type
    name: string; // String!
    taobaoSkuId: string; // String!
  }
  TaobaoProductOptionInfo: { // root type
    option: NexusGenRootTypes['TaobaoProductOption'][]; // [TaobaoProductOption!]!
    optionName: NexusGenRootTypes['TaobaoProductOptionName'][]; // [TaobaoProductOptionName!]!
    optionValue: NexusGenRootTypes['TaobaoProductOptionValue'][]; // [TaobaoProductOptionValue!]!
  }
  TaobaoProductOptionName: { // root type
    name: string; // String!
    taobaoPid: string; // String!
  }
  TaobaoProductOptionValue: { // root type
    image?: string | null; // String
    name: string; // String!
    taobaoVid: string; // String!
  }
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    createdToken?: NexusGenScalars['DateTime'] | null; // DateTime
    credit: number; // Int!
    email: string; // String!
    id: number; // Int!
    kakaoId?: string | null; // String
    master: number; // Int!
    masterUserId?: number | null; // Int
    naverId?: string | null; // String
    refAvailable: boolean; // Boolean!
    refCode?: string | null; // String
    state: NexusGenEnums['UserState']; // UserState!
    token?: string | null; // String
    verificationNumber: string; // String!
  }
  UserInfo: { // root type
    additionalShippingFeeJeju: number; // Int!
    asInformation?: string | null; // String
    asTel?: string | null; // String
    auctionFee: number; // Float!
    auctionUseType: string; // String!
    autoPrice: string; // String!
    calculateWonType: string; // String!
    cnyRate: number; // Float!
    cnyRateDollar: number; // Float!
    cnyRateEuro: number; // Float!
    cnyRateYen: number; // Float!
    collectStock: number; // Int!
    collectTimeout: number; // Int!
    coupangAccessKey: string; // String!
    coupangDefaultInbound: string; // String!
    coupangDefaultOutbound: string; // String!
    coupangFee: number; // Float!
    coupangImageOpt: string; // String!
    coupangLoginId: string; // String!
    coupangMaximumBuyForPerson: number; // Int!
    coupangOutboundShippingTimeDay: number; // Int!
    coupangSecretKey: string; // String!
    coupangUnionDeliveryType: string; // String!
    coupangUseType: string; // String!
    coupangVendorId: string; // String!
    defaultPrice: string; // String!
    defaultShippingFee: number; // Int!
    descriptionShowTitle: string; // String!
    discountAmount?: number | null; // Int
    discountUnitType?: string | null; // String
    esmplusAuctionId: string; // String!
    esmplusGmarketId: string; // String!
    esmplusMasterId: string; // String!
    exchangeShippingFee: number; // Int!
    extraShippingFee: number; // Int!
    fixImageBottom?: string | null; // String
    fixImageSubBottom?: string | null; // String
    fixImageSubTop?: string | null; // String
    fixImageTop?: string | null; // String
    gmarketFee: number; // Float!
    gmarketUseType: string; // String!
    interparkCertKey: string; // String!
    interparkEditCertKey: string; // String!
    interparkEditSecretKey: string; // String!
    interparkFee: number; // Float!
    interparkSecretKey: string; // String!
    interparkUseType: string; // String!
    lotteonApiKey: string; // String!
    lotteonFee: number; // Float!
    lotteonNormalFee: number; // Float!
    lotteonNormalUseType: string; // String!
    lotteonSellerType: string; // String!
    lotteonUseType?: string | null; // String
    lotteonVendorId: string; // String!
    marginRate: number; // Float!
    marginUnitType?: string | null; // String
    maxProductLimit?: number | null; // Int
    naverAutoSearchTag: string; // String!
    naverFee: number; // Float!
    naverOrigin: string; // String!
    naverOriginCode: string; // String!
    naverStoreOnly: string; // String!
    naverStoreUrl: string; // String!
    naverUseType: string; // String!
    optionAlignTop: string; // String!
    optionIndexType: number; // Int!
    optionTwoWays: string; // String!
    orderToDeliveryName: string; // String!
    phone?: string | null; // String
    productCollectCount: number; // Int!
    refundShippingFee: number; // Int!
    streetApiKey: string; // String!
    streetApiKey2: string; // String!
    streetApiKey3: string; // String!
    streetApiKey4: string; // String!
    streetApiMemo: string; // String!
    streetApiMemo2: string; // String!
    streetApiMemo3: string; // String!
    streetApiMemo4: string; // String!
    streetDefaultInbound: string; // String!
    streetDefaultOutbound: string; // String!
    streetFee: number; // Float!
    streetNormalApiKey: string; // String!
    streetNormalApiKey2: string; // String!
    streetNormalApiKey3: string; // String!
    streetNormalApiKey4: string; // String!
    streetNormalApiMemo: string; // String!
    streetNormalApiMemo2: string; // String!
    streetNormalApiMemo3: string; // String!
    streetNormalApiMemo4: string; // String!
    streetNormalFee: number; // Float!
    streetNormalInbound?: string | null; // String
    streetNormalOutbound?: string | null; // String
    streetNormalUseKeyType: string; // String!
    streetNormalUseType: string; // String!
    streetUseKeyType: string; // String!
    streetUseType: string; // String!
    tmonFee: number; // Float!
    tmonId?: string | null; // String
    tmonUseType: string; // String!
    useDetailInformation: string; // String!
    userId: number; // Int!
    wemakepriceFee: number; // Float!
    wemakepriceId: string; // String!
    wemakepriceUseType: string; // String!
  }
  UserLog: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isRead: boolean; // Boolean!
    payloadData: string; // String!
    title: string; // String!
    userId: number; // Int!
  }
  UserPurchaseAdditionalInfo: { // root type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    type: NexusGenEnums['UserPurchaseAdditionalInfoEnumType']; // UserPurchaseAdditionalInfoEnumType!
  }
  UserPurchaseInfo: { // root type
    additionalInfo: NexusGenRootTypes['UserPurchaseAdditionalInfo'][]; // [UserPurchaseAdditionalInfo!]!
    history: string; // String!
    level: number; // Int!
    levelExpiredAt: NexusGenScalars['DateTime']; // DateTime!
  }
  UserQuestion: { // root type
    answer?: string | null; // String
    answeredAt?: NexusGenScalars['DateTime'] | null; // DateTime
    attachmentFile?: string | null; // String
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isActive: boolean; // Boolean!
    title: string; // String!
    userId: number; // Int!
  }
  WordTable: { // root type
    findWord: string; // String!
    id: number; // Int!
    replaceWord?: string | null; // String
    userId: number; // Int!
  }
  order: { // root type
    deliveryFeeAmt: number; // Int!
    id: number; // Int!
    individualCustomUniqueCode?: string | null; // String
    marketCode: string; // String!
    orderMemberName: string; // String!
    orderMemberTelNo: string; // String!
    orderNo: string; // String!
    orderQuantity: number; // Int!
    productId?: number | null; // Int
    productName: string; // String!
    productOptionContents?: string | null; // String
    productOrderMemo?: string | null; // String
    productPayAmt: number; // Int!
    receiverIntegratedAddress: string; // String!
    receiverName: string; // String!
    receiverTelNo1: string; // String!
    receiverZipCode: string; // String!
    sellerProductManagementCode?: string | null; // String
    state: number; // Int!
    taobaoOrderNo?: string | null; // String
    userId: number; // Int!
  }
  orderStateEnum: { // root type
    description?: string | null; // String
    id: number; // Int!
    name: string; // String!
  }
  productStateEnum: { // root type
    id: number; // Int!
    state?: string | null; // String
  }
  productStoreLogEnum: { // root type
    id: number; // Int!
    state?: string | null; // String
  }
  testType: { // root type
    optionvalues?: Array<string | null> | null; // [String]
    productId?: number | null; // Int
    thumbnails?: Array<string | null> | null; // [String]
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AccountInfo: { // field return type
    accountHolder: string; // String!
    accountNumber: string; // String!
    bankName: string; // String!
  }
  Admin: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    loginId: string; // String!
    state: NexusGenEnums['AdminState']; // AdminState!
  }
  CategoryInfoA001: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoA001Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA006: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoA006Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA027: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoA027Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA077: { // field return type
    categoryInfoA001: NexusGenRootTypes['CategoryInfoA001']; // CategoryInfoA001!
    categoryInfoA006: NexusGenRootTypes['CategoryInfoA006']; // CategoryInfoA006!
    categoryInfoA027: NexusGenRootTypes['CategoryInfoA027']; // CategoryInfoA027!
    categoryInfoA112: NexusGenRootTypes['CategoryInfoA112']; // CategoryInfoA112!
    categoryInfoA113: NexusGenRootTypes['CategoryInfoA113']; // CategoryInfoA113!
    categoryInfoA524: NexusGenRootTypes['CategoryInfoA524']; // CategoryInfoA524!
    categoryInfoA525: NexusGenRootTypes['CategoryInfoA525']; // CategoryInfoA525!
    categoryInfoB378: NexusGenRootTypes['CategoryInfoB378']; // CategoryInfoB378!
    categoryInfoB719: NexusGenRootTypes['CategoryInfoB719']; // CategoryInfoB719!
    categoryInfoB956: NexusGenRootTypes['CategoryInfoB956']; // CategoryInfoB956!
    code: string; // String!
    codeA001: string; // String!
    codeA006: string; // String!
    codeA027: string; // String!
    codeA112: string; // String!
    codeA113: string; // String!
    codeA524: string; // String!
    codeA525: string; // String!
    codeB378: string; // String!
    codeB719: string; // String!
    codeB956: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoA077Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA112: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoA112Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA113: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoA113Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA524: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoA524Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoA525: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoA525Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoB378: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoB378Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoB719: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoB719Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInfoB956: { // field return type
    code: string; // String!
    depth1: string; // String!
    depth2: string; // String!
    depth3: string; // String!
    depth4: string; // String!
    depth5: string; // String!
    depth6: string; // String!
    id: number; // Int!
    name: string; // String!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
  }
  CategoryInfoB956Type: { // field return type
    code: string; // String!
    name: string; // String!
  }
  CategoryInformationType: { // field return type
    categoryInfoA001: NexusGenRootTypes['CategoryInfoA001Type'] | null; // CategoryInfoA001Type
    categoryInfoA006: NexusGenRootTypes['CategoryInfoA006Type'] | null; // CategoryInfoA006Type
    categoryInfoA027: NexusGenRootTypes['CategoryInfoA027Type'] | null; // CategoryInfoA027Type
    categoryInfoA112: NexusGenRootTypes['CategoryInfoA112Type'] | null; // CategoryInfoA112Type
    categoryInfoA113: NexusGenRootTypes['CategoryInfoA113Type'] | null; // CategoryInfoA113Type
    categoryInfoA524: NexusGenRootTypes['CategoryInfoA524Type'] | null; // CategoryInfoA524Type
    categoryInfoA525: NexusGenRootTypes['CategoryInfoA525Type'] | null; // CategoryInfoA525Type
    categoryInfoB378: NexusGenRootTypes['CategoryInfoB378Type'] | null; // CategoryInfoB378Type
    categoryInfoB719: NexusGenRootTypes['CategoryInfoB719Type'] | null; // CategoryInfoB719Type
    categoryInfoB956: NexusGenRootTypes['CategoryInfoB956Type'] | null; // CategoryInfoB956Type
    code: string; // String!
    code_a001: string | null; // String
    code_a006: string | null; // String
    code_a027: string | null; // String
    code_a077: string | null; // String
    code_a112: string | null; // String
    code_a113: string | null; // String
    code_a524: string | null; // String
    code_a525: string | null; // String
    code_b378: string | null; // String
    code_b719: string | null; // String
    code_b956: string | null; // String
    depth1: string | null; // String
    depth2: string | null; // String
    depth3: string | null; // String
    depth4: string | null; // String
    depth5: string | null; // String
    depth6: string | null; // String
    id: string | null; // String
    name: string; // String!
  }
  CategorySelectType: { // field return type
    code: string; // String!
    name: string; // String!
  }
  Mutation: { // field return type
    EditPassword: string; // String!
    EditPasswordCreateVerification: string; // String!
    addWordByExcelByUser: boolean; // Boolean!
    addWordByUser: boolean; // Boolean!
    cancelPurchasePlanByUser: boolean; // Boolean!
    cardPayTest: string; // String!
    changeMyPasswordByAdmin: boolean; // Boolean!
    changePasswordByUser: boolean; // Boolean!
    connectSocialIdByUser: NexusGenRootTypes['User']; // User!
    createNewOrder: number; // Int!
    createNoticeByAdmin: boolean; // Boolean!
    createUserQuestionByUser: boolean; // Boolean!
    deleteNoticeByAdmin: number; // Int!
    deleteProductByAdmin: boolean; // Boolean!
    deleteProductByUser: boolean; // Boolean!
    deleteStore: boolean; // Boolean!
    deleteWordByUser: boolean; // Boolean!
    disableUserOption: boolean; // Boolean!
    endProductSellStateByAdmin: number; // Int!
    endProductSellStateByUser: number; // Int!
    extendMyAccountByUser: boolean; // Boolean!
    findEmail: string; // String!
    findEmailCreateVerification: string; // String!
    getProductListAllKeys: boolean; // Boolean!
    getTaobaoItemUsingExtensionByUser: string; // String!
    initProductDescriptionByUser: string | null; // String
    initProductImageByUser: string | null; // String
    initProductOptionImageByUser: string | null; // String
    initProductThumbnailImageByUser: string | null; // String
    invalidatePurchaseInfoByAdmin: boolean; // Boolean!
    modifyWordByUser: boolean; // Boolean!
    purchasePlanByUser: number; // Int!
    requestPhoneVerificationByEveryone: boolean; // Boolean!
    restoreProductOptionValue: string; // String!
    setMaxProductLimitByAdmin: boolean; // Boolean!
    setMultiPurchaseInfoByAdmin: boolean; // Boolean!
    setProductOptionNameBySomeOne: boolean; // Boolean!
    setProductOptionValueBySomeOne: string; // String!
    setPurchaseInfoByAdmin: boolean; // Boolean!
    setUserStopTest: boolean; // Boolean!
    signInAdminByEveryone: NexusGenRootTypes['SignInType']; // SignInType!
    signInUserByEveryone: NexusGenRootTypes['SignInType']; // SignInType!
    signOutUserByEveryone: string; // String!
    signUpAdminByAdmin: boolean; // Boolean!
    signUpUserByEveryone: string; // String!
    signUpUserByEveryone2: string; // String!
    silentRefreshToken: NexusGenRootTypes['SignInType'] | null; // SignInType
    t_createProduct: boolean | null; // Boolean
    testAddjobCallBack: boolean; // Boolean!
    transferProductsToUserByAdmin: string; // String!
    translateProductTextByUser: string; // String!
    translateProductsTextByUser: string; // String!
    unlinkProductStore: boolean; // Boolean!
    updateCnyRateByAdmin: number; // Float!
    updateDescription: string; // String!
    updateFreeUserDayLimitByAdmin: number; // Int!
    updateFreeUserProductLimitByAdmin: number; // Int!
    updateImageThumbnailData: string; // String!
    updateManyProductAttributeByUser: string; // String!
    updateManyProductCategoryByAdmin: number; // Int!
    updateManyProductCategoryByUser: number; // Int!
    updateManyProductFee: string; // String!
    updateManyProductNameByUser: string; // String!
    updateManyProductOption: string; // String!
    updateManyProductOptionValue: string; // String!
    updateManyProductSiilInfoByAdmin: number; // Int!
    updateManyProductSiilInfoByUser: number; // Int!
    updateManyProductTagByUser: string; // String!
    updateMultipleProductNameByUser: string; // String!
    updateMyDataByUser: boolean; // Boolean!
    updateMyImageByUser: boolean; // Boolean!
    updateNewProductImageBySomeone: string; // String!
    updateNoticeByAdmin: boolean; // Boolean!
    updatePhoneByUser: boolean; // Boolean!
    updatePlanInfoByAdmin: NexusGenRootTypes['PlanInfo']; // PlanInfo!
    updateProductAttributeByUser: string; // String!
    updateProductByAdmin: NexusGenRootTypes['Product']; // Product!
    updateProductByUser: NexusGenRootTypes['Product']; // Product!
    updateProductCategory: string; // String!
    updateProductFee: string; // String!
    updateProductImageBySomeone: NexusGenRootTypes['Product']; // Product!
    updateProductImageBySomeone2: string; // String!
    updateProductNameByAdmin: string; // String!
    updateProductNameByUser: string; // String!
    updateProductOption: number[]; // [Int!]!
    updateProductOptionShippingFee: string | null; // String
    updateProductPriceByAdmin: number; // Int!
    updateProductPriceByUser: number; // Int!
    updateProductSinglePriceByUser: string; // String!
    updateProductStoreUrlInfoBySomeone: string; // String!
    updateProductTagByUser: string; // String!
    updateTaobaoRefreshDayByAdmin: number; // Int!
    updateUserQuestionByAdmin: boolean; // Boolean!
    verifyPhoneByEveryone: string; // String!
  }
  Notice: { // field return type
    attachmentFile: string | null; // String
    content: string; // String!
    contentSummary: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isVisible: boolean; // Boolean!
    title: string; // String!
    viewCount: number; // Int!
  }
  PhoneVerification: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    tel: string; // String!
    used: number | null; // Int
    verificationNumber: string; // String!
  }
  PlanInfo: { // field return type
    description: string; // String!
    externalFeatureVariableId: string | null; // String
    id: number; // Int!
    isActive: boolean; // Boolean!
    month: number; // Int!
    name: string; // String!
    planLevel: number | null; // Int
    price: number; // Int!
  }
  Product: { // field return type
    activeProductStore: NexusGenRootTypes['ProductStore'][]; // [ProductStore!]!
    activeTaobaoProduct: NexusGenRootTypes['TaobaoProduct']; // TaobaoProduct!
    admin: NexusGenRootTypes['Admin'] | null; // Admin
    adminId: number | null; // Int
    attribute: string; // String!
    auctionFee: number | null; // Float
    brandName: string; // String!
    categoryInfoA001: NexusGenRootTypes['CategoryInfoA001'] | null; // CategoryInfoA001
    categoryInfoA006: NexusGenRootTypes['CategoryInfoA006'] | null; // CategoryInfoA006
    categoryInfoA027: NexusGenRootTypes['CategoryInfoA027'] | null; // CategoryInfoA027
    categoryInfoA077: NexusGenRootTypes['CategoryInfoA077'] | null; // CategoryInfoA077
    categoryInfoA112: NexusGenRootTypes['CategoryInfoA112'] | null; // CategoryInfoA112
    categoryInfoA113: NexusGenRootTypes['CategoryInfoA113'] | null; // CategoryInfoA113
    categoryInfoA524: NexusGenRootTypes['CategoryInfoA524'] | null; // CategoryInfoA524
    categoryInfoA525: NexusGenRootTypes['CategoryInfoA525'] | null; // CategoryInfoA525
    categoryInfoB378: NexusGenRootTypes['CategoryInfoB378'] | null; // CategoryInfoB378
    categoryInfoB719: NexusGenRootTypes['CategoryInfoB719'] | null; // CategoryInfoB719
    categoryInfoB956: NexusGenRootTypes['CategoryInfoB956'] | null; // CategoryInfoB956
    cnyRate: number; // Float!
    coupangFee: number | null; // Float
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    gmarketFee: number | null; // Float
    id: number; // Int!
    imageThumbnail: string[]; // [String!]!
    imageThumbnailData: string; // String!
    immSearchTags: string | null; // String
    interparkFee: number | null; // Float
    isImageTranslated: boolean; // Boolean!
    localShippingCode: number | null; // Int
    localShippingFee: number; // Int!
    lotteonFee: number | null; // Float
    lotteonNormalFee: number | null; // Float
    manuFacturer: string; // String!
    marginRate: number; // Float!
    marginUnitType: string | null; // String
    modelName: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    name: string; // String!
    naverFee: number | null; // Float
    optionInfoHtml: string; // String!
    price: number; // Int!
    productCode: string; // String!
    productOption: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    productOptionName: NexusGenRootTypes['ProductOptionName'][]; // [ProductOptionName!]!
    productStateEnum: NexusGenRootTypes['productStateEnum']; // productStateEnum!
    productStore: NexusGenRootTypes['ProductStore'][]; // [ProductStore!]!
    searchTags: string | null; // String
    shippingFee: number; // Int!
    siilCode: string | null; // String
    siilData: string | null; // String
    siilInfo: NexusGenRootTypes['SiilSavedData'] | null; // SiilSavedData
    state: number; // Int!
    stockUpdatedAt: NexusGenScalars['DateTime']; // DateTime!
    streetFee: number | null; // Float
    streetNormalFee: number | null; // Float
    taobaoProduct: NexusGenRootTypes['TaobaoProduct']; // TaobaoProduct!
    taobaoProductId: number; // Int!
    tmonFee: number | null; // Float
    user: NexusGenRootTypes['User'] | null; // User
    userId: number | null; // Int
    wemakepriceFee: number | null; // Float
  }
  ProductOption: { // field return type
    defaultShippingFee: number | null; // Int
    id: number; // Int!
    isActive: boolean; // Boolean!
    name: string; // String!
    optionString: string; // String!
    optionValue1Id: number; // Int!
    optionValue2Id: number | null; // Int
    optionValue3Id: number | null; // Int
    optionValue4Id: number | null; // Int
    optionValue5Id: number | null; // Int
    price: number; // Int!
    priceCny: number; // Float!
    product: NexusGenRootTypes['Product']; // Product!
    productId: number; // Int!
    productOption1: NexusGenRootTypes['ProductOptionValue']; // ProductOptionValue!
    productOption2: NexusGenRootTypes['ProductOptionValue'] | null; // ProductOptionValue
    productOption3: NexusGenRootTypes['ProductOptionValue'] | null; // ProductOptionValue
    productOption4: NexusGenRootTypes['ProductOptionValue'] | null; // ProductOptionValue
    productOption5: NexusGenRootTypes['ProductOptionValue'] | null; // ProductOptionValue
    stock: number | null; // Int
    taobaoSkuId: string; // String!
  }
  ProductOptionName: { // field return type
    id: number; // Int!
    isActive: boolean | null; // Boolean
    isNameTranslated: boolean; // Boolean!
    name: string; // String!
    order: number; // Int!
    product: NexusGenRootTypes['Product']; // Product!
    productId: number; // Int!
    productOptionValue: NexusGenRootTypes['ProductOptionValue'][]; // [ProductOptionValue!]!
    taobaoPid: string; // String!
  }
  ProductOptionValue: { // field return type
    id: number; // Int!
    image: string | null; // String
    isActive: boolean; // Boolean!
    isNameTranslated: boolean; // Boolean!
    name: string; // String!
    number: number; // Int!
    optionNameOrder: number; // Int!
    optionValue1: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    optionValue2: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    optionValue3: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    optionValue4: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    optionValue5: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    originalName: string | null; // String
    productOption: NexusGenRootTypes['ProductOption'][]; // [ProductOption!]!
    productOptionName: NexusGenRootTypes['ProductOptionName']; // ProductOptionName!
    productOptionNameId: number; // Int!
    taobaoVid: string; // String!
  }
  ProductStore: { // field return type
    connectedAt: NexusGenScalars['DateTime']; // DateTime!
    etcVendorItemId: string | null; // String
    id: number; // Int!
    product: NexusGenRootTypes['Product']; // Product!
    productId: number; // Int!
    productStoreLog: NexusGenRootTypes['ProductStoreLog'][]; // [ProductStoreLog!]!
    productStoreState: NexusGenRootTypes['ProductStoreState']; // ProductStoreState!
    siteCode: string; // String!
    state: number; // Int!
    storeProductId: string | null; // String
    storeUrl: string | null; // String
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  ProductStoreLog: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    destState: number; // Int!
    errorMessage: string; // String!
    id: number; // Int!
    jobId: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    productStoreId: number; // Int!
    productStoreLogEnum: NexusGenRootTypes['productStoreLogEnum']; // productStoreLogEnum!
    productStoreState: NexusGenRootTypes['ProductStoreState']; // ProductStoreState!
    productstore: NexusGenRootTypes['ProductStore']; // ProductStore!
    uploadState: number; // Int!
  }
  ProductStoreState: { // field return type
    description: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  PurchaseLog: { // field return type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    payAmount: number; // Int!
    payId: string | null; // String
    planInfo: string; // String!
    purchasedAt: NexusGenScalars['DateTime']; // DateTime!
    state: NexusGenEnums['PurchaseLogState']; // PurchaseLogState!
    type: NexusGenEnums['PurchaseLogType']; // PurchaseLogType!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  Query: { // field return type
    getExcelSampleUrlBySomeone: string; // String!
    getRegisterProductsDataByUser: string; // String!
    searchCategoryInfoA001BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoA006BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoA027BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoA077BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoA112BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoA113BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoA524BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoA525BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoB378BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoB719BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchCategoryInfoB956BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    searchManyCategoryInfoA077BySomeone: NexusGenRootTypes['CategoryInformationType'][]; // [CategoryInformationType!]!
    selectCnyRateByEveryone: number; // Float!
    selectFreeUserDayLimitByAdmin: number; // Int!
    selectFreeUserProductLimitByAdmin: number; // Int!
    selectMyInfoByUser: NexusGenRootTypes['User']; // User!
    selectMyOrderByUser: NexusGenRootTypes['order'][]; // [order!]!
    selectMyProductByUser: NexusGenRootTypes['Product'][]; // [Product!]!
    selectMyProductsCountByUser: number; // Int!
    selectNoticeByEveryone: NexusGenRootTypes['Notice']; // Notice!
    selectNoticeCountByAdmin: number | null; // Int
    selectNoticesByEveryone: NexusGenRootTypes['Notice'][]; // [Notice!]!
    selectPlanInfosForEveryone: NexusGenRootTypes['PlanInfo'][]; // [PlanInfo!]!
    selectProductsByAdmin: NexusGenRootTypes['Product'][]; // [Product!]!
    selectProductsBySomeone: NexusGenRootTypes['Product'][]; // [Product!]!
    selectProductsCountByAdmin: number | null; // Int
    selectProductsCountBySomeone: number | null; // Int
    selectSiilInfoBySomeone: NexusGenRootTypes['SiilItems'][]; // [SiilItems!]!
    selectTaobaoProductsByAdmin: NexusGenRootTypes['TaobaoProduct'][]; // [TaobaoProduct!]!
    selectTaobaoProductsByUser: NexusGenRootTypes['TaobaoProduct'][]; // [TaobaoProduct!]!
    selectTaobaoProductsCountByAdmin: number | null; // Int
    selectTaobaoRefreshDayByEveryone: number; // Int!
    selectUserLogsByUser: NexusGenRootTypes['UserLog'][]; // [UserLog!]!
    selectUserQuestionBySomeone: NexusGenRootTypes['UserQuestion'][]; // [UserQuestion!]!
    selectUserQuestionCountBySomeone: number | null; // Int
    selectUsersByAdmin: NexusGenRootTypes['User'][]; // [User!]!
    selectUsersCountByAdmin: number; // Int!
    selectWordTablesBySomeone: NexusGenRootTypes['WordTable'][]; // [WordTable!]!
    seletExistPurchaseLog: boolean; // Boolean!
    t_get: string | null; // String
    t_getEncodedSetInfo: string | null; // String
    testS3DeleteProduct: string | null; // String
    translateText: string; // String!
    whoami: string | null; // String
  }
  SignInType: { // field return type
    accessToken: string; // String!
    refreshToken: string; // String!
  }
  SiilItem: { // field return type
    code: string; // String!
    inputType: NexusGenEnums['SiilItemTypeEnum']; // SiilItemTypeEnum!
    name: string; // String!
    options: string[] | null; // [String!]
  }
  SiilItems: { // field return type
    data: NexusGenRootTypes['SiilItem'][]; // [SiilItem!]!
    description: string; // String!
  }
  SiilSavedData: { // field return type
    code: string; // String!
    data: NexusGenRootTypes['SiilSavedItem'][]; // [SiilSavedItem!]!
  }
  SiilSavedItem: { // field return type
    code: string; // String!
    value: string; // String!
  }
  Subscription: { // field return type
    subscribeUserEvent: NexusGenRootTypes['UserLog'] | null; // UserLog
  }
  TaobaoProduct: { // field return type
    brand: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    imageThumbnail: string; // String!
    modifiedAt: NexusGenScalars['DateTime']; // DateTime!
    name: string; // String!
    originalData: string; // String!
    price: number; // Float!
    product: NexusGenRootTypes['Product'][]; // [Product!]!
    shopName: string | null; // String
    taobaoBrandId: string | null; // String
    taobaoCategoryId: string; // String!
    taobaoNumIid: string; // String!
    url: string | null; // String
    videoUrl: string | null; // String
  }
  TaobaoProductOption: { // field return type
    name: string; // String!
    taobaoSkuId: string; // String!
  }
  TaobaoProductOptionInfo: { // field return type
    option: NexusGenRootTypes['TaobaoProductOption'][]; // [TaobaoProductOption!]!
    optionName: NexusGenRootTypes['TaobaoProductOptionName'][]; // [TaobaoProductOptionName!]!
    optionValue: NexusGenRootTypes['TaobaoProductOptionValue'][]; // [TaobaoProductOptionValue!]!
  }
  TaobaoProductOptionName: { // field return type
    name: string; // String!
    taobaoPid: string; // String!
  }
  TaobaoProductOptionValue: { // field return type
    image: string | null; // String
    name: string; // String!
    taobaoVid: string; // String!
  }
  User: { // field return type
    connectedUsers: NexusGenRootTypes['User'][]; // [User!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    createdToken: NexusGenScalars['DateTime'] | null; // DateTime
    credit: number; // Int!
    email: string; // String!
    id: number; // Int!
    kakaoId: string | null; // String
    master: number; // Int!
    masterUserId: number | null; // Int
    naverId: string | null; // String
    password: string | null; // String
    product: NexusGenRootTypes['Product'][]; // [Product!]!
    productCount: number; // Int!
    purchaseInfo: NexusGenRootTypes['UserPurchaseInfo']; // UserPurchaseInfo!
    refAvailable: boolean; // Boolean!
    refCode: string | null; // String
    state: NexusGenEnums['UserState']; // UserState!
    token: string | null; // String
    userInfo: NexusGenRootTypes['UserInfo'] | null; // UserInfo
    userLog: NexusGenRootTypes['UserLog'][]; // [UserLog!]!
    verificationNumber: string; // String!
  }
  UserInfo: { // field return type
    additionalShippingFeeJeju: number; // Int!
    asInformation: string | null; // String
    asTel: string | null; // String
    auctionFee: number; // Float!
    auctionUseType: string; // String!
    autoPrice: string; // String!
    calculateWonType: string; // String!
    cnyRate: number; // Float!
    cnyRateDollar: number; // Float!
    cnyRateEuro: number; // Float!
    cnyRateYen: number; // Float!
    collectStock: number; // Int!
    collectTimeout: number; // Int!
    coupangAccessKey: string; // String!
    coupangDefaultInbound: string; // String!
    coupangDefaultOutbound: string; // String!
    coupangFee: number; // Float!
    coupangImageOpt: string; // String!
    coupangLoginId: string; // String!
    coupangMaximumBuyForPerson: number; // Int!
    coupangOutboundShippingTimeDay: number; // Int!
    coupangSecretKey: string; // String!
    coupangUnionDeliveryType: string; // String!
    coupangUseType: string; // String!
    coupangVendorId: string; // String!
    defaultPrice: string; // String!
    defaultShippingFee: number; // Int!
    descriptionShowTitle: string; // String!
    discountAmount: number | null; // Int
    discountUnitType: string | null; // String
    esmplusAuctionId: string; // String!
    esmplusGmarketId: string; // String!
    esmplusMasterId: string; // String!
    exchangeShippingFee: number; // Int!
    extraShippingFee: number; // Int!
    fixImageBottom: string | null; // String
    fixImageSubBottom: string | null; // String
    fixImageSubTop: string | null; // String
    fixImageTop: string | null; // String
    gmarketFee: number; // Float!
    gmarketUseType: string; // String!
    interparkCertKey: string; // String!
    interparkEditCertKey: string; // String!
    interparkEditSecretKey: string; // String!
    interparkFee: number; // Float!
    interparkSecretKey: string; // String!
    interparkUseType: string; // String!
    lotteonApiKey: string; // String!
    lotteonFee: number; // Float!
    lotteonNormalFee: number; // Float!
    lotteonNormalUseType: string; // String!
    lotteonSellerType: string; // String!
    lotteonUseType: string | null; // String
    lotteonVendorId: string; // String!
    marginRate: number; // Float!
    marginUnitType: string | null; // String
    maxProductLimit: number | null; // Int
    naverAutoSearchTag: string; // String!
    naverFee: number; // Float!
    naverOrigin: string; // String!
    naverOriginCode: string; // String!
    naverStoreOnly: string; // String!
    naverStoreUrl: string; // String!
    naverUseType: string; // String!
    optionAlignTop: string; // String!
    optionIndexType: number; // Int!
    optionTwoWays: string; // String!
    orderToDeliveryName: string; // String!
    phone: string | null; // String
    productCollectCount: number; // Int!
    refundShippingFee: number; // Int!
    streetApiKey: string; // String!
    streetApiKey2: string; // String!
    streetApiKey3: string; // String!
    streetApiKey4: string; // String!
    streetApiMemo: string; // String!
    streetApiMemo2: string; // String!
    streetApiMemo3: string; // String!
    streetApiMemo4: string; // String!
    streetDefaultInbound: string; // String!
    streetDefaultOutbound: string; // String!
    streetFee: number; // Float!
    streetNormalApiKey: string; // String!
    streetNormalApiKey2: string; // String!
    streetNormalApiKey3: string; // String!
    streetNormalApiKey4: string; // String!
    streetNormalApiMemo: string; // String!
    streetNormalApiMemo2: string; // String!
    streetNormalApiMemo3: string; // String!
    streetNormalApiMemo4: string; // String!
    streetNormalFee: number; // Float!
    streetNormalInbound: string | null; // String
    streetNormalOutbound: string | null; // String
    streetNormalUseKeyType: string; // String!
    streetNormalUseType: string; // String!
    streetUseKeyType: string; // String!
    streetUseType: string; // String!
    tmonFee: number; // Float!
    tmonId: string | null; // String
    tmonUseType: string; // String!
    useDetailInformation: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
    wemakepriceFee: number; // Float!
    wemakepriceId: string; // String!
    wemakepriceUseType: string; // String!
  }
  UserLog: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isRead: boolean; // Boolean!
    payloadData: string; // String!
    title: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  UserPurchaseAdditionalInfo: { // field return type
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
    type: NexusGenEnums['UserPurchaseAdditionalInfoEnumType']; // UserPurchaseAdditionalInfoEnumType!
  }
  UserPurchaseInfo: { // field return type
    additionalInfo: NexusGenRootTypes['UserPurchaseAdditionalInfo'][]; // [UserPurchaseAdditionalInfo!]!
    history: string; // String!
    level: number; // Int!
    levelExpiredAt: NexusGenScalars['DateTime']; // DateTime!
  }
  UserQuestion: { // field return type
    answer: string | null; // String
    answeredAt: NexusGenScalars['DateTime'] | null; // DateTime
    attachmentFile: string | null; // String
    attachmentFiles: string[]; // [String!]!
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isActive: boolean; // Boolean!
    title: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  WordTable: { // field return type
    findWord: string; // String!
    id: number; // Int!
    replaceWord: string | null; // String
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  order: { // field return type
    deliveryFeeAmt: number; // Int!
    id: number; // Int!
    individualCustomUniqueCode: string | null; // String
    marketCode: string; // String!
    orderMemberName: string; // String!
    orderMemberTelNo: string; // String!
    orderNo: string; // String!
    orderQuantity: number; // Int!
    orderStateEnum: NexusGenRootTypes['orderStateEnum']; // orderStateEnum!
    productId: number | null; // Int
    productName: string; // String!
    productOptionContents: string | null; // String
    productOrderMemo: string | null; // String
    productPayAmt: number; // Int!
    receiverIntegratedAddress: string; // String!
    receiverName: string; // String!
    receiverTelNo1: string; // String!
    receiverZipCode: string; // String!
    sellerProductManagementCode: string | null; // String
    state: number; // Int!
    taobaoOrderNo: string | null; // String
    userId: number; // Int!
  }
  orderStateEnum: { // field return type
    description: string | null; // String
    id: number; // Int!
    name: string; // String!
  }
  productStateEnum: { // field return type
    id: number; // Int!
    state: string | null; // String
  }
  productStoreLogEnum: { // field return type
    id: number; // Int!
    state: string | null; // String
  }
  testType: { // field return type
    optionvalues: Array<string | null> | null; // [String]
    productId: number | null; // Int
    thumbnails: Array<string | null> | null; // [String]
  }
}

export interface NexusGenFieldTypeNames {
  AccountInfo: { // field return type name
    accountHolder: 'String'
    accountNumber: 'String'
    bankName: 'String'
  }
  Admin: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    loginId: 'String'
    state: 'AdminState'
  }
  CategoryInfoA001: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoA001Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoA006: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoA006Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoA027: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoA027Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoA077: { // field return type name
    categoryInfoA001: 'CategoryInfoA001'
    categoryInfoA006: 'CategoryInfoA006'
    categoryInfoA027: 'CategoryInfoA027'
    categoryInfoA112: 'CategoryInfoA112'
    categoryInfoA113: 'CategoryInfoA113'
    categoryInfoA524: 'CategoryInfoA524'
    categoryInfoA525: 'CategoryInfoA525'
    categoryInfoB378: 'CategoryInfoB378'
    categoryInfoB719: 'CategoryInfoB719'
    categoryInfoB956: 'CategoryInfoB956'
    code: 'String'
    codeA001: 'String'
    codeA006: 'String'
    codeA027: 'String'
    codeA112: 'String'
    codeA113: 'String'
    codeA524: 'String'
    codeA525: 'String'
    codeB378: 'String'
    codeB719: 'String'
    codeB956: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoA077Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoA112: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoA112Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoA113: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoA113Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoA524: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoA524Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoA525: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoA525Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoB378: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoB378Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoB719: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoB719Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInfoB956: { // field return type name
    code: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'Int'
    name: 'String'
    product: 'Product'
  }
  CategoryInfoB956Type: { // field return type name
    code: 'String'
    name: 'String'
  }
  CategoryInformationType: { // field return type name
    categoryInfoA001: 'CategoryInfoA001Type'
    categoryInfoA006: 'CategoryInfoA006Type'
    categoryInfoA027: 'CategoryInfoA027Type'
    categoryInfoA112: 'CategoryInfoA112Type'
    categoryInfoA113: 'CategoryInfoA113Type'
    categoryInfoA524: 'CategoryInfoA524Type'
    categoryInfoA525: 'CategoryInfoA525Type'
    categoryInfoB378: 'CategoryInfoB378Type'
    categoryInfoB719: 'CategoryInfoB719Type'
    categoryInfoB956: 'CategoryInfoB956Type'
    code: 'String'
    code_a001: 'String'
    code_a006: 'String'
    code_a027: 'String'
    code_a077: 'String'
    code_a112: 'String'
    code_a113: 'String'
    code_a524: 'String'
    code_a525: 'String'
    code_b378: 'String'
    code_b719: 'String'
    code_b956: 'String'
    depth1: 'String'
    depth2: 'String'
    depth3: 'String'
    depth4: 'String'
    depth5: 'String'
    depth6: 'String'
    id: 'String'
    name: 'String'
  }
  CategorySelectType: { // field return type name
    code: 'String'
    name: 'String'
  }
  Mutation: { // field return type name
    EditPassword: 'String'
    EditPasswordCreateVerification: 'String'
    addWordByExcelByUser: 'Boolean'
    addWordByUser: 'Boolean'
    cancelPurchasePlanByUser: 'Boolean'
    cardPayTest: 'String'
    changeMyPasswordByAdmin: 'Boolean'
    changePasswordByUser: 'Boolean'
    connectSocialIdByUser: 'User'
    createNewOrder: 'Int'
    createNoticeByAdmin: 'Boolean'
    createUserQuestionByUser: 'Boolean'
    deleteNoticeByAdmin: 'Int'
    deleteProductByAdmin: 'Boolean'
    deleteProductByUser: 'Boolean'
    deleteStore: 'Boolean'
    deleteWordByUser: 'Boolean'
    disableUserOption: 'Boolean'
    endProductSellStateByAdmin: 'Int'
    endProductSellStateByUser: 'Int'
    extendMyAccountByUser: 'Boolean'
    findEmail: 'String'
    findEmailCreateVerification: 'String'
    getProductListAllKeys: 'Boolean'
    getTaobaoItemUsingExtensionByUser: 'String'
    initProductDescriptionByUser: 'String'
    initProductImageByUser: 'String'
    initProductOptionImageByUser: 'String'
    initProductThumbnailImageByUser: 'String'
    invalidatePurchaseInfoByAdmin: 'Boolean'
    modifyWordByUser: 'Boolean'
    purchasePlanByUser: 'Int'
    requestPhoneVerificationByEveryone: 'Boolean'
    restoreProductOptionValue: 'String'
    setMaxProductLimitByAdmin: 'Boolean'
    setMultiPurchaseInfoByAdmin: 'Boolean'
    setProductOptionNameBySomeOne: 'Boolean'
    setProductOptionValueBySomeOne: 'String'
    setPurchaseInfoByAdmin: 'Boolean'
    setUserStopTest: 'Boolean'
    signInAdminByEveryone: 'SignInType'
    signInUserByEveryone: 'SignInType'
    signOutUserByEveryone: 'String'
    signUpAdminByAdmin: 'Boolean'
    signUpUserByEveryone: 'String'
    signUpUserByEveryone2: 'String'
    silentRefreshToken: 'SignInType'
    t_createProduct: 'Boolean'
    testAddjobCallBack: 'Boolean'
    transferProductsToUserByAdmin: 'String'
    translateProductTextByUser: 'String'
    translateProductsTextByUser: 'String'
    unlinkProductStore: 'Boolean'
    updateCnyRateByAdmin: 'Float'
    updateDescription: 'String'
    updateFreeUserDayLimitByAdmin: 'Int'
    updateFreeUserProductLimitByAdmin: 'Int'
    updateImageThumbnailData: 'String'
    updateManyProductAttributeByUser: 'String'
    updateManyProductCategoryByAdmin: 'Int'
    updateManyProductCategoryByUser: 'Int'
    updateManyProductFee: 'String'
    updateManyProductNameByUser: 'String'
    updateManyProductOption: 'String'
    updateManyProductOptionValue: 'String'
    updateManyProductSiilInfoByAdmin: 'Int'
    updateManyProductSiilInfoByUser: 'Int'
    updateManyProductTagByUser: 'String'
    updateMultipleProductNameByUser: 'String'
    updateMyDataByUser: 'Boolean'
    updateMyImageByUser: 'Boolean'
    updateNewProductImageBySomeone: 'String'
    updateNoticeByAdmin: 'Boolean'
    updatePhoneByUser: 'Boolean'
    updatePlanInfoByAdmin: 'PlanInfo'
    updateProductAttributeByUser: 'String'
    updateProductByAdmin: 'Product'
    updateProductByUser: 'Product'
    updateProductCategory: 'String'
    updateProductFee: 'String'
    updateProductImageBySomeone: 'Product'
    updateProductImageBySomeone2: 'String'
    updateProductNameByAdmin: 'String'
    updateProductNameByUser: 'String'
    updateProductOption: 'Int'
    updateProductOptionShippingFee: 'String'
    updateProductPriceByAdmin: 'Int'
    updateProductPriceByUser: 'Int'
    updateProductSinglePriceByUser: 'String'
    updateProductStoreUrlInfoBySomeone: 'String'
    updateProductTagByUser: 'String'
    updateTaobaoRefreshDayByAdmin: 'Int'
    updateUserQuestionByAdmin: 'Boolean'
    verifyPhoneByEveryone: 'String'
  }
  Notice: { // field return type name
    attachmentFile: 'String'
    content: 'String'
    contentSummary: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    isVisible: 'Boolean'
    title: 'String'
    viewCount: 'Int'
  }
  PhoneVerification: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    tel: 'String'
    used: 'Int'
    verificationNumber: 'String'
  }
  PlanInfo: { // field return type name
    description: 'String'
    externalFeatureVariableId: 'String'
    id: 'Int'
    isActive: 'Boolean'
    month: 'Int'
    name: 'String'
    planLevel: 'Int'
    price: 'Int'
  }
  Product: { // field return type name
    activeProductStore: 'ProductStore'
    activeTaobaoProduct: 'TaobaoProduct'
    admin: 'Admin'
    adminId: 'Int'
    attribute: 'String'
    auctionFee: 'Float'
    brandName: 'String'
    categoryInfoA001: 'CategoryInfoA001'
    categoryInfoA006: 'CategoryInfoA006'
    categoryInfoA027: 'CategoryInfoA027'
    categoryInfoA077: 'CategoryInfoA077'
    categoryInfoA112: 'CategoryInfoA112'
    categoryInfoA113: 'CategoryInfoA113'
    categoryInfoA524: 'CategoryInfoA524'
    categoryInfoA525: 'CategoryInfoA525'
    categoryInfoB378: 'CategoryInfoB378'
    categoryInfoB719: 'CategoryInfoB719'
    categoryInfoB956: 'CategoryInfoB956'
    cnyRate: 'Float'
    coupangFee: 'Float'
    createdAt: 'DateTime'
    description: 'String'
    gmarketFee: 'Float'
    id: 'Int'
    imageThumbnail: 'String'
    imageThumbnailData: 'String'
    immSearchTags: 'String'
    interparkFee: 'Float'
    isImageTranslated: 'Boolean'
    localShippingCode: 'Int'
    localShippingFee: 'Int'
    lotteonFee: 'Float'
    lotteonNormalFee: 'Float'
    manuFacturer: 'String'
    marginRate: 'Float'
    marginUnitType: 'String'
    modelName: 'String'
    modifiedAt: 'DateTime'
    name: 'String'
    naverFee: 'Float'
    optionInfoHtml: 'String'
    price: 'Int'
    productCode: 'String'
    productOption: 'ProductOption'
    productOptionName: 'ProductOptionName'
    productStateEnum: 'productStateEnum'
    productStore: 'ProductStore'
    searchTags: 'String'
    shippingFee: 'Int'
    siilCode: 'String'
    siilData: 'String'
    siilInfo: 'SiilSavedData'
    state: 'Int'
    stockUpdatedAt: 'DateTime'
    streetFee: 'Float'
    streetNormalFee: 'Float'
    taobaoProduct: 'TaobaoProduct'
    taobaoProductId: 'Int'
    tmonFee: 'Float'
    user: 'User'
    userId: 'Int'
    wemakepriceFee: 'Float'
  }
  ProductOption: { // field return type name
    defaultShippingFee: 'Int'
    id: 'Int'
    isActive: 'Boolean'
    name: 'String'
    optionString: 'String'
    optionValue1Id: 'Int'
    optionValue2Id: 'Int'
    optionValue3Id: 'Int'
    optionValue4Id: 'Int'
    optionValue5Id: 'Int'
    price: 'Int'
    priceCny: 'Float'
    product: 'Product'
    productId: 'Int'
    productOption1: 'ProductOptionValue'
    productOption2: 'ProductOptionValue'
    productOption3: 'ProductOptionValue'
    productOption4: 'ProductOptionValue'
    productOption5: 'ProductOptionValue'
    stock: 'Int'
    taobaoSkuId: 'String'
  }
  ProductOptionName: { // field return type name
    id: 'Int'
    isActive: 'Boolean'
    isNameTranslated: 'Boolean'
    name: 'String'
    order: 'Int'
    product: 'Product'
    productId: 'Int'
    productOptionValue: 'ProductOptionValue'
    taobaoPid: 'String'
  }
  ProductOptionValue: { // field return type name
    id: 'Int'
    image: 'String'
    isActive: 'Boolean'
    isNameTranslated: 'Boolean'
    name: 'String'
    number: 'Int'
    optionNameOrder: 'Int'
    optionValue1: 'ProductOption'
    optionValue2: 'ProductOption'
    optionValue3: 'ProductOption'
    optionValue4: 'ProductOption'
    optionValue5: 'ProductOption'
    originalName: 'String'
    productOption: 'ProductOption'
    productOptionName: 'ProductOptionName'
    productOptionNameId: 'Int'
    taobaoVid: 'String'
  }
  ProductStore: { // field return type name
    connectedAt: 'DateTime'
    etcVendorItemId: 'String'
    id: 'Int'
    product: 'Product'
    productId: 'Int'
    productStoreLog: 'ProductStoreLog'
    productStoreState: 'ProductStoreState'
    siteCode: 'String'
    state: 'Int'
    storeProductId: 'String'
    storeUrl: 'String'
    user: 'User'
    userId: 'Int'
  }
  ProductStoreLog: { // field return type name
    createdAt: 'DateTime'
    destState: 'Int'
    errorMessage: 'String'
    id: 'Int'
    jobId: 'String'
    modifiedAt: 'DateTime'
    productStoreId: 'Int'
    productStoreLogEnum: 'productStoreLogEnum'
    productStoreState: 'ProductStoreState'
    productstore: 'ProductStore'
    uploadState: 'Int'
  }
  ProductStoreState: { // field return type name
    description: 'String'
    id: 'Int'
    name: 'String'
  }
  PurchaseLog: { // field return type name
    expiredAt: 'DateTime'
    id: 'Int'
    payAmount: 'Int'
    payId: 'String'
    planInfo: 'String'
    purchasedAt: 'DateTime'
    state: 'PurchaseLogState'
    type: 'PurchaseLogType'
    user: 'User'
    userId: 'Int'
  }
  Query: { // field return type name
    getExcelSampleUrlBySomeone: 'String'
    getRegisterProductsDataByUser: 'String'
    searchCategoryInfoA001BySomeone: 'CategoryInformationType'
    searchCategoryInfoA006BySomeone: 'CategoryInformationType'
    searchCategoryInfoA027BySomeone: 'CategoryInformationType'
    searchCategoryInfoA077BySomeone: 'CategoryInformationType'
    searchCategoryInfoA112BySomeone: 'CategoryInformationType'
    searchCategoryInfoA113BySomeone: 'CategoryInformationType'
    searchCategoryInfoA524BySomeone: 'CategoryInformationType'
    searchCategoryInfoA525BySomeone: 'CategoryInformationType'
    searchCategoryInfoB378BySomeone: 'CategoryInformationType'
    searchCategoryInfoB719BySomeone: 'CategoryInformationType'
    searchCategoryInfoB956BySomeone: 'CategoryInformationType'
    searchManyCategoryInfoA077BySomeone: 'CategoryInformationType'
    selectCnyRateByEveryone: 'Float'
    selectFreeUserDayLimitByAdmin: 'Int'
    selectFreeUserProductLimitByAdmin: 'Int'
    selectMyInfoByUser: 'User'
    selectMyOrderByUser: 'order'
    selectMyProductByUser: 'Product'
    selectMyProductsCountByUser: 'Int'
    selectNoticeByEveryone: 'Notice'
    selectNoticeCountByAdmin: 'Int'
    selectNoticesByEveryone: 'Notice'
    selectPlanInfosForEveryone: 'PlanInfo'
    selectProductsByAdmin: 'Product'
    selectProductsBySomeone: 'Product'
    selectProductsCountByAdmin: 'Int'
    selectProductsCountBySomeone: 'Int'
    selectSiilInfoBySomeone: 'SiilItems'
    selectTaobaoProductsByAdmin: 'TaobaoProduct'
    selectTaobaoProductsByUser: 'TaobaoProduct'
    selectTaobaoProductsCountByAdmin: 'Int'
    selectTaobaoRefreshDayByEveryone: 'Int'
    selectUserLogsByUser: 'UserLog'
    selectUserQuestionBySomeone: 'UserQuestion'
    selectUserQuestionCountBySomeone: 'Int'
    selectUsersByAdmin: 'User'
    selectUsersCountByAdmin: 'Int'
    selectWordTablesBySomeone: 'WordTable'
    seletExistPurchaseLog: 'Boolean'
    t_get: 'String'
    t_getEncodedSetInfo: 'String'
    testS3DeleteProduct: 'String'
    translateText: 'String'
    whoami: 'String'
  }
  SignInType: { // field return type name
    accessToken: 'String'
    refreshToken: 'String'
  }
  SiilItem: { // field return type name
    code: 'String'
    inputType: 'SiilItemTypeEnum'
    name: 'String'
    options: 'String'
  }
  SiilItems: { // field return type name
    data: 'SiilItem'
    description: 'String'
  }
  SiilSavedData: { // field return type name
    code: 'String'
    data: 'SiilSavedItem'
  }
  SiilSavedItem: { // field return type name
    code: 'String'
    value: 'String'
  }
  Subscription: { // field return type name
    subscribeUserEvent: 'UserLog'
  }
  TaobaoProduct: { // field return type name
    brand: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    imageThumbnail: 'String'
    modifiedAt: 'DateTime'
    name: 'String'
    originalData: 'String'
    price: 'Float'
    product: 'Product'
    shopName: 'String'
    taobaoBrandId: 'String'
    taobaoCategoryId: 'String'
    taobaoNumIid: 'String'
    url: 'String'
    videoUrl: 'String'
  }
  TaobaoProductOption: { // field return type name
    name: 'String'
    taobaoSkuId: 'String'
  }
  TaobaoProductOptionInfo: { // field return type name
    option: 'TaobaoProductOption'
    optionName: 'TaobaoProductOptionName'
    optionValue: 'TaobaoProductOptionValue'
  }
  TaobaoProductOptionName: { // field return type name
    name: 'String'
    taobaoPid: 'String'
  }
  TaobaoProductOptionValue: { // field return type name
    image: 'String'
    name: 'String'
    taobaoVid: 'String'
  }
  User: { // field return type name
    connectedUsers: 'User'
    createdAt: 'DateTime'
    createdToken: 'DateTime'
    credit: 'Int'
    email: 'String'
    id: 'Int'
    kakaoId: 'String'
    master: 'Int'
    masterUserId: 'Int'
    naverId: 'String'
    password: 'String'
    product: 'Product'
    productCount: 'Int'
    purchaseInfo: 'UserPurchaseInfo'
    refAvailable: 'Boolean'
    refCode: 'String'
    state: 'UserState'
    token: 'String'
    userInfo: 'UserInfo'
    userLog: 'UserLog'
    verificationNumber: 'String'
  }
  UserInfo: { // field return type name
    additionalShippingFeeJeju: 'Int'
    asInformation: 'String'
    asTel: 'String'
    auctionFee: 'Float'
    auctionUseType: 'String'
    autoPrice: 'String'
    calculateWonType: 'String'
    cnyRate: 'Float'
    cnyRateDollar: 'Float'
    cnyRateEuro: 'Float'
    cnyRateYen: 'Float'
    collectStock: 'Int'
    collectTimeout: 'Int'
    coupangAccessKey: 'String'
    coupangDefaultInbound: 'String'
    coupangDefaultOutbound: 'String'
    coupangFee: 'Float'
    coupangImageOpt: 'String'
    coupangLoginId: 'String'
    coupangMaximumBuyForPerson: 'Int'
    coupangOutboundShippingTimeDay: 'Int'
    coupangSecretKey: 'String'
    coupangUnionDeliveryType: 'String'
    coupangUseType: 'String'
    coupangVendorId: 'String'
    defaultPrice: 'String'
    defaultShippingFee: 'Int'
    descriptionShowTitle: 'String'
    discountAmount: 'Int'
    discountUnitType: 'String'
    esmplusAuctionId: 'String'
    esmplusGmarketId: 'String'
    esmplusMasterId: 'String'
    exchangeShippingFee: 'Int'
    extraShippingFee: 'Int'
    fixImageBottom: 'String'
    fixImageSubBottom: 'String'
    fixImageSubTop: 'String'
    fixImageTop: 'String'
    gmarketFee: 'Float'
    gmarketUseType: 'String'
    interparkCertKey: 'String'
    interparkEditCertKey: 'String'
    interparkEditSecretKey: 'String'
    interparkFee: 'Float'
    interparkSecretKey: 'String'
    interparkUseType: 'String'
    lotteonApiKey: 'String'
    lotteonFee: 'Float'
    lotteonNormalFee: 'Float'
    lotteonNormalUseType: 'String'
    lotteonSellerType: 'String'
    lotteonUseType: 'String'
    lotteonVendorId: 'String'
    marginRate: 'Float'
    marginUnitType: 'String'
    maxProductLimit: 'Int'
    naverAutoSearchTag: 'String'
    naverFee: 'Float'
    naverOrigin: 'String'
    naverOriginCode: 'String'
    naverStoreOnly: 'String'
    naverStoreUrl: 'String'
    naverUseType: 'String'
    optionAlignTop: 'String'
    optionIndexType: 'Int'
    optionTwoWays: 'String'
    orderToDeliveryName: 'String'
    phone: 'String'
    productCollectCount: 'Int'
    refundShippingFee: 'Int'
    streetApiKey: 'String'
    streetApiKey2: 'String'
    streetApiKey3: 'String'
    streetApiKey4: 'String'
    streetApiMemo: 'String'
    streetApiMemo2: 'String'
    streetApiMemo3: 'String'
    streetApiMemo4: 'String'
    streetDefaultInbound: 'String'
    streetDefaultOutbound: 'String'
    streetFee: 'Float'
    streetNormalApiKey: 'String'
    streetNormalApiKey2: 'String'
    streetNormalApiKey3: 'String'
    streetNormalApiKey4: 'String'
    streetNormalApiMemo: 'String'
    streetNormalApiMemo2: 'String'
    streetNormalApiMemo3: 'String'
    streetNormalApiMemo4: 'String'
    streetNormalFee: 'Float'
    streetNormalInbound: 'String'
    streetNormalOutbound: 'String'
    streetNormalUseKeyType: 'String'
    streetNormalUseType: 'String'
    streetUseKeyType: 'String'
    streetUseType: 'String'
    tmonFee: 'Float'
    tmonId: 'String'
    tmonUseType: 'String'
    useDetailInformation: 'String'
    user: 'User'
    userId: 'Int'
    wemakepriceFee: 'Float'
    wemakepriceId: 'String'
    wemakepriceUseType: 'String'
  }
  UserLog: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    isRead: 'Boolean'
    payloadData: 'String'
    title: 'String'
    user: 'User'
    userId: 'Int'
  }
  UserPurchaseAdditionalInfo: { // field return type name
    expiredAt: 'DateTime'
    type: 'UserPurchaseAdditionalInfoEnumType'
  }
  UserPurchaseInfo: { // field return type name
    additionalInfo: 'UserPurchaseAdditionalInfo'
    history: 'String'
    level: 'Int'
    levelExpiredAt: 'DateTime'
  }
  UserQuestion: { // field return type name
    answer: 'String'
    answeredAt: 'DateTime'
    attachmentFile: 'String'
    attachmentFiles: 'String'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    isActive: 'Boolean'
    title: 'String'
    user: 'User'
    userId: 'Int'
  }
  WordTable: { // field return type name
    findWord: 'String'
    id: 'Int'
    replaceWord: 'String'
    user: 'User'
    userId: 'Int'
  }
  order: { // field return type name
    deliveryFeeAmt: 'Int'
    id: 'Int'
    individualCustomUniqueCode: 'String'
    marketCode: 'String'
    orderMemberName: 'String'
    orderMemberTelNo: 'String'
    orderNo: 'String'
    orderQuantity: 'Int'
    orderStateEnum: 'orderStateEnum'
    productId: 'Int'
    productName: 'String'
    productOptionContents: 'String'
    productOrderMemo: 'String'
    productPayAmt: 'Int'
    receiverIntegratedAddress: 'String'
    receiverName: 'String'
    receiverTelNo1: 'String'
    receiverZipCode: 'String'
    sellerProductManagementCode: 'String'
    state: 'Int'
    taobaoOrderNo: 'String'
    userId: 'Int'
  }
  orderStateEnum: { // field return type name
    description: 'String'
    id: 'Int'
    name: 'String'
  }
  productStateEnum: { // field return type name
    id: 'Int'
    state: 'String'
  }
  productStoreLogEnum: { // field return type name
    id: 'Int'
    state: 'String'
  }
  testType: { // field return type name
    optionvalues: 'String'
    productId: 'Int'
    thumbnails: 'String'
  }
}

export interface NexusGenArgTypes {
  CategoryInfoA001: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoA006: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoA027: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoA077: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoA112: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoA113: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoA524: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoA525: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoB378: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoB719: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  CategoryInfoB956: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  Mutation: {
    EditPassword: { // args
      checkNewPassword: string; // String!
      email: string; // String!
      newPassword: string; // String!
      verificationNumber: string; // String!
    }
    EditPasswordCreateVerification: { // args
      email: string; // String!
      phoneNumber: string; // String!
    }
    addWordByExcelByUser: { // args
      data: NexusGenScalars['Upload']; // Upload!
      isReplace: boolean; // Boolean!
    }
    addWordByUser: { // args
      findWord: string; // String!
      replaceWord?: string | null; // String
    }
    cancelPurchasePlanByUser: { // args
      merchantUid: string; // String!
    }
    cardPayTest: { // args
      email: string; // String!
    }
    changeMyPasswordByAdmin: { // args
      currentPassword: string; // String!
      newPassword: string; // String!
    }
    changePasswordByUser: { // args
      currentPassword: string; // String!
      newPassword: string; // String!
    }
    connectSocialIdByUser: { // args
      socialId: string; // String!
      userType: NexusGenEnums['UserSocialType']; // UserSocialType!
    }
    createNewOrder: { // args
      data: NexusGenInputs['newOrderInput'][]; // [newOrderInput!]!
    }
    createNoticeByAdmin: { // args
      attachment?: NexusGenScalars['Upload'] | null; // Upload
      content: string; // String!
      title: string; // String!
    }
    createUserQuestionByUser: { // args
      attachment?: NexusGenScalars['Upload'][] | null; // [Upload!]
      content: string; // String!
      title: string; // String!
    }
    deleteNoticeByAdmin: { // args
      noticeIds: number[]; // [Int!]!
    }
    deleteProductByAdmin: { // args
      productId: number[]; // [Int!]!
    }
    deleteProductByUser: { // args
      productId: number[]; // [Int!]!
    }
    deleteStore: { // args
      id: number; // Int!
      store: string; // String!
    }
    deleteWordByUser: { // args
      wordId: number[]; // [Int!]!
    }
    disableUserOption: { // args
      id: number; // Int!
    }
    endProductSellStateByAdmin: { // args
      productIds: number[]; // [Int!]!
    }
    endProductSellStateByUser: { // args
      productIds: number[]; // [Int!]!
    }
    extendMyAccountByUser: { // args
      masterId: number; // Int!
      slaveIds: number[]; // [Int!]!
    }
    findEmail: { // args
      phone: string; // String!
      verificationNumber: string; // String!
    }
    findEmailCreateVerification: { // args
      phoneNumber: string; // String!
    }
    getTaobaoItemUsingExtensionByUser: { // args
      data: string; // String!
    }
    initProductDescriptionByUser: { // args
      productId: number; // Int!
    }
    initProductImageByUser: { // args
      productId: number; // Int!
    }
    initProductOptionImageByUser: { // args
      productId: number; // Int!
    }
    initProductThumbnailImageByUser: { // args
      productId: number; // Int!
    }
    invalidatePurchaseInfoByAdmin: { // args
      purchaseLogId: number; // Int!
    }
    modifyWordByUser: { // args
      findWord: string; // String!
      replaceWord?: string | null; // String
      wordId: number; // Int!
    }
    purchasePlanByUser: { // args
      merchantUid: string; // String!
      planInfoId: number; // Int!
    }
    requestPhoneVerificationByEveryone: { // args
      phoneNumber: string; // String!
    }
    restoreProductOptionValue: { // args
      productOptionNameId: number; // Int!
    }
    setMaxProductLimitByAdmin: { // args
      productLimit?: number | null; // Int
      userId: number; // Int!
    }
    setMultiPurchaseInfoByAdmin: { // args
      credit: number; // Int!
      purchaseInputs: NexusGenInputs['purchaseInputs'][]; // [purchaseInputs!]!
    }
    setProductOptionNameBySomeOne: { // args
      isActive: boolean; // Boolean!
      name: string; // String!
      productOptionNameId: number; // Int!
    }
    setProductOptionValueBySomeOne: { // args
      image?: string | null; // String
      isActive: boolean; // Boolean!
      name?: string | null; // String
      newImage?: NexusGenScalars['Upload'] | null; // Upload
      productOptionNameId?: number | null; // Int
      productOptionValueId?: number | null; // Int
    }
    setPurchaseInfoByAdmin: { // args
      expiredAt?: NexusGenScalars['DateTime'] | null; // DateTime
      planInfoId: number; // Int!
      userId: number; // Int!
    }
    setUserStopTest: { // args
      userId: number; // Int!
    }
    signInAdminByEveryone: { // args
      id: string; // String!
      password: string; // String!
    }
    signInUserByEveryone: { // args
      email: string; // String!
      password: string; // String!
      userType: NexusGenEnums['UserSocialType']; // UserSocialType!
    }
    signUpAdminByAdmin: { // args
      id: string; // String!
      password: string; // String!
    }
    signUpUserByEveryone: { // args
      email: string; // String!
      password: string; // String!
      phone: string; // String!
      verificationId: number; // Int!
    }
    signUpUserByEveryone2: { // args
      email: string; // String!
      password: string; // String!
      phone: string; // String!
      refCode?: string | null; // String
      verificationId: number; // Int!
    }
    silentRefreshToken: { // args
      refreshToken: string; // String!
    }
    testAddjobCallBack: { // args
      response: string; // String!
    }
    transferProductsToUserByAdmin: { // args
      productIds: number[]; // [Int!]!
      targetUserId: number; // Int!
    }
    translateProductTextByUser: { // args
      id: number; // Int!
      type: NexusGenEnums['TranslateTargetEnumType']; // TranslateTargetEnumType!
    }
    translateProductsTextByUser: { // args
      ids: number[]; // [Int!]!
      type: NexusGenEnums['TranslateTargetEnumType']; // TranslateTargetEnumType!
    }
    unlinkProductStore: { // args
      productId: number; // Int!
      siteCode: string; // String!
    }
    updateCnyRateByAdmin: { // args
      cnyRate: number; // Float!
    }
    updateDescription: { // args
      description: string; // String!
      productId: number; // Int!
    }
    updateFreeUserDayLimitByAdmin: { // args
      day: number; // Int!
    }
    updateFreeUserProductLimitByAdmin: { // args
      day: number; // Int!
    }
    updateImageThumbnailData: { // args
      productId: number; // Int!
      thumbnails?: NexusGenInputs['ProductThumbnailUpdateInput'][] | null; // [ProductThumbnailUpdateInput!]
    }
    updateManyProductAttributeByUser: { // args
      brandName?: string | null; // String
      manufacturer?: string | null; // String
      modelName?: string | null; // String
      productId: number[]; // [Int!]!
    }
    updateManyProductCategoryByAdmin: { // args
      categoryA001?: string | null; // String
      categoryA006?: string | null; // String
      categoryA027?: string | null; // String
      categoryA077?: string | null; // String
      categoryA112?: string | null; // String
      categoryB378?: string | null; // String
      productIds: number[]; // [Int!]!
    }
    updateManyProductCategoryByUser: { // args
      categoryA001?: string | null; // String
      categoryA006?: string | null; // String
      categoryA027?: string | null; // String
      categoryA077?: string | null; // String
      categoryA112?: string | null; // String
      categoryA113?: string | null; // String
      categoryA524?: string | null; // String
      categoryA525?: string | null; // String
      categoryB378?: string | null; // String
      categoryB719?: string | null; // String
      categoryB956?: string | null; // String
      productIds: number[]; // [Int!]!
    }
    updateManyProductFee: { // args
      auctionFee?: number | null; // Float
      coupangFee?: number | null; // Float
      gmarketFee?: number | null; // Float
      interparkFee?: number | null; // Float
      lotteonFee?: number | null; // Float
      lotteonNormalFee?: number | null; // Float
      naverFee?: number | null; // Float
      productId: number[]; // [Int!]!
      streetFee?: number | null; // Float
      streetNormalFee?: number | null; // Float
      tmonFee?: number | null; // Float
      wemakepriceFee?: number | null; // Float
    }
    updateManyProductNameByUser: { // args
      body?: string | null; // String
      head?: string | null; // String
      productIds: number[]; // [Int!]!
      tail?: string | null; // String
    }
    updateManyProductOption: { // args
      data: NexusGenInputs['ProductOptionInput'][]; // [ProductOptionInput!]!
    }
    updateManyProductOptionValue: { // args
      data: NexusGenInputs['ProductOptionValueInput'][]; // [ProductOptionValueInput!]!
    }
    updateManyProductSiilInfoByAdmin: { // args
      productIds: number[]; // [Int!]!
      siilCode: string; // String!
    }
    updateManyProductSiilInfoByUser: { // args
      productIds: number[]; // [Int!]!
      siilCode: string; // String!
    }
    updateManyProductTagByUser: { // args
      immSearchTags?: string | null; // String
      productIds: number[]; // [Int!]!
      searchTags?: string | null; // String
    }
    updateMultipleProductNameByUser: { // args
      data: NexusGenInputs['ProductOptionNameInput'][]; // [ProductOptionNameInput!]!
    }
    updateMyDataByUser: { // args
      additionalShippingFeeJeju?: number | null; // Int
      asInformation?: string | null; // String
      asTel?: string | null; // String
      auctionFee?: number | null; // Float
      auctionUseType?: string | null; // String
      autoPrice?: string | null; // String
      calculateWonType?: string | null; // String
      cnyRate?: number | null; // Float
      cnyRateDollar?: number | null; // Float
      cnyRateEuro?: number | null; // Float
      cnyRateYen?: number | null; // Float
      collectStock?: number | null; // Int
      collectTimeout?: number | null; // Int
      coupangAccessKey?: string | null; // String
      coupangDefaultInbound?: string | null; // String
      coupangDefaultOutbound?: string | null; // String
      coupangFee?: number | null; // Float
      coupangImageOpt?: string | null; // String
      coupangLoginId?: string | null; // String
      coupangMaximumBuyForPerson?: number | null; // Int
      coupangOutboundShippingTimeDay?: number | null; // Int
      coupangSecretKey?: string | null; // String
      coupangUnionDeliveryType?: string | null; // String
      coupangUseType?: string | null; // String
      coupangVendorId?: string | null; // String
      defaultPrice?: string | null; // String
      defaultShippingFee?: number | null; // Int
      descriptionShowTitle?: string | null; // String
      discountAmount?: number | null; // Int
      discountUnitType?: string | null; // String
      esmplusAuctionId?: string | null; // String
      esmplusGmarketId?: string | null; // String
      esmplusMasterId?: string | null; // String
      exchangeShippingFee?: number | null; // Int
      extraShippingFee?: number | null; // Int
      fixImageBottom?: NexusGenScalars['Upload'] | null; // Upload
      fixImageSubBottom?: NexusGenScalars['Upload'] | null; // Upload
      fixImageSubTop?: NexusGenScalars['Upload'] | null; // Upload
      fixImageTop?: NexusGenScalars['Upload'] | null; // Upload
      gmarketFee?: number | null; // Float
      gmarketUseType?: string | null; // String
      interparkCertKey?: string | null; // String
      interparkEditCertKey?: string | null; // String
      interparkEditSecretKey?: string | null; // String
      interparkFee?: number | null; // Float
      interparkSecretKey?: string | null; // String
      interparkUseType?: string | null; // String
      lotteonApiKey?: string | null; // String
      lotteonFee?: number | null; // Float
      lotteonNormalFee?: number | null; // Float
      lotteonNormalUseType?: string | null; // String
      lotteonSellerType?: string | null; // String
      lotteonUseType?: string | null; // String
      lotteonVendorId?: string | null; // String
      marginRate?: number | null; // Float
      marginUnitType?: string | null; // String
      naverAutoSearchTag?: string | null; // String
      naverFee?: number | null; // Float
      naverOrigin?: string | null; // String
      naverOriginCode?: string | null; // String
      naverStoreOnly?: string | null; // String
      naverStoreUrl?: string | null; // String
      naverUseType?: string | null; // String
      optionAlignTop?: string | null; // String
      optionIndexType?: number | null; // Int
      optionTwoWays?: string | null; // String
      orderToDeliveryName?: string | null; // String
      refundShippingFee?: number | null; // Int
      streetApiKey?: string | null; // String
      streetApiKey2?: string | null; // String
      streetApiKey3?: string | null; // String
      streetApiKey4?: string | null; // String
      streetApiMemo?: string | null; // String
      streetApiMemo2?: string | null; // String
      streetApiMemo3?: string | null; // String
      streetApiMemo4?: string | null; // String
      streetDefaultInbound?: string | null; // String
      streetDefaultOutbound?: string | null; // String
      streetFee?: number | null; // Float
      streetNormalApiKey?: string | null; // String
      streetNormalApiKey2?: string | null; // String
      streetNormalApiKey3?: string | null; // String
      streetNormalApiKey4?: string | null; // String
      streetNormalApiMemo?: string | null; // String
      streetNormalApiMemo2?: string | null; // String
      streetNormalApiMemo3?: string | null; // String
      streetNormalApiMemo4?: string | null; // String
      streetNormalFee?: number | null; // Float
      streetNormalInbound?: string | null; // String
      streetNormalOutbound?: string | null; // String
      streetNormalUseKeyType?: string | null; // String
      streetNormalUseType?: string | null; // String
      streetUseKeyType?: string | null; // String
      streetUseType?: string | null; // String
      tmonFee?: number | null; // Float
      tmonId?: string | null; // String
      tmonUseType?: string | null; // String
      useDetailInformation?: string | null; // String
      wemakepriceFee?: number | null; // Float
      wemakepriceId?: string | null; // String
      wemakepriceUseType?: string | null; // String
    }
    updateMyImageByUser: { // args
      fixImageBottom?: string | null; // String
      fixImageSubBottom?: string | null; // String
      fixImageSubTop?: string | null; // String
      fixImageTop?: string | null; // String
    }
    updateNewProductImageBySomeone: { // args
      description?: string | null; // String
      optionValues: NexusGenInputs['ProductOptionValueImageUpdateInput'][]; // [ProductOptionValueImageUpdateInput!]!
      productId: number; // Int!
      thumbnails?: NexusGenInputs['ProductNewThumbnailImageUpdateInput'][] | null; // [ProductNewThumbnailImageUpdateInput!]
    }
    updateNoticeByAdmin: { // args
      attachment?: NexusGenScalars['Upload'] | null; // Upload
      content?: string | null; // String
      noticeId: number; // Int!
      title?: string | null; // String
    }
    updatePhoneByUser: { // args
      phone: string; // String!
      verificationId: number; // Int!
    }
    updatePlanInfoByAdmin: { // args
      description?: string | null; // String
      isActive?: boolean | null; // Boolean
      name?: string | null; // String
      planId: number; // Int!
      price?: number | null; // Int
    }
    updateProductAttributeByUser: { // args
      brandName?: string | null; // String
      manufacturer?: string | null; // String
      modelName?: string | null; // String
      productId: number; // Int!
    }
    updateProductByAdmin: { // args
      categoryCode?: string | null; // String
      description?: string | null; // String
      localShippingFee?: number | null; // Int
      name?: string | null; // String
      optionNames: NexusGenInputs['ProductOptionNameUpdateInput'][]; // [ProductOptionNameUpdateInput!]!
      optionValues: NexusGenInputs['ProductOptionValueUpdateInput'][]; // [ProductOptionValueUpdateInput!]!
      options: NexusGenInputs['ProductOptionUpdateInput'][]; // [ProductOptionUpdateInput!]!
      price?: number | null; // Int
      productId: number; // Int!
      shippingFee?: number | null; // Int
      siilCode?: string | null; // String
      siilData?: NexusGenInputs['SiilInput'][] | null; // [SiilInput!]
      thumbnails?: NexusGenInputs['ProductThumbnailUpdateInput'][] | null; // [ProductThumbnailUpdateInput!]
    }
    updateProductByUser: { // args
      categoryA001?: string | null; // String
      categoryA006?: string | null; // String
      categoryA027?: string | null; // String
      categoryA077?: string | null; // String
      categoryA112?: string | null; // String
      categoryA113?: string | null; // String
      categoryA524?: string | null; // String
      categoryA525?: string | null; // String
      categoryB378?: string | null; // String
      categoryB719?: string | null; // String
      categoryB956?: string | null; // String
      categoryCode?: string | null; // String
      description?: string | null; // String
      localShippingCode?: number | null; // Int
      localShippingFee?: number | null; // Int
      name?: string | null; // String
      optionNames: NexusGenInputs['ProductOptionNameUpdateInput'][]; // [ProductOptionNameUpdateInput!]!
      optionValues: NexusGenInputs['ProductOptionValueUpdateInput'][]; // [ProductOptionValueUpdateInput!]!
      options: NexusGenInputs['ProductOptionUpdateInput'][]; // [ProductOptionUpdateInput!]!
      price?: number | null; // Int
      productId: number; // Int!
      shippingFee?: number | null; // Int
      siilCode?: string | null; // String
      siilData?: NexusGenInputs['SiilInput'][] | null; // [SiilInput!]
      thumbnails?: NexusGenInputs['ProductThumbnailUpdateInput'][] | null; // [ProductThumbnailUpdateInput!]
    }
    updateProductCategory: { // args
      categoryA001?: string | null; // String
      categoryA006?: string | null; // String
      categoryA027?: string | null; // String
      categoryA077?: string | null; // String
      categoryA112?: string | null; // String
      categoryA113?: string | null; // String
      categoryA524?: string | null; // String
      categoryA525?: string | null; // String
      categoryB378?: string | null; // String
      categoryB719?: string | null; // String
      categoryB956?: string | null; // String
      categoryCode?: string | null; // String
      productId: number; // Int!
    }
    updateProductFee: { // args
      auctionFee?: number | null; // Float
      coupangFee?: number | null; // Float
      gmarketFee?: number | null; // Float
      interparkFee?: number | null; // Float
      lotteonFee?: number | null; // Float
      lotteonNormalFee?: number | null; // Float
      naverFee?: number | null; // Float
      productId: number; // Int!
      streetFee?: number | null; // Float
      streetNormalFee?: number | null; // Float
      tmonFee?: number | null; // Float
      wemakepriceFee?: number | null; // Float
    }
    updateProductImageBySomeone: { // args
      description?: string | null; // String
      optionValues: NexusGenInputs['ProductOptionValueImageUpdateInput'][]; // [ProductOptionValueImageUpdateInput!]!
      productId: number; // Int!
      thumbnails?: NexusGenInputs['ProductThumbnailImageUpdateInput'][] | null; // [ProductThumbnailImageUpdateInput!]
    }
    updateProductImageBySomeone2: { // args
      description?: string | null; // String
      optionValues: NexusGenInputs['ProductOptionValueImageUpdateInput'][]; // [ProductOptionValueImageUpdateInput!]!
      productId: number; // Int!
      thumbnails?: NexusGenInputs['ProductThumbnailImageUpdateInput'][] | null; // [ProductThumbnailImageUpdateInput!]
    }
    updateProductNameByAdmin: { // args
      name: string; // String!
      productId: number; // Int!
    }
    updateProductNameByUser: { // args
      name: string; // String!
      productId: number; // Int!
    }
    updateProductOption: { // args
      id: number; // Int!
      productOption: NexusGenInputs['setProductOption'][]; // [setProductOption!]!
    }
    updateProductOptionShippingFee: { // args
      defaultShippingFee: number; // Int!
      productOptionId: number; // Int!
    }
    updateProductPriceByAdmin: { // args
      cnyRate: number; // Float!
      localShippingCode?: number | null; // Int
      localShippingFee: number; // Int!
      marginRate: number; // Float!
      marginUnitType: string; // String!
      productIds: number[]; // [Int!]!
      shippingFee: number; // Int!
    }
    updateProductPriceByUser: { // args
      cnyRate: number; // Float!
      localShippingCode?: number | null; // Int
      localShippingFee: number; // Int!
      marginRate: number; // Float!
      marginUnitType: string; // String!
      productIds: number[]; // [Int!]!
      shippingFee: number; // Int!
    }
    updateProductSinglePriceByUser: { // args
      price: number; // Int!
      productId: number; // Int!
    }
    updateProductStoreUrlInfoBySomeone: { // args
      productStoreId: number; // Int!
      storeProductId: string; // String!
    }
    updateProductTagByUser: { // args
      immSearchTags?: string | null; // String
      productId: number; // Int!
      searchTags?: string | null; // String
    }
    updateTaobaoRefreshDayByAdmin: { // args
      day: number; // Int!
    }
    updateUserQuestionByAdmin: { // args
      answer: string; // String!
      userQuestionId: number; // Int!
    }
    verifyPhoneByEveryone: { // args
      phoneNumber: string; // String!
      verificationNumber: string; // String!
    }
  }
  Notice: {
    contentSummary: { // args
      wordCount?: number | null; // Int
    }
  }
  Product: {
    productOption: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    productOptionName: { // args
      cursor?: NexusGenInputs['ProductOptionNameWhereUniqueInput'] | null; // ProductOptionNameWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionNameOrderByWithRelationInput'][] | null; // [ProductOptionNameOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionNameWhereInput'] | null; // ProductOptionNameWhereInput
    }
    productStore: { // args
      cursor?: NexusGenInputs['ProductStoreWhereUniqueInput'] | null; // ProductStoreWhereUniqueInput
      orderBy?: NexusGenInputs['ProductStoreOrderByWithRelationInput'][] | null; // [ProductStoreOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductStoreWhereInput'] | null; // ProductStoreWhereInput
    }
  }
  ProductOptionName: {
    productOptionValue: { // args
      cursor?: NexusGenInputs['ProductOptionValueWhereUniqueInput'] | null; // ProductOptionValueWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionValueOrderByWithRelationInput'][] | null; // [ProductOptionValueOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionValueWhereInput'] | null; // ProductOptionValueWhereInput
    }
  }
  ProductOptionValue: {
    optionValue1: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    optionValue2: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    optionValue3: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    optionValue4: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    optionValue5: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOptionOrderByWithRelationInput'][] | null; // [ProductOptionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
    productOption: { // args
      cursor?: NexusGenInputs['ProductOptionWhereUniqueInput'] | null; // ProductOptionWhereUniqueInput
      orderBy?: Array<NexusGenInputs['ProductOptionOrderByWithRelationInput'] | null> | null; // [ProductOptionOrderByWithRelationInput]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductOptionWhereInput'] | null; // ProductOptionWhereInput
    }
  }
  ProductStore: {
    productStoreLog: { // args
      cursor?: NexusGenInputs['ProductStoreLogWhereUniqueInput'] | null; // ProductStoreLogWhereUniqueInput
      orderBy?: NexusGenInputs['ProductStoreLogOrderByWithRelationInput'][] | null; // [ProductStoreLogOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductStoreLogWhereInput'] | null; // ProductStoreLogWhereInput
    }
  }
  Query: {
    getExcelSampleUrlBySomeone: { // args
      type: NexusGenEnums['ExcelSampleEnum']; // ExcelSampleEnum!
    }
    getRegisterProductsDataByUser: { // args
      productIds: number[]; // [Int!]!
      siteCode: string[]; // [String!]!
    }
    searchCategoryInfoA001BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoA006BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoA027BySomeone: { // args
      code?: string | null; // String
      keyword?: string | null; // String
    }
    searchCategoryInfoA077BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoA112BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoA113BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoA524BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoA525BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoB378BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoB719BySomeone: { // args
      code?: string | null; // String
    }
    searchCategoryInfoB956BySomeone: { // args
      code?: string | null; // String
    }
    searchManyCategoryInfoA077BySomeone: { // args
      code: string[]; // [String!]!
    }
    selectMyOrderByUser: { // args
      cursor?: NexusGenInputs['orderWhereUniqueInput'] | null; // orderWhereUniqueInput
      orderBy?: NexusGenInputs['orderOrderByWithRelationInput'][] | null; // [orderOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['orderWhereInput'] | null; // orderWhereInput
    }
    selectMyProductByUser: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOrderByWithRelationInput'][] | null; // [ProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectMyProductsCountByUser: { // args
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectNoticeByEveryone: { // args
      noticeId: number; // Int!
    }
    selectNoticeCountByAdmin: { // args
      where?: NexusGenInputs['NoticeWhereInput'] | null; // NoticeWhereInput
    }
    selectNoticesByEveryone: { // args
      cursor?: NexusGenInputs['NoticeWhereUniqueInput'] | null; // NoticeWhereUniqueInput
      orderBy?: NexusGenInputs['NoticeOrderByWithRelationInput'][] | null; // [NoticeOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['NoticeWhereInput'] | null; // NoticeWhereInput
    }
    selectPlanInfosForEveryone: { // args
      cursor?: NexusGenInputs['PlanInfoWhereUniqueInput'] | null; // PlanInfoWhereUniqueInput
      orderBy?: NexusGenInputs['PlanInfoOrderByWithRelationInput'][] | null; // [PlanInfoOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['PlanInfoWhereInput'] | null; // PlanInfoWhereInput
    }
    selectProductsByAdmin: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOrderByWithRelationInput'][] | null; // [ProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectProductsBySomeone: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOrderByWithRelationInput'][] | null; // [ProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectProductsCountByAdmin: { // args
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectProductsCountBySomeone: { // args
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    selectSiilInfoBySomeone: { // args
      code: string; // String!
    }
    selectTaobaoProductsByAdmin: { // args
      cursor?: NexusGenInputs['TaobaoProductWhereUniqueInput'] | null; // TaobaoProductWhereUniqueInput
      orderBy?: NexusGenInputs['TaobaoProductOrderByWithRelationInput'][] | null; // [TaobaoProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['TaobaoProductWhereInput'] | null; // TaobaoProductWhereInput
    }
    selectTaobaoProductsByUser: { // args
      cursor?: NexusGenInputs['TaobaoProductWhereUniqueInput'] | null; // TaobaoProductWhereUniqueInput
      orderBy?: NexusGenInputs['TaobaoProductOrderByWithRelationInput'][] | null; // [TaobaoProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['TaobaoProductWhereInput'] | null; // TaobaoProductWhereInput
    }
    selectTaobaoProductsCountByAdmin: { // args
      where?: NexusGenInputs['TaobaoProductWhereInput'] | null; // TaobaoProductWhereInput
    }
    selectUserQuestionBySomeone: { // args
      cursor?: NexusGenInputs['UserQuestionWhereUniqueInput'] | null; // UserQuestionWhereUniqueInput
      orderBy?: NexusGenInputs['UserQuestionOrderByWithRelationInput'][] | null; // [UserQuestionOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
    }
    selectUserQuestionCountBySomeone: { // args
      where?: NexusGenInputs['UserQuestionWhereInput'] | null; // UserQuestionWhereInput
    }
    selectUsersByAdmin: { // args
      cursor?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      orderBy?: NexusGenInputs['UserOrderByWithRelationInput'][] | null; // [UserOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
    selectUsersCountByAdmin: { // args
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
    selectWordTablesBySomeone: { // args
      cursor?: NexusGenInputs['WordTableWhereUniqueInput'] | null; // WordTableWhereUniqueInput
      orderBy?: NexusGenInputs['WordTableOrderByWithRelationInput'][] | null; // [WordTableOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['WordTableWhereInput'] | null; // WordTableWhereInput
    }
    seletExistPurchaseLog: { // args
      email: string; // String!
    }
    translateText: { // args
      engine: NexusGenEnums['TranslateEngineEnumType']; // TranslateEngineEnumType!
      text: string; // String!
    }
  }
  TaobaoProduct: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  User: {
    product: { // args
      cursor?: NexusGenInputs['ProductWhereUniqueInput'] | null; // ProductWhereUniqueInput
      orderBy?: NexusGenInputs['ProductOrderByWithRelationInput'][] | null; // [ProductOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['ProductWhereInput'] | null; // ProductWhereInput
    }
    userLog: { // args
      cursor?: NexusGenInputs['UserLogWhereUniqueInput'] | null; // UserLogWhereUniqueInput
      orderBy?: NexusGenInputs['UserLogOrderByWithRelationInput'][] | null; // [UserLogOrderByWithRelationInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserLogWhereInput'] | null; // UserLogWhereInput
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}
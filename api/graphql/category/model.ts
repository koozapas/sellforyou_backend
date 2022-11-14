//category/model.ts
import { objectType, unionType } from "nexus";

export const t_CategoryPartialType = objectType({
    name: "CategorySelectType",
    definition(t) {
        t.nonNull.string("code");
        t.nonNull.string("name");
    }
});

export const t_CategoryInformationType = objectType({
    name: "CategoryInformationType",
    definition(t) {
        t.nullable.string('id');
        t.nonNull.string('code');
        t.nullable.string('depth1');
        t.nullable.string('depth2');
        t.nullable.string('depth3');
        t.nullable.string('depth4');
        t.nullable.string('depth5');
        t.nullable.string('depth6');
        t.nonNull.string('name');

        t.nullable.string('code_a077');
        t.nullable.string('code_b378');
        t.nullable.string('code_a112');
        t.nullable.string('code_a027');
        t.nullable.string('code_a001');
        t.nullable.string('code_a006');
        t.nullable.string('code_b719');
        t.nullable.string('code_a113');
        t.nullable.string('code_a524');
        t.nullable.string('code_a525');
        t.nullable.string('code_b956');
        
        t.nullable.field("categoryInfoB378",{ type : "CategoryInfoB378Type" })
        t.nullable.field("categoryInfoA112",{ type : "CategoryInfoA112Type" })
        t.nullable.field("categoryInfoA027",{ type : "CategoryInfoA027Type" })
        t.nullable.field("categoryInfoA001",{ type : "CategoryInfoA001Type" })
        t.nullable.field("categoryInfoA006",{ type : "CategoryInfoA006Type" })
        t.nullable.field("categoryInfoB719",{ type : "CategoryInfoB719Type" })
        t.nullable.field("categoryInfoA113",{ type : "CategoryInfoA113Type" })
        t.nullable.field("categoryInfoA524",{ type : "CategoryInfoA524Type" })
        t.nullable.field("categoryInfoA525",{ type : "CategoryInfoA525Type" })
        t.nullable.field("categoryInfoB956",{ type : "CategoryInfoB956Type" })
    }
});

export const t_CategoryInfoA077Type = objectType({
    name: "CategoryInfoA077Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoA001Type = objectType({
    name: "CategoryInfoA001Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoA006Type = objectType({
    name: "CategoryInfoA006Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoA027Type = objectType({
    name: "CategoryInfoA027Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoA112Type = objectType({
    name: "CategoryInfoA112Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoA113Type = objectType({
    name: "CategoryInfoA113Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoA524Type = objectType({
    name: "CategoryInfoA524Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoA525Type = objectType({
    name: "CategoryInfoA525Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoB378Type = objectType({
    name: "CategoryInfoB378Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoB719Type = objectType({
    name: "CategoryInfoB719Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})

export const t_CategoryInfoB956Type = objectType({
    name: "CategoryInfoB956Type",
    definition(t){
        t.nonNull.string('code');
        t.nonNull.string('name');
    }
})
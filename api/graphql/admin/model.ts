import { objectType } from "nexus";


export const t_Admin = objectType({
    name: "Admin",
    definition(t) {
        t.model.id();
        t.model.loginId();
        t.model.state();
        t.model.createdAt();
    }
});
import { objectType } from "nexus";

export const t_WordTable = objectType({
    name: "WordTable",
    definition(t) {
        t.model.id();
        t.model.userId();
        t.model.findWord();
        t.model.replaceWord();
        t.model.user();
    }
});
import {type Issue} from "../api/Issue";

export class ParseError extends Error {
    issues: Issue.Issues;

    constructor(issues: Issue.Issues) {
        super(issues[0].message);
        this.name = "ParseError";
        this.issues = issues;
    }
}

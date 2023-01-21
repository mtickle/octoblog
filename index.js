import { Octokit, App } from "octokit";
import express from "express";
import dotenv from 'dotenv';

//--- Initialize Dotenv.
dotenv.config()

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: `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` });

const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
    owner: "mtickle",
    repo: "didactic-octo-potato",
    per_page: 100,
  });

  // iterate through each response
  for await (const { data: issues } of iterator) {
    for (const issue of issues) {
      console.log( "Issue #%s: %s", issue.created_at, issue.title);
    }
  }


const app = express();
app.set("view engine", "ejs");
app.listen(3002, function () {  
  console.log("listening on 3002");
});

app.get("/", (req, res) => {
//--- Get the JSON from the API and send it to the index view.
    res.render("index.ejs", {dictIssues});
  });
  
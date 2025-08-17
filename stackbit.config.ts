import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["pages", "data", "components"],
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "pages/{slug}.vue",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "body", type: "markdown" }
          ]
        },
        {
          name: "Data",
          type: "data",
          filePath: "data/{slug}.json",
          fields: [
            { name: "content", type: "string" }
          ]
        },
        {
          name: "Component",
          type: "data",
          filePath: "components/{slug}.vue",
          fields: [
            { name: "title", type: "string" },
            { name: "body", type: "markdown" }
          ]
        }
      ],
    })
  ]
});

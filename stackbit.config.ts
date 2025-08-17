
import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

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
  ],
  siteMap: ({ documents, models }) => {
    // Filter semua model bertipe page
    const pageModels = models.filter((m) => m.type === "page");
    return documents
      .filter((d) => pageModels.some((m) => m.name === d.modelName))
      .map((document) => ({
        stableId: document.id,
        urlPath: `/${document.slug || document.id}`,
        document,
        isHomePage: document.slug === "index"
      })) as SiteMapEntry[];
  }
});

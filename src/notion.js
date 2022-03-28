import { Client } from "@notionhq/client"
import { secret, database_id } from "./secrets.js";

const notion = new Client({ auth: secret });

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: database_id },
      properties: {
        title: { 
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

addItem("Yurts in Big Sur, California")
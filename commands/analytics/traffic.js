const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const token = require("../../config.json").ghtoken;
module.exports = {
  name: "traffic",
  desc: "Get info on how many people are looking at the repository.",
  aliases: ["traffic"],
  categories: [0],
  execute: async function (client, message, args, prefix) {
    let traffic = await (
      await fetch(
        "https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/traffic/views",
        {
          method: "GET",
          credentials: "same-origin",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
    ).json();

    function getMD(t) {
      return `${new Date(Date.parse(t)).getMonth() + 1}/${new Date(
        Date.parse(t)
      ).getDate()}`;
    }

    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle("Traffic fetched. <a:success:933057860470997013>")
          .setDescription(
            `Total views for the last 2w: ${"`"}${
              traffic.count
            }${"`"}\n\nTotal unique viewers: ${"`"}${
              traffic.uniques
            }${"`"}`
          )
          .addFields(
            traffic.views.map((x) => {
              return {
                name: getMD(x.timestamp),
                value: `Total: ${'`'}${x.count}${'`'} | Unique: ${'`'}${x.uniques}${'`'}`,
                inline: true,
              };
            })
          ).setImage(`
        
        https://quickchart.io/chart?c=${encodeURI(
          JSON.stringify({
            type: "line",
            data: {
              labels: traffic.views.map((x) => getMD(x.timestamp)),
              datasets: [{ 
                  label: "Total",
                  data: traffic.views.map((x) => x.count),
                  fill: false,
                  borderColor: "blue"
                },
            
                { 
                    label: "Unique",
                    data: traffic.views.map((x) => x.uniques),
                    fill: false,
                    borderColor: "purple"
                  }
            
            ],
            },
          })
        )}
        
        `),
      ],
    });
  },
};

const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const token = require("../../config.json").ghtoken;
module.exports = {
  name: "clones",
  desc: "Get info on how many people are cloning the repository.",
  aliases: ["clones"],
  categories: [0],
  execute: async function (client, message, args, prefix) {
    let clones = await (
      await fetch(
        "https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/traffic/clones",
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
          .setTitle("Clones fetched. <a:success:933057860470997013>")
          .setDescription(
            `Total clones for the last 2w: ${"`"}${
              clones.count
            }${"`"}\n\nTotal unique cloners: ${"`"}${
              clones.uniques
            }${"`"}`
          )
          .addFields(
            clones.clones.map((x) => {
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
              labels: clones.clones.map((x) => getMD(x.timestamp)),
              datasets: [{ 
                  label: "Total",
                  data: clones.clones.map((x) => x.count),
                  fill: false,
                  borderColor: "blue"
                },
            
                { 
                    label: "Unique",
                    data: clones.clones.map((x) => x.uniques),
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

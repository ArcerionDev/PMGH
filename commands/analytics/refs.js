const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const token = require("../../config.json").ghtoken;
module.exports = {
  name: "refs",
  desc: "Get info on the top sites that people are finding the repository from.",
  aliases: ["refs","referrals"],
  categories: [0],
  execute: async function (client, message, args, prefix) {
    let refs = await (
      await fetch(
        "https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/traffic/popular/referrers",
        {
          method: "GET",
          credentials: "same-origin",
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
    ).json();

        message.channel.send({embeds: [

            new MessageEmbed().setTitle("Top referring sites fetched. <a:success:933057860470997013>")
            .setDescription(refs.map((x, index) => {

                if(index < 3){return `:${['first','second','third'][index]}_place: ${x.referrer} (${x.count} total | ${x.uniques} uniques)`}
                else{return `:black_small_square: ${x.referrer} (${x.count} total | ${x.uniques} uniques)`}
            }).join('\n\n'))
        ]})
  }
};
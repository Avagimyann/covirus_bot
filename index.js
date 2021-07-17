const { Telegraf } = require('telegraf');
const covidApi = require('covid19-api');
const countries = require('./config');
const bot = new Telegraf('1852989909:AAFN-n0zB_RF8jdwcC9mX7nssQFJkCfkjaE');
bot.start( msg => msg.reply(`
   Привет ${msg.from.first_name}!
   Узнай статистику по Коронавирусу.
   Введи страну на английском языке и получи статистику.
   Получить весь список стран можно по команде /help."
`));
bot.help( msg => msg.reply(...countries));
bot.on('text', async (msg) => {
    try {
        const userText = msg.message.text;
        const covidData = await covidApi.getReportsByCountries(userText);
        const countryData = covidData[0][0];
        const formatData = `
           Флаг: ${countryData.flag}
           Страна: ${countryData.country}
           Случаи: ${countryData.cases}
           Смерти: ${countryData.deaths}
           Выздоровело: ${countryData.recovered}`;
        msg.reply(formatData)
    } catch(e) {
        msg.reply('Такой страны не существует, для получения списка стран используй команду /help')
    }
});
bot.launch();

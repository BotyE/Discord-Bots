const Discord = require("discord.js");
const fs= require("fs");

module.exports.run = async (bot,message,args) =>{
   /* await message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/631824687348842496/652532820492812343/47865f06841031b9.gif']
        });
let OBS1 = new Discord.RichEmbed().setColor(3553599).setTitle("Предупреждение!")
.setDescription(`**На сервере действует автоматический расчет выдачи наказания. Сотрудник пришедший на репорт может только вынести вердикт виновен или нет нарушитель. Степень наказания зависит от рейтинга пользователя.**`)
let mess0 = await message.channel.send(OBS1);
    let Obsh = new Discord.RichEmbed().setColor(3553599).setTitle("1. Общие правила:")
    .setDescription("**1.1** Запрещены оскорбления. Любая попытка оскорбить может караться выдачей наказания. А именно никнеймы, статусы, названия комнат и все остальное, что можно посчитать за оскорбление.\n\n**1.2** Запрещен флуд в любой виде и в любом ее проявлении. За массовый флуд наказание дается каждому участнику (Даже если вы кинули сообщение один раз).\n\n**1.3** Запрещено разводить срачи, ссоры и токсичное и неадекватное поведение, в особенности в чате.\n\n**1.4** Запрещено распространять чужие личные данные и личную информацию без разрешения человека, которому принадлежат эти данные. Пример личных данных и личной информации: Фото, адрес, телефон, инициалы и т.п. Примечания: если Вы скидываете свои фото в чат и включаете веб-камеру в голосовом чате, то репорт по распространению личной информации не будет рассматриваться.\n\n**1.5** Запрещено использование мульти аккаунтов.\n\n**1.6** Запрещено использование уязвимостей сервера для получения превосходства в любом виде.\n\n**1.7** Запрещено использовать изъяны в правилах для получения личной выгоды. Вы можете сообщить о изъянах администрации и получить за это бонусы.\n\n**1.8** Запрещено выяснение личных отношений в любых каналах общего доступа.\n\n**1.9** Запрещено обсуждение политики и религии в любых каналах общего доступа. Для этого существуют обсуждения.\n\n**1.10** Запрещен любой вид пиара/рекламы. Исключением может являться распространение контента, который в численном количестве просмотров превосходит сервер. Также разрешено распространение контента, которое относится к медиа этого сервера.\n\n**1.11** Запрещено устраивать торговую площадку на сервере, а также выпрашивать денежные средства.\n\n**1.12** Запрещено выдавать себя за другого человека. Также запрещено выдавать себя за администрацию сервера.\n\n**1.13** Запрещено использование не упоминаемых и не читаемых никнеймов.\n\n**1.14** Запрещена дискриминация по любому признаку. Также запрещен буллинг.\n\n**1.15** Запрещено распространение вредоносного контента.\n\n**1.16** Запрещена клевета и дезинформация.")
let mess1 = await message.channel.send(Obsh);
let Obsh1 = new Discord.RichEmbed().setColor(3553599).setTitle("2. Правила текстовых каналов:")
    .setDescription("**2.1** Запрещено скидывать в чат скримеры, эпилептические картинки, а так же аудиозаписи, которые неприятны для прослушивания (-уши).\n\n**2.2** Запрещено кидать материал категории NSFW (18+, шок контент и пр.) в общие текстовые каналы.\n\n**2.3** Запрещено использовать чат не по назначению.\n\n**2.4** Запрещено бесполезное упоминание ролей. Упоминание ролей администрации сервера разрешено в крайних случаях, таких как реклама в чате.\n\n**2.5** Запрещена частая отправка сообщений, содержащих более 85% заглавных букв.")
    let mess2= await message.channel.send(Obsh1);
let Obsh2 = new Discord.RichEmbed().setColor(3553599).setTitle("3. Правила голосовых каналов:")
.setDescription("**3.1** Запрещено изменение голоса с помощью программ.\n\n**3.2** Запрещено шуметь (-уши, стуки, крики, громкая клавиатура) и включать музыку.\n\n**3.3** Запрещено создание голосовых каналов на одного человека.\n\n**3.4** Запрещено переполнение голосовых каналов без разрешения создателя канала (в случае с приватами) или всех пользователей голосового канала ( в случае общего голосового канала).\n\n**3.5** Запрещено заходить в игровые комнаты, если вы не собираетесь играть.\n\n**3.6** Запрещена трансляция категории NSFW (18+, шок контент и пр.).")
let mess3 = await message.channel.send(Obsh2)
let Lala = new Discord.RichEmbed().setColor(3553599).setTitle("Примечание! (1/2)")
        .setDescription(`**Налеты**
Этот сервер не связан с рейдами.
Он не должен использоваться в качестве платформы для продвижения или организации рейдов на других. Если обнаружится, что пользователи участвуют в рейде на Discord или обсуждают рейды/рейдерство, они будут немедленно заблокированы без предупреждения и сообщены. Мы рекомендуем пользователям немедленно сообщать об этом персоналу. Рейды и обсуждение этого строго запрещены на этом сервере. Попытки обойти это правило будут наказаны.
        
**Будьте добрыми!**
Не делайте здесь ничего такого, что вам было бы неприятно делать в реальной жизни. Относитесь к людям с уважением, даже если вы думаете, что их мнение о мировоззрении неверно и ужасно.​ Это нормально иметь несколько разногласий, но, решайте их по взрослому и желательно в Личных Сообщениях.
Пожалуйста, будьте добры друг к другу, не беспокойте и не занимайтесь троллингом других пользователей.`)
let Lala1 = new Discord.RichEmbed().setColor(3553599).setTitle("Примечание! (2/2)")
        .setDescription(`**Альтернативные Аккаунты/Мультиаккаунт**
Вы не можете иметь никаких альтернативных учетных записей на этом сервере. Серьезно,не надо, тебя за это забанят.

Категории "Провинция" и "Город под землей"(вместе со всеми каналами категорий) обходят правила: '1.1', '1.2', '1.3', '1.8', '1.9', '1.14'.

# Администрация сервера не может нести ответственность за личные сообщения, отправленные Вам другими пользователями. 
В случае с нарушениями правил в Ваш адрес в ЛС рекомендуем воспользоваться кнопкой "Заблокировать".

# Администрация сервера не несет ответственности за материальный и моральный ущерб, нанесенный пользователю, в случае открытия любых ссылок на интернет-ресурсы или файлов, размещенных другими пользователями.

# Администрация сервера не несет ответственности за нарушения авторских и смежных прав при размещении пользователями информации, изображений, аудио-видео материалов.

# Администрация сервера оставляет за собой право заблокировать пользователю доступ к серверу без объяснения причин.

**Отправить жалобу на пользователя** - !report @nick причина репорта

За фейковые репорты вы получите наказание!`)
let mess4 = await message.channel.send(Lala);
let mess41 =await message.channel.send(Lala1);
let emmess2 = new Discord.RichEmbed().setColor(3553599).setTitle("Виды наказаний:")
.setDescription(`<@&650988930006646814> - Данная роль закрывает доступ к голосовым каналам. Для снятия роли необходимо отсидеть определенное время в "Тюрьме".

<@&652408098220408856> - Данная роль закрывает доступ к текстовым каналам. Для снятия роли необходимо в "Исправительном чате" ввести определенное количество раз "Исправительное сообщение".

**Устное предупреждение** - Предупреждение вынесенное за не значительные проступки. При достижении трёх устных предупреждений дается одно письменное предупреждение.

**Письменное предупреждение** - Предупреждение вынесенное за значительные проступки. При достижении трёх письменных предупреждений дается бан на один месяц.

**Бан** - За самые жестокие проступки пользователю дается бан. Длительность бана может быть от 1 дня до бесконечного бана.

Так как на сервере действует система рейтинга, при нарушении правил ваш рейтинг уменьшается, а вследствие чего уменьшаются и ваши возможности на сервере.`)
let mess5 = await message.channel.send(emmess2);
let messs = new Discord.RichEmbed().setColor(3553599).setTitle("Быстрый переход по правилам!")
.setDescription(`[Предупреждение!](${mess0.url})
[1. Общие правила.](${mess1.url})
[2. Правила текстовых каналов.](${mess2.url})
[3. Правила голосовых каналов.](${mess3.url})
[Примечание! (1/2)](${mess4.url})
[Примечание! (2/2)](${mess41.url})
[Виды наказаний.](${mess5.url})`)
message.channel.send(messs) */
}
            
module.exports.help = {
    name: "rule"
}
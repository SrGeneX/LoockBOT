const Discord = require("discord.js");
const client = new Discord.Client();
const request = require('request');

var prefix = "/";

    var hoje = new Date();
            var dd = hoje.getDate();
            var mm = hoje.getMonth()+1;
            var hh = hoje.getHours()-3;
            var min = hoje.getMinutes();
            var ss = hoje.getSeconds();
            var yyyy = hoje.getFullYear();
            if(dd<10){
                dd = '0'+dd;
            }
            if (mm<10) {
                mm = '0'+mm;
            }
            if (hh<10){
        if(hh<01){
            hh = 3+hh;
        }
                hh = '0'+hh;
            }
            if (min<10){
                min = '0'+min;
            }
            var hoje = dd+ '/' +mm+ '/' +yyyy + ' às ' + hh + ':' + min;
        var hojee = dd+ '/' +mm+ '/' +yyyy;

client.on("ready", () => {
    
    client.channels.get('496450533884821515').send(':white_check_mark: | Bot reiniciado com sucesso !\n\nData: ' + hoje).then(msg => {
        msg.delete(60000)
    })
        
    const activities = ['Loja.Loockcraft.com', 'Acesse nosso servidor', 'Loockcraft.com']
    let counter = 0
    setInterval(function() {
        client.user.setGame(activities[counter], "https://twitch.tv/kaua__gamer")
        counter+= 1
        counter %= activities.length
    }, 10000)
});

client.on('message', (message) => {
    
    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    
    if(message.channel.type === 'dm') return;
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if(msg.startsWith(prefix + 'SUGERIR')){

        message.delete();

        let sugerindo = args.slice(0).join(" ");

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('📝 Sugestão')
            .setDescription("*Faça sugestões para o nosso servidor.*\n\n:bulb: **| /sugerir ``<sugestão>``**")

        if(!sugerindo) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
            msg.react('💡');
        });

        const embed = new Discord.RichEmbed()
            .setThumbnail('https://cdn.discordapp.com/icons/442747140775870490/23a80f4fda45b543f78b20509c0ee2f6.png?size=2048')
            .setTitle(':hammer: Sugestão')
            .setColor('RANDOM')
            .setDescription('Para enviar uma sugestão utilize o comando /sugerir (Sugestão).')
            .addField('📝 | Sugestão:', sugerindo )
            .addField('<:rotating_light:452700782001913867> | Autor:', message.author, true)
        client.channels.get('496511444477542411').send(embed).then(msg => {
            msg.react('👍');
            msg.react('👎');
        });

        message.reply(' Sua sugestão foi enviada com sucesso, Você pode ganhar prêmios dentro do servidor enviando sugestões (só se elas forem aceitas).').then(msg => {
            msg.delete(10000);
        });
    }

    if(msg.startsWith(prefix + 'DENUNCIAR')){

        message.delete();

        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        let motivo = args.slice(1).join(" ").split('-');

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('🛡 LoockDenúncias')
            .setDescription("*Denúncia membros.*\n\n:bulb: **| /denunciar ``<@membro>`` ``<motivo>`` - ``<prova>``**")

        if(!user) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
            msg.react('🛡');
        });

        if(!motivo) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
            msg.react('🛡');
        });

        if(!motivo[1]) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
            msg.react('🛡');
        });

        const reportado = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('🛡 Denúncia')
            .setDescription('Nova denúncia criada.')
            .addField('<:e_mail:457899299213279243> | Acusado:', user, true)
            .addField('<:flag_pm:457899299376726016> | Autor:', message.author, true)
            .addField('💬 | Canal:', message.channel, true)
            .addField('📝 | Motivo:', motivo[0], true)
            .addField('🖼 | Prova:', motivo[1], true)
            .setThumbnail(client.user.avatarURL)
        client.channels.get('496518957394558976').send(reportado).then(msg => {
            msg.react('✅');
            msg.react('❌');
        });

        message.reply('🛡 | Sua denúncia foi enviada com sucesso, agradecemos pela sua denúncia!').then(msg => {
            msg.delete(10000);
        });

    }

    if(msg.startsWith(prefix + 'AJUDA')){

        message.delete();
    
        const nada = new Discord.RichEmbed()
            .setAuthor(message.guild, message.author.avatarURL)
            .setTitle(`Olá ${message.author.tag}, posso ajudar ?`)
            .setDescription("Fui criado em **JS** Por Kauã Tiezzi#1816.\n\n**💡 | Prefixo:**\nMeu prefixo é ``!``\n\n**🤝**")
            .setColor('RANDOM')
            .setThumbnail('')
            .setTimestamp()
    
        message.author.send(nada).then(msg => {
            msg.delete(50000);
        });
    
        const depois = new Discord.RichEmbed()
            .setAuthor('Lista disponível:', client.user.avatarURL)
            .setDescription("**👮 Administração** - *(Veja sobre comandos de administração.)*\n\n**💡 Outros** - *(Veja sobre outros comandos.)*")
            .setColor('RANDOM')
            .setTimestamp()
    
        message.author.send(depois).then(msg => {
            msg.delete(50000);
    
            msg.react('👮').then(r => {
    
                const adm = (reaction, user) => reaction.emoji.name === '👮' && user.id === message.author.id;
    
                const mda = msg.createReactionCollector(adm, { time: 49000 });
    
                mda.on('collect', r => {
    
                    const comandinhos = new Discord.RichEmbed()
                        .setTitle('<:flag_pm:457899299376726016> Administração')
                        .setColor('d83f31')
                        .setDescription('*Veja informações sobre os comandos de administração.*')
                        .addField('📰 | Fechar Ticket:', "/fechar e Depois /confirmar", true)
                        .setThumbnail(client.user.avatarURL)
    
                    message.author.send(comandinhos).then(msg1 => {
                        msg1.delete(30000);
                    });
    
                });
    
            })
    
            msg.react('💡').then(r => {
    
                const cmd = (reaction, user) => reaction.emoji.name === '💡' && user.id === message.author.id;
    
                const dmc = msg.createReactionCollector(cmd, { time: 49000 });
    
                dmc.on('collect', r => {
    
                    const comandinhos = new Discord.RichEmbed()
                        .setTitle('<:fire:457899300320444426> Outros')
                        .setColor('efd94a')
                        .setDescription('*Veja informações sobre outros comandos.*')
                        .addField('📰 | Ticket:', "/ticket ``<motivo>``", true)
                        .addField('🖼 | Sugerir:', "/sugerir ``<@membro>``", true)
                        .addField('🌍 | denunciar ``<@membro>`` ``<motivo>`` - ``<prova>``')
                        .addField('🚩 | Informação:', "/info ", true)
                        .setThumbnail(client.user.avatarURL)
    
                    message.author.send(comandinhos).then(msg1 => {
                        msg1.delete(30000);
                    });
    
                });
    
            })
    
        });
    
        message.reply('🌍| Enviei as informações no seu privado!').then(msg => {
            msg.delete(10000);
        });
    }


    if(msg.startsWith(prefix + 'INFO')){
    
        var IP = 'loockcraft.com';
        var Porta = '25577';
        message.delete();
        var url = 'http://mcapi.us/server/status?ip=' + IP + '&port=' + Porta;
        request(url, function(err, response, body) {
		
            if(err){
	        client.channels.get('449624551505264640').send(`:x: | Erro de conexão com o server ${IP}`);
                return message.reply(':x: | Erro !!! Servidor não encontrado !')
	    }
            body = JSON.parse(body);
	    if(body.online){
	        if(body.players.now){
	            let embed = new Discord.RichEmbed()
	                .setTitle('📢 LoockStatus 📢')
                        .setDescription('Informações sobre nosso server !')
                        .addField(':white_check_mark: | Conexão: ', 'Rede em Funcionamento !')
		        .addField('⚔ | Jogadores: ', body.players.now)
                        .setTimestamp()
                        .setFooter(`Requisitado por: ${message.author.username}`, message.author.avatarURL)
			.setColor('a7f970');
		    message.channel.send(embed).then(msg => {
		        msg.delete(20000)
		    })
                }else{
	            let embed = new Discord.RichEmbed()
	                .setTitle('📢 LoockStatus 📢')
                        .setDescription('Informações sobre nosso server !')
                        .addField(':x: | Conexão: ', 'Rede em Manutenção !')
		        .addField('⚔ | Jogadores: ', 'Nenhum')
			.setColor('f97070');
		    message.channel.send(embed);
		}
	    }else{
	        let embed = new Discord.RichEmbed()
	            .setTitle('📢 LoockStatus 📢')
                    .setDescription('Informações sobre nosso server !')
                    .addField(':x: | Conexão: ', 'Rede Inoperantes !')
		    .setColor('f97070');
		message.channel.send(embed);
	    }
		
	});
    
    }

    if(msg.startsWith(prefix + 'TICKET') || msg.startsWith(prefix + 'SUPORTE')){

        message.delete();
        let motivo = args.slice(0).join(" ");

        const mto = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('🎟 | Ticket')
            .setDescription("*Use-o para tirar sua dúvida, caso abuse será punido !*\n\n:information_desk_person: | **/ticket** ``<sua dúvida>``\n\n⚖ | **Alternativas:** \n/suporte")
            .setColor('RANDOM')
            .setFooter('Suporte', client.user.avatarURL)

        if(!motivo) return message.channel.send(mto).then(msg => {
            msg.delete(20000)
        })

        const ert = new Discord.RichEmbed()
            .setTitle(':warning: Opaah... Erros encontrados !')
            .addField(':no_entry_sign: | Erro encontrado:', "Grupo ``❈ Staff`` não foi encontrado porfavor crie-o /")
            .setColor('f4eb42')
            .setTimestamp()
            .setFooter('Erro: Ticket', client.user.avatarURL)

        if(!message.guild.roles.exists("name", "Staff")) return client.channels.get('474352141985775628').send(ert);

        if(message.guild.channels.exists("name", "ticket-" + message.author.username)) return message.reply(':x: | Você já possui um ticket aberto...  ').then(msg => {
            msg.delete(10000);
        })
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {

            let role = message.guild.roles.find("name", "❈ Staff");
            let role2 = message.guild.roles.find("name", "@everyone");

            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });

            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });

            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });

            message.reply(`📂| Seu ticket foi criado com sucesso ! Por favor aguarde até alguem atende-lo, obrigado.\n\n📝 | Acesse seu ticket: <#${c.id}>`).then(msg => {
                msg.react('🕐');
                msg.delete(20000);
            });

            const embed = new Discord.RichEmbed()
                .setColor('f45c42')
                .setTimestamp()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .addField('⚙ | Status:', 'Aberto')
                .addField('📝 | Informação adicional:', motivo)
                .addField(':loudspeaker: | Atenção:', 'Quando sua dúvida for resolvida por favor adicione sua reação, como: :x: ou :white_check_mark:')
            c.send(embed).then(msg => {
                msg.react('✅');
                msg.react('❌');
            });

        });
    }

    if(msg.startsWith(prefix + 'FECHAR')){

        message.delete();

        if(!message.channel.name.startsWith(`ticket-`)) return message.reply(':x: | Esse comando não pode ser usado aqui... :frowning:').then(msg => {
            msg.delete(10000);
        });

        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription("*Você realmente deseja fechar esse ticket ?*\n🚪 | **Fechar:**\nCaso queira fechar basta usar: ``!confirmar``\n🕐 | Você possui 10 segundos para fechar, ou será cancelado ! \n\n :thumbsup:\n")
            .setFooter(message.channel.name, client.user.avatarURL)
            .setTimestamp()
            .setColor('RANDOM')
        message.channel.send(embed)
        .then((m) => {
          message.channel.awaitMessages(response => response.content === '/confirmar', {
            max: 1,
            time: 10000,
            errors: ['time'],
          })
          .then((collected) => {
              message.channel.delete();
            })
            .catch(() => {
              m.delete();
              message.channel.send('📪 | Cancelando... 10 segundos se passaram e não recebi uma resposta !').then(m2 => {
              }, 3000);
            });
        });
    }

});


  client.login('NDk2NDUxNDgyMjA0MjQxOTIw.DpQ0Hg.tlIhZbcVppmCEiejPRBYQDtWRs0');;

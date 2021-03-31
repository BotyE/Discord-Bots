const Discord = require("discord.js");
const fs= require("fs");

module.exports.run = async (bot,message,args) =>{
        //let mess= await message.channel.send(eembed)
        let min,max,name;
        let casecase=["Start","Lite","Medium","Gold","Perfect","Premium","Pro"]
        let caseLite =[{chance: 15,name: [{name: 'AKR', chance: 20, min: 10,max: 50},
        {name: 'GECT', chance: 20, min: 1,max: 5},
        {name: '3Room', chance: 20, min: 1,max: 1},
        {name: 'Start', chance: 20, min: 1,max: 5},
        {name: 'Lite', chance: 20, min: 1,max: 2}]},

        {name: [{name: 'AKR', chance: 34, min: 50,max: 150},
        {name: 'GECT', chance: 30, min: 5,max: 15},
        {name: 'LiteCase', chance: 4, min: 1,max: 1},
        {name: '3Room', chance: 4, min: 1,max: 3},
        {name: '2Room', chance: 4, min: 1,max: 1},
        {name: 'Start', chance: 4, min: 5,max: 14},
        {name: 'Lite', chance: 4, min: 3,max: 7},
        {name: 'Medium', chance: 4, min: 1,max: 5},
        {name: 'Iron', chance: 4, min: 1,max: 3},
        {name: 'Gold', chance: 4, min: 1,max: 2},
        {name: 'Platinum', chance: 4, min: 1,max: 1}], chance: 50},

        {name: [{name: 'AKR', chance: 28, min: 150,max: 600},
        {name: 'GECT', chance: 26, min: 15,max: 60},
        {name: 'LiteCase', chance: 10, min: 2,max: 4},
        {name: 'GoldCase', chance: 10, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 4,max: 12},
        {name: '2Room', chance: 2, min: 2,max: 4},
        {name: '1Room', chance: 2, min: 1,max: 2},
        {name: 'Start', chance: 2, min: 14,max: 60},
        {name: 'Lite', chance: 2, min: 7,max: 30},
        {name: 'Medium', chance: 2, min: 6,max: 20},
        {name: 'Iron', chance: 2, min: 4,max: 12},
        {name: 'Gold', chance: 2, min: 3,max: 8},
        {name: 'Platinum', chance: 2, min: 2,max: 5},
        {name: 'Diamond', chance: 2, min: 1,max: 4},
        {name: 'Wolfram', chance: 2, min: 1,max: 2},
        {name: 'Premium', chance: 2, min: 1,max: 2},
        {name: 'Vital', chance: 2, min: 1,max: 1}], chance: 30},

        {name: [{name: 'AKR', chance: 20, min: 600,max: 2400},
        {name: 'GECT', chance: 20, min: 60,max: 240},
        {name: 'LiteCase', chance: 5, min: 5,max: 16},
        {name: 'GoldCase', chance: 5, min: 2,max: 4},
        {name: 'PerfectCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 3, min: 12,max: 48},
        {name: '2Room', chance: 3, min: 5,max: 16},
        {name: '1Room', chance: 3, min: 3,max: 7},
        {name: 'Start', chance: 3, min: 60,max: 240},
        {name: 'Lite', chance: 3, min: 30,max: 120},
        {name: 'Medium', chance: 3, min: 20,max: 80},
        {name: 'Iron', chance: 3, min: 12,max: 48},
        {name: 'Gold', chance: 3, min: 8,max: 30},
        {name: 'Platinum', chance: 3, min: 5,max: 20},
        {name: 'Diamond', chance: 3, min: 5,max: 14},
        {name: 'Wolfram', chance: 3, min: 3,max: 9},
        {name: 'Premium', chance: 3, min: 3,max: 7},
        {name: 'Vital', chance: 3, min: 2,max: 5},
        {name: 'Lord', chance: 3, min: 1,max: 3},
        {name: 'Benefactor', chance: 3, min: 1,max: 1}], chance: 3},

        {name: [{name: 'AKR', chance: 25, min: 2400,max: 9600},
        {name: 'GECT', chance: 25, min: 240,max: 960},
        {name: 'LiteCase', chance: 5, min: 16,max: 32},
        {name: 'GoldCase', chance: 5, min: 4,max: 16},
        {name: 'PerfectCase', chance: 5, min: 1,max: 4},
        {name: 'RubyCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 48,max: 190},
        {name: '2Room', chance: 2, min: 16,max: 64},
        {name: '1Room', chance: 2, min: 7,max: 30},
        {name: 'Lite', chance: 2, min: 120,max: 240},
        {name: 'Medium', chance: 2, min: 80,max: 240},
        {name: 'Iron', chance: 2, min: 48,max: 192},
        {name: 'Gold', chance: 2, min: 30,max: 120},
        {name: 'Platinum', chance: 2, min: 20,max: 82},
        {name: 'Diamond', chance: 2, min: 14,max: 57},
        {name: 'Wolfram', chance: 2, min: 10,max: 38},
        {name: 'Premium', chance: 2, min: 7,max: 28},
        {name: 'Vital', chance: 2, min: 6,max: 19},
        {name: 'Lord', chance: 2, min: 4,max: 11},
        {name: 'Benefactor', chance: 2, min: 2,max: 5},
        {name: 'Sponsor', chance: 2, min: 1,max: 2}], chance: 2}];
        let caseGold = [{chance: 5,name: [{name: 'AKR', chance: 20, min: 10,max: 50},
        {name: 'GECT', chance: 20, min: 1,max: 5},
        {name: '3Room', chance: 20, min: 1,max: 1},
        {name: 'Start', chance: 20, min: 1,max: 5},
        {name: 'Lite', chance: 20, min: 1,max: 2}]},

        {name: [{name: 'AKR', chance: 34, min: 50,max: 150},
        {name: 'GECT', chance: 30, min: 5,max: 15},
        {name: 'LiteCase', chance: 4, min: 1,max: 1},
        {name: '3Room', chance: 4, min: 1,max: 3},
        {name: '2Room', chance: 4, min: 1,max: 1},
        {name: 'Start', chance: 4, min: 5,max: 14},
        {name: 'Lite', chance: 4, min: 3,max: 7},
        {name: 'Medium', chance: 4, min: 1,max: 5},
        {name: 'Iron', chance: 4, min: 1,max: 3},
        {name: 'Gold', chance: 4, min: 1,max: 2},
        {name: 'Platinum', chance: 4, min: 1,max: 1}], chance: 10},

        {name: [{name: 'AKR', chance: 28, min: 150,max: 600},
        {name: 'GECT', chance: 26, min: 15,max: 60},
        {name: 'LiteCase', chance: 10, min: 2,max: 4},
        {name: 'GoldCase', chance: 10, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 4,max: 12},
        {name: '2Room', chance: 2, min: 2,max: 4},
        {name: '1Room', chance: 2, min: 1,max: 2},
        {name: 'Start', chance: 2, min: 14,max: 60},
        {name: 'Lite', chance: 2, min: 7,max: 30},
        {name: 'Medium', chance: 2, min: 6,max: 20},
        {name: 'Iron', chance: 2, min: 4,max: 12},
        {name: 'Gold', chance: 2, min: 3,max: 8},
        {name: 'Platinum', chance: 2, min: 2,max: 5},
        {name: 'Diamond', chance: 2, min: 1,max: 4},
        {name: 'Wolfram', chance: 2, min: 1,max: 2},
        {name: 'Premium', chance: 2, min: 1,max: 2},
        {name: 'Vital', chance: 2, min: 1,max: 1}], chance: 60},

        {name: [{name: 'AKR', chance: 20, min: 600,max: 2400},
        {name: 'GECT', chance: 20, min: 60,max: 240},
        {name: 'LiteCase', chance: 5, min: 5,max: 16},
        {name: 'GoldCase', chance: 5, min: 2,max: 4},
        {name: 'PerfectCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 3, min: 12,max: 48},
        {name: '2Room', chance: 3, min: 5,max: 16},
        {name: '1Room', chance: 3, min: 3,max: 7},
        {name: 'Start', chance: 3, min: 60,max: 240},
        {name: 'Lite', chance: 3, min: 30,max: 120},
        {name: 'Medium', chance: 3, min: 20,max: 80},
        {name: 'Iron', chance: 3, min: 12,max: 48},
        {name: 'Gold', chance: 3, min: 8,max: 30},
        {name: 'Platinum', chance: 3, min: 5,max: 20},
        {name: 'Diamond', chance: 3, min: 5,max: 14},
        {name: 'Wolfram', chance: 3, min: 3,max: 9},
        {name: 'Premium', chance: 3, min: 3,max: 7},
        {name: 'Vital', chance: 3, min: 2,max: 5},
        {name: 'Lord', chance: 3, min: 1,max: 3},
        {name: 'Benefactor', chance: 3, min: 1,max: 1}], chance: 20},

        {name: [{name: 'AKR', chance: 25, min: 2400,max: 9600},
        {name: 'GECT', chance: 25, min: 240,max: 960},
        {name: 'LiteCase', chance: 5, min: 16,max: 21},
        {name: 'GoldCase', chance: 5, min: 4,max: 16},
        {name: 'PerfectCase', chance: 5, min: 1,max: 4},
        {name: 'RubyCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 48,max: 190},
        {name: '2Room', chance: 2, min: 16,max: 64},
        {name: '1Room', chance: 2, min: 7,max: 30},
        {name: 'Lite', chance: 2, min: 120,max: 240},
        {name: 'Medium', chance: 2, min: 80,max: 240},
        {name: 'Iron', chance: 2, min: 48,max: 192},
        {name: 'Gold', chance: 2, min: 30,max: 120},
        {name: 'Platinum', chance: 2, min: 20,max: 82},
        {name: 'Diamond', chance: 2, min: 14,max: 57},
        {name: 'Wolfram', chance: 2, min: 10,max: 38},
        {name: 'Premium', chance: 2, min: 7,max: 28},
        {name: 'Vital', chance: 2, min: 6,max: 19},
        {name: 'Lord', chance: 2, min: 4,max: 11},
        {name: 'Benefactor', chance: 2, min: 2,max: 5},
        {name: 'Sponsor', chance: 2, min: 1,max: 2}], chance: 3},
      
      {name: [{name: 'AKR', chance: 40, min: 9600,max: 38400},
        {name: 'GECT', chance: 10, min: 960,max: 3840},
        {name: 'GoldCase', chance: 5, min: 16,max: 32},
        {name: 'PerfectCase', chance: 5, min: 4,max: 16},
        {name: 'RubyCase', chance: 5, min: 1,max: 4},
        {name: '2Room', chance: 2, min: 64,max: 240},
        {name: '1Room', chance: 2, min: 30,max: 120},
        {name: 'Platinum', chance: 2, min: 82,max: 240},
        {name: 'Diamond', chance: 2, min: 57,max: 230},
        {name: 'Wolfram', chance: 2, min: 38,max: 153},
        {name: 'Premium', chance: 2, min: 28,max: 115},
        {name: 'Vital', chance: 2, min: 20,max: 76},
        {name: 'Lord', chance: 2, min: 12,max: 46},
        {name: 'Benefactor', chance: 2, min: 6,max: 23},
        {name: 'Sponsor', chance: 2, min: 3,max: 11}], chance: 2}];

        let casePerfect = [{chance: 5,name: [{name: 'AKR', chance: 20, min: 10,max: 50},
        {name: 'GECT', chance: 20, min: 1,max: 5},
        {name: '3Room', chance: 20, min: 1,max: 1},
        {name: 'Start', chance: 20, min: 1,max: 5},
        {name: 'Lite', chance: 20, min: 1,max: 2}]},

        {name: [{name: 'AKR', chance: 34, min: 50,max: 150},
        {name: 'GECT', chance: 30, min: 5,max: 15},
        {name: 'LiteCase', chance: 4, min: 1,max: 1},
        {name: '3Room', chance: 4, min: 1,max: 3},
        {name: '2Room', chance: 4, min: 1,max: 1},
        {name: 'Start', chance: 4, min: 5,max: 14},
        {name: 'Lite', chance: 4, min: 3,max: 7},
        {name: 'Medium', chance: 4, min: 1,max: 5},
        {name: 'Iron', chance: 4, min: 1,max: 3},
        {name: 'Gold', chance: 4, min: 1,max: 2},
        {name: 'Platinum', chance: 4, min: 1,max: 1}], chance: 10},

        {name: [{name: 'AKR', chance: 28, min: 150,max: 600},
        {name: 'GECT', chance: 26, min: 15,max: 60},
        {name: 'LiteCase', chance: 10, min: 2,max: 4},
        {name: 'GoldCase', chance: 10, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 4,max: 12},
        {name: '2Room', chance: 2, min: 2,max: 4},
        {name: '1Room', chance: 2, min: 1,max: 2},
        {name: 'Start', chance: 2, min: 14,max: 60},
        {name: 'Lite', chance: 2, min: 7,max: 30},
        {name: 'Medium', chance: 2, min: 6,max: 20},
        {name: 'Iron', chance: 2, min: 4,max: 12},
        {name: 'Gold', chance: 2, min: 3,max: 8},
        {name: 'Platinum', chance: 2, min: 2,max: 5},
        {name: 'Diamond', chance: 2, min: 1,max: 4},
        {name: 'Wolfram', chance: 2, min: 1,max: 2},
        {name: 'Premium', chance: 2, min: 1,max: 2},
        {name: 'Vital', chance: 2, min: 1,max: 1}], chance: 15},

        {name: [{name: 'AKR', chance: 20, min: 600,max: 2400},
        {name: 'GECT', chance: 20, min: 60,max: 240},
        {name: 'LiteCase', chance: 5, min: 5,max: 16},
        {name: 'GoldCase', chance: 5, min: 2,max: 4},
        {name: 'PerfectCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 3, min: 12,max: 48},
        {name: '2Room', chance: 3, min: 5,max: 16},
        {name: '1Room', chance: 3, min: 3,max: 7},
        {name: 'Start', chance: 3, min: 60,max: 240},
        {name: 'Lite', chance: 3, min: 30,max: 120},
        {name: 'Medium', chance: 3, min: 20,max: 80},
        {name: 'Iron', chance: 3, min: 12,max: 48},
        {name: 'Gold', chance: 3, min: 8,max: 30},
        {name: 'Platinum', chance: 3, min: 5,max: 20},
        {name: 'Diamond', chance: 3, min: 5,max: 14},
        {name: 'Wolfram', chance: 3, min: 3,max: 9},
        {name: 'Premium', chance: 3, min: 3,max: 7},
        {name: 'Vital', chance: 3, min: 2,max: 5},
        {name: 'Lord', chance: 3, min: 1,max: 3},
        {name: 'Benefactor', chance: 3, min: 1,max: 1}], chance: 57},

        {name: [{name: 'AKR', chance: 25, min: 2400,max: 9600},
        {name: 'GECT', chance: 25, min: 240,max: 960},
        {name: 'LiteCase', chance: 5, min: 16,max: 21},
        {name: 'GoldCase', chance: 5, min: 4,max: 16},
        {name: 'PerfectCase', chance: 5, min: 1,max: 4},
        {name: 'RubyCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 48,max: 190},
        {name: '2Room', chance: 2, min: 16,max: 64},
        {name: '1Room', chance: 2, min: 7,max: 30},
        {name: 'Lite', chance: 2, min: 120,max: 240},
        {name: 'Medium', chance: 2, min: 80,max: 240},
        {name: 'Iron', chance: 2, min: 48,max: 192},
        {name: 'Gold', chance: 2, min: 30,max: 120},
        {name: 'Platinum', chance: 2, min: 20,max: 82},
        {name: 'Diamond', chance: 2, min: 14,max: 57},
        {name: 'Wolfram', chance: 2, min: 10,max: 38},
        {name: 'Premium', chance: 2, min: 7,max: 28},
        {name: 'Vital', chance: 2, min: 6,max: 19},
        {name: 'Lord', chance: 2, min: 4,max: 11},
        {name: 'Benefactor', chance: 2, min: 2,max: 5},
        {name: 'Sponsor', chance: 2, min: 1,max: 2}], chance: 15},
      
        {name: [{name: 'AKR', chance: 40, min: 9600,max: 38400},
        {name: 'GECT', chance: 10, min: 960,max: 3840},
        {name: 'GoldCase', chance: 5, min: 16,max: 32},
        {name: 'PerfectCase', chance: 5, min: 4,max: 16},
        {name: 'RubyCase', chance: 5, min: 1,max: 4},
        {name: '2Room', chance: 2, min: 64,max: 240},
        {name: '1Room', chance: 2, min: 30,max: 120},
        {name: 'Platinum', chance: 2, min: 82,max: 240},
        {name: 'Diamond', chance: 2, min: 57,max: 230},
        {name: 'Wolfram', chance: 2, min: 38,max: 153},
        {name: 'Premium', chance: 2, min: 28,max: 115},
        {name: 'Vital', chance: 2, min: 20,max: 76},
        {name: 'Lord', chance: 2, min: 12,max: 46},
        {name: 'Benefactor', chance: 2, min: 6,max: 23},
        {name: 'Sponsor', chance: 2, min: 3,max: 11}], chance: 2},

        {name: [{name: 'AKR', chance: 80, min: 38400,max: 153600},
        {name: 'GECT', chance: 5, min: 3840,max: 153600},
        {name: 'PerfectCase', chance: 5, min: 16,max: 32},
        {name: 'RubyCase', chance: 2, min: 4,max: 16},
        {name: '2Room', chance: 1, min: 120,max: 240},
        {name: '1Room', chance: 1, min: 120,max: 240},
        {name: 'Wolfram', chance: 1, min: 153,max: 240},
        {name: 'Premium', chance: 1, min: 115,max: 240},
        {name: 'Vital', chance: 1, min: 76,max: 240},
        {name: 'Lord', chance: 1, min: 46,max: 184},
        {name: 'Benefactor', chance: 1, min: 23,max: 92},
        {name: 'Sponsor', chance: 1, min: 11,max: 46}], chance: 1}
      ];

        let caseRuby = [{name: [{name: 'AKR', chance: 28, min: 150,max: 600},
        {name: 'GECT', chance: 26, min: 15,max: 60},
        {name: 'LiteCase', chance: 10, min: 2,max: 4},
        {name: 'GoldCase', chance: 10, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 4,max: 12},
        {name: '2Room', chance: 2, min: 2,max: 4},
        {name: '1Room', chance: 2, min: 1,max: 2},
        {name: 'Start', chance: 2, min: 14,max: 60},
        {name: 'Lite', chance: 2, min: 7,max: 30},
        {name: 'Medium', chance: 2, min: 6,max: 20},
        {name: 'Iron', chance: 2, min: 4,max: 12},
        {name: 'Gold', chance: 2, min: 3,max: 8},
        {name: 'Platinum', chance: 2, min: 2,max: 5},
        {name: 'Diamond', chance: 2, min: 1,max: 4},
        {name: 'Wolfram', chance: 2, min: 1,max: 2},
        {name: 'Premium', chance: 2, min: 1,max: 2},
        {name: 'Vital', chance: 2, min: 1,max: 1}], chance: 5},

        {name: [{name: 'AKR', chance: 20, min: 600,max: 2400},
        {name: 'GECT', chance: 20, min: 60,max: 240},
        {name: 'LiteCase', chance: 5, min: 5,max: 16},
        {name: 'GoldCase', chance: 5, min: 2,max: 4},
        {name: 'PerfectCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 3, min: 12,max: 48},
        {name: '2Room', chance: 3, min: 5,max: 16},
        {name: '1Room', chance: 3, min: 3,max: 7},
        {name: 'Start', chance: 3, min: 60,max: 240},
        {name: 'Lite', chance: 3, min: 30,max: 120},
        {name: 'Medium', chance: 3, min: 20,max: 80},
        {name: 'Iron', chance: 3, min: 12,max: 48},
        {name: 'Gold', chance: 3, min: 8,max: 30},
        {name: 'Platinum', chance: 3, min: 5,max: 20},
        {name: 'Diamond', chance: 3, min: 5,max: 14},
        {name: 'Wolfram', chance: 3, min: 3,max: 9},
        {name: 'Premium', chance: 3, min: 3,max: 7},
        {name: 'Vital', chance: 3, min: 2,max: 5},
        {name: 'Lord', chance: 3, min: 1,max: 3},
        {name: 'Benefactor', chance: 3, min: 1,max: 1}], chance: 20},

        {name: [{name: 'AKR', chance: 25, min: 2400,max: 9600},
        {name: 'GECT', chance: 25, min: 240,max: 960},
        {name: 'LiteCase', chance: 5, min: 16,max: 21},
        {name: 'GoldCase', chance: 5, min: 4,max: 16},
        {name: 'PerfectCase', chance: 5, min: 1,max: 4},
        {name: 'RubyCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 48,max: 190},
        {name: '2Room', chance: 2, min: 16,max: 64},
        {name: '1Room', chance: 2, min: 7,max: 30},
        {name: 'Lite', chance: 2, min: 120,max: 240},
        {name: 'Medium', chance: 2, min: 80,max: 240},
        {name: 'Iron', chance: 2, min: 48,max: 192},
        {name: 'Gold', chance: 2, min: 30,max: 120},
        {name: 'Platinum', chance: 2, min: 20,max: 82},
        {name: 'Diamond', chance: 2, min: 14,max: 57},
        {name: 'Wolfram', chance: 2, min: 10,max: 38},
        {name: 'Premium', chance: 2, min: 7,max: 28},
        {name: 'Vital', chance: 2, min: 6,max: 19},
        {name: 'Lord', chance: 2, min: 4,max: 11},
        {name: 'Benefactor', chance: 2, min: 2,max: 5},
        {name: 'Sponsor', chance: 2, min: 1,max: 2}], chance: 59},
      
        {name: [{name: 'AKR', chance: 65, min: 9600,max: 38400},
        {name: 'GECT', chance: 10, min: 960,max: 3840},
        {name: 'GoldCase', chance: 5, min: 16,max: 32},
        {name: 'PerfectCase', chance: 5, min: 4,max: 16},
        {name: 'RubyCase', chance: 5, min: 1,max: 4},
        {name: '2Room', chance: 1, min: 64,max: 240},
        {name: '1Room', chance: 1, min: 30,max: 120},
        {name: 'Platinum', chance: 1, min: 82,max: 240},
        {name: 'Diamond', chance: 1, min: 57,max: 230},
        {name: 'Wolfram', chance: 1, min: 38,max: 153},
        {name: 'Premium', chance: 1, min: 28,max: 115},
        {name: 'Vital', chance: 1, min: 20,max: 76},
        {name: 'Lord', chance: 1, min: 12,max: 46},
        {name: 'Benefactor', chance: 1, min: 6,max: 23},
        {name: 'Sponsor', chance: 1, min: 3,max: 11}], chance: 15},

        {name: [{name: 'AKR', chance: 80, min: 38400,max: 153600},
        {name: 'GECT', chance: 5, min: 3840,max: 153600},
        {name: 'PerfectCase', chance: 5, min: 16,max: 32},
        {name: 'RubyCase', chance: 2, min: 4,max: 16},
        {name: '2Room', chance: 1, min: 120,max: 240},
        {name: '1Room', chance: 1, min: 120,max: 240},
        {name: 'Wolfram', chance: 1, min: 153,max: 240},
        {name: 'Premium', chance: 1, min: 115,max: 240},
        {name: 'Vital', chance: 1, min: 76,max: 240},
        {name: 'Lord', chance: 1, min: 46,max: 184},
        {name: 'Benefactor', chance: 1, min: 23,max: 92},
        {name: 'Sponsor', chance: 1, min: 11,max: 46}], chance: 1}
      ];

        let len,summ=0,i=0,len1,j=0;
        switch(args[0])
        {
          case "lite":
           len = getRandomInt(100)
            await caseLite.forEach(function(elem) {
              if(summ<len)
              {
              summ+=elem.chance;
              i+=1;
              }  
            })
            if(summ>len)
            {
              i-=1
            }
            console.log(len)
              j=0
              summ=0
              len1 = getRandomInt(100)
            await caseLite[i].name.forEach(function(elem) {
              if(summ<len1)
              {
              summ+=elem.chance;
              j+=1;
              }  
            })
            if(summ>len1)
            {
              j-=1
            }
            console.log(j)
            name= caseLite[i].name[j].name
            min=randomInteger(caseLite[i].name[j].min,caseLite[i].name[j].max-1)
            switch (name){
              case 'AKR':
                message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Акр','Акра','Акров'])}`)
                break;
              case '3Room' || '2Room' || '1Room':
                message.channel.send(`Из кейса ${args[0]} вы получили комнату уровня ${name[0]} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
              case 'Start'||'Lite'|| 'Gold' || 'Iron'||'Medium'||'Platinum'||'Diamond'||'Wolfram'||'Premium'||'Vital' || 'Lord' || 'Benefactor' || 'Sponsor':
                message.channel.send(`Из кейса ${args[0]} вы получили роль VIP ${name} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
              case 'GECT':
                message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Гектар','Гектара','Гектаров'])}`)
                break;
              case 'LiteCase'||'GoldCase'||'PerfectCase'||'RubyCase':
                message.channel.send(`Из кейса ${args[0]} вы получили кейс ${name} в количестве ${min}. Чтобы открыть кейс напишите команду !open lite|gold|perfect|ruby`)
                break;
            }
            break;
          case "gold":
            len = getRandomInt(100)
            await caseGold.forEach(function(elem) {
              if(summ<len)
              {
              summ+=elem.chance;
              i+=1;
              }  
            })
            if(summ>len)
            {
              i-=1
            }
            console.log(len)
              j=0
              summ=0
              len1 = getRandomInt(100)
            await caseGold[i].name.forEach(function(elem) {
              if(summ<len1)
              {
              summ+=elem.chance;
              j+=1;
              }  
            })
            if(summ>len1)
            {
              j-=1
            }
            console.log(j)
            name= caseGold[i].name[j].name
            min=randomInteger(caseGold[i].name[j].min,caseGold[i].name[j].max-1)
            switch (name){
              case 'AKR':
                message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Акр','Акра','Акров'])}`)
                break;
              case '3Room' || '2Room' || '1Room':
                message.channel.send(`Из кейса ${args[0]} вы получили комнату уровня ${name[0]} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
              case 'Start'||'Lite'|| 'Gold' || 'Iron'||'Medium'||'Platinum'||'Diamond'||'Wolfram'||'Premium'||'Vital' || 'Lord' || 'Benefactor' || 'Sponsor':
                message.channel.send(`Из кейса ${args[0]} вы получили роль VIP ${name} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
              case 'GECT':
                message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Гектар','Гектара','Гектаров'])}`)
                break;
              case 'LiteCase'||'GoldCase'||'PerfectCase'||'RubyCase':
                message.channel.send(`Из кейса ${args[0]} вы получили кейс ${name} в количестве ${min}. Чтобы открыть кейс напишите команду !open lite|gold|perfect|ruby`)
                break;
            }
            break;
          case "perfect":
            len = getRandomInt(100)
            await casePerfect.forEach(function(elem) {
              if(summ<len)
              {
              summ+=elem.chance;
              i+=1;
              }  
            })
            if(summ>len)
            {
              i-=1
            }
            console.log(len)
              j=0
              summ=0
              len1 = getRandomInt(100)
            await casePerfect[i].name.forEach(function(elem) {
              if(summ<len1)
              {
              summ+=elem.chance;
              j+=1;
              }  
            })
            if(summ>len1)
            {
              j-=1
            }
            console.log(j)
            name= casePerfect[i].name[j].name
            min=randomInteger(casePerfect[i].name[j].min,casePerfect[i].name[j].max-1)
            switch (name){
              case 'AKR':
                message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Акр','Акра','Акров'])}`)
                break;
              case '3Room' || '2Room' || '1Room':
                message.channel.send(`Из кейса ${args[0]} вы получили комнату уровня ${name[0]} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
              case 'Start'||'Lite'|| 'Gold' || 'Iron'||'Medium'||'Platinum'||'Diamond'||'Wolfram'||'Premium'||'Vital' || 'Lord' || 'Benefactor' || 'Sponsor':
                message.channel.send(`Из кейса ${args[0]} вы получили роль VIP ${name} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
              case 'GECT':
                message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Гектар','Гектара','Гектаров'])}`)
                break;
              case 'LiteCase'||'GoldCase'||'PerfectCase'||'RubyCase':
                message.channel.send(`Из кейса ${args[0]} вы получили кейс ${name} в количестве ${min}. Чтобы открыть кейс напишите команду !open lite | gold | perfect | ruby`)
                break;
            }
            break;
          case "ruby":
           len = getRandomInt(100)
            await caseRuby.forEach(function(elem) {
              if(summ<len)
              {
              summ+=elem.chance;
              i+=1;
              }  
            })
            if(summ>len)
            {
              i-=1
            }
            console.log(len)
              j=0
              summ=0
              len1 = getRandomInt(100)
            await caseRuby[i].name.forEach(function(elem) {
              if(summ<len1)
              {
              summ+=elem.chance;
              j+=1;
              }  
            })
            if(summ>len1)
            {
              j-=1
            }
            console.log(j)
            name= caseRuby[i].name[j].name
            min=randomInteger(caseRuby[i].name[j].min,caseRuby[i].name[j].max-1)
            switch (name){
              case 'AKR':
                message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Акр','Акра','Акров'])}`)
                break;
              case '3Room' || '2Room' || '1Room':
                message.channel.send(`Из кейса ${args[0]} вы получили комнату уровня ${name[0]} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
              case 'Start'||'Lite'|| 'Gold' || 'Iron'||'Medium'||'Platinum'||'Diamond'||'Wolfram'||'Premium'||'Vital' || 'Lord' || 'Benefactor' || 'Sponsor':
                message.channel.send(`Из кейса ${args[0]} вы получили роль VIP ${name} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
              case 'GECT':
                message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Гектар','Гектара','Гектаров'])}`)
                break;
              case 'LiteCase'||'GoldCase'||'PerfectCase'||'RubyCase':
                message.channel.send(`Из кейса ${args[0]} вы получили кейс ${name} в количестве ${min}. Чтобы открыть кейс напишите команду !open lite|gold|perfect|ruby`)
                break;
            }
            break;
          }
        /*  if(args[0]==='lite'||args[0]==='gold'||args[0]==='perfect'||args[0]==='ruby')
          {
          switch (name){
            case 'AKR':
              message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Акр','Акра','Акров'])}`)
              break;
            case '3Room' || '2Room' || '1Room':
              message.channel.send(`Из кейса ${args[0]} вы получили комнату уровня ${name[0]} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
              break;
            case 'Start'||'Lite'|| 'Gold' || 'Iron'||'Medium'||'Platinum'||'Diamond'||'Wolfram'||'Premium'||'Vital' || 'Lord' || 'Benefactor' || 'Sponsor':
              message.channel.send(`Из кейса ${args[0]} вы получили роль VIP ${name} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
              break;
            case 'GECT':
              message.channel.send(`Из кейса ${args[0]} вы получили ${min} ${decOfNum(min,['Гектар','Гектара','Гектаров'])}`)
              break;
            case 'LiteCase'||'GoldCase'||'PerfectCase'||'RubyCase':
              message.channel.send(`Из кейса ${args[0]} вы получили кейс ${name} в количестве ${min}. Чтобы открыть кейс напишите команду !open lite|gold|perfect|ruby`)
              break;
          }
        }*/
          function getfind() {
            len = getRandomInt(100)+1
            summ=0
            i=0;
             for(i=0;len<summ;i++)
            {
              summ+=caseLite[i]
              i++
            }
            if(len != summ)
              i-=1;
            return i;
          }
          function decOfNum(number, titles)
          {
              let decCache= [],
                    decCases = [2, 0, 1, 1, 1, 2];
              if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
              return titles[decCache[number]];
          }
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      }
    }   
module.exports.help = {
    name: "open"
}
/*
        let Startpack = [{name: 'AKR', chance: 20, min: 10,max: 50},
        {name: 'GECT', chance: 20, min: 1,max: 5},
        {name: '3Room', chance: 20, min: 1,max: 1},
        {name: 'Start', chance: 20, min: 1,max: 5},
        {name: 'Lite', chance: 20, min: 1,max: 2}]

        let Lightpack = [{name: 'AKR', chance: 34, min: 50,max: 150},
        {name: 'GECT', chance: 30, min: 5,max: 15},
        {name: 'LiteCase', chance: 4, min: 1,max: 1},
        {name: '3Room', chance: 4, min: 1,max: 3},
        {name: '2Room', chance: 4, min: 1,max: 1},
        {name: 'Start', chance: 4, min: 5,max: 14},
        {name: 'Lite', chance: 4, min: 3,max: 7},
        {name: 'Medium', chance: 4, min: 1,max: 5},
        {name: 'Iron', chance: 4, min: 1,max: 3},
        {name: 'Gold', chance: 4, min: 1,max: 2},
        {name: 'Platinum', chance: 4, min: 1,max: 1}]

        let Mediumpack = [{name: 'AKR', chance: 28, min: 150,max: 600},
        {name: 'GECT', chance: 26, min: 15,max: 60},
        {name: 'LiteCase', chance: 10, min: 2,max: 4},
        {name: 'GoldCase', chance: 10, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 4,max: 12},
        {name: '2Room', chance: 2, min: 2,max: 4},
        {name: '1Room', chance: 2, min: 1,max: 2},
        {name: 'Start', chance: 2, min: 14,max: 60},
        {name: 'Lite', chance: 2, min: 7,max: 30},
        {name: 'Medium', chance: 2, min: 6,max: 20},
        {name: 'Iron', chance: 2, min: 4,max: 12},
        {name: 'Gold', chance: 2, min: 3,max: 8},
        {name: 'Platinum', chance: 2, min: 2,max: 5},
        {name: 'Diamond', chance: 2, min: 1,max: 4},
        {name: 'Wolfram', chance: 2, min: 1,max: 2},
        {name: 'Premium', chance: 2, min: 1,max: 2},
        {name: 'Vital', chance: 2, min: 1,max: 1}]

        let Premiumpack = [{name: 'AKR', chance: 20, min: 600,max: 2400},
        {name: 'GECT', chance: 20, min: 60,max: 240},
        {name: 'LiteCase', chance: 5, min: 5,max: 16},
        {name: 'GoldCase', chance: 5, min: 2,max: 4},
        {name: 'PerfectCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 3, min: 12,max: 48},
        {name: '2Room', chance: 3, min: 5,max: 16},
        {name: '1Room', chance: 3, min: 3,max: 7},
        {name: 'Start', chance: 3, min: 60,max: 240},
        {name: 'Lite', chance: 3, min: 30,max: 120},
        {name: 'Medium', chance: 3, min: 20,max: 80},
        {name: 'Iron', chance: 3, min: 12,max: 48},
        {name: 'Gold', chance: 3, min: 8,max: 30},
        {name: 'Platinum', chance: 3, min: 5,max: 20},
        {name: 'Diamond', chance: 3, min: 5,max: 14},
        {name: 'Wolfram', chance: 3, min: 3,max: 9},
        {name: 'Premium', chance: 3, min: 3,max: 7},
        {name: 'Vital', chance: 3, min: 2,max: 5},
        {name: 'Lord', chance: 3, min: 1,max: 3},
        {name: 'Benefactor', chance: 3, min: 1,max: 1}]

        let PROpack = [{name: 'AKR', chance: 25, min: 2400,max: 9600},
        {name: 'GECT', chance: 25, min: 240,max: 960},
        {name: 'LiteCase', chance: 5, min: 16,max: 32},
        {name: 'GoldCase', chance: 5, min: 4,max: 16},
        {name: 'PerfectCase', chance: 5, min: 1,max: 4},
        {name: 'RubyCase', chance: 5, min: 1,max: 1},
        {name: '3Room', chance: 2, min: 48,max: 190},
        {name: '2Room', chance: 2, min: 16,max: 64},
        {name: '1Room', chance: 2, min: 7,max: 30},
        {name: 'Lite', chance: 2, min: 120,max: 240},
        {name: 'Medium', chance: 2, min: 80,max: 240},
        {name: 'Iron', chance: 2, min: 48,max: 192},
        {name: 'Gold', chance: 2, min: 30,max: 120},
        {name: 'Platinum', chance: 2, min: 20,max: 82},
        {name: 'Diamond', chance: 2, min: 14,max: 57},
        {name: 'Wolfram', chance: 2, min: 10,max: 38},
        {name: 'Premium', chance: 2, min: 7,max: 28},
        {name: 'Vital', chance: 2, min: 6,max: 19},
        {name: 'Lord', chance: 2, min: 4,max: 11},
        {name: 'Benefactor', chance: 2, min: 2,max: 5},
        {name: 'Sponsor', chance: 2, min: 1,max: 2}]

        let Gangpack = [{name: 'AKR', chance: 40, min: 9600,max: 38400},
        {name: 'GECT', chance: 10, min: 960,max: 3840},
        {name: 'GoldCase', chance: 5, min: 16,max: 32},
        {name: 'PerfectCase', chance: 5, min: 4,max: 16},
        {name: 'RubyCase', chance: 5, min: 1,max: 4},
        {name: '2Room', chance: 2, min: 64,max: 240},
        {name: '1Room', chance: 2, min: 30,max: 120},
        {name: 'Platinum', chance: 2, min: 82,max: 240},
        {name: 'Diamond', chance: 2, min: 57,max: 230},
        {name: 'Wolfram', chance: 2, min: 38,max: 153},
        {name: 'Premium', chance: 2, min: 28,max: 115},
        {name: 'Vital', chance: 2, min: 20,max: 76},
        {name: 'Lord', chance: 2, min: 12,max: 46},
        {name: 'Benefactor', chance: 2, min: 6,max: 23},
        {name: 'Sponsor', chance: 2, min: 3,max: 11}]

        let Gangpack1 = [{name: 'AKR', chance: 80, min: 38400,max: 153600},
        {name: 'GECT', chance: 5, min: 3840,max: 153600},
        {name: 'PerfectCase', chance: 5, min: 16,max: 32},
        {name: 'RubyCase', chance: 2, min: 4,max: 16},
        {name: '2Room', chance: 1, min: 120,max: 240},
        {name: '1Room', chance: 1, min: 120,max: 240},
        {name: 'Wolfram', chance: 1, min: 153,max: 240},
        {name: 'Premium', chance: 1, min: 115,max: 240},
        {name: 'Vital', chance: 1, min: 76,max: 240},
        {name: 'Lord', chance: 1, min: 46,max: 184},
        {name: 'Benefactor', chance: 1, min: 23,max: 92},
        {name: 'Sponsor', chance: 1, min: 11,max: 46}]
        */
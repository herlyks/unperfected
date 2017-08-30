var global_dot_js = 'global.js is loaded..';
if (typeof actor_dot_js === 'undefined') {
  throw new Error('actor.js is missing..');
}

var player = new Actor('Player 1');
var enemy = new Actor('Enemy');

var player_hpbar;
var player_hpbar_value;
var player_hp_percent;
var player_mpbar;
var player_mpbar_value;
var player_mp_percent;
var player_fdbar;
var player_fdbar_value;
var player_fd_percent;
var enemy_hpbar;
var enemy_hpbar_value;
var enemy_hp_percent;
var enemy_mpbar;
var enemy_mpbar_value;
var enemy_mp_percent;
var enemy_fdbar;
var enemy_fdbar_value;
var enemy_fd_percent;
var battle_log;
var battle_over = false;
var templates;

function dice(min = 1, max = 6) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addZero(str, digit = 2) {
  return str.length < digit ? '0' + str : str;
}

function writeBattleLog(msg) {
  var date = new Date();
  var time = addZero(date.getHours().toString(), 2) + ':' + addZero(date.getMinutes().toString(), 2) + ':' + addZero(date.getSeconds().toString(), 2);
  battle_log.append('<br>' + time + ' | ' + msg);
  battle_log.scrollTop(battle_log[0].scrollHeight);
}

function spawnEnemy() {
  enemy = new Actor('Enemy', {
    max_hp: dice(50, 200),
    max_mp: dice(50, 200),
    max_fd: dice(10, 100)
  });
  battle_log.empty();
  writeBattleLog('New Enemy spawned..');
  battle_over = false;
}

function loadTemplateFile() {
  var result = false;
  var jqXHR = $.ajax({
    url : 'templates.html',
    dataType : 'html',
    beforeSend : function(jqXHR, settings) {
      settings.async = false;
    }
  });
  jqXHR.done(function(r) {
    result = $(r);
  });
  return result;
}

function getTemplate(id) {
  return $(templates.filter('#'+id)).html();
}
